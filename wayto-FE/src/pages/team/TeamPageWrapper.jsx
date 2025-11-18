import React, { useState } from 'react';
import Header from '../../components/header';
import TeamHeader from '../../components/TeamHeader';

export default function TeamPageWrapper({ initialTab, children }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const handleEdit = () => {
    alert('팀 정보 편집하기');
  };

  return (
    <>
      <Header />
      <TeamHeader
        teamName="SWUWEB 3기 웨이투회의"
        teamDescription="이 팀은 프로젝트 진행을 위한 팀입니다."
        onEdit={handleEdit}
        activeTab={activeTab}
        onTabSelect={handleTabSelect}
      />
      <div>
        {children}
      </div>
    </>
  );
}
