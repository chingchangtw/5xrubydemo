#!/usr/bin/env python3
"""Seed the database with sample categories and drinks."""
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src", "backend"))

from decimal import Decimal
from app.database import SessionLocal
from app.models.db_models import Category, Drink, Option, OptionType


def seed():
    db = SessionLocal()
    try:
        if db.query(Category).count() > 0:
            print("Database already seeded — skipping.")
            return

        # Categories
        tea = Category(name="手搖茶", display_order=1)
        coffee = Category(name="咖啡", display_order=2)
        juice = Category(name="果汁", display_order=3)
        db.add_all([tea, coffee, juice])
        db.flush()

        # Drinks — tea
        bubble_milk = Drink(
            category_id=tea.id,
            name="珍珠奶茶",
            description="經典珍珠奶茶，Q彈珍珠搭配香濃奶茶",
            base_price=Decimal("65"),
        )
        taro = Drink(
            category_id=tea.id,
            name="芋頭拿鐵",
            description="芋頭與鮮奶的完美結合",
            base_price=Decimal("70"),
        )
        # Drinks — coffee
        latte = Drink(
            category_id=coffee.id,
            name="拿鐵",
            description="義式濃縮配鮮奶，香滑順口",
            base_price=Decimal("80"),
        )
        # Drinks — juice
        mango = Drink(
            category_id=juice.id,
            name="芒果冰沙",
            description="新鮮芒果打製，濃郁果香",
            base_price=Decimal("75"),
        )
        db.add_all([bubble_milk, taro, latte, mango])
        db.flush()

        # Options
        size_opts = [
            Option(drink_id=bubble_milk.id, type=OptionType.size, label="M", price_delta=Decimal("0")),
            Option(drink_id=bubble_milk.id, type=OptionType.size, label="L", price_delta=Decimal("10")),
            Option(drink_id=bubble_milk.id, type=OptionType.sugar, label="全糖", price_delta=Decimal("0")),
            Option(drink_id=bubble_milk.id, type=OptionType.sugar, label="半糖", price_delta=Decimal("0")),
            Option(drink_id=bubble_milk.id, type=OptionType.sugar, label="無糖", price_delta=Decimal("0")),
            Option(drink_id=bubble_milk.id, type=OptionType.ice, label="正常冰", price_delta=Decimal("0")),
            Option(drink_id=bubble_milk.id, type=OptionType.ice, label="少冰", price_delta=Decimal("0")),
            Option(drink_id=bubble_milk.id, type=OptionType.ice, label="去冰", price_delta=Decimal("0")),
            Option(drink_id=bubble_milk.id, type=OptionType.topping, label="珍珠", price_delta=Decimal("10")),
            Option(drink_id=latte.id, type=OptionType.size, label="M", price_delta=Decimal("0")),
            Option(drink_id=latte.id, type=OptionType.size, label="L", price_delta=Decimal("15")),
            Option(drink_id=latte.id, type=OptionType.sugar, label="無糖", price_delta=Decimal("0")),
            Option(drink_id=latte.id, type=OptionType.sugar, label="微糖", price_delta=Decimal("0")),
            Option(drink_id=latte.id, type=OptionType.ice, label="熱", price_delta=Decimal("0")),
            Option(drink_id=latte.id, type=OptionType.ice, label="冰", price_delta=Decimal("0")),
        ]
        db.add_all(size_opts)
        db.commit()
        print("Seeding complete.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
