# 🛒 KWI Demo Dashboard

An **E-Commerce Dashboard** built with **Next.js, Express, and TypeScript**.  
This project provides **product listing, cart management, and checkout functionalities** with a **modern UI and responsive design**.

---

## 🚀 Features & Functionalities

**Product Listing** – View available products with prices and images.  
**Add to Cart** – Increase/decrease quantity or remove products from the cart.  
**Cart Management** – Displays item quantities, subtotals, and total savings.  
**Checkout Flow** – Clears the cart and provides checkout feedback.  
**Persistent State** – Cart and products are stored in an SQLite database.  
**Responsive UI** – Works on both desktop and mobile screens.

---

## 🛠️ Tech Stack

### **Frontend:**

- **Next.js (latest)** – React-based framework for server-side rendering (SSR).
- **Material UI (MUI)** – Component library for a modern UI.
- **Tailwind CSS** – Utility-first styling for responsiveness.
- **Zustand** – Lightweight state management.
- **TypeScript** – Static typing for better maintainability.

### **Backend:**

- **Express.js** – Fast backend server.
- **SQLite** – Lightweight database for storing products and cart data.
- **TypeScript** – Ensures type safety.
- **Nodemon** – Auto-restarts the backend during development.

### **Deployment & DevOps:**

- **Docker & Docker Compose** – Containerized environment for frontend & backend.
- **ESLint & Prettier** – Linting and code formatting.

---

## 🔥 Clone the Repo

```sh
git clone https://github.com/yangjialin94/kwi-demo.git
cd kwi-demo
```

---

## 💻 Run Locally (Fast)

If you prefer to run the project locally without Docker, follow these steps:

1. Start the Backend (Express + SQLite)

```sh
cd backend
npm install
npm run dev
```

2. Start the Frontend (Next.js)

```sh
cd frontend
npm install
npm run dev
```

- Runs the frontend at **<http://localhost:3000>**
- Runs the backend at **<http://localhost:8000>**

---

## 🐳 Run with Docker (Slow)

To run the **frontend and backend** inside **Docker containers**, use:

```sh
docker-compose up --build
```

- This command **builds and runs** both frontend and backend inside Docker containers.
- The frontend will be accessible at **<http://localhost:3000>**
- The backend will be running at **<http://localhost:8000>**
- ⚠ Attention!! It would take **around 2 minutes** for the frontend to be compiled once the URL is opened 😢.

To stop the running containers, use:

- press Ctrl+C

```sh
docker-compose down
```

---

## 📌 API Endpoints

🔹 Products

- GET /api/products → Fetch all products.

🔹 Cart

- GET /api/cart → Fetch cart items.
- POST /api/cart/add → Add a product to the cart.
- POST /api/cart/remove → Remove or decrease quantity.
- POST /api/cart/checkout → Checkout and clear the cart.
