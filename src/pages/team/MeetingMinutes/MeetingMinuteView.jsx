import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import axios from "axios";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Heading from "@tiptap/extension-heading";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Header from "../../../components/Header";
import backIcon from "../../../assets/images/back-icon.svg";
import "../../../assets/css/MeetingMinuteView.css";
import CustomHighlight from "./CreateMeetingMinute/CreateMeetingMinute";

const InfoField = ({ label, children }) => (
  <div className="MMV__field">
    <span className="MMV__label">{label}</span>
    <div>{children}</div>
  </div>
);

const AttendeesDisplay = ({ attendees }) => {
  if (!attendees || attendees.length === 0) return <span>참석자 없음</span>;
  return (
    <div className="MMV__attendees">
      {attendees.map((a) => (
        <span key={a.id} className="MMV__attendee">
          <span className="MMV__circle"></span>
          {a.name}
        </span>
      ))}
    </div>
  );
};

const LinkDisplay = ({ link }) => {
  if (!link) return <span>없음</span>;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {link}
    </a>
  );
};

const ErrorView = ({ onBack, message }) => (
  <div className="MMV__container">
    <Header />
    <div className="MMV__content">
      <div className="MMV__titleRow">
        <img
          src={backIcon}
          alt="뒤로가기"
          className="MMV__backBtn"
          onClick={onBack}
        />
        <h2>회의록을 찾을 수 없습니다</h2>
      </div>
      <div className="MMV__view">
        <p>{message || "회의록 데이터가 없거나 잘못된 경로로 접근했습니다."}</p>
      </div>
    </div>
  </div>
);

const MeetingMinuteView = () => {
  const navigate = useNavigate();
  const { meeting_id } = useParams();
  const [meetingData, setMeetingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const currentUserId = userInfo.id || 0;

  const formatUTCDateToLocalStringWithoutOffset = (utcString) => {
    if (!utcString) return "날짜 미정";
    const [date, time] = utcString.split("T");
    return `${date} ${time.slice(0, 5)}`; // yyyy-mm-dd HH:mm
  };

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get(
          `https://www.waayto.com/api/minutes/${meeting_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data;

        const formattedData = {
          id: data.id,
          teamId: Number(data.teamId),
          meetingId: data.meetingId,
          title: data.title || "회의록",
          attendees: data.attendees
            ? data.attendees.split(",").map((name, idx) => ({
                id: idx,
                name: name.trim(),
              }))
            : [],
          formattedDateTime: data.meetingDate
            ? formatUTCDateToLocalStringWithoutOffset(data.meetingDate)
            : null,

          meetingDate: data.meetingDate,
          startTime: data.startTime || "09:00",
          endTime: data.endTime || "10:00",
          place: data.location || "미정",
          link: data.meetingLink || null,
          content: data.content || "<p>회의록 내용이 없습니다.</p>",
          createdBy: data.author,
        };

        setMeetingData(formattedData);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("회의록이 없습니다. 작성 페이지로 이동하세요.");
        } else {
          setError("회의록을 불러오는 중 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMeeting();
  }, [meeting_id, token, currentUserId]);

  const editor = useEditor(
    {
      editable: false,
      extensions: [
        StarterKit.configure({ underline: false, heading: false }),
        Underline,
        TaskList,
        TaskItem.configure({ nested: true }),
        Heading.configure({ levels: [1, 2, 3] }),
        TextStyle,
        Color,
        CustomHighlight,
      ],
      content: meetingData?.content,
    },
    [meetingData?.content]
  );

  const handleBack = () => {
    if (meetingData) navigate(`/team/${meetingData.teamId}/meeting`);
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 이 회의록을 삭제하시겠습니까?")) return;
    try {
      setDeleting(true);
      await axios.delete(`https://www.waayto.com/api/minutes/${meeting_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("삭제 완료");
      navigate(`/team/${meetingData.teamId}/meeting`);
    } catch (err) {
      if (err.response?.status === 403) alert("삭제 권한이 없습니다.");
      else if (err.response?.status === 404) alert("이미 삭제된 회의록입니다.");
      else alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return "";
    return time.length > 5 ? time.substring(0, 5) : time;
  };

  const handleEdit = () => {
    navigate(`/${meetingData.teamId}/createMeetingMinute`, {
      state: {
        editMode: true,
        meetingData: meetingData,
      },
    });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <ErrorView onBack={handleBack} message={error} />;

  const isOwner = meetingData.createdBy?.id === currentUserId;

  return (
    <div className="MMV__container">
      <Header />
      <div className="MMV__content">
        <div className="MMV__titleRow">
          <img
            src={backIcon}
            alt="뒤로가기"
            className="MMV__backBtn"
            onClick={handleBack}
          />
          <h2>{meetingData.title}</h2>
        </div>

        <div className="MMV__view">
          <InfoField label="참석자">
            <AttendeesDisplay attendees={meetingData.attendees} />
          </InfoField>

          <InfoField label="회의 날짜">
            {meetingData.formattedDateTime || "날짜 미정"}
          </InfoField>
          <InfoField label="장소">{meetingData.place}</InfoField>
          <InfoField label="회의 링크">
            <LinkDisplay link={meetingData.link} />
          </InfoField>

          <div className="MMV__field">
            <span className="MMV__label">회의록</span>
            <div className="MMV__editor">
              <EditorContent editor={editor} />
            </div>
          </div>
          {isOwner && (
            <div className="MMV__buttonGroup">
              <button className="MMV__editBtn" onClick={handleEdit}>
                수정
              </button>
              <button
                className="MMV__deleteBtn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingMinuteView;
