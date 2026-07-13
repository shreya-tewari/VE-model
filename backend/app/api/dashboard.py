"""
Aggregated stats for the BDM dashboard page: totals, model distribution,
recent reports and open contact submissions.
"""
from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies import get_current_active_user
from app.models.contact import ContactMessage
from app.models.report import Report
from app.models.user import User

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    reports = (
        db.query(Report)
        .filter(Report.owner_id == current_user.id)
        .order_by(Report.created_at.desc())
        .all()
    )
    model_counts = Counter(r.recommended_model for r in reports)
    avg_confidence = round(sum(r.confidence for r in reports) / len(reports), 2) if reports else 0.0

    open_contacts = (
        db.query(ContactMessage).filter(ContactMessage.handled.is_(False)).count()
    )

    return {
        "total_reports": len(reports),
        "client_flow_reports": sum(1 for r in reports if r.flow == "client"),
        "bdm_flow_reports": sum(1 for r in reports if r.flow == "bdm"),
        "average_confidence": avg_confidence,
        "model_distribution": dict(model_counts),
        "open_contact_submissions": open_contacts,
        "recent_reports": [
            {
                "id": r.id,
                "prospect_name": r.prospect_name,
                "recommended_model": r.recommended_model,
                "confidence": r.confidence,
                "created_at": r.created_at.isoformat(),
            }
            for r in reports[:5]
        ],
    }
