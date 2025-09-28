import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/findid.css";
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png";

const API_BASE = ""; 

const FindId = () => {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({ name: "", phone: "", global: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "") : value; // 숫자만 허용
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: "", global: "" }));
  };

  const validate = () => {
    const next = { name: "", phone: "", global: "" };
    if (!form.name.trim()) next.name = "이름을 입력해주세요.";
    if (!form.phone.trim()) next.phone = "전화번호를 입력해주세요.";
    else if (form.phone.length < 10 || form.phone.length > 11)
      next.phone = "전화번호를 정확히 입력해주세요. (숫자 10~11자리)";
    setErrors(next);
    return !next.name && !next.phone;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/users/find-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
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
              "일치하는 계정을 찾을 수 없습니다. 입력 정보를 확인해주세요.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            global: data?.message || "아이디 찾기 중 오류가 발생했습니다.",
          }));
        }
        return;
      }

      // 성공 시 팝업 문구
      window.alert("등록된 전화번호로 기존 아이디를 전송했습니다.");
    } catch (err) {
      console.error("[FIND ID] Network/CORS error:", err);
      setErrors((prev) => ({
        ...prev,
        global: "아이디 찾기 중 오류가 발생했습니다.",
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
            <span className="active">아이디 찾기</span>
            <Link to="/findpw" className="tab-link inactive">
              비밀번호 찾기
            </Link>
          </div>
          <p>회원 정보를 잊어버리셨나요?</p>
        </header>

        <form className="findid-form" onSubmit={onSubmit}>
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

          {/* 전화번호 */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={onChange}
            disabled={loading}
          />
          {errors.phone && <span className="alert">{errors.phone}</span>}

          {errors.global && <p className="alert">{errors.global}</p>}

          <button className="findid-button" type="submit" disabled={loading}>
            {loading ? "요청 중..." : "아이디 찾기"}
          </button>
        </form>

        <div className="findid-footer">
          비밀번호가 생각나지 않는다면?{" "}
          <Link to="/findpw">비밀번호 찾기</Link>
        </div>
      </div>

      <div className="page-footer normal-footer" />
    </div>
  );
};

export default FindId;