import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TeamPageWrapper from "../TeamPageWrapper";
import "../../../assets/css/MemberList.css";

const MemberList = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [members, setMembers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [myRole, setMyRole] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(
        `https://waayto.com/api/teams/${teamId}/members`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMembers(res.data.members);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const myEmail = userInfo?.email;

      const me = res.data.members.find((m) => m.email === myEmail);
      setMyRole(me?.role || null);

    } catch (err) {
      console.error("팀원 목록 불러오기 실패:", err);
      alert("팀원 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [teamId]);

  const handleAddMember = async () => {
    if (!inviteEmail) return;

    try {
      await axios.post(
        `https://waayto.com/api/teams/${teamId}/members`,
        { email: inviteEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${inviteEmail} 님을 초대했습니다.`);
      setInviteEmail("");
      fetchMembers();
    } catch (err) {
      console.error("팀원 초대 실패:", err);
      if (err.response?.status === 400) alert("이미 존재하는 팀원입니다.");
      else if (err.response?.status === 403)
        alert("권한이 없습니다 (팀장만 가능).");
      else if (err.response?.status === 404)
        alert("팀 또는 사용자가 존재하지 않습니다.");
      else alert("팀원 초대에 실패했습니다.");
    }
  };

  const handleKick = async (email) => {
    if (!window.confirm("정말 이 팀원을 강퇴하시겠습니까?")) return;

    try {
      await axios.delete(`https://waayto.com/api/teams/${teamId}/members`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { email }, 
      });
      alert("강퇴 완료");
      fetchMembers();
    } catch (err) {
      console.error("강퇴 실패:", err);
      if (err.response?.status === 403) alert("권한이 없습니다 (팀장만 가능).");
      else if (err.response?.status === 404)
        alert("강퇴할 사용자를 찾을 수 없습니다.");
      else alert("팀원 강퇴에 실패했습니다.");
    }
  };

  const handleLeave = async () => {
    if (!window.confirm("정말 팀을 탈퇴하시겠습니까?")) return;

    try {
      await axios.delete(`https://waayto.com/api/teams/${teamId}/members/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("팀 탈퇴 완료");
      navigate("/");
    } catch (err) {
      console.error("탈퇴 실패:", err);
      if (err.response?.status === 403) alert("팀장은 탈퇴할 수 없습니다.");
      else if (err.response?.status === 404) alert("팀을 찾을 수 없습니다.");
      else alert("팀 탈퇴에 실패했습니다.");
    }
  };

  const handleDeleteTeam = async () => {
    if (
      !window.confirm(
        "정말 팀을 삭제하시겠습니까? 모든 데이터가 영구 삭제됩니다."
      )
    )
      return;

    try {
      await axios.delete(`https://waayto.com/api/teams/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("팀이 삭제되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("팀 삭제 실패:", err);
      if (err.response?.status === 403)
        alert("팀장만 팀을 삭제할 수 있습니다.");
      else if (err.response?.status === 404) alert("팀을 찾을 수 없습니다.");
      else alert("팀 삭제에 실패했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <TeamPageWrapper initialTab="회원 관리">
      <div className="member-list-section">
        {myRole === "owner" && (
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
        )}

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

                {myRole === "owner" && m.role !== "owner" && (
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

        <div className="leave-section">
          {myRole === "owner" ? (
            <button className="leave-button" onClick={handleDeleteTeam}>
              팀 삭제하기
            </button>
          ) : (
            <button className="leave-button" onClick={handleLeave}>
              팀 탈퇴하기
            </button>
          )}
        </div>
      </div>
    </TeamPageWrapper>
  );
};

export default MemberList;
