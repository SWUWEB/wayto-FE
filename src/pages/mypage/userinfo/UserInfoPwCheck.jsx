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
    setDesc(DEFAULT_MSG);

    try {
      const ok = password === "test1234"; // 임시 비밀번호
      if (!ok) {
        setDesc("입력하신 비밀번호가 일치하지 않습니다. 다시 한 번 입력해 주세요.");
        setIsError(true);
      } else {
        navigate("/mypage/userInfo/edit");
      }
    } catch {
      setDesc("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyPageWrapper userName="회원 이름입니다.">
      <div className="userinfopw-page">
        <form className="error-form" onSubmit={handleSubmit}>
          <p className="error-title">비밀번호 확인</p>
          <p
            className="error-desc"
            aria-live="assertive"
            style={isError ? { color: "#d21" } : undefined}
          >
            {desc}
          </p>

          <input type="text" value="ABCD1234(아이디자동입력)" disabled />
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (isError) {
                setIsError(false);
                setDesc(DEFAULT_MSG);
              }
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