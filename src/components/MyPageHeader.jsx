import React, { useState } from 'react';
import "../assets/css/teamHeader.css"; 
import { useNavigate, useLocation } from 'react-router-dom';
import teamLogo from '../assets/images/teamLogo.png';

const tabs = [
  { label: '회원 정보', path: '/mypage/userinfo' },
  { label: '1:1 문의', path: '/mypage/inquiry' },
];

export default function MyPageHeader({ userName = '회원 이름입니다.' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const initialActive =
    tabs.find(t => location.pathname.startsWith(t.path))?.label || '회원 정보';
  const [activeTab, setActiveTab] = useState(initialActive);

  const handleTabClick = (label, path) => {
    setActiveTab(label);
    navigate(path);
  };

  return (
    <div className="teamHeader__team-header">
      <div className="teamHeader__header-container">
        <img src={teamLogo} alt="team logo" className="teamHeader__logo" />
        <div className="teamHeader__info">
          <h1 className="teamHeader__team-name">{userName}</h1>
          <p className="teamHeader__description">
            반갑습니다, ○○○님.<br />
            웨이투회의를 통해 팀을 만들고, 일정을 조율해 보세요.
          </p>
        </div>
      </div>

      <div className="teamHeader__tab-container">
        {tabs.map(({ label, path }) => (
          <button
            key={label}
            className={`teamHeader__tab ${activeTab === label ? 'teamHeader__active' : ''}`}
            onClick={() => handleTabClick(label, path)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}