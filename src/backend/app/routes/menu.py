from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.db_models import Category, Drink, Option
from app.models.menu import CategoryOut, DrinkOut

router = APIRouter(prefix="/api/v1", tags=["menu"])


@router.get("/categories", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return (
        db.query(Category)
        .filter(Category.active == True)  # noqa: E712
        .order_by(Category.display_order)
        .all()
    )


@router.get("/categories/{category_id}/drinks", response_model=list[DrinkOut])
def list_drinks_by_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id, Category.active == True).first()  # noqa: E712
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    return (
        db.query(Drink)
        .filter(Drink.category_id == category_id, Drink.active == True)  # noqa: E712
        .all()
    )


@router.get("/drinks/{drink_id}", response_model=DrinkOut)
def get_drink(drink_id: int, db: Session = Depends(get_db)):
    drink = db.query(Drink).filter(Drink.id == drink_id, Drink.active == True).first()  # noqa: E712
    if not drink:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drink not found")
    return drink
