from pydantic import BaseModel
from typing import Any

class LoginRequest(BaseModel):
    id:Any
    pw:Any

class JoinRequest(BaseModel):
    id:Any
    pw:Any
    nickname:Any

class PredictRequest(BaseModel):
    movie_name:str
    open_date:str
    nationality:str
    genre:list
    rating:str
    director:str
    actor:list
    distributor:str