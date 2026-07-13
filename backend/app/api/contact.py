"""Public contact form endpoint (from the site's contact page)."""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.contact import ContactMessage
from app.schemas.contact import ContactCreate, ContactOut
from app.services.email_service import send_contact_notification

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=ContactOut, status_code=status.HTTP_201_CREATED)
def submit_contact_form(payload: ContactCreate, db: Session = Depends(get_db)):
    entry = ContactMessage(**payload.model_dump())
    db.add(entry)
    db.commit()
    db.refresh(entry)

    send_contact_notification(
        name=entry.name, email=entry.email, company=entry.company, message=entry.message
    )
    return entry
