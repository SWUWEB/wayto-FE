import React, { useState } from 'react';
import Header from '../../components/Header';
import Myteam from './team/Myteam';
import CalendarBox from './CalendarBox';
import CreateTeamModal from './CreateTeamModal';
import TeammateModal from './TeammateModal';
import MeetingList from './MeetingList';
import '../../assets/css/home.css';

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showTeammateModal, setShowTeammateModal] = useState(false);

  const handleCreateTeam = (newTeam) => {
    const newTeamWithId = {
      ...newTeam,
      id: Date.now(),
      pageUrl: `/team${teams.length + 1}`,
    };
    setTeams([...teams, newTeamWithId]);
    setShowCreateTeamModal(false);
    setShowTeammateModal(true);
  };

  return (
    <div>
      <Header onCreateTeamClick={() => setShowCreateTeamModal(true)} />

      <CreateTeamModal 
        isOpen={showCreateTeamModal} 
        onClose={() => setShowCreateTeamModal(false)}
        onCreate={handleCreateTeam}
      />

      <TeammateModal 
        isOpen={showTeammateModal}
        onClose={() => setShowTeammateModal(false)}
      />

      <div className="image-placeholder">여기에 이미지가 들어갈 예정입니다</div>

      <div className="calendar-meeting-container">
        <CalendarBox />
        <div className="meeting-wrapper">
          <MeetingList />
        </div>
      </div>

      <Myteam teams={teams} />
      
    </div>
  );
};

export default Home;