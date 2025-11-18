import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamPageWrapper from "../TeamPageWrapper";
import MeetingMinuteItem from "./MeetingMinuteItem";
import "../../../assets/css/MeetingMinute.css";

// 🟦 더미 데이터 추가
const dummyMeetings = [
  {
    id: 1,
    title: "주간 스프린트 회의",
    author: { name: "홍길동" },
    createdAt: "2025-11-18T10:00:00Z",
  },
  {
    id: 2,
    title: "기획 회의",
    author: { name: "김철수" },
    createdAt: "2025-11-16T15:30:00Z",
  },
  {
    id: 3,
    title: "디자인 피드백 회의",
    author: { name: "이영희" },
    createdAt: "2025-11-14T11:10:00Z",
  },
  {
    id: 4,
    title: "백엔드 API 점검",
    author: { name: "박민수" },
    createdAt: "2025-11-10T09:20:00Z",
  },
  {
    id: 5,
    title: "테스트 자동화 논의",
    author: { name: "최지훈" },
    createdAt: "2025-11-05T13:45:00Z",
  },
  {
    id: 6,
    title: "운영 배포 전략 회의",
    author: { name: "오하늘" },
    createdAt: "2025-11-01T16:00:00Z",
  },
];

const MeetingMinuteList = ({ teamId }) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);

  // 🟥 API 호출 주석 처리
  /*
  const { data: meetings = [], isLoading, isError, error } = useQuery(
    ["teamMinutes", teamId],
    () => fetchTeamMinutes(teamId)
  );
  */

  // 🟩 더미 데이터로 대체
  const meetings = dummyMeetings;

  const handleView = (id) => {
    navigate(`/meetings/${id}`);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleCreateClick = () => {
    navigate("/createMeetingMinute");
  };

  const visibleMeetings = meetings.slice(0, visibleCount);

  return (
    <TeamPageWrapper initialTab="회의록">
      <div className="MML__wrapper">
        <div className="MML__header">
          <h2 className="MML__headerTitle">회의록</h2>
          <button className="MML__writeButton" onClick={handleCreateClick}>
            회의록 작성
          </button>
        </div>

        <div className="MML__meetingList">
          {visibleMeetings.map(({ id, title, author, createdAt }) => (
            <MeetingMinuteItem
              key={id}
              title={title}
              attendees={author?.name || "작성자 정보 없음"}
              date={new Date(createdAt).toLocaleString()}
              onView={() => handleView(id)}
            />
          ))}
        </div>

        {visibleCount < meetings.length && (
          <div className="MML__loadMoreWrapper">
            <button className="MML__loadMoreButton" onClick={handleLoadMore}>
              + 더보기
            </button>
          </div>
        )}
      </div>
    </TeamPageWrapper>
  );
};

export default MeetingMinuteList;
