import React, { useState } from 'react';
import TeamCard from './TeamCard';
import '../../../assets/css/home.css';
import CreateTeamModal from '../CreateTeamModal';

const Myteam = ({ teams }) => {
  const handleNavigate = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="myteam-container">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} onNavigate={handleNavigate} />
      ))}
    </div>
  );
};

export default Myteam;