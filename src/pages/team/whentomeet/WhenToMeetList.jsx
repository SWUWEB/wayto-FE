import React from "react";
import { useNavigate } from "react-router-dom";
import TeamPageWrapper from ".././TeamPageWrapper";
import WhenToMeet from "../../../components/WhenToMeet.jsx";
import "../../../assets/css/WhenToMeetList.css";

const WhenToMeetList = () => {
  const navigate = useNavigate();

  return (
    <TeamPageWrapper initialTab="웬투밋">
      <div className="when-to-meet-list-section">
        <div className="when-to-meet-list-inner">
          {/* 완료된 웬투밋 섹션 */}
          <div className="when-to-meet-section-wrapper">
            <h2>완료된 웬투밋</h2>
            <div className="when-to-meet-grid">
              <WhenToMeet
                title="이 칸은 웬투밋 제목입니다."
                dateRange="2025년 11월 25일 ~ 12월 25일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={true}
              />
              <WhenToMeet
                title="이 칸은 웬투밋 제목입니다."
                dateRange="2025년 11월 25일 ~ 12월 25일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={true}
              />
            </div>
          </div>

          {/* 현재 진행 중인 웬투밋 섹션 */}
          <div className="when-to-meet-section-wrapper">
            <h2>현재 진행 중인 웬투밋</h2>
            <div className="when-to-meet-grid">
              <WhenToMeet
                title="이 칸은 웬투밋 제목입니다."
                dateRange="2025년 11월 25일 ~ 12월 25일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={false}
              />
              <WhenToMeet
                title="이 칸은 웬투밋 제목입니다."
                dateRange="2025년 11월 25일 ~ 12월 25일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={false}
              />
              <WhenToMeet
                title="이 칸은 웬투밋 제목입니다."
                dateRange="2025년 11월 25일 ~ 12월 25일"
                location="DISCORD 회의 서버"
                onEnter={() => console.log("입장")}
                disabled={false}
              />
              <WhenToMeet
                title="이 칸은 웬투밋 제목입니다."
                dateRange="2025년 11월 25일 ~ 12월 25일"
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
            onClick={() => navigate("/team/wentomeet/wentomeetcreation")}
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