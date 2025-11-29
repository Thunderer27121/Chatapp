import { useEffect, useReducer } from "react";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";

let contacts = [
  { id: 1, name: "Shubham" },
  { id: 2, name: "Prashant" },
  { id: 3, name: "Yamank" },
  { id: 4, name : "Inderjeet singh"}
];

const STORAGE_KEY = "chat_username_v2";

const initialState = {
  currentUser: "",
  selectedContact: contacts[0],
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, currentUser: action.payload };
    case "SELECT_CONTACT":
      return { ...state, selectedContact: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { currentUser, selectedContact } = state;


  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && !currentUser) {
      dispatch({ type: "SET_USER", payload: saved });
    }
  }, [currentUser]);

  const handleSaveName = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.username;
    const name = input.value.trim();
    if (!name) return;

    localStorage.setItem(STORAGE_KEY, name);
    dispatch({ type: "SET_USER", payload: name });
  };

  const handleSelectContact = (contact) => {
    dispatch({ type: "SELECT_CONTACT", payload: contact });
  };

if(currentUser){
  contacts = contacts.filter((c)=>c.name != currentUser);
}

  if (!currentUser) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <form
          onSubmit={handleSaveName}
          style={{
            padding: "3rem 2.5rem",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            minWidth: "380px",
            animation: "slideUp 0.5s ease-out",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                margin: "0 auto 1rem",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                boxShadow: "0 8px 16px rgba(102, 126, 234, 0.4)",
              }}
            >
              💬
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: "1.75rem",
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
            name="username"
            placeholder="e.g. Alice, Bob"
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
            type="submit"
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
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
            }}
          >
            Continue
          </button>
        </form>
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
      }}
    >
      <ContactList
        contacts={contacts}
        selectedContact={selectedContact}
        onSelectContact={handleSelectContact}
      />
      <ChatWindow currentUser={currentUser} contact={selectedContact} />
    </div>
  );
}

export default App;