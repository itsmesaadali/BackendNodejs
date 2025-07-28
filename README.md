
# 🎥 VideoStream Web App

A modern, full-stack video streaming platform built using **React.js** on the frontend, **Node.js/Express** on the backend, and **Cloudinary** for secure video uploads and streaming. Styled beautifully with **Tailwind CSS** and structured with clean separation of frontend and backend folders.

---

## 🌐 Live Demo

> 🚧 *Coming soon...*

---

## 📁 Folder Structure

```bash
videostream/
├── backend/               # Node.js + Express Backend
│   ├── controllers/       # Route logic (e.g., upload, stream)
│   ├── routes/            # API routes
│   ├── config/            # Cloudinary and server config
│   ├── models/            # DB models (if using DB like MongoDB)
│   ├── utils/             # Helper functions
│   └── index.js           # Entry point (Express server)
│
├── frontend/              # React.js Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Pages like Home, Upload, Player
│   │   ├── hooks/         # Custom React Hooks
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # React DOM render
│   └── tailwind.config.js # Tailwind CSS config
│
├── README.md
├── .env                  # Environment variables
└── package.json
```

---

## 🚀 Features

- 📹 Upload videos to **Cloudinary**
- 🔗 Stream videos via secure Cloudinary links
- 🔍 Video search & filter (optional enhancement)
- 🧾 Clean REST API for handling uploads and playback
- 🖼️ Beautiful responsive UI with **Tailwind CSS**
- 🗂️ Organized codebase with backend/frontend separation

---

## 🧰 Tech Stack

### Frontend
- ⚛️ React.js (Vite or CRA)
- 🎨 Tailwind CSS
- 📦 Axios (for API requests)

### Backend
- 🟢 Node.js
- ⚡ Express.js
- ☁️ Cloudinary SDK (for uploads)
- 🔒 dotenv for environment variables

---

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/itsmesaadali/BackendNodejs.git
cd BackendNodejs
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
# Create a .env file and add:
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
# PORT=5000

npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend will usually run on `http://localhost:5173`  
> Backend will run on `http://localhost:5000`

---

## 📸 Screenshots

| Home Page | Upload Page | Video Player |
|----------|-------------|--------------|
| ![](https://via.placeholder.com/300x180?text=Home) | ![](https://via.placeholder.com/300x180?text=Upload) | ![](https://via.placeholder.com/300x180?text=Player) |

---

## 🌩️ Cloudinary Integration

Videos are uploaded and streamed using Cloudinary. Make sure to:

1. Create an account on [Cloudinary](https://cloudinary.com/)
2. Get your **Cloud Name**, **API Key**, and **API Secret**
3. Add them to the `.env` file in the backend.

---

## 📚 Future Improvements

- 🔐 Authentication with JWT
- ❤️ Like, comment, or save videos
- 🧠 AI-generated thumbnails
- 📊 Admin dashboard for video analytics

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit a pull request if you'd like to improve this project.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Contact

Made with ❤️ by [itsmesaadali](https://github.com/itsmesaadali)  
📧 Email: itmesaad@gmail.com
