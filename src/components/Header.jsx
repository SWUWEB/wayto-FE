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
          <a onClick={onCreateTeamClick} className="header__link">
            팀 생성하기
          </a>
          <a href="/mypage/userInfo/pwCheck" className="header__link">
            마이페이지
          </a>
          <a href="/login" className="header__link header__login-button">
            로그인
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;