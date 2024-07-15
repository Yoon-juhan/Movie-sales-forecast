![image](https://github.com/user-attachments/assets/63cba388-eaf8-4759-8434-e6975e7e2326)![image](https://github.com/user-attachments/assets/b64fa641-de7f-45f2-a2fc-e619af9d84de)# 🎬 영화 매출액 예측 프로젝트

## 프로젝트 개요

- 영화 개봉 전 발생 가능한 데이터를 입력 받아 학습된 모델을 통해 매출액을 예상 하는 머신러닝 프로젝트
- 프로젝트명 : Movie Money
- 개발 기간 : 2024.04 ~ 2024.05
- 기술 스택 : Python, FastAPI, React, Oracle
- 데이터셋 : 영화진흥위원회 kofic의 2004년 ~ 2024년 3월까지 총 20년간의 박스오피스 데이터 사용

## 주요 개발 내용

### 데이터 전처리
- 영화 개봉 후 발생하는 데이터 제거
- 대표국적 : 가장 많은 한국, 미국, 일본, 프랑스, 영국 외 국적은 기타로 처리
- 관람등급, 감독, 배급사 : 대푯값 하나만 남김
- 배우 : 대표 배우 3명만 남김
- 휴일 여부 : 개봉일 데이터로 개봉일이 공휴일 또는 주말인지 체크
- 개봉일 : 년, 월, 일, 요일로 분리 후 기존 개봉일 열 제거
- 코로나 : 코로나로 인한 거리두기 시기 체크
- 장르 : 원-핫 인코딩으로 더미변수 생성 후 기존 장르 열 제거
- LabelEncoder로 영화명, 대표국적, 배급사, 감독, 배우 열을 범주형 데이터에서 수치형 데이터로 변환
  
(Before) ![image](https://github.com/user-attachments/assets/266d213d-ca2b-4e02-bb68-12dc6f842d8e)

(After) ![image](https://github.com/user-attachments/assets/cf00578c-5de5-4fa2-97f1-21d858ecda1e)

### 모델 선택 및 학습
- 대용량 데이터 셋을 빠르게 처리하고 높은 예측 성능을 보이는 그래디언트 부스팅 회귀 모델 LGBMRegressor를 선택
- 효율적인 데이터 사용을 위해 K-fold 교차 검증으로 여러 모델을 학습하여 성능을 평가
- 교차검증 10회 수행하면서 모델, 결정계수, mae값 저장 후 평가

### 모델 평가
- 평균 결정계수 : 약 0.83
- 평균 MAE : 약 8억 9천
- 결정 계수 0.83과 MAE 8억 9천은 목표 변수(매출액)의 범위가 0~1400억 인 점을 고려했을 때, 상대적으로 괜찮은 설명력과 오차라고 판단

### 실제 값과 예측 값 차이
![image](https://github.com/user-attachments/assets/b05a0eb5-2d1f-46c9-8773-4726be1fe163)

### 모델 저장
- 학습된 10개의 모델을 joblib 라이브러리를 사용해 pkl 파일로 저장

![image](https://github.com/user-attachments/assets/0416a349-f847-44a7-aa02-5929c94d7f74)

### React 웹 개발
- 사용자에게 영화 정보를 입력받고 결과를 편리하게 제공해 주기 위해 웹 개발
- 사용자 입력 정보를 useState 훅으로 관리
- Axios 라이브러리로 FastAPI 서버와 통신
- css 작업을 원활하게 하기 위해 React Bootstrap 라이브러리 사용

### FastAPI 서버 개발
- 머신러닝 모델과 쉽게 통합하고 간편하게 API를 구축하기 위해 Python 웹 프레임워크 FastAPI로 서버 개발
- Python으로 오라클 데이터베이스에 접근하는 cx_Oracle을 사용함에 따라 파이썬 코드의 일관성 유지

## 웹 UI
### 입력 화면
![image](https://github.com/user-attachments/assets/f3eceaed-968b-4619-8f5b-7a8a854e3d32)

### 예측 결과 화면
![image](https://github.com/user-attachments/assets/d09ff25b-a69b-436b-8b47-9068cf409099)

### 박스오피스 데이터 조회 화면
![image](https://github.com/user-attachments/assets/04243829-61bb-48f4-9442-970af649ce84)

## 포스터 보고서
- 프로젝트 소개, 사용 기술, 결과, 결론까지의 전체 과정을 한눈에 보기 쉽게 정리한 포스터 보고서

![image](https://github.com/user-attachments/assets/4d64cb2d-bc9e-47a6-80f8-0852a3db0366)

## 개발 후기
### 웹과 모델의 연결
- 웹에서 입력한 값을 기반으로 모델이 예측한 결과를 웹에 제공해 주는 과정을 Axios와 FastAPI를 통해 진행한 프로젝트였습니다.
- 이 프로젝트를 통해 백엔드와 프론트엔드 간의 통신을 모두 경험할 수 있었습니다.

### API 설계 및 사용
- Restful API를 설계하고 구현하는 과정을 통해 API 개발 역량을 키웠습니다.

### 예측 모델 구축 경험
- 이 프로젝트를 통해 다양한 데이터 처리 기법과 머신러닝 알고리즘을 사용한 모델 구축 경험을 쌓을 수 있었고, 예측 모델의 가능성을 이해하게 되었습니다.
