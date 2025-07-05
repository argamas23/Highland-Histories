# 🏔️ Highland Histories

**Highland Histories** is a full-stack web application for managing, uploading, and exploring multimedia historical content from the Highlands region. It includes:

- A **Node.js + Express backend** with MongoDB
- A **React frontend** for interacting with the archive


✅ **Live Deployment:**  
The backend API is deployed on an AWS EC2 instance and available at:  
👉 `https://highlandhistories.org`

---

## 📁 Project Structure

```
Highland-Histories/
├── backend/         # Node.js/Express backend API
├── frontend/        # React frontend client
├── .gitignore
├── .gitattributes
└── README.md
```

---

## ✨ Features

### 🌐 Web Application
- User authentication and authorization (JWT + bcrypt)
- Upload and manage files (images, audio, video, PDFs) via **Multer** and **MongoDB GridFS**
- Role-based content access and dynamic filtering
- PDF preview and multimedia rendering
- REST API for archival metadata
- Admin panel for managing historical content



## ⚙️ Technologies Used

### 🖥️ Web Stack
- **Node.js & Express**: Backend API
- **MongoDB & Mongoose**: Database layer
- **React.js**: Frontend UI
- **Multer & GridFS**: File storage and streaming
- **JWT & bcrypt**: Auth and security



---

## 🛠️ Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB (local or MongoDB Atlas)


---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/argamas23/Highland-Histories.git
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create a `.env` file in `backend/` with:

```env
MONGO_URI=mongodb://localhost:27017/highland-histories
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### Start the server:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

- Frontend runs at `http://localhost:3000`
- Backend runs at `http://localhost:5000`

---


## 🔧 Scripts

### Backend
- `npm start` — Starts the backend server

### Frontend
- `npm start` — Starts the React development server
- `npm run build` — Builds the app for production

---

## 🌐 API Highlights

- `POST /api/auth/register` – User registration
- `POST /api/auth/login` – User login (JWT-based)
- `GET /api/files` – Retrieve list of archive files
- `POST /api/upload` – Upload multimedia content
- `GET /api/files/:id` – Stream/view content by ID

---

## 🔑 Authentication

- Backend uses JWT for secure routes
- Passwords are hashed with bcrypt
- Flutter app supports OTP login via Twilio

---

## 🖼️ File Handling

- PDF previews rendered using `@react-pdf/renderer`
- Videos/images stored with GridFS and streamed on demand
- Admins can tag, edit, and delete content via dashboard

---

## 📦 Environment Variables

### Backend `.env`
```
MONGO_URI=...
JWT_SECRET=...
PORT=5000
```

### Frontend `.env` (optional)
```
REACT_APP_BACKEND_URL=http://localhost:5000
```


---

## 🤝 Contributing

Pull requests are welcome! Please:

- Fork the repo
- Make your changes
- Submit a PR with a clear description

---

## 📬 Contact

**Developed by Team [Your Name/Organization]**  
For queries, email: `samagrabharti@gmail.com`

---

## 🙏 Acknowledgements

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://reactjs.org/)
- [Multer](https://github.com/expressjs/multer)
- [MongoDB GridFS](https://www.mongodb.com/docs/manual/core/gridfs/)
