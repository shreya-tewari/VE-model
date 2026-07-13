"""
A saved diagnostic report - the output of either the Client walkthrough
or the BDM qualification flow, persisted so it shows up on the dashboard.
"""
import datetime

from sqlalchemy import String, DateTime, ForeignKey, JSON, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Report(Base):
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(primary_key=True)
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    flow: Mapped[str] = mapped_column(String(32))  # "client" | "bdm"
    prospect_name: Mapped[str] = mapped_column(String(255), default="")

    # raw answers the wizard collected, kept for audit / re-scoring
    answers: Mapped[dict] = mapped_column(JSON, default=dict)

    # computed outcome
    recommended_model: Mapped[str] = mapped_column(String(64))
    package_fit: Mapped[str] = mapped_column(String(64))
    confidence: Mapped[float] = mapped_column(Float)
    effort_low_weeks: Mapped[float] = mapped_column(Float)
    effort_high_weeks: Mapped[float] = mapped_column(Float)
    red_flags: Mapped[list] = mapped_column(JSON, default=list)
    responsibilities: Mapped[dict] = mapped_column(JSON, default=dict)
    summary: Mapped[str] = mapped_column(String(2000), default="")

    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.utcnow
    )

    owner: Mapped["User"] = relationship(back_populates="reports")
