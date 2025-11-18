import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import TeamPageWrapper from '.././TeamPageWrapper';
import '../../../assets/css/WhenToMeetCreation.css';
import teamLogo from '../../../assets/images/teamLogo.png';
import CalendarIcon from '../../../assets/images/Calend.png';
import ClockIcon from '../../../assets/images/Clock.png';
import SearchIcon from '../../../assets/images/Search.png';
import CheckedBox from '../../../assets/images/Checkedbox.png';
import UncheckedBox from '../../../assets/images/Uncheckedbox.png';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WhenToMeetCreation = () => {
  const navigate = useNavigate(); 

  const initialParticipants = ['김예원', '정지현', '최은기', '김희진', '고은수', '문정윤', '이채영'];
  
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleParticipant = (name) => {
    setSelectedParticipants(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleCreateVote = () => {
    navigate('/team/wentomeet/whentomeetvote'); 
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [timeModal, setTimeModal] = useState({ open: false, target: null });
  const startDateRef = useRef();
  const endDateRef = useRef();

  const times = [];
  for (let h = 0; h < 24; h++) {
    const hh = String(h).padStart(2, '0');
    times.push(`${hh}:00`);
  }

  const selectTime = (time) => {
    if (timeModal.target === 'start') setStartTime(time);
    else setEndTime(time);
    setTimeModal({ open: false, target: null });
  };

  return (
    <TeamPageWrapper initialTab="웬투밋">
      <div className="w2m-creation-box">
        
        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">웬투밋 제목</label>
          <div className="w2m-title-wrapper">
            <img src={teamLogo} alt="로고" className="w2m-logo-inside" />
            <input className="w2m-title-input" placeholder="새로운 웬투밋 제목을 입력해 주세요." />
          </div>
        </div>

        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">기간 설정</label>
          <div className="w2m-range-box">
            <div className="w2m-date-box" onClick={() => startDateRef.current.setOpen(true)}>
              <input type="text" value={startDate ? startDate.toLocaleDateString() : ''} readOnly placeholder="2025. 01. 01" />
              <img src={CalendarIcon} alt="달력" />
              <DatePicker
                ref={startDateRef}
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="yyyy. MM. dd."
                className="hidden-datepicker"
              />
            </div>
            <span className="w2m-range-dash">—</span>
            <div className="w2m-date-box" onClick={() => endDateRef.current.setOpen(true)}>
              <input type="text" value={endDate ? endDate.toLocaleDateString() : ''} readOnly placeholder="2025. 12. 31" />
              <img src={CalendarIcon} alt="달력" />
              <DatePicker
                ref={endDateRef}
                selected={endDate}
                onChange={date => setEndDate(date)}
                dateFormat="yyyy. MM. dd."
                className="hidden-datepicker"
              />
            </div>
          </div>
        </div>

        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">시간 설정</label>
          <div className="w2m-range-box">
            <div
              className="w2m-time-box"
              onClick={() =>
                setTimeModal(prev => ({
                  open: !(prev.open && prev.target === 'start'),
                  target: 'start'
                }))
              }
            >
              <input type="text" value={startTime} readOnly placeholder="시작 시간" />
              <img src={ClockIcon} alt="시계" />
              {timeModal.open && timeModal.target === 'start' && (
                <div className="time-modal">
                  {times.map((t) => (
                    <div key={t} className="time-option" onClick={() => selectTime(t)}>
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span className="w2m-range-dash">—</span>

            <div
              className="w2m-time-box"
              onClick={() =>
                setTimeModal(prev => ({
                  open: !(prev.open && prev.target === 'end'),
                  target: 'end'
                }))
              }
            >
              <input type="text" value={endTime} readOnly placeholder="종료 시간" />
              <img src={ClockIcon} alt="시계" />
              {timeModal.open && timeModal.target === 'end' && (
                <div className="time-modal">
                  {times.map((t) => (
                    <div key={t} className="time-option" onClick={() => selectTime(t)}>
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">참여 대상</label>
          <div className="w2m-search-box">
            <img src={SearchIcon} alt="검색" />
            <input
              type="text"
              placeholder="이름 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w2m-participants">
            {initialParticipants
              .filter(name => name.includes(searchTerm))
              .map((name, idx) => (
                <div
                  key={idx}
                  className="w2m-participant"
                  onClick={() => toggleParticipant(name)}
                >
                  <img
                    src={selectedParticipants.includes(name) ? CheckedBox : UncheckedBox}
                    alt="체크박스"
                  />
                  <span>{name}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="w2m-divider">&#8203;</div>
        <button className="w2m-create-button" onClick={handleCreateVote}>투표 생성하기</button>
      </div>

      <div className="bottom-box"></div>
    </TeamPageWrapper>
  );
};

export default WhenToMeetCreation;
