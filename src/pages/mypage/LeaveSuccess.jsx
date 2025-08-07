import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/leavesuccess.css";
import teamLogo from '../../assets/images/teamLogo.png';

const LeaveSuccess = () => {
  return (
    <div className="error-page">
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/wayto.svg" alt="logo" className="navbar-logo" />
          <span className="navbar-title">웨이투회의</span>
        </div>
        <div className="navbar-right">
          <a href="/">홈</a>
          <a href="/calendar">내 캘린더</a>
          <a href="/team">팀 생성하기</a>
          <a href="/mypage" className="active">마이페이지</a>
        </div>
      </nav>

      <div className="teamHeader__header-container">
        <img src={teamLogo} alt="team logo" className="teamHeader__logo" />
        <div className="teamHeader__info">
          <h1 className="teamHeader__team-name">회원 이름입니다.</h1>
          <p className="teamHeader__description">
            반갑습니다, ○○○님.<br />
            웨이투회의를 통해 팀을 만들고, 일정을 조율해 보세요.
          </p>
        </div>
      </div>

      <div className="teamHeader__tab-container">
        <button className="teamHeader__tab">회원 정보</button>
        <button className="teamHeader__tab teamHeader__active">문의하기</button>
      </div>

      <div className="error-form">
        <p className="error-title">정상적으로 탈퇴되었습니다.</p>
        <p className="error-desc">
          그동안 서비스를 이용해 주셔서 감사합니다.
        </p>

        <Link to="/home">
          <button>홈으로 가기</button>
        </Link>
      </div>

      <div className="page-footer" />
    </div>
  );
};

export default LeaveSuccess;