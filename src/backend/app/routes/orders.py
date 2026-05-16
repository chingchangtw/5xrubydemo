from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import asyncio
import json
from app.database import get_db
from app.middleware.auth import require_staff
from app.models.db_models import Order, OrderItem, OrderStatus
from app.models.order import OrderCreate, OrderOut, OrderStatusUpdate

router = APIRouter(prefix="/api/v1", tags=["orders"])

# Valid status transitions
VALID_TRANSITIONS: dict[OrderStatus, OrderStatus] = {
    OrderStatus.pending: OrderStatus.preparing,
    OrderStatus.preparing: OrderStatus.ready,
    OrderStatus.ready: OrderStatus.completed,
}

# In-memory SSE subscriber queues: list of asyncio.Queue
_sse_subscribers: list[asyncio.Queue] = []


@router.post("/orders", response_model=OrderOut, status_code=status.HTTP_201_CREATED)
def create_order(body: OrderCreate, db: Session = Depends(get_db)):
    if not body.items:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Cart is empty")

    order = Order(note=body.note)
    db.add(order)
    db.flush()

    for item in body.items:
        db.add(OrderItem(
            order_id=order.id,
            drink_id=item.drink_id,
            quantity=item.quantity,
            unit_price=item.unit_price,
            customizations=item.customizations,
        ))

    db.commit()
    db.refresh(order)

    # Notify SSE subscribers
    payload = json.dumps({"event": "new_order", "order_id": order.id})
    for q in _sse_subscribers:
        try:
            q.put_nowait(payload)
        except asyncio.QueueFull:
            pass

    return order


@router.get("/orders", response_model=list[OrderOut])
def list_active_orders(db: Session = Depends(get_db), _=Depends(require_staff)):
    return (
        db.query(Order)
        .filter(Order.status != OrderStatus.completed)
        .order_by(Order.created_at.asc())
        .all()
    )


@router.get("/orders/stream")
async def stream_orders(request: Request, _=Depends(require_staff)):
    queue: asyncio.Queue = asyncio.Queue(maxsize=50)
    _sse_subscribers.append(queue)

    async def event_generator():
        try:
            yield "data: {\"event\": \"connected\"}\n\n"
            while True:
                if await request.is_disconnected():
                    break
                try:
                    payload = await asyncio.wait_for(queue.get(), timeout=15.0)
                    yield f"data: {payload}\n\n"
                except asyncio.TimeoutError:
                    yield ": keepalive\n\n"
        finally:
            _sse_subscribers.remove(queue)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@router.patch("/orders/{order_id}/status", response_model=OrderOut)
def update_order_status(
    order_id: int,
    body: OrderStatusUpdate,
    db: Session = Depends(get_db),
    _=Depends(require_staff),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")

    expected_next = VALID_TRANSITIONS.get(order.status)
    if expected_next != body.status:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Invalid transition: {order.status} → {body.status}",
        )

    order.status = body.status
    db.commit()
    db.refresh(order)

    # Notify SSE subscribers of status change
    payload = json.dumps({"event": "order_updated", "order_id": order.id, "status": order.status.value})
    for q in _sse_subscribers:
        try:
            q.put_nowait(payload)
        except asyncio.QueueFull:
            pass

    return order
