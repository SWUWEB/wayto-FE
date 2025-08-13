import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/findid.css";
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png";

const FindId = () => {
  return (
    <div className="page-wrapper">
      <Header />

      <div className="findid-wrapper">
        <header className="findid-header">
          <img src={teamLogo} alt="logo" className="logo" />
          <div className="tab-menu">
            <span className="active">아이디 찾기</span>
            <Link to="/findpw" className="tab-link inactive">비밀번호 찾기</Link>
          </div>
          <p>회원 정보를 잊어버리셨나요?</p>
        </header>

        <form className="findid-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="E-mail" />
          <button className="findid-button" type="submit">아이디 찾기</button>
        </form>

        <div className="findid-footer">
          비밀번호가 생각나지 않는다면?{" "}
          <Link to="/findpw">비밀번호 찾기</Link>
        </div>
      </div>

      <div className="page-footer normal-footer" />
    </div>
  );
};

export default FindId;