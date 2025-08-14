import React, { useState } from "react";
import "../../../assets/css/inquirymain.css";
import MyPageWrapper from "../MyPageWrapper";

export default function InquiryMain() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (title.trim() && content.trim()) {
        setSubmitted(true);
      } else {
        alert("제목과 내용을 모두 입력해 주세요.");
      }
    } catch {
      alert("문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyPageWrapper userName="회원 이름입니다.">
      <div className="inquirymain-page">
        {!submitted ? (
          <form className="inquirymain-form" onSubmit={handleSubmit}>
            <div className="inquirymain-title">1:1 문의</div>
            <p className="inquirymain-desc">
              문의하신 내용은 3~7일 이내에 등록하신 이메일을 통해 답변 받으실 수 있습니다.
            </p>

            <input
              type="text"
              className="inquirymain-input"
              placeholder="제목을 입력해 주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="inquirymain-textarea"
              placeholder="내용을 입력해 주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="inquirymain-button-box">
              <button type="submit" className="inquirymain-submit" disabled={loading}>
                {loading ? "전송 중..." : "1:1 문의 남기기"}
              </button>
            </div>
          </form>
        ) : (
          <div className="inquirymain-form" style={{ textAlign: "center", marginTop: "100px" }}>
            <div style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "-20px" }}>
              문의 내용이 정상적으로 전달되었습니다.
            </div>
            <p style={{ color: "#000", fontSize: "15px", marginBottom: "24px" }}>
              문의하신 내용은 3~7일 이내에 등록하신 이메일을 통해 답변 받으실 수 있습니다.
            </p>
            <button
              className="inquirymain-submit"
              onClick={() => {
                setSubmitted(false);
                setTitle("");
                setContent("");
              }}
            >
              돌아가기
            </button>
          </div>
        )}

        <div className="page-footer normal-footer" />
      </div>
    </MyPageWrapper>
  );
}