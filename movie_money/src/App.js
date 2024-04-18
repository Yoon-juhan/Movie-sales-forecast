import './page/style.css';
import Login from "./page/Login"
import Home from "./page/Home"
import Predict from "./page/Predict"
import Boxoffice from "./page/Boxoffice"
import MyPage from "./page/MyPage"
import { Routes, Route } from "react-router-dom";


function App() {
  return (

      <Routes>

        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/predict" element={<Predict />}></Route>
        <Route path="/boxoffice" element={<Boxoffice />}></Route>
        <Route path="/myPage" element={<MyPage />}></Route>

      </Routes>

  );
}

export default App;
