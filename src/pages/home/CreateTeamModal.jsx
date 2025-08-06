import React, { useState } from 'react';
import '../../assets/css/createteam.css';
import mainLogo from '../../assets/images/mainLogo.png';

const CreateTeamModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleAddTag = () => {  //태그 생성 3개 제한
  if (tagInput.trim() === '') return;
  if (tags.length >= 3) {
    alert('태그는 최대 3개까지만 추가할 수 있습니다.');
    return;
  }

  setTags([...tags, tagInput.trim()]);
  setTagInput('');
};

  const handleCreate = () => {
    const newTeam = {
      name,
      description,
      tags,
    };
    onCreate(newTeam);  //초기화 작업
    setName('');
    setDescription('');
    setTags([]);
    setTagInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={mainLogo} alt="로고" className="modal-logo" />
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
          {tags.map((tag, index) => (
            <span key={index} className="team-tag">{tag}</span>
          ))}
        </div>
        <button className="modal-button" onClick={handleCreate}>생성하기</button>
      </div>
    </div>
  );
};

export default CreateTeamModal;