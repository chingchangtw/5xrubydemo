from decimal import Decimal
from pydantic import BaseModel
from app.models.db_models import OptionType


class OptionOut(BaseModel):
    id: int
    type: OptionType
    label: str
    price_delta: Decimal

    model_config = {"from_attributes": True}


class OptionCreate(BaseModel):
    type: OptionType
    label: str
    price_delta: Decimal = Decimal("0")


class OptionUpdate(BaseModel):
    type: OptionType | None = None
    label: str | None = None
    price_delta: Decimal | None = None


class DrinkOut(BaseModel):
    id: int
    category_id: int
    name: str
    description: str | None
    base_price: Decimal
    image_url: str | None
    active: bool
    options: list[OptionOut] = []

    model_config = {"from_attributes": True}


class DrinkCreate(BaseModel):
    category_id: int
    name: str
    description: str | None = None
    base_price: Decimal
    image_url: str | None = None


class DrinkUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    base_price: Decimal | None = None
    image_url: str | None = None
    active: bool | None = None


class CategoryOut(BaseModel):
    id: int
    name: str
    display_order: int
    active: bool

    model_config = {"from_attributes": True}


class CategoryCreate(BaseModel):
    name: str
    display_order: int = 0


class CategoryUpdate(BaseModel):
    name: str | None = None
    display_order: int | None = None
    active: bool | None = None
