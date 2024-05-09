CREATE TABLE member (
	member_id	 VARCHAR2(30) PRIMARY KEY,
	member_pw VARCHAR2(30) NOT NULL,
	nickname VARCHAR2(30) NOT NULL
);

CREATE TABLE history (
    history_id VARCHAR2(100) PRIMARY KEY,
    member_id VARCHAR2(30) CONSTRAINT member_id_fk REFERENCES member(member_id),
    movie_name VARCHAR2(100),
    open_date DATE,
    nationality VARCHAR2(30),
    manufacturer VARCHAR2(100),
    distributor VARCHAR2(100),
    rating VARCHAR2(100),
    genre VARCHAR2(100),
    director VARCHAR2(100),
    actor VARCHAR2(500),
    predicted_value NUMBER
);

CREATE TABLE boxoffice_data (
    movie_id NUMBER PRIMARY KEY,
    movie_rank NUMBER,
    movie_name VARCHAR2(1000),
    open_date VARCHAR2(100),
    market_share NUMBER,
    sales NUMBER,
    audience NUMBER,
    screen NUMBER,
    screening NUMBER,
    nationality VARCHAR2(100),
    manufacturer VARCHAR2(200),
    distributor VARCHAR2(200),
    rating VARCHAR2(100),
    genre VARCHAR2(100),
    director VARCHAR2(1000),
    actor VARCHAR2(4000)
);

CREATE TABLE actors (
    name VARCHAR2(100)
);

CREATE TABLE directors (
    name VARCHAR2(100)
);

CREATE TABLE distributors (
    name VARCHAR2(100)
);

CREATE SEQUENCE history_sequence
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    NOCYCLE
    NOCACHE;
    
CREATE SEQUENCE boxoffice_sequence
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    NOCYCLE
    NOCACHE;


