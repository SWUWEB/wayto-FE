import React, { useState } from 'react';
import TeamPageWrapper from '.././TeamPageWrapper';
import WhenToMeetPopUp from '../../../components/WhenToMeetPopUp.jsx'; 
import teamLogo from '../../../assets/images/teamLogo.png';
import CheckedBox from '../../../assets/images/Checkedbox.png';
import UncheckedBox from '../../../assets/images/Uncheckedbox.png';
import '../../../assets/css/WhenToMeetVote.css';

const hours = [
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
];

const dates = ['01/01', '01/02', '01/03', '01/04', '01/05', '01/06'];

const WhenToMeetVote = () => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [showPopup, setShowPopup] = useState(false); 

  const toggleCell = (date, hour) => {
    const key = `${date}-${hour}`;
    setSelectedCells(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const handleVoteSubmit = () => {
    setShowPopup(true);
  };

  return (
    <TeamPageWrapper initialTab="웬투밋">
      <div className="when-to-meet-vote-section">
        <div className="when-to-meet-vote-inner">
          <div className="w2m-header">
            <img src={teamLogo} alt="팀 로고" className="w2m-logo" />
            <div className="w2m-title">웬투밋 제목</div>
          </div>

          <div className="w2m-divider" />

          <div className="w2m-grid">
            <div className="w2m-row">
              <div className="w2m-time-cell empty" />
              {dates.map(date => (
                <div className="w2m-date-cell" key={date}>{date}</div>
              ))}
            </div>

            {hours.map(hour => (
              <div className="w2m-row" key={hour}>
                <div className="w2m-time-cell">{hour}</div>
                {dates.map(date => {
                  const key = `${date}-${hour}`;
                  const isChecked = selectedCells.includes(key);
                  return (
                    <div
                      key={key}
                      className="w2m-checkbox-cell"
                      onClick={() => toggleCell(date, hour)}
                    >
                      <img
                        src={isChecked ? CheckedBox : UncheckedBox}
                        alt="체크박스"
                        className="w2m-checkbox-img"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="w2m-divider" />

          <button className="w2m-submit-button" onClick={handleVoteSubmit}>
            투표 마감하기
          </button>
        </div>
      </div>

      {showPopup && <WhenToMeetPopUp onClose={() => setShowPopup(false)} />}

      <div className="bottom-box"></div>
    </TeamPageWrapper>
  );
};

export default WhenToMeetVote;
