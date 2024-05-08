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

# 배우 이름 insert
def insertActors(actors):
    conn = cx.connect(id, pw, url)

    sql = f"""insert into actors(name)
              values(:1)"""
    
    cur = conn.cursor()
    cur.executemany(sql, actors.values.tolist())
    
    cur.close()
    conn.commit()
    conn.close()

    return

# 감독 이름 insert
def insertDirector(directors):
    conn = cx.connect(id, pw, url)

    sql = f"""insert into directors(name)
              values(:1)"""
    
    cur = conn.cursor()
    cur.executemany(sql, directors.values.tolist())
    
    cur.close()
    conn.commit()
    conn.close()

    return

# 배급사 이름 insert
def insertDistributors(distributors):
    conn = cx.connect(id, pw, url)

    sql = f"""insert into distributors(name)
              values(:1)"""
    
    cur = conn.cursor()
    cur.executemany(sql, distributors.values.tolist())
    
    cur.close()
    conn.commit()
    conn.close()

    return

# 배우 이름 select
def selectActors():
    conn = cx.connect(id, pw, url)

    sql = "select * from actors"
    
    cur = conn.cursor()
    cur.execute(sql)

    df = pd.read_sql(sql, con = conn)
   
    cur.close()
    conn.close()
    data = df.values.tolist()
    flatten_data = [item for sublist in data for item in sublist]

    return flatten_data


# 감독 이름 select
def selectDirectors():
    conn = cx.connect(id, pw, url)

    sql = "select * from directors"
    
    cur = conn.cursor()
    cur.execute(sql)

    cur.close()
    conn.commit()
    conn.close()

    return

# 배급사 이름 select
def selectDistributors():
    conn = cx.connect(id, pw, url)

    sql = "select * from distributors"
    
    cur = conn.cursor()
    cur.execute(sql)

    cur.close()
    conn.commit()
    conn.close()

    return