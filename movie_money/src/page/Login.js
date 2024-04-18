import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    let navi = useNavigate()
    let [id, setId] = useState("")
    let [pw, setPw] = useState("")

    async function goHome() {
        let url = `${process.env.REACT_APP_SERVER_URL}/login`;

        await axios.post(url, {id:id, pw:pw})
            .then((res) => {
                if (res.data.status === "ok") {
                    sessionStorage.setItem("id", res.data.id)
                    navi("/home")
                } else {
                    alert("오류")
                }
            })
    }
    
    return (

        <div className="Login">

            <header className="Login-header">
                <h1 align="center" className="login_logo">Movie Money</h1>
                <h1 align="center" style={{ color: "white" }}>로그인</h1>

                <div className="login_box">
                    <p>아이디</p>
                    <p><input type="text" onChange={e => setId(e.target.value)}/></p>
                    <p>비밀번호</p>
                    <p><input type="password" onChange={e => setPw(e.target.value)}/></p>
                    <p><input className="login_btn" type="button" value="로그인" onClick={goHome}/></p>
                    <p><input className="login_btn" type="button" value="회원가입" /></p>
                    
                </div>

            </header>

        </div>
    );
}

export default Login;
