import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../assets/css/CalendarBox.css';

const CalendarBox = () => {
  const [date, setDate] = useState(new Date());

  const meetingDates = [
    new Date(2025, 7, 18),
    new Date(2025, 7, 23),
    new Date(2025, 6, 31),
    new Date(2025, 7, 2),
  ];

  const getMeetingClass = (date) => {
    const match = meetingDates.find(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );
    if (!match) return null;

    
    const day = match.getDate();
    if (day === 18) return 'pink-circle';
    if (day === 23|| day === 2) return 'yellow-circle';
    return 'pink-circle'; // 기본 분홍
  };

  return (
    <div className="calendar-wrapper">
      <Calendar
        onChange={setDate}
        value={date}
        locale="en-US"
        calendarType="gregory"
        className="custom-calendar"
        formatDay={(locale, date) => date.getDate()}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
        }
        tileClassName={({ date, view }) =>
          view === 'month' ? getMeetingClass(date) : null
        }
      />
    </div>
  );
};

export default CalendarBox;