import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/findpw.css";
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png";

const API_BASE = "https://waayto.com";

const FindPw = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    verificationCode: "",
  });
  const [errors, setErrors] = useState({});
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", global: "" }));
  };

  // 인증번호 전송
  const sendVerificationCode = async () => {
    if (!form.email.trim()) {
      setErrors((prev) => ({ ...prev, email: "이메일을 입력해주세요." }));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/users/idpw-sendnum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          type: "findpw",
        }),
      });

      const data = await res.json();
      console.log("인증번호 전송 응답:", res.status, data);

      if (res.status === 200) {
        alert(data.message || "인증번호가 이메일로 발송되었습니다.");
        setCodeSent(true);
      } else {
        setErrors((prev) => ({
          ...prev,
          global: data.message || "인증번호 전송 중 오류가 발생했습니다.",
        }));
      }
    } catch (err) {
      console.error("인증번호 전송 오류:", err);
      setErrors((prev) => ({
        ...prev,
        global: "서버 연결 오류가 발생했습니다.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // 비밀번호 찾기
  const findPassword = async () => {
    let next = {};

    if (!form.name.trim()) {
      next.name = "이름을 입력해주세요.";
    }

    if (!form.email.trim()) {
      next.email = "이메일을 입력해주세요.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        next.email = "올바른 이메일 형식이 아닙니다.";
      }
    }

    if (Object.keys(next).length > 0) {
      setErrors((prev) => ({ ...prev, ...next }));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/users/find/pw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
        }),
      });

      const data = await res.json();
      console.log("📡 비밀번호 찾기 응답:", res.status, data);

      if (res.status === 200) {
        alert(data.message || "비밀번호 재설정 링크가 이메일로 발송되었습니다.");
        nav("/findpwsuccess");
      } else if (res.status === 404) {
        setErrors((prev) => ({
          ...prev,
          global: data.message || "해당 이메일로 가입된 계정이 없습니다.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          global: data.message || "비밀번호 찾기 중 오류가 발생했습니다.",
        }));
      }
    } catch (err) {
      console.error("비밀번호 찾기 오류:", err);
      setErrors((prev) => ({
        ...prev,
        global: "서버 연결 오류가 발생했습니다.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // 인증번호 확인
  const verifyCode = () => {
    if (!form.verificationCode.trim()) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: "인증번호를 입력해주세요.",
      }));
      return;
    }
    alert(
      JSON.stringify({
        message: "인증번호가 확인되었습니다.",
        instruction: "비밀번호 재설정 링크를 요청해주세요.",
      })
    );
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="findpw-wrapper">
        <header className="findpw-header">
          <img src={teamLogo} alt="logo" className="logo" />
          <div className="tab-menu">
            <Link to="/findid" className="tab-link inactive">
              이메일 찾기
            </Link>
            <span className="active">비밀번호 찾기</span>
          </div>
          <p>회원 정보를 잊어버리셨나요?</p>
        </header>

        <form className="findpw-form" onSubmit={(e) => e.preventDefault()}>
          {/* 이름 */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
            disabled={loading}
          />
          {errors.name && <span className="alert">{errors.name}</span>}

          {/* 이메일 + 인증번호 전송 */}
          <div className="phone-row">
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={onChange}
              disabled={loading}
            />
            <button
              type="button"
              className="verify-btn"
              onClick={sendVerificationCode}
              disabled={loading}
            >
              인증번호 전송
            </button>
          </div>
          {errors.email && <span className="alert">{errors.email}</span>}

          {/* 인증번호 입력칸 + 확인 버튼 */}
          {codeSent && (
            <div className="verify-row">
              <input
                type="text"
                name="verificationCode"
                placeholder="인증번호 입력"
                value={form.verificationCode}
                onChange={onChange}
                disabled={loading}
              />
              <button
                type="button"
                className="confirm-btn"
                onClick={verifyCode}
                disabled={loading}
              >
                인증번호 확인
              </button>
            </div>
          )}
          {errors.verificationCode && (
            <span className="alert">{errors.verificationCode}</span>
          )}

          {errors.global && <p className="alert">{errors.global}</p>}

          {/* 비밀번호 찾기 버튼 */}
          <button
            type="button"
            className="findpw-button"
            onClick={findPassword}
            disabled={loading}
          >
            비밀번호 찾기
          </button>
        </form>

        <div className="findpw-footer">
          이메일이 생각나지 않는다면? <Link to="/findid">이메일 찾기</Link>
        </div>
      </div>
      <div className="page-footer normal-footer" />
    </div>
  );
};

export default FindPw;