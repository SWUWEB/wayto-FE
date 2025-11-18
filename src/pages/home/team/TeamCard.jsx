import React from 'react';
import '../../../assets/css/home.css'; 

const TeamCard = ({ team, onNavigate }) => {
  const name = team.name || "";
  const description = team.description || "";
  const tags = team.teamtag || [];
  const pageUrl = team.pageUrl || `/team/${team.id}`;

  return (
    <div className="team-card">
      <h2 className="team-title">{name}</h2>
      <p className="team-description">{description}</p>

      <div className="team-tags-container">
        {tags.map((tag, index) => (
          <span key={index} className="team-tag">#{tag}</span>
        ))}
      </div>

      <button className="team-button" onClick={() => onNavigate(pageUrl)}>
        팀 페이지로 이동
      </button>
    </div>
  );
};

export default TeamCard;