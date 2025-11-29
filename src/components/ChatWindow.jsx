import { db, sendMessage } from "../db/instantDb";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useMemo, useCallback } from "react";

function ChatWindow({ currentUser, contact }) {
  const { isLoading, error, data } = db.useQuery({
    messages: {},   
  });

  const allMessages = data?.messages || [];

    const messages = useMemo(() => {
    return allMessages
      .filter((m) => {
        if (!m) return false;
        const a = m.senderName;
        const b = m.receiverName;
        return (
          (a === currentUser && b === contact.name) ||
          (a === contact.name && b === currentUser)
        );
      })
      .sort((a, b) => {
        const t1 = typeof a.createdAt === "number" ? a.createdAt : 0;
        const t2 = typeof b.createdAt === "number" ? b.createdAt : 0;
        return t1 - t2;
      });
  }, [allMessages, currentUser, contact.name]);

  const handleSend = useCallback(
    async (text) => {
      if (!text.trim()) return;
      await sendMessage({
        text,
        senderName: currentUser,
        receiverName: contact.name,
      });
    },
    [currentUser, contact.name]
  );

  if (error) {
    
    console.error("InstantDB error in ChatWindow:", error);
  }

  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        position: "relative",
      }}
    >
      <header
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid #e5e7eb",
          background: "white",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "white",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
          }}
        >
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#1f2937",
            }}
          >
            {contact.name}
          </h2>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#10b981",
              marginTop: "0.125rem",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#10b981",
                animation: "pulse 2s infinite",
              }}
            />
            Online
          </div>
        </div>
      </header>

      <div
        style={{
          flex: 1,
          padding: "1.5rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          background: "linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)",
        }}
      >
        {isLoading && (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "#9ca3af",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                border: "3px solid #e5e7eb",
                borderTop: "3px solid #667eea",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            Loading messages...
          </div>
        )}

        {!isLoading && !error && messages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1rem",
              color: "#9ca3af",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              💬
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "1.125rem", fontWeight: "500", color: "#6b7280" }}>
                No messages yet
              </p>
              <p style={{ margin: "0.5rem 0 0", fontSize: "0.95rem" }}>
                Say hi to start the conversation 👋
              </p>
            </div>
          </div>
        )}

        {!isLoading &&
          !error &&
          messages.map((m) => (
            <Message
              key={m.id || `${m.senderName}-${m.createdAt}`} 
              message={m}
              isOwn={m.senderName === currentUser}
            />
          ))}

        {error && (
          <div
            style={{
              padding: "1rem",
              borderRadius: "12px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, fontWeight: "500" }}>⚠️ Something went wrong</p>
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.875rem", opacity: 0.8 }}>
              Check console for details
            </p>
          </div>
        )}
      </div>

      <MessageInput onSend={handleSend} />

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}

export default ChatWindow;