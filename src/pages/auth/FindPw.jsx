import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/findpw.css";
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png";

const API_BASE = ""; 

const FindPw = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "", global: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", global: "" }));
  };

  const validate = () => {
    const next = { name: "", email: "", global: "" };

    if (!form.name.trim()) next.name = "이름을 입력해주세요.";

    if (!form.email.trim()) {
      next.email = "이메일을 입력해주세요.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        next.email = "올바른 이메일 형식이 아닙니다.";
      }
    }

    setErrors(next);
    return !next.name && !next.email;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/users/find-pw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
        }),
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { raw: text };
      }

      if (!res.ok) {
        if (res.status === 400 || res.status === 404) {
          setErrors((prev) => ({
            ...prev,
            global:
              data?.message ||
              "일치하는 정보를 찾을 수 없습니다. 입력 내용을 확인해주세요.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            global: data?.message || "비밀번호 찾기 중 오류가 발생했습니다.",
          }));
        }
        return;
      }

      // 성공 시 팝업 문구
      window.alert(
        "등록된 이메일로 임시 비밀번호를 전송했습니다. \n마이페이지에서 비밀번호를 변경해주세요."
      );
    } catch (err) {
      console.error("[FIND PW] Network/CORS error:", err);
      setErrors((prev) => ({
        ...prev,
        global: "비밀번호 찾기 중 오류가 발생했습니다.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Header />

      <div className="findpw-wrapper">
        <header className="findpw-header">
          <img src={teamLogo} alt="logo" className="logo" />
          <div className="tab-menu">
            <Link to="/findid" className="tab-link inactive">
              아이디 찾기
            </Link>
            <span className="active">비밀번호 찾기</span>
          </div>
          <p>회원 정보를 잊어버리셨나요?</p>
        </header>

        <form className="findpw-form" onSubmit={onSubmit}>
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

          {/* 이메일 */}
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={onChange}
            disabled={loading}
          />
          {errors.email && <span className="alert">{errors.email}</span>}

          {errors.global && <p className="alert">{errors.global}</p>}

          <button className="findpw-button" type="submit" disabled={loading}>
            {loading ? "요청 중..." : "비밀번호 찾기"}
          </button>
        </form>

        <div className="findpw-footer">
          아이디가 생각나지 않는다면?{" "}
          <Link to="/findid">아이디 찾기</Link>
        </div>
      </div>

      <div className="page-footer normal-footer" />
    </div>
  );
};

export default FindPw;