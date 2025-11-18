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
  const [currentTeamId, setCurrentTeamId] = useState(null);

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
        const token = localStorage.getItem("accessToken"); 

        if (!token) {
          console.warn("Access Token이 없어 팀 목록을 조회할 수 없습니다. 로그인 상태를 확인하세요.");
          return; 
        }

        const response = await axios.get("https://waayto.com/api/teams", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.error("인증 실패: 다시 로그인해주세요.");
        } else {
            console.error("팀 목록 조회 실패:", error);
        }
      }
    };

    fetchTeams();
  }, [isLoggedIn]);

  const handleCreateTeam = (newTeam) => {
    setTeams((prev) => [newTeam, ...prev]);
    setCurrentTeamId(newTeam.id); 
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
        teamId={currentTeamId} 
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
      {isLoggedIn && <Myteam teams={teams.slice(0, 9)} />}
    </div>
  );
};

export default Home;