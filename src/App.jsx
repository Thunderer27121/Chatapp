import { useEffect, useReducer, useState } from "react";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";

let contacts = [
  { id: 1, name: "Shubham" },
  { id: 2, name: "Prashant" },
  { id: 3, name: "Yamank" },
  { id: 4, name: "Inderjeet Singh" }
];

const initialState = {
  currentUser: "",
  selectedContact: contacts[0],
  isMobileMenuOpen: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, currentUser: action.payload };
    case "SELECT_CONTACT":
      return { ...state, selectedContact: action.payload, isMobileMenuOpen: false };
    case "TOGGLE_MOBILE_MENU":
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    case "CLOSE_MOBILE_MENU":
      return { ...state, isMobileMenuOpen: false };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { currentUser, selectedContact, isMobileMenuOpen } = state;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSaveName = () => {
    const name = username.trim();
    if (!name) return;
    dispatch({ type: "SET_USER", payload: name });
  };

  const handleSelectContact = (contact) => {
    dispatch({ type: "SELECT_CONTACT", payload: contact });
  };

  const handleToggleMobileMenu = () => {
    dispatch({ type: "TOGGLE_MOBILE_MENU" });
  };

  const handleCloseMobileMenu = () => {
    dispatch({ type: "CLOSE_MOBILE_MENU" });
  };

  const filteredContacts = currentUser
    ? contacts.filter((c) => c.name !== currentUser)
    : contacts;

  if (!currentUser) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          padding: isMobile ? "1rem" : "2rem",
        }}
      >
        <div
          style={{
            padding: isMobile ? "2rem 1.5rem" : "3rem 2.5rem",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            width: "100%",
            maxWidth: "380px",
            animation: "slideUp 0.5s ease-out",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                width: isMobile ? "70px" : "80px",
                height: isMobile ? "70px" : "80px",
                margin: "0 auto 1rem",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "2.25rem" : "2.5rem",
                boxShadow: "0 8px 16px rgba(102, 126, 234, 0.4)",
              }}
            >
              💬
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? "1.5rem" : "1.75rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome Back
            </h2>
            <p style={{ margin: "0.5rem 0 0", color: "#6b7280", fontSize: "0.95rem" }}>
              Enter your username to continue
            </p>
          </div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveName();
              }
            }}
            placeholder="choose from Inderjeet singh, Prashant, Shubham or Yamank only"
            style={{
              width: "100%",
              padding: "0.875rem 1rem",
              borderRadius: "12px",
              border: "2px solid #e5e7eb",
              marginBottom: "1rem",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e5e7eb";
              e.target.style.boxShadow = "none";
            }}
          />
          <button
            onClick={handleSaveName}
            style={{
              width: "100%",
              padding: "0.875rem 1rem",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            }}
          >
            Continue
          </button>
        </div>
        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
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

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#f8f9fa",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflow: "hidden",
      }}
    >
      {!isMobile && (
        <ContactList
          contacts={filteredContacts}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
          isMobile={false}
        />
      )}
      {isMobile && (
        <ContactList
          contacts={filteredContacts}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
          isMobile={true}
          isOpen={isMobileMenuOpen}
          onClose={handleCloseMobileMenu}
        />
      )}
      <ChatWindow
        currentUser={currentUser}
        contact={selectedContact}
        isMobile={isMobile}
        onMenuToggle={handleToggleMobileMenu}
      />
    </div>
  );
}

export default App;