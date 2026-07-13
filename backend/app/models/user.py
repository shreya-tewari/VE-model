"""User account model. Used for auth, dashboard ownership of saved reports."""
import datetime
import enum

from sqlalchemy import String, DateTime, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class UserRole(str, enum.Enum):
    bdm = "bdm"
    admin = "admin"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.bdm, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.utcnow
    )

    reports: Mapped[list["Report"]] = relationship(back_populates="owner", cascade="all, delete-orphan")
