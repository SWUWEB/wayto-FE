import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/userinfoedit.css";
import "../../assets/css/userinfoeditleave.css";
import teamLogo from '../../assets/images/teamLogo.png';
import UserInfoEditLeave from './UserInfoEditLeave';

const UserInfoEdit = () => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  return (
    <div className="page-wrapper userinfoedit-page">
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/wayto.svg" alt="logo" className="navbar-logo" />
          <span className="navbar-title">웨이투회의</span>
        </div>
        <div className="navbar-right">
          <a href="/">홈</a>
          <a href="/calendar">내 캘린더</a>
          <a href="/team">팀 생성하기</a>
          <a href="/mypage" className="active">마이페이지</a>
        </div>
      </nav>

      <div className="teamHeader__header-container">
        <img src={teamLogo} alt="team logo" className="teamHeader__logo" />
        <div className="teamHeader__info">
          <h1 className="teamHeader__team-name">회원 이름입니다.</h1>
          <p className="teamHeader__description">
            반갑습니다, ○○○님.<br />
            웨이투회의를 통해 팀을 만들고, 일정을 조율해 보세요.
          </p>
        </div>
      </div>

      <div className="teamHeader__tab-container">
        <button className="teamHeader__tab teamHeader__active">회원 정보</button>
        <button className="teamHeader__tab">1:1 문의</button>
      </div>

      <div className="signup-wrapper">
        <header className="signup-header">
          <h1>회원 정보 수정</h1>
        </header>

        <form className="signup-form">
          <label>이름 *</label>
          <input type="text" placeholder="김뫄뫄" />
          <span className="alert">* 안내메시지입니다.</span>

          <label>아이디 *</label>
          <input type="text" placeholder="ABCD1234" />
          <span className="alert">* 안내메시지입니다.</span>

          <label>비밀번호 *</label>
          <input type="password" placeholder="비밀번호 입력" />
          <span className="alert">* 안내메시지입니다.</span>

          <label>비밀번호 확인 *</label>
          <input type="password" placeholder="비밀번호 입력" />
          <span className="alert">* 안내메시지입니다.</span>

          <label>이메일 *</label>
          <div className="email-box">
            <input type="text" placeholder="ABCD1234" />
            <span>@</span>
            <input type="text" placeholder="naver.com" />
            <button type="button" className="email-check">이메일 중복 확인</button>
          </div>
          <span className="alert">* 안내메시지입니다.</span>

          <label>전화번호</label>
          <div className="phone-box">
            <input type="text" placeholder="010" />
            <input type="text" placeholder="0000" />
            <input type="text" placeholder="0000" />
          </div>

          <label>생년월일 *</label>
          <div className="birth-box">
            <select>
              <option>2000</option>
            </select>
            <select>
              <option>00</option>
            </select>
            <select>
              <option>00</option>
            </select>
          </div>
          <span className="alert">* 안내메시지입니다.</span>

          <label>성별</label>
          <select className="gender-select">
            <option>비공개</option>
            <option>남성</option>
            <option>여성</option>
          </select>
          <span className="alert">* 안내메시지입니다.</span>

          <div className="button-box">
            <button type="button" className="cancel" onClick={() => setShowLeaveModal(true)}>
              회원탈퇴
            </button>
            <button className="submit">수정</button>
          </div>
        </form>
      </div>

      <div className="page-footer normal-footer" />

      {showLeaveModal && (
        <UserInfoEditLeave onClose={() => setShowLeaveModal(false)} />
      )}
    </div>
  );
};

export default UserInfoEdit;