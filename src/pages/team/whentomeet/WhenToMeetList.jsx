import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamPageWrapper from ".././TeamPageWrapper";
import WhenToMeet from "../../../components/WhenToMeet.jsx";
import "../../../assets/css/WhenToMeetList.css";

const WhenToMeetList = () => {
  const navigate = useNavigate();
  const teamId = useParams().teamId;

  return (
    <TeamPageWrapper initialTab="웬투밋">
      <div className="when-to-meet-list-section">
        <div className="when-to-meet-list-inner">
          <div className="when-to-meet-section-wrapper">
            <h2>완료된 웬투밋</h2>
            <div className="when-to-meet-grid">
              <WhenToMeet
                title="SWUWEB3기 프론트 회의"
                dateRange="2025년 11월 10일 ~ 11월 10일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={true}
              />
              <WhenToMeet
                title="SWUWEB3기 전체 회의"
                dateRange="2025년 11월 11일 ~ 11월 11일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={true}
              />
            </div>
          </div>

          <div className="when-to-meet-section-wrapper">
            <h2>현재 진행 중인 웬투밋</h2>
            <div className="when-to-meet-grid">
              <WhenToMeet
                title="SWUWEB3기 프론트 회의"
                dateRange="2025년 11월 24일 ~ 11월 24일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={false}
              />
              <WhenToMeet
                title="SWUWEB3기 전체 회의"
                dateRange="2025년 11월 25일 ~ 11월 25일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={false}
              />
              <WhenToMeet
                title="SWUWEB3기 프론트 회의"
                dateRange="2025년 12월 1일 ~ 12월 1일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={false}
              />
              <WhenToMeet
                title="SWUWEB3기 전체 회의"
                dateRange="2025년 12월 2일 ~ 12월 2일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={false}
              />
            </div>
          </div>
        </div>

        <div className="create-button-wrapper">
          <button
            className="create-button"
            onClick={() => navigate(`/team/${teamId}/wentomeet/wentomeetcreation`)}
          >
            웬투밋 생성하기
          </button>
        </div>
      </div>
      <div className="bottom-box"></div>
    </TeamPageWrapper>
  );
};

export default WhenToMeetList;