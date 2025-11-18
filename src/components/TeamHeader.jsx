import React, { useState, useEffect } from "react";
import "../assets/css/teamHeader.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import teamLogo from "../assets/images/teamLogo.png";

const tabs = [
  { label: "회의록", subPath: "meeting" },
  { label: "웬투밋", subPath: "wentomeet" },
  { label: "회원 관리", subPath: "members" },
];

export default function TeamHeader({
  teamName,
  teamDescription,
  teamTags = [],
  onEdit,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { teamId } = useParams();

  const getActiveTabFromUrl = () => {
    const currentPath = location.pathname;

    const found = tabs.find((tab) =>
      currentPath.includes(`/team/${teamId}/${tab.subPath}`)
    );

    return found ? found.label : "회의록";
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl());

  useEffect(() => {
    setActiveTab(getActiveTabFromUrl());
  }, [location.pathname]);

  const handleTabClick = (label, subPath) => {
    setActiveTab(label);
    navigate(`/team/${teamId}/${subPath}`);
  };

  return (
    <div className="teamHeader__team-header">
      <div className="teamHeader__header-container">
        <img src={teamLogo} alt="team logo" className="teamHeader__logo" />
        <div className="teamHeader__info">
          <h1 className="teamHeader__team-name">{teamName}</h1>
          <p className="teamHeader__description">{teamDescription}</p>

          {teamTags.length > 0 && (
            <div className="teamHeader__tag-list">
              {teamTags.map((tag, index) => (
                <span key={index} className="teamHeader__tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {onEdit && (
          <button className="teamHeader__edit-icon" onClick={onEdit}>
            <Pencil size={20} color="#000" />
          </button>
        )}
      </div>

      <div className="teamHeader__tab-container">
        {tabs.map(({ label, subPath }) => (
          <button
            key={label}
            className={`teamHeader__tab ${
              activeTab === label ? "teamHeader__active" : ""
            }`}
            onClick={() => handleTabClick(label, subPath)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
