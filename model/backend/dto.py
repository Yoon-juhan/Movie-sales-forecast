from pydantic import BaseModel
from typing import Any

class LoginRequest(BaseModel):
    id:Any
    pw:Any

class JoinRequest(BaseModel):
    id:Any
    pw:Any
    nickname:Any