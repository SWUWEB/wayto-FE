import React from 'react';
import "../../assets/css/findid.css";

const FindId = () => {
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

      <div className="findid-wrapper">
        <header className="findid-header">
          <img src="/wayto.svg" alt="logo" className="logo" />
          <div className="tab-menu">
            <span className="active">아이디 찾기</span>
            <span className="inactive">비밀번호 찾기</span>
          </div>
          <p>회원 정보를 잊어버리셨나요?</p>
        </header>

        <div className="findid-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="E-mail" />
          <button className="findid-button">아이디 찾기</button>
        </div>

        <div className="findid-footer">
          비밀번호가 생각나지 않는다면?
          <a href="/findpw">비밀번호 찾기</a>
        </div>
      </div>

      <div className="page-footer" />
    </div>
  );
};

export default FindId;