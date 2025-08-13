import React from 'react';
import Header from '../../components/Header';
import MyPageHeader from '../../components/MyPageHeader';

export default function MyPageWrapper({ children, userName }) {
  return (
    <>
      <Header />
      <MyPageHeader userName={userName} />
      <div>{children}</div>
    </>
  );
}