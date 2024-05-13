import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';

function Predict() {

    var result = sessionStorage.getItem("result");
    var movie_name = sessionStorage.getItem("movie_name");
    var open_date = sessionStorage.getItem("open_date");
    var nationality = sessionStorage.getItem("nationality");
    var genre = sessionStorage.getItem("genre");
    var director = sessionStorage.getItem("director");
    var actor = sessionStorage.getItem("actor");
    var distributor = sessionStorage.getItem("distributor");

    let formatted_result = parseInt(result).toLocaleString();

    return (

        <div className="Predict">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container className="navbar">
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
                    <h2>영화 [{movie_name}]의 예상 매출액</h2>
                    <h2 align='center'>{formatted_result}원</h2>
                    <hr />
                    <h3>{movie_name}</h3>
                    <h3>{open_date}</h3>
                    <h3>{nationality}</h3>
                    <h3>{genre}</h3>
                    <h3>{director}</h3>
                    <h3>{actor}</h3>
                    <h3>{distributor}</h3>

                </div>

            </header>
        </div>
    );
}

export default Predict;
