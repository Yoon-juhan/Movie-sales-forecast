import cx_Oracle as cx
import pandas as pd
import datetime
import os

LOCATION = "C:\instantclient_11_2"
os.environ["PATH"] = LOCATION + ";" + os.environ["PATH"]

id = "yoon"
pw = "yoon"
url = "localhost:1521/xe"


def userLogin(user_id, user_pw):
    conn = cx.connect(id, pw, url)

    sql = f"""select * from member
              where member_id = {user_id} and member_pw = {user_pw}
            """
    
    cur = conn.cursor()
    cur.execute(sql)
    
    df = pd.read_sql(sql, con = conn)

    cur.close()
    conn.close()
    print(df)
    return df


# 회원 가입
def userJoin(user_id, user_pw, nickname):
    conn = cx.connect(id, pw, url)

    sql = f"""insert into member(member_id, member_pw, nickname)
              values({user_id}, {user_pw}, {nickname})"""

    cur = conn.cursor()
    cur.execute(sql)
    
    print("INSERT 성공")

    cur.close()
    conn.commit()
    conn.close()

# 전체 기사 조회
def selectAll():
    conn = cx.connect(id, pw, url)

    sql = """select * from news
             order by to_number(news_id) desc"""
    
    cur = conn.cursor()
    cur.execute(sql)

    df = pd.read_sql(sql, con = conn)
    df["CONTENT"] = df["CONTENT"].astype("string")      # CLOB 데이터 타입을 string로 변경해야 df로 가져올 수 있음

    cur.close()
    conn.close()

    return df

# 오늘 날짜 기사 조회
def selectToDay():
    conn = cx.connect(id, pw, url)

    now = datetime.datetime.now()
    now = str(now.year) + str(now.month).zfill(2) + str(now.day).zfill(2)

    sql = f"""select * from news
              where news_id like '{now}%'
              order by to_number(news_id)"""
    
    cur = conn.cursor()
    cur.execute(sql)

    df = pd.read_sql(sql, con = conn)
    df["CONTENT"] = df["CONTENT"].astype("string")      # CLOB 데이터 타입을 string로 변경해야 df로 가져올 수 있음

    cur.close()
    conn.close()

    return df

# 현재 시간 기사 조회
def selectHour():
    conn = cx.connect(id, pw, url)

    now = datetime.datetime.now()
    now = str(now.year) + str(now.month).zfill(2) + str(now.day).zfill(2) + str(now.hour).zfill(2)

    sql = f"""select news_id, content from news
              where news_id like '{now}%'
              order by to_number(news_id)"""
    
    cur = conn.cursor()
    cur.execute(sql)

    df = pd.read_sql(sql, con = conn)
    df["CONTENT"] = df["CONTENT"].astype("string")      # CLOB 데이터 타입을 string로 변경해야 df로 가져올 수 있음

    cur.close()
    conn.close()

    return df