import React, { useEffect, useState } from "react";
import WhenToMeet from "../../components/WhenToMeet";
import "../../assets/css/meetingList.css";
import axios from "axios";

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);

  // 날짜 포맷 함수
  const formatDate = (datetime) => {
    const date = new Date(datetime);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get("/api/minutes/upcoming", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedData = response.data.map((item) => ({
          id: item.meetingId,
          title: item.title,
          dateRange: formatDate(item.meetingDateTime),
          location: item.meetingLink ? "온라인 회의" : "회의 장소 미정",
          meetingLink: item.meetingLink,
        }));

        setMeetings(formattedData);
      } catch (error) {
        console.error("예정된 회의 불러오기 실패:", error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="meeting-list-wrapper">
      <h3 className="meeting-list-title">예정된 회의</h3>

      {meetings.length === 0 ? (
        <p className="no-meetings">예정된 회의가 없습니다.</p>
      ) : (
        meetings.map((meeting) => (
          <WhenToMeet
            key={meeting.id}
            title={meeting.title}
            dateRange={meeting.dateRange}
            location={meeting.location}
            onEnter={() => window.open(meeting.meetingLink, "_blank")}
            disabled={!meeting.meetingLink}
          />
        ))
      )}
    </div>
  );
};

export default MeetingList;