import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Myteam from "./team/Myteam";
import CalendarBox from "./CalendarBox";
import CreateTeamModal from "./CreateTeamModal";
import TeammateModal from "./TeammateModal";
import MeetingList from "./MeetingList";
import "../../assets/css/home.css";
import mainImg from "../../assets/images/waytomeet_main.png";
import longArrow from "../../assets/images/long-arrow.png";
import axios from "axios";

const Home = () => {
  const [teams, setTeams] = useState([]);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showTeammateModal, setShowTeammateModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // 팀 목록 연동
  useEffect(() => {
    if (!isLoggedIn) return; 
    
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/teams", {
          withCredentials: true,
        });

        const teamList = response.data.teams || [];

        const formattedTeams = teamList.map((team) => ({
          id: team.id,
          name: team.name,
          description: team.description,
          tags: team.teamtag || [],
          pageUrl: `/team/${team.id}`,
        }));

        setTeams(formattedTeams);
      } catch (error) {
        console.error("팀 목록 조회 실패:", error);
      }
    };

    fetchTeams();
  }, [isLoggedIn]);

  const handleCreateTeam = (newTeam) => {
    setTeams([newTeam, ...teams]);
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

      <div className="main-hero">
        <div className="slogan">
          회의가 새로워지는 길,
          <br />
          <span className="highlight">웨이투회의</span>
          <br />
          <span className="sub-slogan">
            당신의 팀을 더 가까이, 더 똑똑하게
          </span>

          {!isLoggedIn && (
            <div
              className="join-section"
              onClick={() => (window.location.href = "/login")}
            >
              <span className="join-text">지금 바로 가입하세요</span>
              <img src={longArrow} alt="긴 화살표" className="join-arrow" />
            </div>
          )}
        </div>

        <div className="main-img">
          <img src={mainImg} alt="메인 이미지" />
        </div>
      </div>

      {isLoggedIn && (
        <div className="calendar-meeting-container">
          <CalendarBox />
          <div className="meeting-wrapper">
            <MeetingList />
          </div>
        </div>
      )}

      {isLoggedIn && <Myteam teams={teams} />}
    </div>
  );
};

export default Home;
