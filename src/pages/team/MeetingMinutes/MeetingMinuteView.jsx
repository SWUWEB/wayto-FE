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

// 필드 컴포넌트
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
        <img src={backIcon} alt="뒤로가기" className="MMV__backBtn" onClick={onBack} />
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

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get(`https://www.waayto.com/api/minutes/${meeting_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        const formattedData = {
          meetingId: data.meetingId,
          title: data.title || "회의록",
          attendees: data.attendees || [],
          formattedDateTime: data.startedAt
            ? new Date(data.startedAt).toLocaleString("ko-KR")
            : null,
          place: data.place || "미정",
          link: data.link || null,
          content: data.notes || "<p>회의록 내용이 없습니다.</p>",
          createdBy: data.createdBy, // 작성자 정보
        };

        setMeetingData(formattedData);
      } catch (err) {
        console.error("회의록 불러오기 에러:", err);
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
  }, [meeting_id, token]);

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

  const handleBack = () => navigate(-1);

  // 삭제 처리
  const handleDelete = async () => {
    if (!window.confirm("정말 이 회의록을 삭제하시겠습니까?")) return;

    try {
      setDeleting(true);
      await axios.delete(`https://www.waayto.com/api/minutes/${meeting_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("삭제 완료");
      navigate(-1); // 목록으로 돌아가기
    } catch (err) {
      console.error("삭제 실패:", err);
      if (err.response?.status === 403) {
        alert("삭제 권한이 없습니다.");
      } else if (err.response?.status === 404) {
        alert("이미 삭제된 회의록입니다.");
      } else {
        alert("삭제 중 오류가 발생했습니다.");
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <ErrorView onBack={handleBack} message={error} />;

  const isOwner = meetingData.createdBy?.id === localStorage.getItem("userId"); // 본인 작성 여부 확인

  return (
    <div className="MMV__container">
      <Header />
      <div className="MMV__content">
        <div className="MMV__titleRow">
          <img src={backIcon} alt="뒤로가기" className="MMV__backBtn" onClick={handleBack} />
          <h2>{meetingData.title}</h2>
          {isOwner && (
            <button
              className="MMV__deleteBtn"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "삭제 중..." : "삭제"}
            </button>
          )}
        </div>

        <div className="MMV__view">
          <InfoField label="참석자">
            <AttendeesDisplay attendees={meetingData.attendees} />
          </InfoField>

          <InfoField label="회의 날짜">{meetingData.formattedDateTime || "날짜 미정"}</InfoField>
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
        </div>
      </div>
    </div>
  );
};

export default MeetingMinuteView;
