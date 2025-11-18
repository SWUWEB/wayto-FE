import React, { useState } from 'react';
import '../../assets/css/createteam.css';
import axios from 'axios';

const TeammateModal = ({ isOpen, onClose, teamId }) => {
  if (!isOpen) return null;

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSearch = async () => {
    if (!searchInput.trim()) return alert('검색어를 입력해주세요.');

    const token = localStorage.getItem('accessToken');
    if (!token) return alert('로그인이 필요합니다.');

    try {
      const response = await axios.get('https://waayto.com/api/teams/search', {
        params: { q: searchInput },
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const users = response.data.users || [];
      const filtered = users.filter(user => !selectedMembers.some(u => u.email === user.email));
      setSearchResults(filtered);

    } catch (error) {
      console.error('사용자 검색 중 오류 발생:', error);
      alert('사용자 검색 중 오류가 발생했습니다.');
    }
  };

  const handleAddMember = (user) => {
    setSelectedMembers([...selectedMembers, user]);
    setSearchResults(searchResults.filter(u => u.email !== user.email));
  };

  const handleRemoveMember = (user) => {
    setSelectedMembers(selectedMembers.filter(u => u.email !== user.email));
  };

  const handleSubmitMembers = async () => {
    if (!teamId) {
      alert("팀 ID가 존재하지 않습니다.");
      return;
    }

    const token = localStorage.getItem('accessToken');

    try {
      for (const member of selectedMembers) {
        await axios.post(
          `https://waayto.com/api/teams/${teamId}/members`,
          { email: member.email },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      }

      alert("팀원이 성공적으로 추가되었습니다!");
      onClose();

      window.location.reload();

    } catch (error) {
      console.error("팀원 추가 중 오류:", error);
      alert("팀원 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content teammate-modal">
        <div className="modal-header">
          <h2>팀에 추가할 팀원을 선택하세요</h2>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="사용자 이메일을 검색해주세요.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>검색</button>
        </div>

        <div className="modal-body teammate-body">
          <div className="user-list-section">
            {searchResults.map((user) => (
              <div key={user.email} className="user-card">
                <div className="user-info">
                  <div className="avatar" />
                  <div>
                    <div className="user-name">{user.name}</div>
                    <div className="user-id">{user.email}</div>
                  </div>
                </div>
                <button className="action-btn" onClick={() => handleAddMember(user)}>➕</button>
              </div>
            ))}
          </div>

          <div className="user-list-section">
            {selectedMembers.map((user) => (
              <div key={user.email} className="user-card">
                <div className="user-info">
                  <div className="avatar" />
                  <div>
                    <div className="user-name">{user.name}</div>
                    <div className="user-id">{user.email}</div>
                  </div>
                </div>
                <button className="action-btn" onClick={() => handleRemoveMember(user)}>❌</button>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer right-align">
          <button onClick={handleSubmitMembers}>팀 생성하기</button>
        </div>
      </div>
    </div>
  );
};

export default TeammateModal;