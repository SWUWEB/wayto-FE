import React from 'react';
import '../../../assets/css/home.css'; 

const TeamCard = ({ team, onNavigate }) => (
  <div className="team-card">
    <h2 className="team-title">{team.name}</h2>
    <p className="team-description">{team.description}</p>
    <div className="team-tags-container">
      {team.tags.map((tag, index) => (
        <span key={index} className="team-tag">#{tag}</span>
      ))}
    </div>
    <button className="team-button" onClick={() => onNavigate(team.pageUrl)}>
      팀 페이지로 이동
    </button>
  </div>
);

export default TeamCard;