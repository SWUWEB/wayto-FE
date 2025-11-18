import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamPageWrapper from "../TeamPageWrapper";
import MeetingMinuteItem from "./MeetingMinuteItem";
import "../../../assets/css/MeetingMinute.css";
import { useQuery } from "@tanstack/react-query";

const MeetingMinuteList = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);

  const fetchTeamMinutes = async () => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`/api/teams/${teamId}/minutes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("회의록 조회 실패");
    }

    const data = await res.json();
    return data.minutes || [];
  };

  const {
    data: meetings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teamMinutes", teamId],
    queryFn: fetchTeamMinutes,
    enabled: !!teamId,
  });

  const handleView = (id) => {
    navigate(`/meetings/${id}`);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleCreateClick = () => {
    navigate(`/${teamId}/createMeetingMinute`);
  };

  const formatUtcString = (utcString) => {
    if (!utcString) return "";

    // 예: 2025-11-19T02:44:00.000Z
    const [datePart, timePart] = utcString.split("T");
    const [year, month, day] = datePart.split("-");
    const [hh, mm] = timePart.split(":");

    // 오전/오후 표시
    const hourNum = Number(hh);
    const ampm = hourNum < 12 ? "오전" : "오후";

    // 시 표시(12시간제로 변환)
    let displayHour = hourNum % 12;
    if (displayHour === 0) displayHour = 12;

    return `${year}.${month}.${day} ${ampm} ${String(displayHour).padStart(
      2,
      "0"
    )}:${mm}`;
  };

  const visibleMeetings = meetings.slice(0, visibleCount);

  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>회의록을 불러오지 못했습니다.</div>;

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
          {visibleMeetings.map(({ id, title, attendees, meetingDate }) => {
            const attendeeNames =
              attendees && attendees.length > 0
                ? attendees
                    .split(",")
                    .map((name) => name.trim())
                    .join(", ")
                : "작성자 정보 없음";

            return (
              <MeetingMinuteItem
                key={id}
                title={title}
                attendees={attendeeNames}
                date={formatUtcString(meetingDate)}
                onView={() => handleView(id)}
              />
            );
          })}
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
