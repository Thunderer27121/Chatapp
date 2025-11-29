function ContactList({ contacts, selectedContact, onSelectContact }) {
  return (
    <aside
      style={{
        width: "320px",
        background: "white",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        style={{
          padding: "1.5rem 1.25rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "1.75rem" }}>💬</span>
          Contacts
        </h2>
        <p style={{ margin: "0.25rem 0 0", opacity: 0.9, fontSize: "0.875rem" }}>
          {contacts.length} available
        </p>
      </div>
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
                padding: "1rem 1.25rem",
                cursor: "pointer",
                background: isSelected
                  ? "linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)"
                  : "transparent",
                borderLeft: isSelected ? "4px solid #667eea" : "4px solid transparent",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "rgba(102, 126, 234, 0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: isSelected
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "linear-gradient(135deg, #a8b3f5 0%, #b89dd8 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "white",
                  flexShrink: 0,
                  boxShadow: isSelected
                    ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s ease",
                }}
              >
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: isSelected ? "600" : "500",
                    fontSize: "1rem",
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
  );
}

export default ContactList;