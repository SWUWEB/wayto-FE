import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../../../assets/css/userinfoedit.css";
import "../../../assets/css/userinfoeditleave.css";

import teamLogo from '../../../assets/images/teamLogo.png';
import UserInfoEditLeave from './UserInfoEditLeave';
import Header from "../../../components/Header";

const UserInfoEdit = () => {
  const navigate = useNavigate();

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setSubmitted(true);
    } catch (err) {
      alert("수정 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawConfirm = async () => {
    try {
      setShowLeaveModal(false);
      setWithdrawn(true);
    } catch (e) {
      alert("탈퇴 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <div className="page-wrapper userinfoedit-page">
      <Header />

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
        {withdrawn ? (
           <div className="withdrawn-box">
             <div className="withdrawn-title">
              정상적으로 탈퇴되었습니다.
            </div>
            <p className="withdrawn-desc">
              그동안 서비스를 이용해주셔서 감사합니다.
            </p>
            <button
              className="submit withdrawn-btn"
              onClick={() => navigate("/")}
            >
              홈으로 가기
            </button>
          </div>
        ) : !submitted ? (
          <>
            <form className="signup-form" onSubmit={onSubmit}>
              <h1 className="form-title">회원 정보 수정</h1>

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
                <select><option>2000</option></select>
                <select><option>00</option></select>
                <select><option>00</option></select>
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
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setShowLeaveModal(true)}
                >
                  회원탈퇴
                </button>
                <button className="submit" type="submit" disabled={loading}>
                  {loading ? "저장 중..." : "수정"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="result-box" style={{ textAlign: "center", marginTop: "100px" }}>
               <div style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "-20px" }}>
                 회원 정보가 정상적으로 수정되었습니다.
               </div>
               <p style={{ color: "#000", fontSize: "15px", marginBottom: "24px" }}>
                 요청하신 사항으로 회원정보가 정상적으로 수정되었습니다.
              </p>
              <button
                className="submit"
                onClick={() =>
                  setSubmitted(false)}
                  style={{ padding: "12px 50px", fontSize: 14, width: "100%", display: "block", boxSizing: "border-box"  }}
              >
                돌아가기
              </button>
            </div>
          )}
      </div>

      <div className="page-footer normal-footer" />

      {showLeaveModal && (
        <UserInfoEditLeave
          onClose={() => setShowLeaveModal(false)}
          onConfirm={handleWithdrawConfirm}
        />
      )}
    </div>
  );
};

export default UserInfoEdit;
