from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True


class UserUpdateRequest(BaseModel):
    username: str | None = None
    email: EmailStr | None = None
    password: str | None = None
