import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
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

// 컴포넌트 분리: 필드 표시용 컴포넌트
const InfoField = ({ label, children }) => (
  <div className="MMV__field">
    <span className="MMV__label">{label}</span>
    <div>{children}</div>
  </div>
);

// 컴포넌트 분리: 참석자 표시용 컴포넌트
const AttendeesDisplay = ({ attendees }) => {
  if (!attendees || attendees.length === 0) {
    return <span>참석자 없음</span>;
  }

  return (
    <div className="MMV__attendees">
      {attendees.map((name, idx) => (
        <span key={`${name}-${idx}`} className="MMV__attendee">
          <span className="MMV__circle"></span>
          {name}
        </span>
      ))}
    </div>
  );
};

// 컴포넌트 분리: 링크 표시용 컴포넌트
const LinkDisplay = ({ link }) => {
  if (!link) {
    return <span>없음</span>;
  }

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {link}
    </a>
  );
};

// 컴포넌트 분리: 에러 화면
const ErrorView = ({ onBack }) => (
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
        <p>회의록 데이터가 없거나 잘못된 경로로 접근했습니다.</p>
      </div>
    </div>
  </div>
);

const MeetingMinuteView = () => {
  const navigate = useNavigate();
  const { meeting_id } = useParams(); // /meetings/:meeting_id 라우트에서 추출
  const [meetingData, setMeetingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 서버에서 데이터 가져오기
  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await api.get(`/api/meetings/${meeting_id}/minutes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 있으면 추가
          },
        });
        const data = res.data;

        // 백엔드 응답을 프론트에서 쓰기 좋게 가공
        const formattedData = {
          meetingId: data.meetingId,
          title: data.title || "회의록",
          attendees: data.attendees?.map((a) => a.name) || [],
          formattedDateTime: data.startedAt
            ? new Date(data.startedAt).toLocaleString("ko-KR")
            : null,
          place: data.place || "미정",
          link: data.link || null,
          content: data.notes || "<p>회의록 내용이 없습니다.</p>",
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
  }, [meeting_id]);

  // TipTap Editor
  const editor = useEditor(
    {
      editable: false,
      extensions: [
        StarterKit.configure({
          underline: false,
          heading: false,
        }),
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
    navigate(-1);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <ErrorView onBack={handleBack} />;

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
        </div>
      </div>
    </div>
  );
};

export default MeetingMinuteView;