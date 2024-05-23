import React from 'react'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import axios from "axios";

import { useState, useEffect } from 'react';

function Boxoffice() {

    const [boxoffice, setBoxoffice] = useState([]);
    const [year, setYear] = useState("2024");
    const [sort, setSort] = useState("순위")
    const [title, setTitle] = useState("")

    // 박스오피스 조회
    async function getBoxoffice(year, sort) {
        let url = `${process.env.REACT_APP_SERVER_URL}/getBoxoffice`
        await axios.get(url, {
            params : {year, sort}
        })
            .then((res) => {
                console.log(res.data);
                setBoxoffice(res.data);
            })
    }

    // 영화명 검색
    async function getBoxofficeTitle(title) {
        let url = `${process.env.REACT_APP_SERVER_URL}/getBoxofficeTitle`
        await axios.get(url, {
            params : {title}
        })
            .then((res) => {
                console.log(res.data);
                setBoxoffice(res.data);
            })
    }

    useEffect(() => {
        getBoxoffice(year, sort);
    }, [])

    // 연도 선택 핸들러
    const handleYearChange = (e) => {
        const selectedYear = e.target.text;
        setYear(selectedYear);
        getBoxoffice(selectedYear, sort);
    };

    // 정렬 선택 핸들러
    const handleSortChange = (e) => {
        const selectedSort = e.target.text;
        setSort(selectedSort);
        getBoxoffice(year, selectedSort);
    };

    // 영화명 검색 핸들러
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
        console.log(e.target.value)
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
            <h2 align='center' className='boxoffice_title'>박스오피스 데이터 조회 🔍</h2>
            <br />
            <header className="Home-header">

                <div className="login_box boxoffice_box">
                    <table align='center'>
                        <tr>
                            <td><label>연도 선택</label></td>
                            <td>
                                <Dropdown>

                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='dropdownStyle'>
                                        {year}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='dropdownScroll'>
                                        {Array.from({ length: 21 }, (_, i) => 2004 + i).map(year => (
                                            <Dropdown.Item onClick={handleYearChange}>{year}</Dropdown.Item >
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <td><label>정렬 기준 선택</label></td>
                            <td>
                                <Dropdown>

                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='dropdownStyle'>
                                        {sort}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleSortChange}>순위</Dropdown.Item >
                                        <Dropdown.Item onClick={handleSortChange}>개봉일</Dropdown.Item >
                                        <Dropdown.Item onClick={handleSortChange}>점유율</Dropdown.Item >
                                        <Dropdown.Item onClick={handleSortChange}>관객수</Dropdown.Item >
                                        <Dropdown.Item onClick={handleSortChange}>스크린수</Dropdown.Item >
                                        <Dropdown.Item onClick={handleSortChange}>상영횟수</Dropdown.Item >
                                        <Dropdown.Item onClick={handleSortChange}>매출액</Dropdown.Item >
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <td>영화명 검색</td>
                            <td><input type="text" onChange={handleTitleChange}/></td>
                            <td>&nbsp;&nbsp;
                                <Button variant="danger" onClick={()=>getBoxofficeTitle(title)}>
                                    검색 
                                </Button>
                            </td>
                        </tr>
                    </table>




                    
                    

                    <hr />
                    <br />
                    <Table striped bordered hover variant="dark" className='table'>
                        <thead align='center'>
                            <tr>
                                <th>순위</th>
                                <th>영화명</th>
                                <th>개봉일</th>
                                <th>점유율</th>
                                <th>관객수</th>
                                <th>스크린수</th>
                                <th>상영횟수</th>
                                <th>국적</th>
                                <th>장르</th>
                                <th>등급</th>
                                <th>감독</th>
                                <th>배우</th>
                                <th>제작사</th>
                                <th>배급사</th>
                                <th>매출액</th>
                            </tr>
                        </thead>
                        <tbody>                        
                        {
                            boxoffice.map((movie, index) => (
                                <tr key={index}>
                                    <td>{movie.MOVIE_RANK}</td>
                                    <td>{movie.MOVIE_NAME}</td>
                                    <td>{movie.OPEN_DATE}</td>
                                    <td>{parseFloat(movie.MARKET_SHARE).toFixed(3)}</td>
                                    <td>{movie.AUDIENCE}</td>
                                    <td>{movie.SCREEN}</td>
                                    <td>{movie.SCREENING}</td>
                                    <td>{movie.NATIONALITY}</td>
                                    <td>{movie.GENRE.split(',').slice(0,3).join(',')}</td>
                                    {/* <td>{movie.GENRE}</td> */}
                                    <td>{movie.RATING}</td>
                                    <td>{movie.DIRECTOR}</td>
                                    <td>{movie.ACTOR.split(',').slice(0,3).join(',')}</td>
                                    {/* <td>{movie.ACTOR}</td> */}
                                    <td>{movie.MANUFACTURER}</td>
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

export default Boxoffice;
