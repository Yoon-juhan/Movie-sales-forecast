import React from 'react'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination'

import axios from "axios";

import { useState, useEffect } from 'react';

function MyPage() {

    const id = sessionStorage.getItem("id");
    const pw = sessionStorage.getItem("pw");
    const nickname = sessionStorage.getItem("nickname");

    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 예측 기록 조회
    async function getHistory() {
        let url = `${process.env.REACT_APP_SERVER_URL}/getHistory`
        await axios.get(url, {
            params : {user_id:id}
        })
            .then((res) => {
                console.log(res.data);
                setHistory(res.data);
            })
    }
    
    useEffect(() => {
        getHistory();
    }, [])

     // 아이템 범위
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
 
     // 페이지 변경
     const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
     // 페이지 번호 생성
     const pageNumbers = [];
     for (let i = 1; i <= Math.ceil(history.length / itemsPerPage); i++) {
         pageNumbers.push(i);
     }

    return (

        <div className="MyPage">
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
                    <table>
                        <tr>
                            <td>아이디</td>
                            <td><input type="text" id='myPageInput' value={id} readOnly/></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" id='myPageInput' value={pw} readOnly/></td>
                        </tr>
                        <tr>
                            <td>닉네임</td>
                            <td><input type="text" id='myPageInput' value={nickname} readOnly/></td>
                        </tr>
                    </table>
                    <hr />
                    <h3 align='center'>매출액 예측 기록</h3>
                    <br />
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
                        {
                            currentItems.map((movie, index) => (
                                <tr key={index}>
                                    <td>{movie.MOVIE_NAME}</td>
                                    <td>{movie.OPEN_DATE}</td>
                                    <td>{movie.NATIONALITY}</td>
                                    <td>{movie.GENRE.split(',').slice(0,3).join(',')}</td>
                                    <td>{movie.RATING}</td>
                                    <td>{movie.DIRECTOR}</td>
                                    <td>{movie.ACTOR.split(',').slice(0,3).join(',')}</td>
                                    <td>{movie.DISTRIBUTOR}</td>
                                    <td>{parseInt(movie.PREDICTED_VALUE).toLocaleString()}원</td>
                                    </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                    <Pagination>
                        {pageNumbers.map(number => (
                            <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                                {number}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </header>
        </div>
    );
}

export default MyPage;
