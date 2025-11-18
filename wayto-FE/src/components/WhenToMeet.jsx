import React from 'react';
import '../assets/css/WhenToMeet.css';
import CalendarIcon from '../assets/images/CalendarIcon.png';
import LocationIcon from '../assets/images/LocationIcon.png';

const WhenToMeet = ({ title, dateRange, location, onEnter, disabled }) => {
  return (
    <div className={`when-box ${disabled ? 'disabled' : ''}`}>
      {disabled && <div className="when-overlay" />}
      <div className="when-info">
        <div className="when-title">{title}</div>
        <div className="when-detail">
          <img src={CalendarIcon} alt="Calendar" className="when-icon" />
          <span>{dateRange}</span>
        </div>
        <div className="when-detail">
          <img src={LocationIcon} alt="Location" className="when-icon" />
          <span>{location}</span>
        </div>
      </div>
      <button
        className={`enter-button ${disabled ? 'disabled-button' : ''}`}
        onClick={onEnter}
        disabled={disabled}
      >
        입장하기
      </button>
    </div>
  );
};

export default WhenToMeet;
