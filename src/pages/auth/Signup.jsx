import React, { useMemo, useState, useEffect } from "react";
import "../../assets/css/signup.css";
import Header from "../../components/Header";
import teamLogo from "../../assets/images/teamLogo.png";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const API_BASE = "";

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
    emailCode: "",
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

  const [emailCheck, setEmailCheck] = useState({ status: "idle", message: "" });
  const [phoneCheck, setPhoneCheck] = useState({ status: "idle", message: "" });
  const [emailVerify, setEmailVerify] = useState({ status: "idle", message: "" });

  const emailChecking = emailCheck.status === "checking";
  const phoneChecking = phoneCheck.status === "checking";

  class AppError extends Error {
    constructor(code, message) {
      super(message);
      this.code = code;
    }
  }

  const fail = (code, message) => {
    throw new AppError(code, message);
  };

  const postJSON = async (url, body) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return { res, data };
  };

  const runStep = async ({
    setStatus,
    checkingMessage,
    tryFn,
    success,
    errorMessageDefault,
  }) => {
    try {
      setStatus({ status: "checking", message: checkingMessage });
      const maybeSuccessOverride = await tryFn();
      setStatus(
        maybeSuccessOverride?.message
          ? { status: success.status, message: maybeSuccessOverride.message }
          : success
      );
    } catch (err) {
      const msg =
        err?.message ||
        errorMessageDefault ||
        "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      setStatus({ status: "error", message: msg });
    }
  };

  const MSG = {
    checking: "확인 중입니다…",
    neterr: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    email: {
      invalid: "올바른 이메일 형식이 아닙니다.",
      verifyFail: "이메일 확인 중 오류가 발생했습니다.",
      taken: "이미 가입된 이메일입니다.",
      available: "사용 가능한 이메일입니다. 이메일로 전송된 인증번호를 입력해 주세요.",
      sendFail: "인증번호 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      codeEmpty: "인증번호를 입력해주세요.",
      codeInvalid: "인증번호가 올바르지 않습니다. 다시 확인해주세요.",
      codeOk: "이메일 인증이 완료되었습니다.",
      needDupCheck: "이메일 중복 확인을 먼저 진행해주세요.",
    },
    phone: {
      invalid: "올바른 전화번호 형식이 아닙니다.",
      verifyFail: "전화번호 확인 중 오류가 발생했습니다.",
      taken: "이미 사용 중인 전화번호입니다.",
      ok: "사용 가능한 전화번호입니다.",
    },
  };

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
    if (name === "emailCode") setEmailVerify({ status: "idle", message: "" });
  };

  const handleEmailCheck = async () => {
    const email = buildEmail();
    if (!email) return;

    if (!EMAIL_REGEX.test(email)) {
      return setEmailCheck({ status: "error", message: MSG.email.invalid });
    }

    await runStep({
      setStatus: setEmailCheck,
      checkingMessage: MSG.checking,
      errorMessageDefault: MSG.neterr,
      success: { status: "available", message: MSG.email.available },
      tryFn: async () => {

        const { res: vRes, data: vData } = await postJSON(`${API_BASE}/api/users/verify-id`, {
          email,
        });
        if (!vRes.ok) fail("VERIFY_FAILED", vData?.message || MSG.email.verifyFail);
        if (vData?.available !== true) fail("EMAIL_TAKEN", MSG.email.taken);

        const { res: sRes, data: sData } = await postJSON(
          `${API_BASE}/api/users/email/send-code`,
          { email }
        );
        if (!sRes.ok) fail("SEND_FAILED", sData?.message || MSG.email.sendFail);
      },
    });
  };

  const handleEmailCodeVerify = async () => {
    const email = buildEmail();
    if (!email) {
      return setEmailVerify({ status: "error", message: MSG.email.needDupCheck });
    }
    const code = form.emailCode.trim();
    if (!code) {
      return setEmailVerify({ status: "error", message: MSG.email.codeEmpty });
    }

    await runStep({
      setStatus: setEmailVerify,
      checkingMessage: MSG.checking,
      errorMessageDefault: MSG.neterr,
      success: { status: "success", message: MSG.email.codeOk },
      tryFn: async () => {
        const { res, data } = await postJSON(`${API_BASE}/api/users/email/verify-code`, {
          email,
          code,
        });
        if (!res.ok) fail("VERIFY_FAILED", data?.message || MSG.email.verifyFail);
        if (data?.valid !== true) fail("INVALID_CODE", MSG.email.codeInvalid);
      },
    });
  };

  const handlePhoneCheck = async () => {
    const phone = buildPhone();
    if (!phone) return;

    if (!/^010-\d{3,4}-\d{4}$/.test(phone)) {
      return setPhoneCheck({ status: "error", message: MSG.phone.invalid });
    }

    await runStep({
      setStatus: setPhoneCheck,
      checkingMessage: MSG.checking,
      errorMessageDefault: MSG.neterr,
      success: { status: "available", message: MSG.phone.ok },
      tryFn: async () => {
        const { res, data } = await postJSON(`${API_BASE}/api/users/verify-phone`, { phone });
        if (!res.ok) fail("VERIFY_FAILED", data?.message || MSG.phone.verifyFail);
        if (data?.available !== true) fail("PHONE_TAKEN", data?.message || MSG.phone.taken);
      },
    });
  };

  const validateClient = () => {
    const e = {};
    const email = buildEmail();

    if (!form.name.trim()) e.name = "이름을 입력해주세요.";
    if (form.password.length < 8) e.password = "비밀번호를 입력해주세요.";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "비밀번호가 일치하지 않습니다.";

    if (!form.emailId.trim() || !form.emailDomain.trim()) {
      e.email = "이메일을 입력해주세요.";
    } else if (!EMAIL_REGEX.test(email)) {
      e.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!form.phone2.trim() || !form.phone3.trim()) {
      e.phone = "전화번호를 입력해주세요.";
    }

    return e;
  };

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
    const phoneRaw = buildPhone();

    const payload = {
      name: form.name,
      email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      ...(phoneRaw ? { phone: phoneRaw } : {}),
    };

    try {
      const res = await fetch(`${API_BASE}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { raw: text };
      }

      if (!res.ok) {
        if (data?.details?.length) {
          const map = {};
          data.details.forEach((d) => (map[d.field] = d.message));
          setFieldErr(map);
        } else {
          setGlobalErr(
            data?.message ||
              data?.error ||
              (typeof data?.raw === "string"
                ? data.raw
                : "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.")
          );
        }
        return;
      }

      if (data?.token) localStorage.setItem("accessToken", data.token);
      nav("/");
    } catch (err) {
      console.error("[SIGNUP] Network/CORS error:", err);
      setGlobalErr("네트워크/CORS 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const rsCommon = {
    menuPlacement: "bottom",
    menuPosition: "fixed",
    menuPortalTarget: typeof document !== "undefined" ? document.body : null,
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
      menu: (b) => ({ ...b, zIndex: 9999 }),
      option: (b, s) => ({
        ...b,
        fontSize: 14,
        backgroundColor: s.isFocused ? "#eee" : "#fff",
        color: "#000",
      }),
    },
  };

  const emailMsgStyle =
    emailCheck.status === "available"
      ? { color: "#1a7f37" }
      : emailCheck.status === "unavailable" || emailCheck.status === "error"
      ? { color: "red" }
      : {};

  const phoneMsgStyle =
    phoneCheck.status === "available"
      ? { color: "#1a7f37" }
      : phoneCheck.status === "unavailable" || phoneCheck.status === "error"
      ? { color: "red" }
      : {};

  const emailVerifyMsgStyle =
    emailVerify.status === "success"
      ? { color: "#1a7f37" }
      : emailVerify.status === "error"
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
          {/* 이름 */}
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
              disabled={loading || emailChecking}
            >
              {emailChecking ? "확인 중…" : "이메일 중복 확인"}
            </button>
          </div>
          {(fieldErr.email || emailCheck.status !== "idle") && (
            <span className="alert" style={emailMsgStyle}>
              {emailCheck.status === "idle" ? fieldErr.email : emailCheck.message}
            </span>
          )}

          {/* 이메일 인증번호 */}
          <label>이메일 인증번호 *</label>
          <div className="email-verify-box">
            <input
              type="text"
              name="emailCode"
              placeholder="인증번호 입력"
              value={form.emailCode}
              onChange={onChange}
            />
            <button
              type="button"
              className="email-verify"
              onClick={handleEmailCodeVerify}
              disabled={loading}
            >
              인증번호 확인
            </button>
          </div>
          {emailVerify.status !== "idle" && (
            <span className="alert" style={emailVerifyMsgStyle}>
              {emailVerify.message}
            </span>
          )}

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

          {/* 비밀번호 확인 */}
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
              disabled={loading || phoneChecking}
            >
              {phoneChecking ? "확인 중…" : "전화번호 중복 확인"}
            </button>
          </div>
          {(fieldErr.phone || phoneCheck.status !== "idle") && (
            <span
              className="alert"
              style={
                phoneCheck.status !== "idle"
                  ? { color: phoneCheck.status === "available" ? "#1a7f37" : "red" }
                  : undefined
              }
            >
              {phoneCheck.status !== "idle" ? phoneCheck.message : fieldErr.phone}
            </span>
          )}

          {/* 생년월일 */}
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