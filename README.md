💬 InstantChat – Realtime Chat App with Offline Sync

InstantChat is a modern chat application built using React and InstantDB. It allows users to send and receive messages in real-time, supports multiple users, and keeps chat history permanently synced—even when offline.

The main focus of this project is to demonstrate:

Realtime messaging

Local-first & offline support

Automatic sync when coming back online

Modern component-based architecture

Clean React state management

✨ Features

✔️ Realtime messaging between two different users
✔️ Browser-local user login (no backend needed)
✔️ Offline-first data handling
✔️ Messages sync when the user reconnects
✔️ Message history preserved
✔️ Auto UI updates using InstantDB subscriptions
✔️ React components architecture:

ChatWindow

ContactList

Message

MessageInput

🧠 Tech Stack
Frontend:

React (Vite)

JavaScript (ES6+)

HTML & CSS

Database (no backend required):

InstantDB

realtime sync

local storage cache

auto-reconnect

📁 Folder Structure
src/
├── App.jsx
├── db.js
├── components/
│   ├── ChatWindow.jsx
│   ├── ContactList.jsx
│   ├── Message.jsx
│   └── MessageInput.jsx
└── index.css

🚀 How It Works

InstantChat uses the InstantDB client to:

Subscribe to message updates using db.useQuery()

Write messages using db.transact()

Keep messages even when offline

Sync messages automatically when connection restores

No backend server, no WebSockets, no manual syncing needed.

Example logic:

db.useQuery({
  messages: {},
});


This live query automatically keeps the app updated.

🧑‍💻 Setup & Installation
Clone the repo:
git clone (https://github.com/Thunderer27121/Chatapp.git)
cd yourfolder

Install dependencies:
npm install

Add your InstantDB App ID

Create .env file:

VITE_APP_ID=your_instantdb_app_id

Start development server:
npm run dev

🧪 Testing Multi-User Chat

Open your app in two different browser windows:

Window #1 → Username: Inderjeet singh

Window #2 → Username: Shubham

Chat from both sides and watch messages sync.

🔌 Offline Test

Try this:

Disconnect Internet (DevTools → Network → Offline)

Send message as Inderjeet singh

Reconnect Internet

Message syncs to Shubham

This demonstrates local-first + sync functionality.

📌 Future Improvements (planned)

User authentication

Online presence indicator

Typing indicator

Chat rooms / groups

Message reactions

🧑 Author

This project is developed by Inderjeet Singh 😎

🛡️ License

This project is open-source under the MIT License.
