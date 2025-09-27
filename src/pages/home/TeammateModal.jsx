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
    try {
      const response = await axios.get('https://www.waytomeet.site/api/teams/search', {
        params: { query: searchInput }  //쿼리 형식
      });

      const filtered = response.data.filter(
        (user) => !selectedMembers.includes(user)
      );

      setSearchResults(filtered);
    } catch (error) {
      console.error('사용자 검색 중 오류 발생:', error);
      alert('사용자 검색 중 문제가 발생했습니다.');
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
            placeholder="사용자 아이디를 검색해주세요.."
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
                    <div className="user-name">{user}</div>
                    <div className="user-id">frontend</div>
                  </div>
                </div>
                <button className="action-btn" onClick={() => handleAddMember(user)}>➕</button>
              </div>
            ))}
          </div>

          <div className="user-list-section">
            {selectedMembers.map((user) => (
              <div key={user} className="user-card">
                <div className="user-info">
                  <div className="avatar" />
                  <div>
                    <div className="user-name">{user}</div>
                    <div className="user-id">hahsahfrontend</div>
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