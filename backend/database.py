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

# 박스오피스 데이터 insert
def insertBoxoffice(boxoffice):
    conn = cx.connect(id, pw, url)
    # ['순위', '영화명', '개봉일', '점유율', '누적매출액', '누적관객수', '스크린수', '상영횟수', '대표국적', '제작사', '배급사', '등급', '장르', '감독', '배우']
    sql = f"""insert into boxoffice_data(movie_id, movie_rank, movie_name, open_date, market_share, sales, audience, screen, screening, nationality, manufacturer, distributor, rating, genre, director, actor)
              values(boxoffice_sequence.nextval, :1, :2, :3, :4, :5, :6, :7, :8, :9, :10, :11, :12, :13, :14, :15)"""
    
    print(sql)
    cur = conn.cursor()
    cur.executemany(sql, boxoffice.values.tolist())
    
    cur.close()
    conn.commit()
    conn.close()

    return

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
def insertDirectors(directors):
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
    data = df.values.tolist()
    flatten_data = [item for sublist in data for item in sublist]

    cur.close()
    conn.close()

    return flatten_data


# 감독 이름 select
def selectDirectors():
    conn = cx.connect(id, pw, url)

    sql = "select * from directors"
    
    cur = conn.cursor()
    cur.execute(sql)

    df = pd.read_sql(sql, con = conn)
    data = df.values.tolist()
    flatten_data = [item for sublist in data for item in sublist]

    cur.close()
    conn.close()

    return flatten_data

# 배급사 이름 select
def selectDistributors():
    conn = cx.connect(id, pw, url)

    sql = "select * from distributors"
    
    cur = conn.cursor()
    cur.execute(sql)

    df = pd.read_sql(sql, con = conn)
    data = df.values.tolist()
    flatten_data = [item for sublist in data for item in sublist]

    cur.close()
    conn.close()

    return flatten_data