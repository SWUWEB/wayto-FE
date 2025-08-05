import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import TeamPageWrapper from './TeamPageWrapper';
import '../../assets/css/WhenToMeetCreation.css';
import teamLogo from '../../assets/images/teamLogo.png';
import CalendarIcon from '../../assets/images/Calend.png';
import ClockIcon from '../../assets/images/Clock.png';
import SearchIcon from '../../assets/images/Search.png';
import CheckedBox from '../../assets/images/Checkedbox.png';
import UncheckedBox from '../../assets/images/Uncheckedbox.png';

const WhenToMeetCreation = () => {
  const navigate = useNavigate(); 

  const initialParticipants = [
    '김예원', '이름', '이름',
    '김희진', '이름', '이름',
    '문정윤', '이름', '이름',
    '이채영', '이름', '이름',
  ];

  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const toggleParticipant = (name) => {
    setSelectedParticipants((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  const handleCreateVote = () => {
    navigate('/team/wentomeet/whentomeetvote'); 
  };

  return (
    <TeamPageWrapper initialTab="웬투밋">
      <div className="w2m-creation-box">
        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">웬투밋 제목</label>
          <div className="w2m-title-wrapper">
            <img src={teamLogo} alt="로고" className="w2m-logo-inside" />
            <input
              className="w2m-title-input"
              placeholder="새로운 웬투밋 제목을 입력해 주세요."
            />
          </div>
        </div>

        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">기간 설정</label>
          <div className="w2m-range-box">
            <div className="w2m-date-box">
              <input type="text" placeholder="01/01/2025" />
              <img src={CalendarIcon} alt="달력" />
            </div>
            <span className="w2m-range-dash">—</span>
            <div className="w2m-date-box">
              <input type="text" placeholder="01/06/2025" />
            </div>
          </div>
        </div>

        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">시간 설정</label>
          <div className="w2m-range-box">
            <div className="w2m-time-box">
              <input type="text" placeholder="17:00" />
              <img src={ClockIcon} alt="시계" />
            </div>
            <span className="w2m-range-dash">—</span>
            <input type="text" placeholder="24:00" className="w2m-time-input" />
          </div>
        </div>

        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">참여 대상</label>
          <div className="w2m-search-box">
            <img src={SearchIcon} alt="검색" />
            <input type="text" placeholder="이채영" />
          </div>

          <div className="w2m-participants">
            {initialParticipants.map((name, idx) => (
              <div
                key={idx}
                className="w2m-participant"
                onClick={() => toggleParticipant(name)}
              >
                <img
                  src={
                    selectedParticipants.includes(name)
                      ? CheckedBox
                      : UncheckedBox
                  }
                  alt="체크박스"
                />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w2m-divider">&#8203;</div>
        
        <button className="w2m-create-button" onClick={handleCreateVote}>
          투표 생성하기
        </button>
      </div>

      <div className="bottom-box"></div>
    </TeamPageWrapper>
  );
};

export default WhenToMeetCreation;
