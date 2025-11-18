import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import MyPageHeader from '../../components/MyPageHeader';

export default function MyPageWrapper({ children }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name || '');
        console.log('userInfo loaded:', user);
      } catch (err) {
        console.error('userInfo 파싱 실패:', err);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <MyPageHeader userName={userName || '회원 이름'} />
      <div>{children}</div>
    </>
  );
}
