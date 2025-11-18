import React, { useState } from 'react';
import '../../assets/css/createteam.css';
import teamLogo from '../../assets/images/teamLogo.png';
import axios from "axios";

const CreateTeamModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [teamtag, setTeamtag] = useState([]);
  const URL = "https://waayto.com/api/teams";

  //팀 생성하기 연동
  const handleCreate = async () => {
    const token = localStorage.getItem('accessToken'); //토큰 추가

    const newTeam = {
      name,
      description,
      teamtag, 
    };

    try {
      const response = await axios.post(
        URL,
        newTeam,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("팀 생성 성공:", response.data);
      const createdTeam = response.data;

      const formattedTeam = {
        id: createdTeam.id,
        name: createdTeam.name,
        description: createdTeam.description,
        teamtag: createdTeam.teamtag || [],
        pageUrl: `/team/${createdTeam.id}`,
      };
      onCreate(formattedTeam);

      //초기화 작업
      setName('');
      setDescription('');
      setTeamtag([]); 
      setTagInput('');
      onClose();
    } catch (error) {
      console.error("팀 생성 실패:", error);
      alert("팀 생성 중 오류가 발생했습니다.");
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() === '') return;
    if (teamtag.length >= 3) {
      alert('태그는 최대 3개까지만 추가할 수 있습니다.');
      return;
    }

    setTeamtag([...teamtag, tagInput.trim()]);
    setTagInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={teamLogo} alt="로고" className="modal-logo" />
        <h2>새로운 팀을 생성하시겠습니까?</h2>

        <input
          type="text"
          placeholder="새로운 팀 이름을 입력해주세요."
          className="modal-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-textarea-wrapper">
          <textarea
            type="text"
            placeholder="새로운 팀 설명을 입력해주세요."
            className="modal-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={250}
          />
          <div className="modal-char-count">
            {description.length} / 250 자
          </div>
        </div>

        <div className="modal-tag-input-row">
          <input
            type="text"
            placeholder="새로운 팀 태그를 입력해주세요."
            className="modal-input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button className="modal-add-button" onClick={handleAddTag}>+</button>
        </div>

        <div className="tag-preview">
          {teamtag.map((tag, index) => (
            <span key={index} className="team-tag">
              {tag}
              <button
                className="tag-remove-btn"
                onClick={() => {
                  setTeamtag(teamtag.filter((_, i) => i !== index));
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <button className="modal-button" onClick={handleCreate}>생성하기</button>
      </div>
    </div>
  );
};

export default CreateTeamModal;