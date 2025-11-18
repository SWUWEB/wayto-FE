import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import TeamHeader from "../../components/TeamHeader";
import EditTeamModal from "./EditTeamModal";
import axios from "axios";

export default function TeamPageWrapper({ initialTab, children }) {
  const { teamId } = useParams();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleTabSelect = (tab) => setActiveTab(tab);

  const handleEdit = () => setIsEditOpen(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`https://waayto.com/api/teams/${teamId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTeamData(res.data.team);

        const user = JSON.parse(localStorage.getItem("userInfo"));
      } catch (err) {
        console.error(err);
        setError("팀 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  if (loading) return <div>팀 정보 불러오는 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!teamData) return <div>팀 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <Header />
      <TeamHeader
        teamName={teamData.name}
        teamDescription={teamData.description}
        teamTags={teamData.teamtag || []}
        onEdit={
          teamData.creatorId ===
          JSON.parse(localStorage.getItem("userInfo"))?.id
            ? handleEdit
            : undefined
        }
        activeTab={activeTab}
        onTabSelect={handleTabSelect}
      />

      <div>{children}</div>

      {isEditOpen && (
        <EditTeamModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          teamData={teamData}
          onUpdate={(updatedTeam) => {
            setTeamData(updatedTeam);
            setIsEditOpen(false);
          }}
        />
      )}
    </>
  );
}
