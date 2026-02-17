# 🏠 Airbnb Clone – Full Stack Web Application

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/EJS-8B0000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Multer-FF6F00?style=for-the-badge" />
</p>

---

## 🚀 Project Overview

A scalable full-stack Airbnb Clone built using **Node.js, Express.js, MongoDB, and EJS** following the **MVC architecture**.

This project replicates core Airbnb features including authentication, property listings, reviews, image uploads, and secure session management.

---

## 🔥 Features

- 🔐 Authentication & Authorization (Passport.js)
- 🏠 Property Listings (Create, Read, Update, Delete)
- ⭐ Reviews & Ratings
- ☁️ Image Upload with Cloudinary + Multer
- 🛡 Role-Based Access Control (RBAC)
- ⚡ RESTful Routing
- 🗄 MongoDB Schema Validation & Indexing
- 🌍 Environment-based Configuration

---

## 🛠 Tech Stack

### Backend
- Node.js  
- Express.js  
- Passport.js  
- Multer  

### Database
- MongoDB  
- Mongoose (ODM)  

### Frontend
- EJS  
- HTML5  
- CSS3  
- Bootstrap  

### Cloud Services
- Cloudinary  

---

# ⚙️ Installation Guide

Follow these steps to run the project locally.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Hariom-99/Air-bnb-clone.git
cd Air-bnb-clone
```

---

## 2️⃣ Install Dependencies

Make sure Node.js (v18 or above) is installed.

```bash
npm install
```

---

## 3️⃣ Create Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Replace placeholder values with your actual credentials.

---

## 4️⃣ Setup MongoDB

### Option A: Local MongoDB

Start MongoDB locally:

```bash
mongod
```

### Option B: MongoDB Atlas

Use your MongoDB Atlas connection string inside `.env`.

---

## 5️⃣ Run the Application

Production mode:

```bash
npm start
```

Development mode (if nodemon configured):

```bash
npm run dev
```

---

## 🌍 Open in Browser

```
http://localhost:3000
```

---

# 📂 Project Structure

```bash
Air-bnb-clone/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── views/
├── public/
├── utils/
├── app.js
├── package.json
└── .env
```

---

# 🧠 Key Concepts Implemented

- MVC Architecture  
- RESTful APIs  
- Authentication & Authorization  
- Role-Based Access Control (RBAC)  
- Middleware Pattern  
- Data Modeling  
- MongoDB Indexing  
- Secure Session Handling  

---

# 🚀 Future Enhancements

- Payment Integration (Stripe)
- Booking Calendar System
- Advanced Search & Filtering
- Wishlist Feature
- JWT Authentication
- Deployment on AWS / Render

---

# 🤝 Contributing

Contributions are welcome.  
Fork the repository and submit a pull request.

---

# 📜 License

MIT License © 2026  

---

# 👨‍💻 Author

Hariom Patidar  
GitHub: https://github.com/Hariom-99
