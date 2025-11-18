import React, { useState } from "react";
import axios from "axios";
import "../../../assets/css/userinfoeditleave.css";

const UserInfoEditLeave = ({ onClose }) => {
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!agree || loading) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      const response = await axios.delete("https://waayto.com/api/users/me", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert(response.data.message || "회원 탈퇴가 완료되었습니다.");

        localStorage.removeItem("accessToken");
        window.location.href = "/";
      }
    } catch (err) {
      console.error("회원 탈퇴 실패:", err.response || err);
      const msg =
        err.response?.data?.message ||
        "회원 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.";
      alert(msg);
    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="leave-modal-overlay" role="dialog" aria-modal="true">
      <div className="leave-modal-box">
        <button
          type="button"
          className="leave-modal-close"
          onClick={onClose}
          aria-label="닫기"
        >
          X
        </button>

        <h2>
          <strong>OOO 회원님,</strong>
          <br />
          정말 탈퇴하시겠어요?
        </h2>

        <ul className="leave-modal-text">
          <li>
            1. 회원은 언제든지 서비스 내 제공되는 [회원 탈퇴] 메뉴 또는 고객센터를 통해
            탈퇴를 요청할 수 있으며, 회사는 관련 법령이 정하는 바에 따라 이를 즉시 처리합니다.
          </li>
          <li>
            2. 회원이 탈퇴할 경우, 회원의 개인정보 및 이용 기록은 「개인정보 처리방침」에
            따라 처리되며, 탈퇴 이후에는 복구가 불가능합니다.
          </li>
          <li>
            3. 다음 각 호의 사유에 해당하는 경우, 회사는 회원 자격을 제한하거나 상실시킬 수 있습니다.
            <br />- 타인의 명의 또는 개인정보를 도용한 경우
            <br />- 서비스 운영을 고의로 방해하거나 부정한 방법으로 이익을 취한 경우
            <br />- 기타 약관에 위반되는 행위를 지속하거나 중대한 피해를 유발한 경우
          </li>
          <li>
            4. 탈퇴 시 회원이 작성한 게시물 및 댓글은 삭제되지 않으며, 원할 경우 사전에 삭제 후
            탈퇴해야 합니다.
          </li>
        </ul>

        <label className="leave-checkbox-area">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>위 내용을 모두 확인하였으며, 회원 탈퇴에 동의합니다.</span>
        </label>

        <button
          type="button"
          className="leave-confirm-button"
          onClick={handleConfirm}
          disabled={!agree || loading}
        >
          {loading ? "처리 중..." : "회원 탈퇴"}
        </button>
      </div>
    </div>
  );
};

export default UserInfoEditLeave;