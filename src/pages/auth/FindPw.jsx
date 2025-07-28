import React from 'react';
import "../../assets/css/findpw.css";

const FindPw = () => {
  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/wayto.svg" alt="logo" className="navbar-logo" />
          <span className="navbar-title">웨이투회의</span>
        </div>
        <div className="navbar-right">
          <a href="/">홈</a>
        </div>
      </nav>

      <div className="findpw-wrapper">
        <header className="findpw-header">
          <img src="/wayto.svg" alt="logo" className="logo" />
          <div className="tab-menu">
            <span className="inactive">아이디 찾기</span>
            <span className="active">비밀번호 찾기</span>
          </div>
          <p>회원 정보를 잊어버리셨나요?</p>
        </header>

        <div className="findpw-form">
          <input type="text" placeholder="ID" />
          <input type="email" placeholder="E-mail" />
          <button className="findpw-button">비밀번호 찾기</button>
        </div>

        <div className="findpw-footer">
          아이디가 생각나지 않는다면?
          <a href="/findid">아이디 찾기</a>
        </div>
      </div>

      <div className="page-footer" />
    </div>
  );
};

export default FindPw;