import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import React from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Swal from 'sweetalert2'

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    
    let navi = useNavigate()
    
    let [movie_name, setMovieName] = useState("")
    let [open_date, setOpenDate] = useState("")
    let [nationality, setNationality] = useState("")
    let [genre, setGenre] = useState([])
    let [rating, setRating] = useState("")
    let [director, setDirector] = useState("")
    let [actor, setActor] = useState([])
    let [distributor, setDistributor] = useState("")

    // 배우 선택
    let [actors, setActors] = useState([])
    let [filteredActors, setFilteredActors] = useState([])

    async function getActors() {
    
        let url = `${process.env.REACT_APP_SERVER_URL}/get/actors`;
        
        await axios.get(url)
            .then((res) => {
                setActors(res.data.data);
                console.log(actors);
                handleShow();
            })
    }

    const filterActors = () => {
        const filtered = actors.filter(actor => actor.includes(actorName));
        setFilteredActors(filtered);
    };

    const actorSelect = (selectedActor) => {
        if (actor.length < 3 && !actor.includes(selectedActor)) {
            setActor([...actor, selectedActor]);
        } else {
            Swal.fire("최대 3명의 중복되지 않는 배우만 선택할 수 있습니다.", "", "error")
        }
    };

    const resetActor = () => {
        setActor([]);
    }

    // 감독 선택
    let [directors, setDirectors] = useState([])
    let [filteredDirectors, setFilteredDirectors] = useState([])

    async function getDirectors() {
    
        let url = `${process.env.REACT_APP_SERVER_URL}/get/directors`;
        
        await axios.get(url)
            .then((res) => {
                setDirectors(res.data.data);
                console.log(directors);
                handleShow2();
            })
    }

    const filterDirectors = () => {
        const filtered = directors.filter(director => director.includes(directorName));
        setFilteredDirectors(filtered);
    };

    const directorSelect = (selectedDirector) => {
        setDirector(selectedDirector);
    };

    const resetDirector = () => {
        setDirector("");
    }

    // 배급사 선택
    let [distributors, setDistributors] = useState([])
    let [filteredDistributors, setFilteredDistributors] = useState([])

    async function getDistributors() {
    
        let url = `${process.env.REACT_APP_SERVER_URL}/get/distributors`;
        
        await axios.get(url)
            .then((res) => {
                setDistributors(res.data.data);
                console.log(distributors);
                handleShow3();
            })
    }

    const filterDistributors = () => {
        const filtered = distributors.filter(distributor => distributor.includes(distributorName));
        setFilteredDistributors(filtered);
    };

    const distributorSelect = (selectedDistributor) => {
        setDistributor(selectedDistributor);
    };

    const resetDistributor = () => {
        setDistributor("");
    }

    // 국적 선택
    const nationalityChange = (e) => {
        if (e.target.text == "초기화") {
            setNationality("")
            return
        } else {
            setNationality(e.target.text);
        }
        
    };

    // 장르 선택
    const genreChange = (e) => {
        if (e.target.text == "초기화") {
            setGenre([])
            return
        }
        if (genre.length < 3 && !genre.includes(e.target.text)) { // 선택한 장르가 배열에 없는 경우에만 추가
            setGenre([...genre, e.target.text]);                  // 선택한 장르를 배열에 추가
        } else {
            Swal.fire("최대 3개의 중복되지 않는 장르만 선택할 수 있습니다.", "", "error")
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

    // 배우 모달창
    const [show, setShow] = useState(false);
    const [actorName, setActorName] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // 감독 모달창
    const [show2, setShow2] = useState(false);
    const [directorName, setDirectorName] = useState("");
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    // 배급사 모달창
    const [show3, setShow3] = useState(false);
    const [distributorName, setDistributorName] = useState("");
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    // 예측 요청
    async function startPredict() {
        let url = `${process.env.REACT_APP_SERVER_URL}/predict`;
        
        await axios.post(url, {
            movie_name:movie_name, 
            open_date:open_date, 
            nationality:nationality, 
            genre:genre, 
            rating:rating, 
            director:director, 
            actor:actor, 
            distributor:distributor, 
        })
            .then((res) => {
                console.log(res.data.data);
                sessionStorage.setItem("result", res.data.data);
                sessionStorage.setItem("movie_name", movie_name);
                sessionStorage.setItem("open_date", open_date);
                sessionStorage.setItem("nationality", nationality);
                sessionStorage.setItem("genre", genre);
                sessionStorage.setItem("rating", rating);
                sessionStorage.setItem("director", director);
                sessionStorage.setItem("actor", actor);
                sessionStorage.setItem("distributor", distributor);
                navi("/predict")
            })
    }

    // 예측 시작 클릭
    const predict = () => {
        
        // 결과 가지고 화면 이동

        if (movie_name && open_date && nationality && genre && rating && director && actor && distributor) {
            // 예측 요청
            startPredict()
            } else {
                Swal.fire("모두 입력해주세요", "", "error")
            }
    };



    return (

        <div className="Home">
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
                                <input type="text" placeholder='대표 국적 선택' readOnly value={nationality} onChange={e => setNationality(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Dropdown>
                                    장르 &nbsp;
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='dropdownStyle'>
                                        선택
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='dropdownScroll'>
                                        <Dropdown.Item onClick={genreChange} className='dropdownReset'>초기화</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>SF</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>판타지</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>액션</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>멜로/로맨스</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>어드벤처</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>코미디</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>범죄</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>스릴러</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>애니메이션</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>전쟁</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>미스터리</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>드라마</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>가족</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>공포(호러)</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>사극</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>뮤지컬</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>공연</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>다큐멘터리</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>서부극(웨스턴)</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>성인물(에로)</Dropdown.Item>
                                        <Dropdown.Item onClick={genreChange}>기타</Dropdown.Item>
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
                                <input type="text" placeholder='관람 등급 선택' readOnly value={rating} onChange={e => setRating(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>배우 &nbsp;
                                <Button variant="success" onClick={getActors} className='modalBtn modalSearchBtn'>
                                    검색
                                </Button>
                                <Button variant="danger" onClick={resetActor} className='modalBtn modalResetBtn'>
                                    초기화
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton >
                                    <Modal.Title>배우 검색</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='modalStyle'>
                                        <input type="text" className='modalInput' onChange={e => setActorName(e.target.value)}/>
                                        &nbsp;&nbsp;
                                        <Button variant="dark" onClick={filterActors}>
                                            검색
                                        </Button>
                                        <Button variant="danger" onClick={resetActor} className='modalBtn modalResetBtn'>
                                            초기화
                                        </Button>
                                        <br />
                                        <br />
                                        {filteredActors.map((index) => (
                                            <Button className='selectActorBtn' key={index} variant="primary" onClick={() => actorSelect(index)}>{index}</Button>
                                        ))}
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
                            <td colSpan={2}>
                                <input type="text" placeholder='배우 선택 (최대 3명)' value={actor} onChange={e => setActor(e.target.value)} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                감독 &nbsp;
                                <Button variant="success" onClick={getDirectors} className='modalBtn modalSearchBtn'>
                                    검색
                                </Button>
                                <Button variant="danger" onClick={resetDirector} className='modalBtn modalResetBtn'>
                                    초기화
                                </Button>

                                <Modal show={show2} onHide={handleClose2}>
                                    <Modal.Header closeButton >
                                    <Modal.Title>감독 검색</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='modalStyle'>
                                        <input type="text" className='modalInput' onChange={e => setDirectorName(e.target.value)}/>
                                        &nbsp;&nbsp;
                                        <Button variant="dark" onClick={filterDirectors}>
                                            검색
                                        </Button>
                                        <Button variant="danger" onClick={resetDirector} className='modalBtn modalResetBtn'>
                                            초기화
                                        </Button>
                                        <br />
                                        <br />
                                        {filteredDirectors.map((index) => (
                                            <Button className='selectActorBtn' key={index} variant="primary" onClick={() => directorSelect(index)}>{index}</Button>
                                        ))}
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="dark" onClick={handleClose2}>
                                        닫기
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                            </td>
                            
                            <td>배급사 &nbsp;
                                <Button variant="success" onClick={getDistributors} className='modalBtn modalSearchBtn'>
                                    검색
                                </Button>
                                <Button variant="danger" onClick={resetDistributor} className='modalBtn modalResetBtn'>
                                    초기화
                                </Button>

                                <Modal show={show3} onHide={handleClose3}>
                                    <Modal.Header closeButton >
                                    <Modal.Title>배급사 검색</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='modalStyle'>
                                        <input type="text" className='modalInput' onChange={e => setDistributorName(e.target.value)}/>
                                        &nbsp;&nbsp;
                                        <Button variant="dark" onClick={filterDistributors}>
                                            검색
                                        </Button>
                                        <Button variant="danger" onClick={resetDistributor} className='modalBtn modalResetBtn'>
                                            초기화
                                        </Button>
                                        <br />
                                        <br />
                                        {filteredDistributors.map((index) => (
                                            <Button className='selectActorBtn' key={index} variant="primary" onClick={() => distributorSelect(index)}>{index}</Button>
                                        ))}
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="dark" onClick={handleClose3}>
                                        닫기
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder='대표 감독 선택' value={director} onChange={e => setDirector(e.target.value)} readOnly/>
                            </td>
                            <td>
                                <input type="text" placeholder='대표 배급사 선택' value={distributor} onChange={e => setDistributor(e.target.value)} readOnly/>
                            </td>
                        </tr>

                    </table>

                    <p><input className="predict_btn" type="button" value="예측 시작" onClick={predict}/></p>

                </div>


            </header>
        </div>
    );
}

export default Home;