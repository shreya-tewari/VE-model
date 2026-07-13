import datetime
from pydantic import BaseModel, EmailStr, ConfigDict


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: str = ""
    message: str


class ContactOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    company: str
    message: str
    handled: bool
    created_at: datetime.datetime
