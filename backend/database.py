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
              where member_id = '{user_id}' and member_pw = '{user_pw}'
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
              values('{user_id}', '{user_pw}', '{nickname}')"""
    
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

# 예상 매출액과 비슷한 영화 데이터 select (+- 10% 범위)
def selectSimilarSales(data):
    conn = cx.connect(id, pw, url)

    a = int(data * 0.9)
    b = int(data * 1.1)

    sql = f"""SELECT *
                FROM (
                    SELECT *
                    FROM (
                        SELECT b.*,
                        ROW_NUMBER() OVER (PARTITION BY movie_name, open_date ORDER BY sales DESC) AS rnk
                        FROM boxoffice_data b
                        WHERE sales BETWEEN {a} AND {b}
                    )
                WHERE rnk = 1
                ORDER BY sales DESC         
                )
            WHERE ROWNUM <= 5"""
    
    cur = conn.cursor()
    cur.execute(sql)

    df = pd.read_sql(sql, con = conn)

    cur.close()
    conn.close()

    return df

# 예측 기록 저장
def insertPredict(user_id, data):
    conn = cx.connect(id, pw, url)

    now = datetime.datetime.now()
    now = str(now.year) + str(now.month).zfill(2) + str(now.day).zfill(2) + str(now.hour).zfill(2)

    sql = f"""insert into history(history_id, member_id, movie_name, open_date, nationality, genre, rating, director, actor, distributor, predicted_value, audience)
              values({now} || history_sequence.nextval, '{user_id}', '{data[0]}', '{data[1]}', '{data[2]}', '{data[3]}', '{data[4]}', '{data[5]}', '{data[6]}', '{data[7]}', {data[8]}, {data[9]})"""
    
    cur = conn.cursor()
    cur.execute(sql)

    cur.close()
    conn.commit()
    conn.close()

    return

# 내 기록 조회
def selectHistory(user_id):
    conn = cx.connect(id, pw, url)

    sql = f"""select * from history
              where member_id = '{user_id}'
              order by to_number(history_id) desc"""
    
    cur = conn.cursor()
    cur.execute(sql)
    
    df = pd.read_sql(sql, con = conn)

    cur.close()
    conn.close()

    return df

# 박스오피스 데이터 조회
def selectBoxoffice(year, sort):
    conn = cx.connect(id, pw, url)

    sql = f"""select * from boxoffice_data
                where open_date like '{year}%'
                order by {sort}"""
    
    cur = conn.cursor()
    cur.execute(sql)
    
    df = pd.read_sql(sql, con = conn)

    cur.close()
    conn.close()

    return df

# 박스오피스 제목 조회
def selectBoxofficeTitle(title):
    conn = cx.connect(id, pw, url)

    sql = f"""select * from boxoffice_data
              where movie_name like '%{title}%'"""
    
    cur = conn.cursor()
    cur.execute(sql)
    
    df = pd.read_sql(sql, con = conn)

    cur.close()
    conn.close()

    return df

# 비밀번호 변경
def changePw(user_id, password):
    conn = cx.connect(id, pw, url)

    sql = f"""update member
              set member_pw = '{password}'
              where member_id = '{user_id}'"""
    
    cur = conn.cursor()
    cur.execute(sql)

    cur.close()
    conn.commit()
    conn.close()

    return password

# 닉네임 변경
def changeNickname(user_id, nickname):
    conn = cx.connect(id, pw, url)

    sql = f"""update member
              set nickname = '{nickname}'
              where member_id = '{user_id}'"""
    
    cur = conn.cursor()
    cur.execute(sql)

    cur.close()
    conn.commit()
    conn.close()

    return nickname

# 회원 탈퇴
def deleteUser(user_id):
    conn = cx.connect(id, pw, url)

    sql = f"""delete from member
              where member_id = '{user_id}'"""
    
    cur = conn.cursor()
    cur.execute(sql)

    cur.close()
    conn.commit()
    conn.close()

    return
