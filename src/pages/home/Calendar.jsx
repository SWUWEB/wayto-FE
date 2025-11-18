import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import axios from 'axios';
import Header from '../../components/Header';
import '../../assets/css/calendar.css';
import dropdownIcon from '../../assets/images/Dropdown.png';
import dropupIcon from '../../assets/images/Dropup.png';

const Calendar = () => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const dates = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const [schedule, setSchedule] = useState({});
  const [openIndexes, setOpenIndexes] = useState([]);

  useEffect(() => {
    axios.get('/api/calendar', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      const events = res.data.events;

      /// 날짜별 그룹화
      const grouped = events.reduce((acc, event) => {
      const dateStr = format(new Date(event.startAt), 'yyyy.MM.dd');
      if (!acc[dateStr]) acc[dateStr] = [];
      // 시간 + 제목으로 저장
      const timeStr = format(new Date(event.startAt), 'HH:mm');
      acc[dateStr].push(`${timeStr} - ${event.title}`);
      return acc;
    }, {});

      
      setSchedule(grouped);
    })
    .catch((err) => {
      console.error('캘린더 불러오기 실패:', err);
    });
  }, []);

  const toggleDropdown = (index) => {
    setOpenIndexes(openIndexes.includes(index) ? openIndexes.filter(i => i !== index) : [...openIndexes, index]);
  };

  // 일정 개수에 따라 클래스 반환
  const getEventClass = (count) => {
    if (count === 1) return 'event-1';
    if (count === 2) return 'event-2';
    if (count >= 3) return 'event-3';
    return '';
  };

  return (
    <>
      <Header />
      <div className="calendar-container">
        <h2 className="calendar-title">{format(today, 'M월')}</h2>
        <div className="calendar-grid">
          {days.map((day, idx) => (
            <div key={idx} className="calendar-day">{day}</div>
          ))}

          {/* 이번 달 시작 요일만큼 빈칸 */}
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`spacer-${i}`} className="calendar-cell empty"></div>
          ))}

          {/* 날짜 출력 */}
          {dates.map((dateObj) => {
            const dateStr = format(dateObj, 'yyyy-MM-dd');
            const events = schedule[dateStr] || [];
            const count = events.length;
            const eventClass = getEventClass(count);

            return (
              <div key={dateStr} className={`calendar-cell ${eventClass}`}>
                {dateObj.getDate()}
              </div>
            );
          })}
        </div>
      </div>

      {/* 드롭다운 일정 목록 */}
      <div className="dropdown-container">
        {Object.entries(schedule).map(([dateStr, items], index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div key={index} className="dropdown-wrapper">
              <div className="dropdown-box" onClick={() => toggleDropdown(index)}>
                <span>{dateStr}</span>
                <img
                  src={isOpen ? dropupIcon : dropdownIcon}
                  alt="toggle"
                  className="dropdown-icon small"
                />
              </div>
              {isOpen && (
                <div className="dropdown-content">
                  {items.map((item, i) => (
                    <div key={i} className="dropdown-item">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="bottom-box"></div>
    </>
  );
};

export default Calendar;
