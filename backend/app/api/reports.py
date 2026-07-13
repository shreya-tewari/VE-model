"""
Runs the diagnostic engine against submitted quiz answers.

POST /api/reports/score   -> scores answers and saves a report for the
                              logged-in user (used by both the Client
                              walkthrough and BDM qualification flows)
GET  /api/reports         -> list the current user's saved reports
GET  /api/reports/{id}    -> fetch one saved report
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies import get_current_active_user
from app.models.report import Report
from app.models.user import User
from app.schemas.report import ReportCreate, ReportOut
from app.services.scoring_service import score_answers

router = APIRouter(prefix="/api/reports", tags=["reports"])


@router.post("/score", response_model=ReportOut, status_code=status.HTTP_201_CREATED)
def score_and_save(
    payload: ReportCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    result = score_answers(payload.answers)

    report = Report(
        owner_id=current_user.id,
        flow=payload.answers.flow,
        prospect_name=payload.answers.prospect_name,
        answers=payload.answers.model_dump(),
        recommended_model=result.recommended_model,
        package_fit=result.package_fit,
        confidence=result.confidence,
        effort_low_weeks=result.effort_low_weeks,
        effort_high_weeks=result.effort_high_weeks,
        red_flags=result.red_flags,
        responsibilities=result.responsibilities,
        summary=result.summary,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return report


@router.get("", response_model=list[ReportOut])
def list_reports(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return (
        db.query(Report)
        .filter(Report.owner_id == current_user.id)
        .order_by(Report.created_at.desc())
        .all()
    )


@router.get("/{report_id}", response_model=ReportOut)
def get_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    report = (
        db.query(Report)
        .filter(Report.id == report_id, Report.owner_id == current_user.id)
        .first()
    )
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found.")
    return report
