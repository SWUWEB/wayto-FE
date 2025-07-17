import React from 'react';
import Header from '../../components/Header';  // Header.jsx가 같은 폴더에 있다고 가정

const MeetingMinuteList = () => {
  return (
    <>
      <Header />
      {/* 여기서부터 미팅 리스트 내용 */}
      <div>
        {/* 미팅 내용들 */}
        <p>회의 내용이 여기에 나옵니다.</p>
      </div>
    </>
  );
};

export default MeetingMinuteList;
