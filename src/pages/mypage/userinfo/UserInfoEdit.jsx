import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../../../assets/css/userinfoedit.css";
import "../../../assets/css/userinfoeditleave.css";

import teamLogo from '../../../assets/images/teamLogo.png';
import UserInfoEditLeave from './UserInfoEditLeave';
import Header from "../../../components/Header";

import EmailVerificationPopup from "./EmailVerificationPopup"; 

const UserInfoEdit = () => {
  const navigate = useNavigate();

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false); 
  const [submitted, setSubmitted] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");

  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");

  const [birthYear, setBirthYear] = useState("2000");
  const [birthMonth, setBirthMonth] = useState("01");
  const [birthDay, setBirthDay] = useState("01");

  const [gender, setGender] = useState("비공개");

  const handleEmailVerify = async () => {
    if (!email1 || !email2 || !password) {
      alert("이메일과 비밀번호를 입력해주세요!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("https://waayto.com/api/users/email-change/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newEmail: `${email1}@${email2}`,
          currentPassword: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "인증번호 발송 실패");
        return;
      }

      alert(data.message || "인증코드가 발송되었습니다.");
      setShowEmailPopup(true); 
    } catch (err) {
      console.error(err);
      alert("요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const phone =
        phone1 && phone2 && phone3
          ? `${phone1}-${phone2}-${phone3}`
          : undefined;

      const birthday = `${birthYear}-${birthMonth}-${birthDay}`;

      let genderValue;
      if (gender === "남성") genderValue = "male";
      else if (gender === "여성") genderValue = "female";
      else genderValue = "private";

      const email = `${email1}@${email2}`;

      const body = {
        name,
        phone,
        birthday,
        gender: genderValue,
        email,
      };

      Object.keys(body).forEach(
        (key) => body[key] === undefined && delete body[key]
      );

      const token = localStorage.getItem("accessToken");

      const res = await fetch("https://waayto.com/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "수정 중 오류가 발생했습니다.");
        return;
      }

      if (password && passwordCheck) {
        if (password !== passwordCheck) {
          alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          return;
        }

        const passwordRes = await fetch("https://waayto.com/api/users/me/password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: password,   
            newPassword: passwordCheck, 
            confirmNewPassword: passwordCheck,
          }),
        });

        const passwordData = await passwordRes.json();

        if (!passwordRes.ok) {
          alert(passwordData.error || "비밀번호 변경 중 오류가 발생했습니다.");
          return;
        }
      }

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
        {!withdrawn && !submitted ? (
          <form className="signup-form" onSubmit={onSubmit}>
            <h1 className="form-title">회원 정보 수정</h1>

            <label>이름 *</label>
            <input type="text" placeholder="김뫄뫄" value={name} onChange={(e) => setName(e.target.value)} />
            <span className="alert">* 안내메시지입니다.</span>

            <label>아이디 *</label>
            <input type="text" placeholder="ABCD1234" value={id} onChange={(e) => setId(e.target.value)} />
            <span className="alert">* 안내메시지입니다.</span>

            <label>비밀번호 *</label>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="alert">* 안내메시지입니다.</span>

            <label>비밀번호 확인 *</label>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <span className="alert">* 안내메시지입니다.</span>

            <label>이메일 *</label>
            <div className="email-box">
              <input type="text" placeholder="ABCD1234" value={email1} onChange={(e) => setEmail1(e.target.value)} />
              <span>@</span>
              <input type="text" placeholder="naver.com" value={email2} onChange={(e) => setEmail2(e.target.value)} />
              <button 
                type="button" 
                className="email-check"
                onClick={handleEmailVerify}
              >
                이메일 인증
              </button>
            </div>
            <span className="alert">* 안내메시지입니다.</span>

            <label>전화번호</label>
            <div className="phone-box">
              <input type="text" placeholder="010" value={phone1} onChange={(e) => setPhone1(e.target.value)} />
              <input type="text" placeholder="0000" value={phone2} onChange={(e) => setPhone2(e.target.value)} />
              <input type="text" placeholder="0000" value={phone3} onChange={(e) => setPhone3(e.target.value)} />
            </div>

            <label>생년월일 *</label>
            <div className="birth-box">

              <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
                {Array.from(
                  { length: new Date().getFullYear() - 1899 },
                  (_, i) => {
                    const year = 1900 + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  }
                )}
              </select>

              <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
                {[...Array(12)].map((_, i) => (
                  <option key={i}>{String(i + 1).padStart(2, "0")}</option>
                ))}
              </select>

              <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
                {[...Array(31)].map((_, i) => (
                  <option key={i}>{String(i + 1).padStart(2, "0")}</option>
                ))}
              </select>

            </div>
            <span className="alert">* 안내메시지입니다.</span>

            <label>성별</label>
            <select
              className="gender-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
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
        ) : withdrawn ? (
          <div className="withdrawn-box">
            <div className="withdrawn-title">정상적으로 탈퇴되었습니다.</div>
            <p className="withdrawn-desc">그동안 서비스를 이용해주셔서 감사합니다.</p>
            <button className="submit withdrawn-btn" onClick={() => navigate("/")}>
              홈으로 가기
            </button>
          </div>
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
              onClick={() => setSubmitted(false)}
              style={{
                padding: "12px 50px",
                fontSize: 14,
                width: "100%",
                display: "block",
                boxSizing: "border-box",
              }}
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

      {showEmailPopup && (
        <EmailVerificationPopup
          onClose={() => setShowEmailPopup(false)}
        />
      )}
    </div>
  );
};

export default UserInfoEdit;
