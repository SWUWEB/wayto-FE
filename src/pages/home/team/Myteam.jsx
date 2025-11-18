import React from 'react';
import TeamCard from './TeamCard';
import '../../../assets/css/home.css';

const Myteam = ({ teams }) => {
  const handleNavigate = (url) => window.open(url, '_blank');

  return (
    <section className="myteam-section">
      <h2 className="myteam-title">나의 팀</h2>
      
      
      <div className="myteam-container">
        {Array.isArray(teams) && teams.map((team) => {
             if (!team || !team.id) return null; 
             
             return (
               <TeamCard 
                 key={team.id} 
                 team={team} 
                 onNavigate={handleNavigate}
               />
             );
        })}
        
        {(!teams || teams.length === 0) && <p>아직 소속된 팀이 없습니다.</p>}
      </div>
    </section>
  );
};

export default Myteam; 