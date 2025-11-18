import React, { useState, useEffect } from "react";
import "../../assets/css/createteam.css";
import axios from "axios";

const EditTeamModal = ({ isOpen, onClose, teamData, onUpdate }) => {
  const [description, setDescription] = useState(teamData?.description || "");

  useEffect(() => {
    if (teamData) {
      setDescription(teamData.description || "");
    }
  }, [teamData]);

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `https://waayto.com/api/teams/${teamData.id}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      onUpdate(res.data.team);
    } catch (err) {
      console.error(err);
      alert("팀 설명 수정 중 오류가 발생했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>팀 설명 편집</h2>

        <textarea
          placeholder="팀 설명"
          className="modal-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={250}
        />
        <div className="modal-char-count">{description.length} / 250 자</div>

        <button className="modal-button" onClick={handleUpdate}>
          수정하기
        </button>
      </div>
    </div>
  );
};

export default EditTeamModal;
