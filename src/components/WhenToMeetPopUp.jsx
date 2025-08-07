import React from 'react';
import teamLogo from '../assets/images/teamLogo.png';
import '../assets/css/WhenToMeetPopUp.css';

const WhenToMeetPopUp = ({ onClose }) => {
  return (
    <div className="popup-wrapper">
      <div className="popup-content">
        <button className="popup-close-button" onClick={onClose}>
          &#10005;
        </button>
        <img src={teamLogo} alt="팀 로고" className="popup-logo" />
        <div className="popup-title">웬투밋 제목</div>
        <div className="popup-message">일치하는 회의 시간이 없습니다. 다시 설정해 주세요</div>
      </div>
    </div>
  );
};

export default WhenToMeetPopUp;
