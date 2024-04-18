import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';

function Home() {

    let [id, setId] = useState("")

    useEffect(() => {
        const id = sessionStorage.getItem("id");
        if (id) {
            setId(id);
        }
    }, []);

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

                <h1 style={{ color: "white" }}>Home</h1>
                <h1 style={{ color: "white" }}>id : {id}</h1>

            </header>
        </div>
    );
}

export default Home;
