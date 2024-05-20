import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';

function Predict() {
    
    var user_id = sessionStorage.getItem("id")
    var result = sessionStorage.getItem("result");
    var movie_name = sessionStorage.getItem("movie_name");
    var open_date = sessionStorage.getItem("open_date");
    var nationality = sessionStorage.getItem("nationality");
    var genre = sessionStorage.getItem("genre");
    var rating = sessionStorage.getItem("rating")
    var director = sessionStorage.getItem("director");
    var actor = sessionStorage.getItem("actor");
    var distributor = sessionStorage.getItem("distributor");

    const [similar, setSimilar] = useState([]);

    console.log(result);
    console.log(movie_name);
    console.log(open_date);
    console.log(nationality);
    console.log(genre);
    console.log(rating);
    console.log(director);
    console.log(actor);
    console.log(distributor);

    // 예측 결과와 비슷한 영화 가져오기
    async function getSimilarSales() {
        let url = `${process.env.REACT_APP_SERVER_URL}/similar-sales`
        await axios.get(url, {
            params : {result}
        })
            .then((res) => {
                console.log(res.data);
                setSimilar(res.data);
            })
    }

    // 예측 기록 저장
    async function savePredict() {
        let url = `${process.env.REACT_APP_SERVER_URL}/savePredict`
        await axios.get(url, {
            params : {user_id, movie_name, open_date, nationality, genre, rating, director, actor, distributor, result}
        })
            .then((res) => {
                console.log(res.data);
            })
    }

    useEffect(() => {
        getSimilarSales();
    }, [])

    let formatted_result = parseInt(result).toLocaleString();

    const search = (name) => {
        window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${name}`, '_blank');
    }

    return (

        <div className="Predict">
            <Navbar bg="dark" data-bs-theme="dark" className="navbar"> 
                <Container className="navbarC">
                    <Navbar.Brand href="/home" className='nav_logo'>Movie Money</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">매출액 예측</Nav.Link>
                        <Nav.Link href="/boxoffice">박스오피스 데이터 조회</Nav.Link>
                        <Nav.Link href="/myPage">마이페이지</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <header className="Home-header">

                <div className="login_box">
                    <h1 align='center'><b>🎬영화 [{movie_name}]의 예상 매출액</b></h1>
                    <h2 align='center'><b>🎉 {formatted_result} 원 🎉</b></h2>
                    <br />
                    <p align='end'><Button className='saveBtn' onClick={savePredict}><b>저장</b></Button></p>
                    <Table striped bordered hover variant="dark" className='table'>
                        <thead align='center'>
                            <tr>
                                <th>영화명</th>
                                <th>개봉일</th>
                                <th>국적</th>
                                <th>장르</th>
                                <th>등급</th>
                                <th>감독</th>
                                <th>배우</th>
                                <th>배급사</th>
                                <th>매출액</th>
                            </tr>
                        </thead>
                        <tbody>                        
                            <tr>
                                <td>{movie_name}</td>
                                <td>{open_date}</td>
                                <td>{nationality}</td>
                                <td>{genre}</td>
                                <td>{rating}</td>
                                <td>{director}</td>
                                <td>{actor}</td>
                                <td>{distributor}</td>
                                <td>{formatted_result}원</td>
                            </tr>
                        </tbody>
                       
                    </Table>
                    <hr />
                    <br />
                    <h3 align='center'>예상 매출액과 매출액이 유사한 영화 목록</h3>
                    <br />
                    <p align='end'>[ 박스오피스 데이터 ] <sub>2004년 ~ 2024 3월</sub></p>
                    <Table className="table" striped bordered hover variant="dark">
                        <thead align='center'>
                            <tr>
                                <th>영화명</th>
                                <th>개봉일</th>
                                <th>국적</th>
                                <th>장르</th>
                                <th>등급</th>
                                <th>감독</th>
                                <th>배우</th>
                                <th>배급사</th>
                                <th>매출액</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        similar.map((movie, index) => (
                            <tr onClick={() => search("영화 " + movie.MOVIE_NAME)}>
                                <td>{movie.MOVIE_NAME}</td>
                                <td>{movie.OPEN_DATE}</td>
                                <td>{movie.NATIONALITY}</td>
                                <td>{movie.GENRE.split(',').slice(0,3).join(',')}</td>
                                <td>{movie.RATING}</td>
                                <td>{movie.DIRECTOR}</td>
                                <td>{movie.ACTOR.split(',').slice(0,3).join(',')}</td>
                                <td>{movie.DISTRIBUTOR}</td>
                                <td>{parseInt(movie.SALES).toLocaleString()}원</td>
                                </tr>
                        ))
                        }
                        </tbody>
                    </Table>
                </div>

            </header>
        </div>
    );
}

export default Predict;
