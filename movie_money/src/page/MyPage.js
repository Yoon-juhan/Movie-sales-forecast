import React from 'react'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

import axios from "axios";

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function MyPage() {
    let navi = useNavigate()

    const id = sessionStorage.getItem("id");
    const pw = sessionStorage.getItem("pw");
    const nick = sessionStorage.getItem("nickname");

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

    // 비밀번호 변경
    async function changePw(id, password) {
        let url = `${process.env.REACT_APP_SERVER_URL}/changePw`
        await axios.get(url, {
            params : {id, password}
        })
            .then((res) => {
                setPassword(res.data.password);
                Swal.fire("변경완료", "", "success")
            })
    }

    // 닉네임 변경
    async function changeNickname(id, nickname) {
        let url = `${process.env.REACT_APP_SERVER_URL}/changeNickname`
        await axios.get(url, {
            params : {id, nickname}
        })
            .then((res) => {
                setNickname(res.data.nickname);
                Swal.fire("변경완료", "", "success")
            })
    }

    //로그아웃
    const logout = () => {
        sessionStorage.clear();
        navi("/")
    }

    // 회원탈퇴
    async function deleteUser(id) {
        let url = `${process.env.REACT_APP_SERVER_URL}/deleteUser`
        await axios.get(url, {
            params : {id}
        })
            .then((res) => {
                sessionStorage.clear();
                Swal.fire("탈퇴완료", "", "success")
                navi("/")
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



     const [show, setShow] = useState(false);
     const [password, setPassword] = useState(pw);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const [show2, setShow2] = useState(false);
     const [nickname, setNickname] = useState(nick);
     const handleClose2 = () => setShow2(false);
     const handleShow2 = () => setShow2(true);

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
                            <td><input type="password" id='myPageInput' value={password} readOnly/></td>
                            <td>
                                <Button variant='secondary' onClick={handleShow}><b>변경</b></Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton >
                                    <Modal.Title>비밀번호 변경</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='modalStyle'>
                                        <input type="password" className='modalInput' onChange={e => setPassword(e.target.value)}/>
                                        &nbsp;&nbsp;
                                        <Button variant="dark" onClick={()=>changePw(id, password)}>
                                            변경
                                        </Button>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="dark" onClick={handleClose}>
                                        닫기
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                            </td>
                        </tr>
                        <tr>
                            <td>닉네임</td>
                            <td><input type="text" id='myPageInput' value={nickname} readOnly/></td>
                            <td>
                                <Button variant='secondary' onClick={handleShow2}><b>변경</b></Button>
                                    <Modal show={show2} onHide={handleClose2}>
                                        <Modal.Header closeButton >
                                        <Modal.Title>닉네임 변경</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className='modalStyle'>
                                            <input type="text" className='modalInput' onChange={e => setNickname(e.target.value)}/>
                                            &nbsp;&nbsp;
                                            <Button variant="dark" onClick={()=>changeNickname(id, nickname)}>
                                                변경
                                            </Button>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="dark" onClick={handleClose2}>
                                            닫기
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                            </td>
                        </tr>
                        <tr>
                            <td><Button variant='success' onClick={logout}><b>로그아웃</b></Button></td>
                            <td><Button variant='danger' onClick={()=>deleteUser(id)}><b>회원탈퇴</b></Button></td>
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
                                <th>관객수</th>
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
                                    <td>{movie.AUDIENCE}명</td>
                                    </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            {pageNumbers.map(number => (
                                <Pagination.Item className='pagination' key={number} active={number === currentPage} onClick={() => paginate(number)}>
                                    {number}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default MyPage;
