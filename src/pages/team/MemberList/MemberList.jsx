import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamPageWrapper from "../TeamPageWrapper";
import "../../../assets/css/MemberList.css";

const MemberList = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  // 🔹 더미 데이터 (API 연동 대신 사용)
  const [members, setMembers] = useState([
    {
      name: "홍길동",
      email: "hong@example.com",
      role: "owner",
    },
    {
      name: "김철수",
      email: "chulsoo@example.com",
      role: "member",
    },
    {
      name: "박영희",
      email: "younghee@example.com",
      role: "member",
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");

  // 🔹 팀원 추가 (더미)
  const handleAddMember = () => {
    if (!inviteEmail) return;

    setMembers((prev) => [
      ...prev,
      { name: "새 팀원", email: inviteEmail, role: "member" },
    ]);
    setInviteEmail("");
  };

  // 🔹 팀원 강퇴 (더미)
  const handleKick = (email) => {
    setMembers((prev) => prev.filter((m) => m.email !== email));
  };

  // 🔹 본인 탈퇴 (더미)
  const handleLeave = () => {
    alert("팀 탈퇴 되었습니다 (더미)");
    navigate("/");
  };

  return (
    <TeamPageWrapper initialTab="회원 관리">
      <div className="member-list-section">

        {/* 팀원 초대 */}
        <div className="invite-box">
          <h3>팀원 초대</h3>
          <div className="invite-input-wrapper">
            <input
              type="email"
              placeholder="초대할 이메일 입력"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <button onClick={handleAddMember}>초대</button>
          </div>
        </div>

        {/* 팀원 목록 */}
        <div className="members-wrapper">
          <h3>팀원 목록</h3>

          <ul className="member-list">
            {members.map((m) => (
              <li key={m.email} className="member-item">
                <div>
                  <strong>{m.name}</strong>
                  <span>{m.email}</span>
                  <span className="role-tag">{m.role}</span>
                </div>

                {m.role !== "owner" && (
                  <button
                    className="kick-button"
                    onClick={() => handleKick(m.email)}
                  >
                    강퇴
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* 본인 탈퇴 */}
        <div className="leave-section">
          <button className="leave-button" onClick={handleLeave}>
            팀 탈퇴하기
          </button>
        </div>
      </div>
    </TeamPageWrapper>
  );
};

export default MemberList;
