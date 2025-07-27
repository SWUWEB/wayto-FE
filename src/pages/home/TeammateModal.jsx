import React, { useState } from 'react';
import '../../assets/css/createteam.css';

const mockUserList = ['슈니1', '김예원', '홍길동', '슈니2'];

const TeammateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSearch = () => {
    const filtered = mockUserList.filter(
      (user) => user.includes(searchInput) && !selectedMembers.includes(user)
    );
    setSearchResults(filtered);
  };

  const handleAddMember = (user) => {
    setSelectedMembers([...selectedMembers, user]);
    setSearchResults(searchResults.filter((u) => u !== user));
  };

  const handleRemoveMember = (user) => {
    setSelectedMembers(selectedMembers.filter((u) => u !== user));
  };

  const handleCreateTeam = () => {
    //alert(`팀 생성 완료!\n팀원: ${selectedMembers.join(', ')}`);
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