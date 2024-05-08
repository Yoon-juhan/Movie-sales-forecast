from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dto import *
from database import *

# uvicorn main:app --reload
app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
async def login(item:LoginRequest):

    user = userLogin(item.id, item.pw)

    if not user.empty:
        return {
            "id" : user.MEMBER_ID[0],
            "nickname" : user.NICKNAME[0],
            "status" : True
        }
    else:
        return {
            "status" : False
        }

@app.post("/join")
async def join(item:JoinRequest):
    try:
        userJoin(item.id, item.pw, item.nickname)
        return {
        "status" : True,
        "nickname": item.nickname
        }
    except:
        return {
            "status" : False
        }

@app.get("/get/{name}")
async def getData(name: str):
    
    if name == "actors":
        data = selectActors()
    elif name == "directors":
        data = selectDirectors()
    else:
        data = selectDistributors()

    return {"data":data}