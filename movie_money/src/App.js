import './style.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./home"

function App() {
  return (
    <BrowserRouter>

      <div className="App">

        <header className="App-header">
          <h1 align="center" className="login_logo">Movie Money</h1>
          <h1 align="center" style={{ color: "white" }}>로그인</h1>

          <div className="login_box">
            <form action="" method="POST">
              <p>아이디</p>
              <p><input type="text" /></p>
              <p>비밀번호</p>
              <p><input type="password" /></p>
              <Link to="/home">홈</Link>
              <p><input className="login_btn" type="submit" value="로그인" /></p>
              <p><input className="login_btn" type="button" value="회원가입" /></p>
            </form>
          </div>

        </header>

      </div>

      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
