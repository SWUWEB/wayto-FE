import React, { useState } from 'react';
import TeamCard from './TeamCard';
import '../../../assets/css/home.css';
//import CreateTeamModal from '../CreateTeamModal';

const Myteam = ({ teams }) => {
  console.log("teams =", teams);
  const handleNavigate = (url) => {
    window.open(url, '_blank');
  };

  return (
  <section className="myteam-section">
    <h2 className="myteam-title">나의 팀</h2>
    <div className="myteam-container">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} onNavigate={handleNavigate} />
      ))}
    </div>
  </section>
);
};

export default Myteam;