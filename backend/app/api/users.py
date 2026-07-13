"""Current user profile."""
from fastapi import APIRouter, Depends

from app.dependencies import get_current_active_user
from app.models.user import User
from app.schemas.user import UserOut

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me", response_model=UserOut)
def read_current_user(current_user: User = Depends(get_current_active_user)):
    return current_user
