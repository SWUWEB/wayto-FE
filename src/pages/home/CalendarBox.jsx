import React, { useState } from 'react';

import '../../assets/css/CalendarBox.css';

const CalendarBox = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const highlightPink = 18;
  const highlightYellow = [23, 26];

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const changeMonth = (offset) => {
    let newMonth = month + offset;
    let newYear = year;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

   return (
    <div className="calendar-container-small">
      {/* 월 표시 + 변경 버튼 */}
      <div className="calendar-header">
        <button className="month-btn" onClick={() => changeMonth(-1)}>◀</button>
        <h2 className="calendar-month">{month}월</h2>
        <button className="month-btn" onClick={() => changeMonth(1)}>▶</button>
      </div>

      <div className="calendar-grid-small">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`calendar-day-small ${
              idx === 0 ? 'sunday' : idx === 6 ? 'saturday' : ''
            }`}
          >
            {day}
          </div>
        ))}

        {/* 빈칸 */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="calendar-cell-small empty"></div>
        ))}

        {/* 날짜 */}
        {dates.map((date, idx) => {
          const isPink = date === highlightPink;
          const isYellow = highlightYellow.includes(date);

          const cellClass = isPink
            ? 'calendar-cell-small pink'
            : isYellow
            ? 'calendar-cell-small yellow'
            : 'calendar-cell-small';

          // 요일 색상 적용
          const dayOfWeek = (firstDay + idx) % 7;
          const extraClass =
            dayOfWeek === 0 ? 'sunday' : dayOfWeek === 6 ? 'saturday' : '';

          return (
            <div key={date} className={`${cellClass} ${extraClass}`}>
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarBox;