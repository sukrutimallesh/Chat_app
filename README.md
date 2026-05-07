# Snappy — Real-Time Chat Application

> A full-stack real-time chat application featuring instant messaging via Socket.io, user authentication, and custom avatar selection.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-snappy--chat.vercel.app-blue?style=for-the-badge)](https://snappy-chat-sukruti.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-sukrutimallesh%2FChat__app-black?style=for-the-badge&logo=github)](https://github.com/sukrutimallesh/Chat_app)

---

## Tech Stack

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Socket.io](https://img.shields.io/badge/Socket.io-4.7-010101?style=flat-square&logo=socketdotio)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Styled Components](https://img.shields.io/badge/Styled--Components-6-DB7093?style=flat-square&logo=styled-components)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square)

| Layer | Technology |
|---|---|
| Frontend | React 18, Styled Components, React Router |
| Real-time | Socket.io 4.7 (WebSocket) |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas free tier) |
| Auth | bcrypt password hashing |
| Frontend hosting | Vercel |
| Backend hosting | Render |

---

## Features

- **Real-time messaging** — Socket.io WebSocket connections deliver messages instantly with zero polling
- **Online presence tracking** — Server maintains a `userId → socket.id` map; messages route directly to the recipient's open socket
- **User authentication** — Registration and login with bcrypt-hashed passwords stored in MongoDB
- **Avatar selection** — Users pick a unique SVG avatar from the [Multiavatar API](https://multiavatar.com/) after registering
- **Emoji picker** — Full emoji support in the chat input
- **Persistent sessions** — Login state survives page refresh via `localStorage`

---

## Architecture

```
[React Frontend — Vercel]
        |
        | HTTP (REST) + WebSocket (Socket.io)
        |
[Express + Socket.io Server — Render]
        |
        | Mongoose ODM
        |
[MongoDB Atlas]
```

The server maintains a global `onlineUsers` map of `userId → socket.id`. When user A sends a message, the server looks up B's socket ID and emits `msg-recieve` directly — no broadcast, no polling.

---

## Screenshots

| Login | Chat |
|---|---|
| *(add screenshot)* | *(add screenshot)* |

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB (local) or a free [MongoDB Atlas](https://cloud.mongodb.com) cluster

### Backend
```bash
cd server
cp .env.example .env   # fill in MONGO_URL, PORT, CLIENT_URL
npm install
node index.js          # runs on port 5000
```

### Frontend
```bash
cd public
cp .env.example .env   # set REACT_APP_SERVER_URL=http://localhost:5000
npm install
npm start              # runs on port 3000
```

---

## Deployment

### Database → MongoDB Atlas
1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Whitelist `0.0.0.0/0` under **Network Access**
3. Copy the connection string — this is your `MONGO_URL`

### Backend → Render
1. Create a [Render](https://render.com) account and connect this repo
2. Create a **Web Service** — point root to `server/`, build `npm install`, start `node index.js`
3. Add env vars: `MONGO_URL`, `PORT=10000`, `CLIENT_URL=<your Vercel URL>`
4. Auto-deploys on every push to `main`

### Frontend → Vercel
1. Import the repo at [vercel.com](https://vercel.com)
2. Set **Build Command**: `cd public && npm install && npm run build`
3. Set **Output Directory**: `public/build`
4. Add env var: `REACT_APP_SERVER_URL` → your Render backend URL
5. Click **Deploy**

---

## Project Structure

```
Chat_app/
├── public/                   # React frontend (Create React App)
│   ├── src/
│   │   ├── pages/            # Chat, Login, Register, SetAvatar
│   │   ├── components/       # ChatContainer, Contacts, ChatInput, Logout, Welcome
│   │   └── utils/APIRoutes.js
│   └── .env.example
├── server/                   # Express + Socket.io backend
│   ├── controllers/          # usersController, messageController
│   ├── model/                # userModel, messageModel (Mongoose)
│   ├── routes/               # auth.js, messages.js
│   ├── index.js              # Entry point, Socket.io setup
│   ├── render.yaml           # Render deployment config
│   └── .env.example
├── vercel.json               # Vercel frontend deployment config
└── README.md
```

---

## License

MIT
