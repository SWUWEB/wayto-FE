import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  
  // 데이터 추출 및 검증
  const meetingData = useMemo(() => {
    const data = location.state?.meetingData;
    
    if (!data) {
      console.warn("회의록 데이터가 없습니다.");
      return null;
    }

    // 날짜/시간 포맷팅
    const formattedDateTime = data.formattedDateTime || 
      (data.date && data.time ? `${data.date} ${data.time}` : null);

    return {
      ...data,
      title: data.title || "회의록",
      content: data.content || "<p>회의록 내용이 없습니다.</p>",
      place: data.place || "미정",
      formattedDateTime,
      attendees: Array.isArray(data.attendees) ? data.attendees : []
    };
  }, [location.state]);

  // 에디터 설정 - content가 변경될 때만 재생성
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit.configure({ 
        underline: false, 
        heading: false 
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
  }, [meetingData?.content]);

  // 이벤트 핸들러
  const handleBack = () => {
    navigate(-1);
  };

  // 데이터가 없는 경우 에러 화면
  if (!meetingData) {
    return <ErrorView onBack={handleBack} />;
  }

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

          <InfoField label="장소">
            {meetingData.place}
          </InfoField>

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