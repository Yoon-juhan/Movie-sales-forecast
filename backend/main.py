from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dto import *
from database import *
from predict import startPredict

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
            "pw" : user.MEMBER_PW[0],
            "nickname" : user.NICKNAME[0],
            "status" : True
        }
    else:
        return {
            "status" : False
        }

@app.post("/join")
async def join(item:JoinRequest):
    print(item.nickname)
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

# 예측 시작
@app.post("/predict")
async def predict(item:PredictRequest):

    result = startPredict(item)

    return {"data":result}

# 예상 매출액과 비슷한 영화 데이터
@app.get("/similar-sales")
async def getSimilarSales (result: int = Query(...)):
    df = selectSimilarSales(result)

    return df.to_dict(orient="records")

# 예측 기록 저장
@app.get("/savePredict")
async def savePredict(
    user_id: str = Query(...),
    movie_name: str = Query(...),
    open_date: str = Query(...),
    nationality: str = Query(...),
    genre: str = Query(...),
    rating: str = Query(...),
    director: str = Query(...),
    actor: str = Query(...),
    distributor: str = Query(...),
    result: int = Query(...),
    audience: int = Query(...)
):

    insertPredict(user_id, [movie_name, open_date, nationality, genre, rating, director, actor, distributor, result, audience])

    return {
        "status":True
    }

# 예측 기록 조회
@app.get("/getHistory")
async def getHistory (user_id: str = Query(...)):
    df = selectHistory(user_id)

    return df.to_dict(orient="records")

# 박스오피스 조회
@app.get("/getBoxoffice")
async def getBoxoffice (year: str = Query(...), sort: str = Query(...)):

    if sort == "순위": sort = "MOVIE_RANK"
    if sort == "개봉일": sort = "OPEN_DATE desc"
    if sort == "점유율": sort = "MARKET_SHARE desc"
    if sort == "관객수": sort = "AUDIENCE desc"
    if sort == "스크린수": sort = "SCREEN desc"
    if sort == "상영횟수": sort = "SCREENING desc"
    if sort == "매출액": sort = "SALES desc"

    df = selectBoxoffice(year, sort)

    return df.to_dict(orient="records")

# 박스오피스 제목 조회
@app.get("/getBoxofficeTitle")
async def getBoxoffice (title: str = Query(...)):

    df = selectBoxofficeTitle(title)

    return df.to_dict(orient="records")

# 비밀번호 변경
@app.get("/changePw")
async def getBoxoffice (id: str = Query(...), password: str = Query(...)):

    password = changePw(id, password)

    return {"password" : password}

# 닉네임 변경
@app.get("/changeNickname")
async def getBoxoffice (id: str = Query(...), nickname: str = Query(...)):

    nickname = changeNickname(id, nickname)

    return {"nickname" : nickname}

# 회원탈퇴
@app.get("/deleteUser")
async def getBoxoffice (id: str = Query(...)):

    deleteUser(id)

    return {"sttus" : True}