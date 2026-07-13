"""Registration and login."""
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.auth import Token
from app.schemas.user import UserCreate, UserOut
from app.services import auth_service
from app.utils.security import create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=UserOut, status_code=201)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    user = auth_service.create_user(db, payload)
    return user


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # OAuth2PasswordRequestForm uses "username" as the field name; we treat it as email.
    user = auth_service.authenticate_user(db, form_data.username, form_data.password)
    token = create_access_token(subject=user.email)
    return Token(access_token=token)
