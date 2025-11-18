import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/header.css";
import mainLogo from "../assets/images/mainLogo.png";
import axios from "axios";

const Header = ({ onCreateTeamClick = () => {} }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      await axios.post("https://waayto.com/api/users/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 로그아웃 처리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      setIsLoggedIn(false);

      alert("로그아웃되었습니다.");
      navigate("/login"); // 로그인 페이지로 이동
    } catch (err) {
      console.error("로그아웃 실패:", err);
      alert("로그아웃에 실패했습니다.");
    }
  };

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
          {isLoggedIn && (
            <>
              <a href="/calendar" className="header__link">
                내 캘린더
              </a>
              <a onClick={onCreateTeamClick} className="header__link">
                팀 생성하기
              </a>
              <a href="/mypage/userInfo/pwCheck" className="header__link">
                마이페이지
              </a>
              <a
                onClick={handleLogout}
                className="header__link"
              >
                로그아웃
              </a>
            </>
          )}
          {!isLoggedIn && (
            <a href="/login" className="header__link header__login-button">
              로그인
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
