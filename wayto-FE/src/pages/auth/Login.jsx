import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/login.css";

const Login = () => {
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

      <div className="login-wrapper">
        <header className="login-header">
          <img src="/wayto.svg" alt="logo" className="logo" />
          <h1>로그인</h1>
          <p>웨이투회의에 오신 걸 환영합니다.</p>
        </header>

        <div className="login-form">
          <input type="text" placeholder="ID" />
          <input type="password" placeholder="Password" />

          <div className="login-options">
            <Link to="/findid">아이디 찾기</Link> | <Link to="/findpw">비밀번호 찾기</Link>
          </div>

          <button className="login-button">로그인</button>
        </div>
        
        <div className="login-footer">
          아직 회원이 아니신가요?
          <Link to="/signup">회원가입 하기</Link>
        </div>
      </div>

      <div className="page-footer" />
    </div>
  );
};

export default Login;