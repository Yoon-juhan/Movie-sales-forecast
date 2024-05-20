import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
from sklearn.preprocessing import LabelEncoder
import holidays
from lightgbm import LGBMRegressor
from sklearn.model_selection import KFold

def startPredict(data):

    df = pd.DataFrame({
        "영화명" : [data.movie_name],
        "개봉일" : [pd.to_datetime(data.open_date)],
        "대표국적" : [data.nationality],
        "장르" : [",".join(data.genre)],
        "등급" : [data.rating],
        "배우" : [",".join(data.actor)],
        "감독" : [data.director],
        "배급사" : [data.distributor]
    })

    for i in range(1, 4):
        df[f'배우{i}'] = df['배우'].str.split(',').str[i - 1]
    df.drop(['배우'], axis=1, inplace=True)

    genre = ["SF","가족","공연","공포(호러)","기타","다큐멘터리","드라마","멜로/로맨스","뮤지컬","미스터리","범죄","사극","서부극(웨스턴)","성인물(에로)","스릴러","애니메이션","액션","어드벤처","전쟁","코미디","판타지"]
    for i in genre:
        df[i] = df['장르'].apply(lambda x: i in x).astype(int)

    df.drop(['장르'], axis=1, inplace=True)

    df['감독'] = df['감독'].str.split(',').str[0]

    df['배급사'] = df['배급사'].str.split(',').str[0]

    df['개봉일'] = pd.to_datetime(df['개봉일'])
    df['년'] = df['개봉일'].dt.year
    df['월'] = df['개봉일'].dt.month
    df['일'] = df['개봉일'].dt.day
    df['요일'] = df['개봉일'].dt.dayofweek    # 0 = 월요일 ~

    kr_holidays = holidays.KR() 
    df['휴일'] = df['개봉일'].apply(lambda x: 1 if (x.weekday() in [5, 6] or x in kr_holidays) else 0)

    df['코로나'] = df['개봉일'].apply(lambda x: 1 if (x.year in [2020, 2021]) else 0)
    
    df.drop(['개봉일'], axis=1, inplace=True)

    if df['등급'][0] == "전체관람가": df['등급'] = 0
    elif df['등급'][0] == "12세 이상 관람가": df['등급'] = 12
    elif df['등급'][0] == "15세 이상 관람가": df['등급'] = 15
    else: df['등급'][0] = 18

    categories = ['영화명', '대표국적', '배급사', '감독']

    # 라벨 인코딩 데이터
    label = pd.read_csv("labelData.csv")

    unique_values = {}
    for cat in categories:
        unique_values[cat] = label[cat].unique()

    # 새로운 데이터에 대해 라벨 인코딩 수행
    for cat in categories:
        for value in df[cat].unique():
            # 학습 데이터에서 찾지 못한 새로운 값인 경우에만 라벨 추가
            if value not in unique_values[cat]:
                unique_values[cat] = np.append(unique_values[cat], value)

    # 라벨 인코딩 적용
    for cat in categories:
        le = LabelEncoder()
        df[cat] = df[cat].fillna("missing")
        le.fit(unique_values[cat])
        df[cat] = le.transform(df[cat])

    # 배우 따로 변환
    label_actors = pd.read_csv("label_actors.csv")

    for col in ['배우1', '배우2', '배우3']:
        df[col] = df[col].fillna("missing")
        df[col] = df[col].replace(label_actors.set_index('배우').to_dict()['index'])

    columns_order = ['영화명', '대표국적', '배급사', '등급', '감독', '배우1', '배우2', '배우3', 'SF', '가족', '공연', '공포(호러)', '기타', '다큐멘터리', '드라마', '멜로/로맨스', '뮤지컬', '미스터리', '범죄', '사극', '서부극(웨스턴)', '성인물(에로)', '스릴러', '애니메이션', '액션', '어드벤처', '전쟁', '코미디', '판타지', '년', '월', '일', '요일', '휴일', '코로나']
    df = df.reindex(columns=columns_order)

    models = loadModel()
    result = []
    for model in models:
        y_pred = model.predict(df.values.reshape(1, -1))
        print(y_pred)
        result.append(y_pred)

    print("예상 매출액 : ", int(np.mean(result)))

    return int(np.mean(result))

# 모델 불러오기
def loadModel():
    models = []

    for i in range(10):
        model = joblib.load(f'lgbm_models/lgbm_model{i}.pkl')
        models.append(model)

    return models