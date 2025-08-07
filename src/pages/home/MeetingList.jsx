import React from 'react';
import WhenToMeet from '../../components/WhenToMeet';
import '../../assets/css/meetingList.css';

const MeetingList = () => {
  const meetings = [
    {
      id: 1,
      title: '이 값은 회의 제목입니다.',
      dateRange: '2025년 11월 25일 PM 11:00',
      location: 'DISCORD 회의 서버',
    },
    {
      id: 2,
      title: '이 값은 회의 제목입니다.',
      dateRange: '2025년 11월 25일 PM 11:00',
      location: 'DISCORD 회의 서버',
    },
    {
      id: 3,
      title: '이 값은 회의 제목입니다.',
      dateRange: '2025년 11월 25일 PM 11:00',
      location: 'DISCORD 회의 서버',
    },
  ];

  return (
    <div className="meeting-list-wrapper">
      <h3 className="meeting-list-title">예정된 회의</h3>
      {meetings.map((meeting) => (
        <WhenToMeet
          key={meeting.id}
          title={meeting.title}
          dateRange={meeting.dateRange}
          location={meeting.location}
          onEnter={() => alert('입장하기 클릭')}
          disabled={false}
        />
      ))}
    </div>
  );
};

export default MeetingList;