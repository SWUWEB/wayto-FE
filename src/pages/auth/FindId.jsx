import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/findid.css";
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png";

const API_BASE = "https://waayto.com";

const FindId = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    verificationCode: "",
  });
  const [errors, setErrors] = useState({});
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "phone" ? value.replace(/\D/g, "") : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "", global: "" }));
  };

  // 인증번호 전송
  const sendVerificationCode = async () => {
    if (!form.phone.trim()) {
      setErrors((prev) => ({ ...prev, phone: "전화번호를 입력해주세요." }));
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
          phone: form.phone.trim(),
          type: "findid",
        }),
      });

      const data = await res.json();
      console.log("인증번호 전송 응답:", res.status, data);

      if (res.status === 200) {
        alert(data.message || "인증번호가 발송되었습니다.");
        setCodeSent(true);
      } else if (res.status === 400) {
        setErrors((prev) => ({
          ...prev,
          global: data.message || "입력 데이터가 올바르지 않습니다.",
        }));
      } else if (res.status === 500) {
        setErrors((prev) => ({
          ...prev,
          global: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          global: `인증번호 전송 중 알 수 없는 오류가 발생했습니다. (코드: ${res.status})`,
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

  // 인증번호 확인
  const verifyCode = async () => {
    if (!form.verificationCode.trim()) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: "인증번호를 입력해주세요.",
      }));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/users/find/id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          phone: form.phone.trim(),
          verificationCode: form.verificationCode.trim(),
        }),
      });

      const data = await res.json();
      console.log("인증번호 확인 응답:", res.status, data);

      if (res.status === 200) {
        // ✅ 여기에 message + instruction 추가됨
        alert(
          JSON.stringify({
            message: "아이디 찾기가 완료되었습니다.",
            instruction: "로그인 페이지로 이동하여 로그인해주세요.",
          })
        );
        alert(`${data.message}\n이메일: ${data.email}`);
        nav("/findidsuccess");
      } else if (res.status === 400) {
        setErrors((prev) => ({
          ...prev,
          global: data.message || "인증번호가 올바르지 않습니다.",
        }));
      } else if (res.status === 404) {
        setErrors((prev) => ({
          ...prev,
          global: "해당 전화번호로 가입된 계정이 없습니다.",
        }));
      } else if (res.status === 500) {
        setErrors((prev) => ({
          ...prev,
          global: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          global: `알 수 없는 오류가 발생했습니다. (코드: ${res.status})`,
        }));
      }
    } catch (err) {
      console.error("인증번호 확인 오류:", err);
      setErrors((prev) => ({
        ...prev,
        global: "서버 연결 오류가 발생했습니다.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // 이메일 찾기
  const handleFindEmail = async () => {
    let hasError = false;
    if (!form.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "이름을 입력해주세요." }));
      hasError = true;
    }
    if (!form.phone.trim()) {
      setErrors((prev) => ({ ...prev, phone: "전화번호를 입력해주세요." }));
      hasError = true;
    }
    if (hasError) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/users/find/id`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
        }),
      });

      const data = await res.json();
      console.log("아이디 찾기 응답:", res.status, data);

      if (res.ok) {
        alert("abcdefg@naver.com");
        nav("/login");
      } else if (res.status === 400) {
        setErrors((prev) => ({
          ...prev,
          global: data.message || "입력한 정보가 올바르지 않습니다.",
        }));
      } else if (res.status === 404) {
        setErrors((prev) => ({
          ...prev,
          global: "해당 정보로 가입된 계정을 찾을 수 없습니다.",
        }));
      } else if (res.status >= 500) {
        setErrors((prev) => ({
          ...prev,
          global: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          global: `아이디 찾기 실패 (코드: ${res.status})`,
        }));
      }
    } catch (err) {
      console.error("아이디 찾기 오류:", err);
      setErrors((prev) => ({
        ...prev,
        global: "서버 연결 오류가 발생했습니다.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="findid-wrapper">
        <header className="findid-header">
          <img src={teamLogo} alt="logo" className="logo" />
          <div className="tab-menu">
            <span className="active">이메일 찾기</span>
            <Link to="/findpw" className="tab-link inactive">
              비밀번호 찾기
            </Link>
          </div>
          <p>회원 정보를 잊어버리셨나요?</p>
        </header>

        <form className="findid-form" onSubmit={(e) => e.preventDefault()}>
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

          {/* 전화번호 + 인증번호 전송 */}
          <div className="phone-row">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
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
          {errors.phone && <span className="alert">{errors.phone}</span>}

          {/* 인증번호 입력 + 확인 */}
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

          <button
            type="button"
            className="findid-button"
            onClick={handleFindEmail}
            disabled={loading}
          >
            이메일 찾기
          </button>
        </form>

        <div className="findid-footer">
          비밀번호가 생각나지 않는다면? <Link to="/findpw">비밀번호 찾기</Link>
        </div>
      </div>
      <div className="page-footer normal-footer" />
    </div>
  );
};

export default FindId;