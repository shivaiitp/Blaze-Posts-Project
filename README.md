# 🔥 Blaze Posts

**Blaze Posts** is a full-stack social posting web app where users can create, edit, and explore posts in a beautiful, fast, and responsive UI. Built using the **MERN stack**, it focuses on providing a clean experience for creating and sharing content.

---

## 🚀 Features

- 🧑‍💻 User Authentication (Login & Signup)
- 📝 Create, Edit, and Delete Posts
- 🧾 Rich Text Editor for better content writing
- 🖼️ Upload images with posts
- 🗂️ Explore and browse all posts
- 🎨 Clean, modern, and responsive UI
- 💬 Commenting system *(optional/future scope)*
- 🔐 Protected Routes for authenticated actions

---

## 🛠️ Tech Stack

| Category    | Technologies                             |
|-------------|-------------------------------------------|
| Frontend    | React, Tailwind CSS, React Router         |
| State Mgmt  | Redux Toolkit                             |
| Backend     | Node.js, Express                          |
| Database    | MongoDB, Mongoose                         |
| Auth        | JWT, bcryptjs                             |
| Extras      | React Hook Form, Vite                     |

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shivaiitp/Blaze-Posts-Project.git
cd Blaze-Posts-Project
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual values.

---

### 4. Running the Project

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd ../frontend
npm run dev
```

> Frontend runs at `http://localhost:5173` and backend at `http://localhost:5000`.

---

## 📁 Project Structure

```
Blaze-Posts-Project/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
└── README.md
```

---

## ✨ Future Enhancements

- 👍 Like & Bookmark features
- 💬 Commenting on posts
- 👤 User profiles
- 🔍 Search functionality
- 📨 Email verification or password reset

---

## 🙌 Contributing

Pull requests are welcome! If you find a bug or want to improve the app, feel free to fork and submit a PR.

---

## 📄 License

This project is licensed under the [MIT License].

---

## 👨‍💻 Author

**Shiva**  
🔗 [GitHub](https://github.com/shivaiitp)
