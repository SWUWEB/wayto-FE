import React, { useState } from 'react';
import Header from '../../components/Header';
import '../../assets/css/calendar.css';
import dropdownIcon from '../../assets/images/Dropdown.png';
import dropupIcon from '../../assets/images/Dropup.png';

const Calendar = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);
  const highlightPink = 18;
  const highlightYellow = [23, 26];

  const [openIndexes, setOpenIndexes] = useState([]);

  const schedule = {
    '06/18 (수)': ['23:00 - SWUWED 3차 일정회의', '24:00 - 회의 보고서 제출'],
    '06/23 (월)': ['22:00 - 웨이투회의 FT 정기회의'],
    '06/26 (목)': ['22:00 - 웨이투회의 회의']
  };

  const toggleDropdown = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <>
      <Header />
        <div className="calendar-container">
          <h3 className="calendar-title">6월</h3>
          <div className="calendar-grid">
            {days.map((day, idx) => (
              <div key={idx} className="calendar-day">
                {day}
              </div>
            ))}
            {Array.from({ length: 6 }, (_, i) => (
              <div key={`spacer-${i}`} className="calendar-cell empty"></div>
            ))}
            {dates.map((date) => {
              const isPink = date === highlightPink;
              const isYellow = highlightYellow.includes(date);
              const cellClass = isPink
                ? 'calendar-cell pink'
                : isYellow
                ? 'calendar-cell yellow'
                : 'calendar-cell';
              return (
                <div key={date} className={cellClass}>
                  {date}
                </div>
              );
            })}
          </div>
        </div>

        <div className="dropdown-container">
          {Object.entries(schedule).map(([date, items], index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div key={index} className="dropdown-wrapper">
                <div className="dropdown-box" onClick={() => toggleDropdown(index)}>
                  <span>{date}</span>
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
      <div class="bottom-box"></div>
    </>
  );
};

export default Calendar;
