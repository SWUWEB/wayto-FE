import React, { useState } from "react";
import TeamPageWrapper from "../TeamPageWrapper";
import MeetingMinuteItem from "./MeetingMinuteItem";
import "../../../assets/css/MeetingMinute.css";

const meetings = [
  {
    id: 1,
    title: "프로젝트 킥오프 미팅",
    attendees: "팀장, 기획자, 개발자1, 개발자2",
    date: "2025.7.15 화 오전 10:00",
  },
  {
    id: 2,
    title: "디자인 리뷰",
    attendees: "팀장, 디자이너1, 디자이너2, 개발자1",
    date: "2025.7.16 수 오후 2:30",
  },
  {
    id: 3,
    title: "중간 점검 회의",
    attendees: "팀장, 팀원1, 팀원2, QA 담당자",
    date: "2025.7.20 일 오전 11:00",
  },
  {
    id: 4,
    title: "최종 발표 준비",
    attendees: "팀장, 마케팅팀, 개발팀, 기획팀",
    date: "2025.7.25 금 오후 4:00",
  },
  {
    id: 5,
    title: "팀 워크샵 계획",
    attendees: "팀장, 기획팀, 개발팀",
    date: "2025.7.27 일 오후 1:00",
  },
  {
    id: 6,
    title: "버그 수정 회의",
    attendees: "팀장, QA팀, 개발팀",
    date: "2025.7.29 화 오전 9:30",
  },
  {
    id: 7,
    title: "신규 기능 논의",
    attendees: "팀장, 기획자, 개발자1",
    date: "2025.8.1 금 오후 3:00",
  },
  {
    id: 8,
    title: "고객 피드백 리뷰",
    attendees: "팀장, 마케팅팀, 고객지원팀",
    date: "2025.8.3 일 오전 10:00",
  },
];

const MeetingMinuteList = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleView = (id) => {
    alert(`회의록 보기: ${id}번 회의`);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visibleMeetings = meetings.slice(0, visibleCount);

  return (
    <TeamPageWrapper initialTab="회의록">
      <div className="MML__wrapper">
        <div className="MML__header">
          <h2 className="MML__headerTitle">회의록</h2>
          <button className="MML__writeButton">회의록 작성</button>
        </div>

        <div className="MML__meetingList">
          {visibleMeetings.map(({ id, title, attendees, date }) => (
            <MeetingMinuteItem
              key={id}
              title={title}
              attendees={attendees}
              date={date}
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
