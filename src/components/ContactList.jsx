function ContactList({ contacts, selectedContact, onSelectContact, isMobile, isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobile && isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
            animation: "fadeIn 0.2s ease-out",
          }}
        />
      )}
      
      {/* Contact sidebar */}
      <aside
        style={{
          width: isMobile ? "280px" : "320px",
          background: "white",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.05)",
          position: isMobile ? "fixed" : "relative",
          top: 0,
          left: isMobile ? (isOpen ? 0 : "-280px") : 0,
          height: isMobile ? "100vh" : "auto",
          zIndex: 999,
          transition: "left 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: isMobile ? "1.25rem 1rem" : "1.5rem 1.25rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? "1.25rem" : "1.5rem",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: isMobile ? "1.5rem" : "1.75rem" }}>💬</span>
              Contacts
            </h2>
            {/* Close button for mobile */}
            {isMobile && (
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "white",
                  fontSize: "1.5rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            )}
          </div>
          <p style={{ margin: "0.25rem 0 0", opacity: 0.9, fontSize: "0.875rem" }}>
            {contacts.length} available
          </p>
        </div>

        {/* Contact list */}
        <ul
          style={{
            listStyle: "none",
            padding: "0.75rem 0",
            margin: 0,
            flex: 1,
            overflowY: "auto",
          }}
        >
          {contacts.map((c) => {
            const isSelected = selectedContact && selectedContact.id === c.id;
            return (
              <li
                key={c.id}
                onClick={() => onSelectContact(c)}
                style={{
                  padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
                  cursor: "pointer",
                  background: isSelected
                    ? "linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)"
                    : "transparent",
                  borderLeft: isSelected ? "4px solid #667eea" : "4px solid transparent",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: isMobile ? "42px" : "48px",
                    height: isMobile ? "42px" : "48px",
                    borderRadius: "50%",
                    background: isSelected
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "linear-gradient(135deg, #a8b3f5 0%, #b89dd8 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "1.1rem" : "1.25rem",
                    fontWeight: "600",
                    color: "white",
                    flexShrink: 0,
                    boxShadow: isSelected
                      ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                      : "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {c.name.charAt(0).toUpperCase()}
                </div>

                {/* Contact info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: isSelected ? "600" : "500",
                      fontSize: isMobile ? "0.95rem" : "1rem",
                      color: isSelected ? "#667eea" : "#1f2937",
                      marginBottom: "0.125rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#9ca3af",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isSelected ? "Active now" : "Tap to chat"}
                  </div>
                </div>

                {/* Online indicator */}
                {isSelected && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#10b981",
                      boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)",
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default ContactList;