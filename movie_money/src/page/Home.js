import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';

function Home() {

    let [movie_name, setMovieName] = useState("")
    let [open_date, setOpenDate] = useState("")
    let [nationality, setNationality] = useState("")
    let [genre, setGenre] = useState([])
    let [rating, setRating] = useState("")
    let [director, setDirector] = useState("")
    let [actor, setActor] = useState("")
    let [distributor, setDistributor] = useState("")

    // useEffect(() => {
    //     const id = sessionStorage.getItem("id");
    //     if (id) {
    //         setId(id);
    //     }
    // }, []);

    const GenreChange = (e) => {
        const selectedGenre = e.target.value;
        if (genre.length < 3 && !genre.includes(selectedGenre)) { // 선택한 장르가 배열에 없는 경우에만 추가
            setGenre([...genre, selectedGenre]); // 선택한 장르를 배열에 추가
        } else {
            alert("최대 3개의 장르만 선택할 수 있습니다.");
        }
    };

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
                            <td colSpan={2}>
                                영화제목
                                <input type="text" onChange={e => setMovieName(e.target.value)}/>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                개봉일
                                <input type="date" onChange={e => setOpenDate(e.target.value)}/>
                            </td>
                            <td>
                                국적
                                <input type="text" onChange={e => setNationality(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                장르 &nbsp;
                                <select onChange={GenreChange}>
                                    <option value="">장르 선택</option>
                                    <option value="액션">액션</option>
                                    <option value="코미디">코미디</option>
                                    <option value="로맨스">로맨스</option>
                                </select>
                                <input type="text" value={genre} onChange={e => setGenre(e.target.value)}/>
                            </td>
                            <td>
                                등급
                                <input type="password" onChange={e => setOpenDate(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                배우
                                <input type="password" onChange={e => setOpenDate(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                감독
                                <input type="password" onChange={e => setOpenDate(e.target.value)}/>
                            </td>
                            <td>
                                배급사
                                <input type="password" onChange={e => setOpenDate(e.target.value)}/>
                            </td>
                        </tr>

                    </table>



                    <p><input className="predict_btn" type="button" value="예측 시작"/></p>

                    
                </div>


            </header>
        </div>
    );
}

export default Home;
