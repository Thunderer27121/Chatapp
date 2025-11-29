import React, { useState } from "react";

const MessageInput = React.memo(({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.75rem",
        padding: "1rem 1.5rem",
        borderTop: "1px solid #e5e7eb",
        background: "white",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{
            width: "100%",
            padding: "0.875rem 1.125rem",
            paddingRight: "3rem",
            borderRadius: "24px",
            border: "2px solid #e5e7eb",
            outline: "none",
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            background: "#f9fafb",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#667eea";
            e.target.style.background = "white";
            e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.background = "#f9fafb";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          type="button"
          style={{
            position: "absolute",
            right: "0.625rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "1.25rem",
            padding: "0.375rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.5,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.5";
          }}
        >
          😊
        </button>
      </div>
      <button
        type="submit"
        disabled={!text.trim()}
        style={{
          padding: "0.875rem 1.5rem",
          borderRadius: "24px",
          border: "none",
          cursor: text.trim() ? "pointer" : "not-allowed",
          background: text.trim()
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "#e5e7eb",
          color: text.trim() ? "white" : "#9ca3af",
          fontWeight: "600",
          fontSize: "0.95rem",
          transition: "all 0.3s ease",
          boxShadow: text.trim()
            ? "0 4px 12px rgba(102, 126, 234, 0.4)"
            : "none",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          if (text.trim()) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
          }
        }}
        onMouseLeave={(e) => {
          if (text.trim()) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
          }
        }}
      >
        <span>Send</span>
        <span style={{ fontSize: "1.125rem" }}>📤</span>
      </button>
    </form>
  );
});

export default MessageInput;