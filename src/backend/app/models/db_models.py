from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, Integer, JSON, Numeric, String, Text, func
from sqlalchemy.orm import relationship
from app.database import Base, DATABASE_URL
import enum

# Use JSONB on PostgreSQL, plain JSON on SQLite
if DATABASE_URL.startswith("postgresql"):
    from sqlalchemy.dialects.postgresql import JSONB
else:
    JSONB = JSON


class OrderStatus(str, enum.Enum):
    pending = "pending"
    preparing = "preparing"
    ready = "ready"
    completed = "completed"


class OptionType(str, enum.Enum):
    size = "size"
    sugar = "sugar"
    ice = "ice"
    topping = "topping"


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    display_order = Column(Integer, nullable=False, default=0)
    active = Column(Boolean, nullable=False, default=True)

    drinks = relationship("Drink", back_populates="category")


class Drink(Base):
    __tablename__ = "drinks"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    base_price = Column(Numeric(10, 2), nullable=False)
    image_url = Column(String(500), nullable=True)
    active = Column(Boolean, nullable=False, default=True)

    category = relationship("Category", back_populates="drinks")
    options = relationship("Option", back_populates="drink")


class Option(Base):
    __tablename__ = "options"

    id = Column(Integer, primary_key=True, index=True)
    drink_id = Column(Integer, ForeignKey("drinks.id"), nullable=False)
    type = Column(Enum(OptionType), nullable=False)
    label = Column(String(100), nullable=False)
    price_delta = Column(Numeric(10, 2), nullable=False, default=0)

    drink = relationship("Drink", back_populates="options")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(Enum(OrderStatus), nullable=False, default=OrderStatus.pending)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    note = Column(Text, nullable=True)

    items = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    drink_id = Column(Integer, ForeignKey("drinks.id"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Numeric(10, 2), nullable=False)
    customizations = Column(JSONB, nullable=True)

    order = relationship("Order", back_populates="items")
