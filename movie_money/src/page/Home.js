import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useState, useEffect } from 'react';
import axios from "axios";

function Home() {

    let [movie_name, setMovieName] = useState("")
    let [open_date, setOpenDate] = useState("")
    let [nationality, setNationality] = useState("")
    let [genre, setGenre] = useState([])
    let [rating, setRating] = useState("")
    let [director, setDirector] = useState("")
    let [actor, setActor] = useState("")
    let [distributor, setDistributor] = useState("")

    var actors = [];
    var directors = [];
    var distributors = [];

    async function getData() {
        let url = `${process.env.REACT_APP_SERVER_URL}/get/actors`;

        await axios.get(url)
            .then((res) => {
                console.log(res.data.data);
            })
    }

    // useEffect(() => {
    //     const id = sessionStorage.getItem("id");
    //     if (id) {
    //         setId(id);
    //     }
    // }, []);

    const nationalityChange = (e) => {
        if (e.target.text == "초기화") {
            setNationality("")
            return
        } else {
            setNationality(e.target.text);
        }
        
    };

    const genreChange = (e) => {
        if (e.target.text == "초기화") {
            setGenre([])
            return
        }
        if (genre.length < 3 && !genre.includes(e.target.text)) { // 선택한 장르가 배열에 없는 경우에만 추가
            setGenre([...genre, e.target.text]);                  // 선택한 장르를 배열에 추가
        } else {
            alert("최대 3개의 장르만 선택할 수 있습니다.");
        }
    };
    
    const ratingChange = (e) => {
        if (e.target.text == "초기화") {
            setRating("")
            return
        } else {
            setRating(e.target.text);
        }
    };

    const [show, setShow] = useState(false);
    const [actorName, setActorName] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const aa = ["김수현", "김지원"];
    return (

        <div className="Home">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container className="navbar">
                    <Navbar.Brand href="/home" className='nav_logo'>Movie Money</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/predict">매출액 예측</Nav.Link>
                        <Nav.Link href="/boxoffice">박스오피스 데이터 조회</Nav.Link>
                        <Nav.Link href="/myPage">마이페이지</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <header className="Home-header">
                
                <div className="login_box">

                    <table>
                        <tr>
                            <td>영화 제목</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type="text" placeholder='영화 제목 입력' onChange={e => setMovieName(e.target.value)}/>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>개봉일</td>
                            <td>
                                <Dropdown>
                                    국적 &nbsp;
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='dropdownStyle'>
                                        선택
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={nationalityChange} className='dropdownReset'>초기화</Dropdown.Item>
                                        <Dropdown.Item onClick={nationalityChange}>한국</Dropdown.Item>
                                        <Dropdown.Item onClick={nationalityChange}>미국</Dropdown.Item>
                                        <Dropdown.Item onClick={nationalityChange}>일본</Dropdown.Item>
                                        <Dropdown.Item onClick={nationalityChange}>프랑스</Dropdown.Item>
                                        <Dropdown.Item onClick={nationalityChange}>영국</Dropdown.Item>
                                        <Dropdown.Item onClick={nationalityChange}>기타</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="date" onChange={e => {setOpenDate(e.target.value)
                                    console.log(e.target.value);
                                }}/>
                        
                            </td>
                            <td>
                                <input type="text" readOnly value={nationality} onChange={e => setNationality(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Dropdown>
                                    장르 &nbsp;
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='dropdownStyle'>
                                        선택
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={genreChange} className='dropdownReset'>초기화</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>액션</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>코미디</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>로맨스</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                            <td>
                                <Dropdown>
                                    등급 &nbsp;
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='dropdownStyle'>
                                        선택
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={ratingChange} className='dropdownReset'>초기화</Dropdown.Item>
                                        <Dropdown.Item onClick={ratingChange}>전체관람가</Dropdown.Item>
                                        <Dropdown.Item onClick={ratingChange}>12세 이상 관람가</Dropdown.Item>
                                        <Dropdown.Item onClick={ratingChange}>15세 이상 관람가</Dropdown.Item>
                                        <Dropdown.Item onClick={ratingChange}>청소년 관람불가</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" readOnly placeholder='장르 선택 (최대 3개)' value={genre} onChange={e => setGenre(e.target.value)}/>
                            </td>
                            <td>
                                <input type="text" readOnly value={rating} onChange={e => setRating(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>배우 &nbsp;
                                <Button variant="primary" onClick={getData}>
                                    검색
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton >
                                    <Modal.Title>배우 검색</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='modalStyle'>
                                        <input type="text" className='modalInput' onChange={e => setActorName(e.target.value)}/>
                                        &nbsp;&nbsp;
                                        <Button variant="secondary" onClick={handleClose}>
                                            검색
                                        </Button>
                                        <br />
                                        {aa.map((index) => (
                                            <Button key={index} variant="secondary" onClick={handleClose}>{index}</Button>
                                        ))}
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        닫기
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type="text" placeholder='배우 선택 (최대 3명)' onChange={e => setActor(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>감독</td>
                            <td>배급사</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" onChange={e => setDirector(e.target.value)}/>
                            </td>
                            <td>
                                <input type="text" onChange={e => setDistributor(e.target.value)}/>
                            </td>
                        </tr>

                    </table>

                    <p><input className="predict_btn" type="button" value="예측 시작" onClick={e => {
                        console.log(movie_name);
                        console.log(open_date);
                        console.log(genre);
                        console.log(rating);
                        console.log(actor);
                        console.log(director);
                        console.log(distributor);
                    }}/></p>

                    
                </div>


            </header>
        </div>
    );
}

export default Home;