from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.middleware.auth import require_admin
from app.models.db_models import Category, Drink, Option
from app.models.menu import (
    CategoryCreate, CategoryOut, CategoryUpdate,
    DrinkCreate, DrinkOut, DrinkUpdate,
    OptionCreate, OptionOut, OptionUpdate,
)

router = APIRouter(prefix="/api/v1/admin", tags=["admin"])

# ── Categories ────────────────────────────────────────────────────────────────

@router.post("/categories", response_model=CategoryOut, status_code=status.HTTP_201_CREATED,
             dependencies=[Depends(require_admin)])
def create_category(body: CategoryCreate, db: Session = Depends(get_db)):
    cat = Category(name=body.name, display_order=body.display_order)
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat


@router.patch("/categories/{category_id}", response_model=CategoryOut,
              dependencies=[Depends(require_admin)])
def update_category(category_id: int, body: CategoryUpdate, db: Session = Depends(get_db)):
    cat = db.query(Category).filter(Category.id == category_id).first()
    if not cat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    for field, value in body.model_dump(exclude_none=True).items():
        setattr(cat, field, value)
    db.commit()
    db.refresh(cat)
    return cat


@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT,
               dependencies=[Depends(require_admin)])
def delete_category(category_id: int, db: Session = Depends(get_db)):
    cat = db.query(Category).filter(Category.id == category_id).first()
    if not cat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    db.delete(cat)
    db.commit()

# ── Drinks ────────────────────────────────────────────────────────────────────

@router.post("/drinks", response_model=DrinkOut, status_code=status.HTTP_201_CREATED,
             dependencies=[Depends(require_admin)])
def create_drink(body: DrinkCreate, db: Session = Depends(get_db)):
    drink = Drink(**body.model_dump())
    db.add(drink)
    db.commit()
    db.refresh(drink)
    return drink


@router.patch("/drinks/{drink_id}", response_model=DrinkOut,
              dependencies=[Depends(require_admin)])
def update_drink(drink_id: int, body: DrinkUpdate, db: Session = Depends(get_db)):
    drink = db.query(Drink).filter(Drink.id == drink_id).first()
    if not drink:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drink not found")
    for field, value in body.model_dump(exclude_none=True).items():
        setattr(drink, field, value)
    db.commit()
    db.refresh(drink)
    return drink


@router.delete("/drinks/{drink_id}", status_code=status.HTTP_204_NO_CONTENT,
               dependencies=[Depends(require_admin)])
def delete_drink(drink_id: int, db: Session = Depends(get_db)):
    drink = db.query(Drink).filter(Drink.id == drink_id).first()
    if not drink:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drink not found")
    db.delete(drink)
    db.commit()

# ── Options ───────────────────────────────────────────────────────────────────

@router.post("/drinks/{drink_id}/options", response_model=OptionOut,
             status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
def create_option(drink_id: int, body: OptionCreate, db: Session = Depends(get_db)):
    drink = db.query(Drink).filter(Drink.id == drink_id).first()
    if not drink:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drink not found")
    option = Option(drink_id=drink_id, **body.model_dump())
    db.add(option)
    db.commit()
    db.refresh(option)
    return option


@router.patch("/drinks/{drink_id}/options/{option_id}", response_model=OptionOut,
              dependencies=[Depends(require_admin)])
def update_option(drink_id: int, option_id: int, body: OptionUpdate, db: Session = Depends(get_db)):
    option = db.query(Option).filter(Option.id == option_id, Option.drink_id == drink_id).first()
    if not option:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    for field, value in body.model_dump(exclude_none=True).items():
        setattr(option, field, value)
    db.commit()
    db.refresh(option)
    return option


@router.delete("/drinks/{drink_id}/options/{option_id}", status_code=status.HTTP_204_NO_CONTENT,
               dependencies=[Depends(require_admin)])
def delete_option(drink_id: int, option_id: int, db: Session = Depends(get_db)):
    option = db.query(Option).filter(Option.id == option_id, Option.drink_id == drink_id).first()
    if not option:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    db.delete(option)
    db.commit()
