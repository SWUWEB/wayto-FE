import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../../assets/css/EmailVerificationPopup.css";
import teamLogo from "../../../assets/images/teamLogo.png";

const EmailVerificationPopup = ({ onClose }) => {
  const [code, setCode] = useState("");
  const [step, setStep] = useState("input"); 
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!code) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("https://waayto.com/api/users/me/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "VerificationExpired") {
          alert("인증 코드가 만료되었습니다. 다시 발송해주세요.");
          setStep("fail");
        } else {
          alert(data.message || "인증 실패");
          setStep("fail");
        }
        return;
      }

      setStep("success");
    } catch (err) {
      console.error(err);
      alert("인증 중 오류가 발생했습니다.");
      setStep("fail");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setCode("");
    setStep("input");
  };

  return ReactDOM.createPortal(
    <div className="email-popup-backdrop">
      <div className="email-popup">
        <button className="popup-close" onClick={onClose}>×</button>
        <div className="popup-content">
          <img src={teamLogo} alt="team logo" className="popup-logo" />

          <h2 className="popup-title">이메일 인증</h2>

          {step === "input" && (
            <>
              <p className="popup-desc">
                입력하신 이메일로 인증번호를 발송했습니다.<br />
                인증번호를 입력해주세요.
              </p>
              <input
                className="popup-input"
                type="text"
                placeholder="인증번호 입력"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button className="popup-btn" onClick={handleCheck} disabled={loading}>
                {loading ? "확인 중..." : "인증번호 확인"}
              </button>
            </>
          )}

          {step === "success" && (
            <>
              <p className="popup-desc">이메일 인증에 성공했습니다!</p>
              <button className="popup-btn" onClick={onClose}>확인</button>
            </>
          )}

          {step === "fail" && (
            <>
              <p className="popup-desc">인증번호가 일치하지 않습니다.</p>
              <button className="popup-btn" onClick={handleRetry}>
                다시 시도
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EmailVerificationPopup;
