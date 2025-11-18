import React, { useState } from 'react';
import '../../assets/css/createteam.css';
import axios from 'axios';

const TeammateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  //사용자 검색 연동
  const handleSearch = async () => {
    if (!searchInput.trim()) {
    alert('검색어를 입력해주세요.');
    return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다. 먼저 로그인해주세요.');
      return;
    }

    try {
      const response = await axios.get('https://waayto.com/api/teams/search', {
        params: { q: searchInput },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

    const users = response.data.users || [];

    const filtered = users.filter(
      (user) => !selectedMembers.includes(user)
    );

    setSearchResults(filtered);
  } catch (error) {
    console.error('사용자 검색 중 오류 발생:', error);

    //서버에서 응답이 왔을 때
    if (error.response) {
      const status = error.response.status;
      const { error: apiError, message } = error.response.data;

      if (status === 400) { //400 오류 처리
        alert(`${message || '잘못된 요청입니다.'}`);
      } else if (status === 401) {  //401 오류 처리
        alert(`${message || '인증이 필요합니다.'}`);
      } else {
        alert(`오류 (${status}): ${message || '서버 오류가 발생했습니다.'}`);
      }

    //요청이 서버에 도달하지 못했을 때
    } else if (error.request) {
      alert('서버에 연결할 수 없습니다. (네트워크 문제 또는 CORS 오류)');
    } else {
      //axios 설정 문제
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  }
};

  const handleAddMember = (user) => {
    setSelectedMembers([...selectedMembers, user]);
    setSearchResults(searchResults.filter((u) => u !== user));
  };

  const handleRemoveMember = (user) => {
    setSelectedMembers(selectedMembers.filter((u) => u !== user));
  };

  const handleCreateTeam = () => {
    onClose();
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
              <div key={user} className="user-card">
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
          <button onClick={handleCreateTeam}>팀 생성하기</button>
        </div>
      </div>
    </div>
  );
};

export default TeammateModal;