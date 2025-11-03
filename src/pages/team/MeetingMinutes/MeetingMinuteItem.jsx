import React from "react";
import "../../../assets/css/MeetingMinute.css";

const MeetingMinuteItem = ({ title, attendees, date, onView }) => {
  return (
    <div className="MMI__itemWrapper">
      <div className="MMI_infoContainer">
        <h3 className="MMI__infoTitle">{title}</h3>
        <div className="MMI__infoText">
          <div className="MMI__infoRow">
            <span className="MMI__label">참석자</span>
            <span className="MMI__value">{attendees}</span>
          </div>
          <div className="MMI__infoRow">
            <span className="MMI__label">회의 날짜</span>
            <span className="MMI__value">{date}</span>
          </div>
        </div>
      </div>
      <button className="MMI__viewButton" onClick={onView}>
        회의록 보기 →
      </button>
    </div>
  );
};

export default MeetingMinuteItem;
