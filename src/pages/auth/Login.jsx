import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/login.css";
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png";

const API_BASE = "";

const Login = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", global: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", global: "" }));
  };

  const onSubmit = async (e) => {
  e.preventDefault();

  const next = { email: "", password: "", global: "" };

  if (!form.email.trim()) {
    next.email = "이메일을 입력해주세요.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      next.email = "올바른 이메일 형식이 아닙니다.";
    }
  }
  
  if (!form.password.trim()) {
    next.password = "비밀번호를 입력해주세요.";
  }

  if (next.email || next.password) {
    setErrors(next);
    return;
  }

  try {
    setLoading(true);
    setErrors({ email: "", password: "", global: "" });

    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: form.email.trim(), password: form.password }),
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      if (res.status === 400 || res.status === 401) {
        setErrors({ email: "", password: "", global: "이메일 또는 비밀번호를 다시 입력해주세요." });
      } else {
        setErrors({ email: "", password: "", global: data?.message || "로그인 중 오류가 발생했습니다." });
      }
      return;
    }

    if (data?.token) localStorage.setItem("accessToken", data.token);
    nav("/");
  } catch (err) {
    console.error("[LOGIN] Network/CORS error:", err);
    setErrors({ email: "", password: "", global: "네트워크/CORS 오류가 발생했습니다." });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page-wrapper">
      <Header />

      <div className="login-wrapper">
        <header className="login-header">
          <img src={teamLogo} alt="logo" className="logo" />
          <h1>로그인</h1>
          <p>웨이투회의에 오신 걸 환영합니다.</p>
        </header>

        <form className="login-form" onSubmit={onSubmit}>
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

          {/* 비밀번호 */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            disabled={loading}
          />
          {errors.password && <span className="alert">{errors.password}</span>}
          {errors.global && <p className="alert">{errors.global}</p>}

          <div className="login-options">
            <Link to="/findid">아이디 찾기</Link>
            <span className="divider">|</span>
            <Link to="/findpw">비밀번호 찾기</Link>
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="login-footer">
          아직 회원이 아니신가요?{" "}
          <Link to="/signup">회원가입 하기</Link>
        </div>
      </div>

      <div className="page-footer normal-footer" />
    </div>
  );
};

export default Login;