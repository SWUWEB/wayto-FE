import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../assets/css/CalendarBox.css';

const CalendarBox = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-wrapper">
      <Calendar
        onChange={setDate}
        value={date}
        locale="en-US"
        calendarType="gregory"
        className="custom-calendar"
        formatDay={(locale, date) => date.getDate()} // 날짜 숫자만 보이게
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}  //요일 영어 첫글자만 보이게
      />
    </div>
  );
};

export default CalendarBox;