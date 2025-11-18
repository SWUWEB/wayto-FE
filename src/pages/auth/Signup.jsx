import React, { useMemo, useState, useEffect } from "react";
import "../../assets/css/signup.css";
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const API_BASE = "https://waayto.com";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    emailId: "",
    emailDomain: "",
    phone2: "",
    phone3: "",
    gender: "비공개",
    // [제거] emailCode: "",
  });

  const thisYear = new Date().getFullYear();
  const [birthYear, setBirthYear] = useState(2000);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);

  const yearOptions = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => thisYear - i).map((y) => ({
        value: y,
        label: String(y),
      })),
    [thisYear]
  );

  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => i + 1).map((m) => ({
        value: m,
        label: String(m).padStart(2, "0"),
      })),
    []
  );

  const daysInMonth = useMemo(
    () => new Date(birthYear, birthMonth, 0).getDate(),
    [birthYear, birthMonth]
  );

  const dayOptions = useMemo(
    () =>
      Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => ({
        value: d,
        label: String(d).padStart(2, "0"),
      })),
    [daysInMonth]
  );

  useEffect(() => {
    if (birthDay > daysInMonth) setBirthDay(daysInMonth);
  }, [daysInMonth, birthDay]);

  const [fieldErr, setFieldErr] = useState({});
  const [globalErr, setGlobalErr] = useState("");
  const [loading, setLoading] = useState(false);

  // 상태 관리
  const [emailCheck, setEmailCheck] = useState({ status: "idle", message: "" });
  const [phoneCheck, setPhoneCheck] = useState({ status: "idle", message: "" });
  // [제거] const [emailVerify, setEmailVerify] = useState({ status: "idle", message: "" });

  const emailChecking = emailCheck.status === "checking";
  const phoneChecking = phoneCheck.status === "checking";

  // email + phone 빌드
  const buildEmail = () => {
    const id = form.emailId.trim();
    const domain = form.emailDomain.trim();
    return id && domain ? `${id}@${domain}` : "";
  };

  const buildPhone = () => {
    const p2 = form.phone2.trim();
    const p3 = form.phone3.trim();
    return p2 && p3 ? `010-${p2}-${p3}` : "";
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setFieldErr((prev) => ({ ...prev, [name]: "" }));
    setGlobalErr("");

    if (name === "emailId" || name === "emailDomain")
      setEmailCheck({ status: "idle", message: "" });

    if (name === "phone2" || name === "phone3")
      setPhoneCheck({ status: "idle", message: "" });

    // [제거] if (name === "emailCode") setEmailVerify({ status: "idle", message: "" });
  };

  // 이메일 중복 확인
  const handleEmailCheck = async () => {
    const email = buildEmail();
    if (!EMAIL_REGEX.test(email)) {
      return setEmailCheck({ status: "error", message: "올바른 이메일 형식이 아닙니다." });
    }

    try {
      setEmailCheck({ status: "checking", message: "확인 중..." });

      const res = await fetch(`${API_BASE}/api/users/verify-id`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      setEmailCheck({
        status: data.available ? "available" : "error",
        message: data.message,
      });
    } catch (err) {
      setEmailCheck({ status: "error", message: "서버 오류가 발생했습니다." });
    }
  };

  // 전화번호 중복 확인
  const handlePhoneCheck = async () => {
    const phone = buildPhone();
    if (!/^010-\d{3,4}-\d{4}$/.test(phone)) {
      return setPhoneCheck({ status: "error", message: "올바른 전화번호 형식이 아닙니다." });
    }

    try {
      setPhoneCheck({ status: "checking", message: "확인 중..." });

      const res = await fetch(`${API_BASE}/api/users/verify-phone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      setPhoneCheck({
        status: data.available ? "available" : "error",
        message: data.message,
      });
    } catch (err) {
      setPhoneCheck({ status: "error", message: "서버 요청 실패" });
    }
  };

  // [제거] 인증번호 전송 (handleSendEmailCode) 함수 제거
  // [제거] 인증번호 검증 (handleEmailCodeVerify) 함수 제거

  // 클라이언트 유효성 검사
  const validateClient = () => {
    const e = {};
    const email = buildEmail();

    if (!form.name.trim()) e.name = "이름을 입력해주세요.";
    if (form.password.length < 8) e.password = "비밀번호는 8자 이상이어야 합니다.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "비밀번호가 일치하지 않습니다.";

    if (!form.emailId.trim() || !form.emailDomain.trim())
      e.email = "이메일을 입력해주세요.";
    else if (!EMAIL_REGEX.test(email)) e.email = "올바른 이메일 형식이 아닙니다.";

    if (!form.phone2.trim() || !form.phone3.trim())
      e.phone = "전화번호를 입력해주세요.";

    return e;
  };

  // ✔ 회원가입 제출
  const onSubmit = async (e) => {
    e.preventDefault();

    const fe = validateClient();
    if (Object.keys(fe).length) {
      setFieldErr(fe);
      return;
    }

    setLoading(true);
    setGlobalErr("");
    setFieldErr({});

    const email = buildEmail();
    const phone = buildPhone();

    try {
      const res = await fetch(`${API_BASE}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email,
          password: form.password,
          confirmPassword: form.confirmPassword,
          phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.details?.length) {
          const map = {};
          data.details.forEach((d) => (map[d.field] = d.message));
          setFieldErr(map);
        } else {
          setGlobalErr(data.message || "회원가입 실패");
        }
        return;
      } 
      
      if (data?.token) localStorage.setItem("accessToken", data.token);
      nav("/");
    } catch (err) {
      setGlobalErr("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const rsCommon = {
    menuPlacement: "bottom",
    menuPosition: "fixed",
    menuPortalTarget: document.body,
    isSearchable: false,
    styles: {
      container: (base) => ({ ...base, width: 170 }),
      control: (base, state) => ({
        ...base,
        minHeight: 44,
        height: 44,
        borderRadius: 6,
        borderColor: state.isFocused ? "#888" : "#ccc",
        boxShadow: "none",
        "&:hover": { borderColor: "#bbb" },
      }),
      valueContainer: (b) => ({ ...b, padding: "0 10px" }),
      singleValue: (b) => ({ ...b, fontSize: 14 }),
      input: (b) => ({ ...b, fontSize: 14, margin: 0, padding: 0 }),
      indicatorsContainer: (b) => ({ ...b, height: 44 }),
      menuPortal: (b) => ({ ...b, zIndex: 9999 }),
    },
  };

  const phoneMsgStyle =
    phoneCheck.status === "available"
      ? { color: "#1a7f37" }
      : phoneCheck.status === "error"
      ? { color: "red" }
      : {};

  // [제거] emailVerifyMsgStyle 제거

  const emailMsgStyle =
    emailCheck.status === "available" // emailCheck.status === "success" 제거 (인증번호 전송 성공 상태가 사라짐)
      ? { color: "#1a7f37" }
      : emailCheck.status === "error"
      ? { color: "red" }
      : {};

  return (
    <div className="page-wrapper">
      <Header />

      <div className="signup-wrapper">
        <header className="signup-header">
          <img src={teamLogo} alt="logo" className="logo" />
          <h1>회원가입</h1>
          <p>웨이투회의 회원이 되어주세요.</p>
        </header>

        {globalErr && <p className="global-error">{globalErr}</p>}

        <form className="signup-form" onSubmit={onSubmit}>
          <label>이름 *</label>
          <input
            type="text"
            name="name"
            placeholder="김뫄뫄"
            value={form.name}
            onChange={onChange}
          />
          {fieldErr.name && <span className="alert">{fieldErr.name}</span>}

          {/* 이메일 */}
          <label>이메일 *</label>
          <div className="email-box">
            <input
              type="text"
              name="emailId"
              placeholder="ABCD1234"
              value={form.emailId}
              onChange={onChange}
            />

            <span>@</span>

            <input
              type="text"
              name="emailDomain"
              placeholder="naver.com"
              value={form.emailDomain}
              onChange={onChange}
            />

            <button
              type="button"
              className="email-check"
              onClick={handleEmailCheck}
              disabled={emailChecking || loading}
            >
              {emailChecking ? "확인 중…" : "중복 확인"}
            </button>

            {/* [제거] 인증번호 전송 버튼 제거 */}
          </div>

          {(fieldErr.email || emailCheck.status !== "idle") && (
            <span className="alert" style={emailMsgStyle}>
              {emailCheck.status === "idle" ? fieldErr.email : emailCheck.message}
            </span>
          )}

          {/* [제거] 이메일 인증번호 입력 섹션 전체 제거 */}

          {/* 비밀번호 */}
          <label>비밀번호 *</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={onChange}
          />
          {fieldErr.password && <span className="alert">{fieldErr.password}</span>}

          <label>비밀번호 확인 *</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 입력"
            value={form.confirmPassword}
            onChange={onChange}
          />
          {fieldErr.confirmPassword && (
            <span className="alert">{fieldErr.confirmPassword}</span>
          )}

          {/* 전화번호 */}
          <label>전화번호 *</label>
          <div className="phone-box">
            <span className="phone-fixed">010</span>
            <input
              type="text"
              name="phone2"
              placeholder="0000"
              value={form.phone2}
              onChange={onChange}
              maxLength={4}
            />
            <input
              type="text"
              name="phone3"
              placeholder="0000"
              value={form.phone3}
              onChange={onChange}
              maxLength={4}
            />
            <button
              type="button"
              className="phone-check"
              onClick={handlePhoneCheck}
              disabled={phoneChecking || loading}
            >
              {phoneChecking ? "확인 중…" : "중복 확인"}
            </button>
          </div>

          {(fieldErr.phone || phoneCheck.status !== "idle") && (
            <span className="alert" style={phoneMsgStyle}>
              {phoneCheck.status !== "idle" ? phoneCheck.message : fieldErr.phone}
            </span>
          )}

          {/* 생일 */}
          <label>생년월일 </label>
          <div className="birth-box">
            <Select
              value={{ value: birthYear, label: String(birthYear) }}
              onChange={(o) => setBirthYear(o.value)}
              options={yearOptions}
              {...rsCommon}
            />
            <Select
              value={{ value: birthMonth, label: String(birthMonth).padStart(2, "0") }}
              onChange={(o) => setBirthMonth(o.value)}
              options={monthOptions}
              {...rsCommon}
            />
            <Select
              value={{ value: birthDay, label: String(birthDay).padStart(2, "0") }}
              onChange={(o) => setBirthDay(o.value)}
              options={dayOptions}
              {...rsCommon}
            />
          </div>

          {/* 성별 */}
          <label>성별</label>
          <Select
            value={{ value: form.gender, label: form.gender }}
            onChange={(opt) => setForm((prev) => ({ ...prev, gender: opt.value }))}
            options={[
              { value: "비공개", label: "비공개" },
              { value: "남성", label: "남성" },
              { value: "여성", label: "여성" },
            ]}
            {...rsCommon}
          />

          <div className="button-box">
            <button
              type="button"
              className="cancel"
              onClick={() => nav(-1)}
              disabled={loading}
            >
              취소
            </button>

            <button type="submit" className="submit" disabled={loading}>
              {loading ? "가입 중..." : "회원가입"}
            </button>
          </div>
        </form>
      </div>

      <div className="page-footer normal-footer" />
    </div>
  );
};

export default Signup;