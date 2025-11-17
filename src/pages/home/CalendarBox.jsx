import React, { useState, useEffect } from 'react';
import '../../assets/css/CalendarBox.css';
import axios from "axios";

const CalendarBox = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [events, setEvents] = useState([]);

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

  //캘린더 연동
  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get("https://www.waytomeet.site/api/calendar", {
          params: { year, month },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(response.data.events);
      } catch (error) {
        console.error("캘린더 조회 실패:", error);
      }
    };

    fetchCalendar();
  }, [year, month]);

  const hasEvent = (date) => {
    return events.some(ev => {
      const start = new Date(ev.startAt).getDate();
      return start === date;
    });
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
          const dayOfWeek = (firstDay + idx) % 7;
          const extraClass =
            dayOfWeek === 0 ? 'sunday' : dayOfWeek === 6 ? 'saturday' : '';

          const isEventDay = hasEvent(date);
          const cellClass = isEventDay
            ? 'calendar-cell-small event'
            : 'calendar-cell-small';

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