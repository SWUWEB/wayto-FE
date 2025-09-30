import React, { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
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
  const highlightPink = '2025-08-18';
  const highlightYellow = ['2025-08-23', '2025-08-26'];

  const [openIndexes, setOpenIndexes] = useState([]);

  const schedule = {
    '2025-08-18': ['23:00 - SWUWED 3차 일정회의', '24:00 - 회의 보고서 제출'],
    '2025-08-23': ['22:00 - 웨이투회의 FT 정기회의'],
    '2025-08-26': ['22:00 - 웨이투회의 회의']
  };

  const toggleDropdown = (index) => {
    setOpenIndexes(openIndexes.includes(index) ? openIndexes.filter(i => i !== index) : [...openIndexes, index]);
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
            const isPink = dateStr === highlightPink;
            const isYellow = highlightYellow.includes(dateStr);
            const cellClass = isPink
              ? 'calendar-cell pink'
              : isYellow
              ? 'calendar-cell yellow'
              : 'calendar-cell';
            return (
              <div key={dateStr} className={cellClass}>
                {dateObj.getDate()}
              </div>
            );
          })}
        </div>
      </div>

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
