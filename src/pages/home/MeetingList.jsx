import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WhenToMeet from "../../components/WhenToMeet";
import "../../assets/css/meetingList.css";
import axios from "axios";

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;
    return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}:${minutes}`;
  };

  const handleEnterClick = (minuteId) => {
    navigate(`/meetings/${minuteId}`);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("https://waayto.com/api/minutes/recent", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedData = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          dateRange: formatDate(item.meetingDate),
          location: item.meetingLink ? "온라인 회의" : item.location || "회의 장소 미정",
          meetingLink: item.meetingLink,
        }));

        setMeetings(formattedData);
      } catch (error) {
        console.error("최근 회의록 불러오기 실패:", error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="meeting-list-wrapper">
      <h3 className="meeting-list-title">최근 회의록</h3>
      {meetings.length === 0 ? (
        <p className="no-meetings">최근 작성된 회의록이 없습니다.</p>
      ) : (
        meetings.map((meeting) => (
          <WhenToMeet
            key={meeting.id}
            title={meeting.title}
            dateRange={meeting.dateRange}
            location={meeting.location}
            onEnter={() => handleEnterClick(meeting.id)} 
            disabled={false}
          />
        ))
      )}
    </div>
  );
};

export default MeetingList;