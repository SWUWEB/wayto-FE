import React from "react";
import "../../assets/css/signup.css";
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png"; // 로그인과 동일 로고 사용

const Signup = () => {
  return (
    <div className="page-wrapper">
      {/* 공통 네비게이션바 */}
      <Header />

      {/* 본문 */}
      <div className="signup-wrapper">
        <header className="signup-header">
          <img src={teamLogo} alt="logo" className="logo" /> {/* 로고 교체 */}
          <h1>회원가입</h1>
          <p>웨이투회의 회원이 되어주세요.</p>
        </header>

        {/* 폼: 로그인과 동일 폭/간격 규칙 */}
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

          {/* 버튼 영역: 로그인과 동일 폭 규칙(90%/600) + 위 여백 20px */}
          <div className="button-box">
            <button type="button" className="cancel">취소</button>
            <button type="submit" className="submit">회원가입</button>
          </div>
        </form>
      </div>

      {/* 공통 푸터 */}
      <div className="page-footer normal-footer" />
    </div>
  );
};

export default Signup;