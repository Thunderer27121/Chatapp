function Message({ message, isOwn }) {
  return (
    <div
      style={{
        alignSelf: isOwn ? "flex-end" : "flex-start",
        maxWidth: "70%",
        animation: "messageSlide 0.3s ease-out",
      }}
    >
      <div
        style={{
          padding: "0.75rem 1rem",
          borderRadius: isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isOwn
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "white",
          color: isOwn ? "#fff" : "#1f2937",
          boxShadow: isOwn
            ? "0 4px 12px rgba(102, 126, 234, 0.3)"
            : "0 2px 8px rgba(0, 0, 0, 0.08)",
          position: "relative",
          wordWrap: "break-word",
          border: isOwn ? "none" : "1px solid #f3f4f6",
        }}
      >
        {!isOwn && (
          <div
            style={{
              fontSize: "0.75rem",
              opacity: 0.7,
              marginBottom: "0.375rem",
              fontWeight: "600",
              color: "#667eea",
            }}
          >
            {message.senderName}
          </div>
        )}
        <div
          style={{
            fontSize: "0.95rem",
            lineHeight: "1.5",
            wordBreak: "break-word",
          }}
        >
          {message.text}
        </div>
        <div
          style={{
            fontSize: "0.7rem",
            opacity: isOwn ? 0.8 : 0.5,
            marginTop: "0.375rem",
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.25rem",
          }}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {isOwn && (
            <span style={{ fontSize: "0.875rem" }}>✓✓</span>
          )}
        </div>
      </div>
      <style>{`
        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Message;