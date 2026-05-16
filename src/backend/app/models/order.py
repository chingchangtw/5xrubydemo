from datetime import datetime
from decimal import Decimal
from typing import Any
from pydantic import BaseModel
from app.models.db_models import OrderStatus


class CartItemIn(BaseModel):
    drink_id: int
    quantity: int
    unit_price: Decimal
    customizations: dict[str, Any] | None = None


class OrderCreate(BaseModel):
    items: list[CartItemIn]
    note: str | None = None


class OrderItemOut(BaseModel):
    id: int
    drink_id: int
    quantity: int
    unit_price: Decimal
    customizations: dict[str, Any] | None

    model_config = {"from_attributes": True}


class OrderOut(BaseModel):
    id: int
    status: OrderStatus
    created_at: datetime
    note: str | None
    items: list[OrderItemOut] = []

    model_config = {"from_attributes": True}


class OrderStatusUpdate(BaseModel):
    status: OrderStatus
