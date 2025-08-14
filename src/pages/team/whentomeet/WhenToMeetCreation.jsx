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
import TimePicker from 'react-time-picker';

const WhenToMeetCreation = () => {
  const navigate = useNavigate(); 
  const initialParticipants = ['김예원', '이름', '이름', '김희진', '이름', '이름', '문정윤', '이름', '이름', '이채영', '이름', '이름'];
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const toggleParticipant = (name) => {
    setSelectedParticipants(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };
  const handleCreateVote = () => {
    navigate('/team/wentomeet/whentomeetvote'); 
  };

  // 날짜/시간 상태
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('24:00');

  const startDateRef = useRef();
  const endDateRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();

  return (
    <TeamPageWrapper initialTab="웬투밋">
      <div className="w2m-creation-box">
        
        {/* 제목 */}
        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">웬투밋 제목</label>
          <div className="w2m-title-wrapper">
            <img src={teamLogo} alt="로고" className="w2m-logo-inside" />
            <input className="w2m-title-input" placeholder="새로운 웬투밋 제목을 입력해 주세요." />
          </div>
        </div>

        {/* 날짜 선택 */}
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

        {/* 시간 선택 */}
        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">시간 설정</label>
          <div className="w2m-range-box">
            <div className="w2m-time-box" onClick={() => startTimeRef.current.openClock()}>
              <input type="text" value={startTime} readOnly />
              <img src={ClockIcon} alt="시계" />
              <TimePicker
                ref={startTimeRef}
                onChange={setStartTime}
                value={startTime}
                disableClock={true}
                clearIcon={null}
                format="HH:mm"
                className="hidden-timepicker"
              />
            </div>
            <span className="w2m-range-dash">—</span>
            <div className="w2m-time-box" onClick={() => endTimeRef.current.openClock()}>
              <input type="text" value={endTime} readOnly />
              <img src={ClockIcon} alt="시계" />
              <TimePicker
                ref={endTimeRef}
                onChange={setEndTime}
                value={endTime}
                disableClock={true}
                clearIcon={null}
                format="HH:mm"
                className="hidden-timepicker"
              />
            </div>
          </div>
        </div>

        {/* 참여 대상 */}
        <div className="w2m-section w2m-align-left">
          <label className="w2m-label">참여 대상</label>
          <div className="w2m-search-box">
            <img src={SearchIcon} alt="검색" />
            <input type="text" placeholder="이채영" />
          </div>
          <div className="w2m-participants">
            {initialParticipants.map((name, idx) => (
              <div key={idx} className="w2m-participant" onClick={() => toggleParticipant(name)}>
                <img src={selectedParticipants.includes(name) ? CheckedBox : UncheckedBox} alt="체크박스" />
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
