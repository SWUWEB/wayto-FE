import React from "react";
import "../assets/css/header.css";
import mainLogo from "../assets/images/mainLogo.png";

const Header = ({ onCreateTeamClick = () => {} }) => {
  return (
    <header className="header__container">
      <div className="header__left">
        <a href="/">
          <img src={mainLogo} alt="WayToLogo" className="header__logo" />
        </a>
      </div>
      <div className="header__right">
        <nav className="header__nav">
          <a href="/" className="header__link">
            홈
          </a>
          <a href="/calendar" className="header__link">
            내 캘린더
          </a>
          <span onClick={onCreateTeamClick} className="nav-link clickable">
          팀 생성하기
          </span>
          <a href="/mypage" className="header__link">
            마이페이지
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
