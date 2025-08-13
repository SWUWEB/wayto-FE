import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/findpw.css";
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png";

const FindPw = () => {
  return (
    <div className="page-wrapper">
      <Header />

      <div className="findpw-wrapper">
        <header className="findpw-header">
          <img src={teamLogo} alt="logo" className="logo" />
          <div className="tab-menu">
            <Link to="/findid" className="tab-link inactive">아이디 찾기</Link>
            <span className="active">비밀번호 찾기</span>
          </div>
          <p>회원 정보를 잊어버리셨나요?</p>
        </header>

        <form className="findpw-form">
          <input type="text" placeholder="ID" />
          <input type="email" placeholder="E-mail" />
          <button className="findpw-button" type="submit">비밀번호 찾기</button>
        </form>

        <div className="findpw-footer">
          아이디가 생각나지 않는다면?{" "}
          <Link to="/findid">아이디 찾기</Link>
        </div>
      </div>

      <div className="page-footer normal-footer" />
    </div>
  );
};

export default FindPw;