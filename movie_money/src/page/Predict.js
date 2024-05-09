import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Predict() {
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
            <header className="Predict-header">

                <h1 style={{ color: "white" }}>예측결과 보여주는 화면</h1>

            </header>
        </div>
    );
}

export default Predict;
