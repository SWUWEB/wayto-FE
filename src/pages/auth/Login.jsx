import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/login.css"; // ✅ CSS 경로 수정
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png"; // ✅ 팀 로고 경로 추가

const Login = () => {
  return (
    <div className="page-wrapper">
      {/* 네비게이션바 */}
      <Header />

      {/* 본문 */}
      <div className="login-wrapper">
        <header className="login-header">
          <img src={teamLogo} alt="logo" className="logo" /> {/* ✅ 로고 수정 */}
          <h1>로그인</h1>
          <p>웨이투회의에 오신 걸 환영합니다.</p>
        </header>

        {/* 폼: Signup과 동일 폭(90%, max 600px) */}
        <form className="login-form">
          <input type="text" placeholder="ID" />
          <input type="password" placeholder="Password" />

          <div className="login-options">
            <Link to="/findid">아이디 찾기</Link>
            <span className="divider">|</span>
            <Link to="/findpw">비밀번호 찾기</Link>
          </div>

          <button className="login-button" type="submit">로그인</button>
        </form>

        {/* 하단 링크 영역도 동일 폭에 맞춤 */}
        <div className="login-footer">
          아직 회원이 아니신가요?{" "}
          <Link to="/signup">회원가입 하기</Link>
        </div>
      </div>

      {/* 푸터 */}
      <div className="page-footer normal-footer" />
    </div>
  );
};

export default Login;