import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/home.css';

const TeamCard = ({ team, onNavigate }) => { 
  const navigate = useNavigate();
  
  const name = team?.name || "제목 없음";
  const description = team?.description || "설명 없음";
  const pageUrl = team?.pageUrl || `/team/${team?.id}/meeting`;
  const tags = Array.isArray(team?.tags) ? team.tags : []; 

  const handleMove = () => {
      navigate(pageUrl); 
  };

  return (
    <div className="team-card">
      <h2 className="team-title">{name}</h2>
      <p className="team-description">{description}</p>

      <div className="team-tags-container">
        {tags.map((tag, index) => (
          <span key={index} className="team-tag">#{tag}</span>
        ))}
      </div>

      <button className="team-button" onClick={handleMove}>
        팀 페이지로 이동
      </button>
    </div>
  );
};

export default TeamCard;