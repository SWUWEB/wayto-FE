import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/userinfopwcheck.css";
import MyPageWrapper from "../MyPageWrapper";

const DEFAULT_MSG =
  "회원님의 정보를 안전하게 보호하기 위해 비밀번호를 한 번 더 확인합니다.";

function UserInfoPwCheck() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [desc, setDesc] = useState(DEFAULT_MSG);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError(false);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsError(true);
      setDesc("로그인이 필요한 서비스입니다.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://waayto.com/api/users/me/password-check", {
        method: "POST",
        headers: {
          Accept: "application/json",  
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      console.log("응답:", response.status, data);

      if (response.ok && data.valid) {  
        navigate("/mypage/userInfo/edit");
      } else {
        setIsError(true);
        setDesc(data.message || "비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      setIsError(true);
      setDesc("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyPageWrapper userName="회원 이름입니다.">
      <div className="userinfopw-page">
        <form className="error-form" onSubmit={handleSubmit}>
          <p className="error-title">비밀번호 확인</p>
          <p className="error-desc" style={isError ? { color: "#d21" } : undefined}>
            {desc}
          </p>

          <input type="text" value="ABCD1234(아이디자동입력)" disabled />
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsError(false);
              setDesc(DEFAULT_MSG);
            }}
          />
          <button type="submit" disabled={loading}>
            {loading ? "확인 중..." : "확인"}
          </button>
        </form>
        <div className="page-footer normal-footer" />
      </div>
    </MyPageWrapper>
  );
}

export default UserInfoPwCheck;