import React, { useState, useEffect, useRef } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaTasks,
  FaHeading,
  FaHighlighter,
} from "react-icons/fa";

const MenuBar = ({ editor }) => {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [headingOpen, setHeadingOpen] = useState(false);
  const [highlightOpen, setHighlightOpen] = useState(false);
  const dropdownRef = useRef(null);
  const highlightDropdownRef = useRef(null);

  React.useEffect(() => {
    if (!editor) return;
    const rerender = () => forceUpdate();
    editor.on("selectionUpdate", rerender);
    editor.on("transaction", rerender);
    return () => {
      editor.off("selectionUpdate", rerender);
      editor.off("transaction", rerender);
    };
  }, [editor]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHeadingOpen(false);
      }
      if (
        highlightDropdownRef.current &&
        !highlightDropdownRef.current.contains(event.target)
      ) {
        setHighlightOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!editor) return null;

  const toggleHeading = (level) => {
    editor.chain().focus().toggleHeading({ level }).run();
    setHeadingOpen(false);
  };

  const applyHighlight = (color) => {
    if (color === "none") {
      editor.chain().focus().unsetCustomHighlight().run();
    } else {
      editor.chain().focus().setCustomHighlight({ color }).run();
    }
    setHighlightOpen(false);
  };

  const highlightColors = [
    { color: "#d9f0dd", name: "연두색" },
    { color: "#d9eaf7", name: "하늘색" },
    { color: "#f9d9d9", name: "분홍색" },
    { color: "#f4e1f9", name: "보라색" },
    { color: "#fff9d9", name: "노란색" },
    { color: "none", name: "제거" },
  ];

  return (
    <div className="CMM__toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "active" : ""}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "active" : ""}
      >
        <FaUnderline />
      </button>

      {/* Heading Dropdown */}
      <div className="heading-dropdown" ref={dropdownRef}>
        <button
          onClick={() => setHeadingOpen(!headingOpen)}
          className="heading-btn"
        >
          <FaHeading />
        </button>
        {headingOpen && (
          <div className="heading-menu">
            {[1, 2, 3].map((level) => (
              <button
                key={level}
                onClick={() => toggleHeading(level)}
                className={
                  editor.isActive("heading", { level }) ? "active" : ""
                }
              >
                <span style={{ fontWeight: "bold" }}>H{level}</span> Heading
                {level}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Highlight Dropdown */}
      <div className="highlight-dropdown" ref={highlightDropdownRef}>
        <button
          onClick={() => setHighlightOpen(!highlightOpen)}
          className={`highlight-btn ${
            editor.isActive("customHighlight") ? "active" : ""
          }`}
        >
          <FaHighlighter />
        </button>
        {highlightOpen && (
          <div className="highlight-menu">
            {highlightColors.map(({ color, name }) => (
              <button
                key={color}
                onClick={() => applyHighlight(color)}
                className="highlight-color-btn"
                title={name}
              >
                <div
                  className="color-circle"
                  style={{
                    backgroundColor: color === "none" ? "transparent" : color,
                    border:
                      color === "none" ? "2px solid #ccc" : "1px solid #ddd",
                    position: "relative",
                  }}
                >
                  {color === "none" && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%) rotate(45deg)",
                        width: "1px",
                        height: "20px",
                        backgroundColor: "#ff0000",
                      }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "active" : ""}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "active" : ""}
      >
        <FaListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive("taskList") ? "active" : ""}
      >
        <FaTasks />
      </button>
    </div>
  );
};

export default MenuBar;