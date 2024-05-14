import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

function Join() {
    let navi = useNavigate()
    let [id, setId] = useState("")
    let [pw, setPw] = useState("")
    let [nickname, setNickname] = useState("")

    async function Join() {
        let url = `${process.env.REACT_APP_SERVER_URL}/join`;
        console.log(nickname);
        
        await axios.post(url, {id:id, pw:pw, nickname:nickname})
            .then((res) => {
                if (res.data.status) {
                    console.log(res.data);
                    Swal.fire("가입 성공! 로그인 해주세요", "", "success")
                    navi("/")
                } else {
                    console.log(res.data);
                    Swal.fire("가입 실패!", "", "error")
                }
            })
    }
    
    return (

        <div className="Login">

            <header className="Join-header">
                <h1 align="center" className="login_logo">Movie Money</h1>
                <h1 align="center" style={{ color: "white" }}>회원가입</h1>

                <div className="login_box">
                    <p>아이디</p>
                    <p><input type="text" onChange={e => setId(e.target.value)}/></p>
                    <p>비밀번호</p>
                    <p><input type="password" onChange={e => setPw(e.target.value)}/></p>
                    <p>닉네임</p>
                    <p><input type="text" onChange={e => setNickname(e.target.value)}/></p>
                    <p><input className="login_btn" type="button" value="로그인" onClick={()=>navi("/")}/></p>
                    <p><input className="login_btn" type="button" value="회원가입" onClick={Join}/></p>
                    
                </div>

            </header>

        </div>
    );
}

export default Join;
