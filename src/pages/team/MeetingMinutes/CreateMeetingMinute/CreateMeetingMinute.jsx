import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Heading from "@tiptap/extension-heading";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import Header from "../../../../components/Header";
import MenuBar from "./MenuBar";
import AttendeesField from "./AttendeesField";
import { CustomHighlight } from "./CustomHighlight";
import { formatKoreanDateTime, getDefaultDateTime } from "./dateTimeUtils";
import backIcon from "../../../../assets/images/back-icon.svg";
import "../../../../assets/css/CreateMeetingMinute.css";

const CreateMeetingMinute = () => {
  const navigate = useNavigate();

  // State 관리
  const [attendees, setAttendees] = useState(["이채영"]);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  const { defaultDate, defaultTime } = getDefaultDateTime();
  const [meetingDate, setMeetingDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState(defaultTime);
  const [endTime, setEndTime] = useState(defaultTime);

  // 에디터 설정
  const editor = useEditor({
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
    content: "<p>회의록을 작성해보세요.</p>",
  });

  const toISODateTime = (date, time) => {
    return new Date(`${date}T${time}:00`).toISOString();
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (!editor) {
      alert("에디터가 준비되지 않았습니다.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const editorContent = editor.getHTML();

    const requestBody = {
      teamId: 1,
      title: title || "새로운 회의록",
      attendees: attendees.join(", "),
      meetingDate: meetingDate,
      startTime: startTime,
      endTime: endTime,
      location: place,
      meetingLink: link,
      content: editorContent,
    };

    try {
      const response = await fetch("https://waayto.com/api/minutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("API Error:", error);
        alert("회의록 작성 중 오류가 발생했습니다.");
        return;
      }

      const result = await response.json();

      // 성공 시 상세 페이지 혹은 목록으로 이동
      navigate(`/minutes/${result.minuteId}`, {
        state: { created: true },
      });
    } catch (err) {
      console.error("Network Error:", err);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <div className="CMM__container">
      <Header />

      <div className="CMM__content">
        <div className="CMM__titleRow">
          <img
            src={backIcon}
            alt="뒤로가기"
            className="CMM__backIcon"
            onClick={handleBack}
          />
          <h2>회의록 작성</h2>
        </div>

        <div className="CMM_input">
          <p className="CMM__guide">회의록 정보를 입력해 주세요</p>

          {/* 제목 입력 */}
          <input
            type="text"
            className="CMM__titleInput"
            placeholder="새로운 회의록"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 참석자 */}
          <AttendeesField attendees={attendees} setAttendees={setAttendees} />

          {/* 회의 날짜 */}
          <div className="CMM__field">
            <span className="CMM__label">회의 날짜</span>
            <div className="CMM__datetime-inputs">
              <input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="CMM__dateInput"
              />
            </div>
          </div>

          {/* 회의 시간 */}
          <div className="CMM__field">
            <span className="CMM__label">회의 시간</span>
            <div className="CMM__datetime-inputs">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="CMM__timeInput"
              />
              <span style={{ margin: "0 8px" }}>~</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="CMM__timeInput"
              />
            </div>
          </div>

          {/* 장소 */}
          <div className="CMM__field">
            <span className="CMM__label">장소</span>
            <input
              type="text"
              className="CMM__inputNoBorder"
              placeholder="장소를 입력하세요."
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>

          {/* 회의 링크 */}
          <div className="CMM__field">
            <span className="CMM__label">회의 링크</span>
            <input
              type="text"
              className="CMM__inputNoBorder"
              placeholder="회의 초대 링크를 첨부해보세요."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* 회의록 */}
          <div className="CMM__field">
            <span className="CMM__MMlabel">회의록</span>
            <div className="CMM_MMfield">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} className="CMM__editor" />
            </div>
          </div>
        </div>

        <div className="CMM__submitWrapper">
          <button className="CMM__submitBtn" onClick={handleSubmit}>
            회의록 작성 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMeetingMinute;
