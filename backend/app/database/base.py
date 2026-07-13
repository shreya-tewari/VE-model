"""
Declarative base shared by all SQLAlchemy models.
Kept in its own module so alembic and models can import it without
triggering circular imports with session.py.
"""
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass
