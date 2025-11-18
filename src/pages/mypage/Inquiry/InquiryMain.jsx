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
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인 후 이용해 주세요.");
        return;
      }

      const response = await fetch("https://waayto.com/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log("문의 등록 성공:", data);
        setSubmitted(true);
        setTitle("");
        setContent("");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("문의 등록 실패:", errorData);
        alert("문의 전송에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("서버와의 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
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
              maxLength={200}
            />

            <textarea
              className="inquirymain-textarea"
              placeholder="내용을 입력해 주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={5000}
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
