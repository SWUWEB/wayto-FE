import React, { useState } from 'react';
import "../assets/css/teamHeader.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import teamLogo from '../assets/images/teamLogo.png';

const tabs = [
  { label: '회의록', path: '/team/meeting' },
  { label: '웬투밋', path: '/team/wentomeet' },
  { label: '회원 관리', path: '/team/members' },
  { label: '팀 설정', path: '/team/settings' },
];

export default function TeamHeader({ teamName, teamDescription, onEdit }) {
  const navigate = useNavigate();
  const location = useLocation();

  const initialActiveTab = tabs.find(tab => location.pathname.startsWith(tab.path))?.label || '회의록';

  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const handleTabClick = (label, path) => {
    setActiveTab(label);
    navigate(path);
  };

  return (
    <div className="teamHeader__team-header">
      <div className="teamHeader__header-container">
        <img src={teamLogo} alt="team logo" className="teamHeader__logo" />
        <div className="teamHeader__info">
          <h1 className="teamHeader__team-name">{teamName}</h1>
          <p className="teamHeader__description">{teamDescription}</p>
        </div>
        <button className="teamHeader__edit-icon" onClick={onEdit}>
          <Pencil size={20} color="#000" />
        </button>
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
