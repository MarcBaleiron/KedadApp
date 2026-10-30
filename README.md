# KedadApp - Project Structure

This repository follows a strict **Layered Architecture (N-Tier)** to ensure maintainability and separation of concerns. As defined in our Architecture Decision Records (ADRs), the UI is completely decoupled from the database and optimized for desktop environments.

## Directory Structure

```text
KedadApp/
├── public/                 # 1. PRESENTATION LAYER (Frontend UI)
│   ├── index.html          # Main HTML structure (Desktop-first)
│   ├── css/                # Stylesheets
│   │   └── style.css
│   ├── js/                 # Client-side Vanilla JavaScript
│   │   ├── api.js          # Asynchronous fetch calls to the backend
│   │   ├── chat.js         # Group chat DOM manipulation
│   │   ├── map.js          # Google Maps API integration logic
│   │   └── calendar.js     # Shared calendar UI logic
│   └── assets/             # Images, icons, and static assets
│
├── src/                    # BACKEND (Node.js & Express)
│   ├── config/             # Environment and external connections
│   │   └── db.js           # MySQL database connection setup
│   │
│   ├── routes/             # API Endpoints mapping
│   │   ├── userRoutes.js
│   │   ├── groupRoutes.js
│   │   └── chatRoutes.js
│   │
│   ├── controllers/        # 2. CONTROLLER LAYER
│   │   ├── userController.js  # Validates incoming HTTP requests
│   │   ├── groupController.js
│   │   ├── planController.js  # Handles plan template requests
│   │   └── chatController.js
│   │
│   ├── services/           # 3. SERVICE LAYER (Business Logic)
│   │   ├── authService.js     # Password hashing (bcrypt) and JWT
│   │   ├── locationService.js # Algorithms for map midpoint calculation
│   │   └── chatService.js     # Chat logic and sanitization
│   │
│   ├── models/             # 4. DATA ACCESS LAYER (MySQL Queries)
│   │   ├── userModel.js       # Raw parameterized SQL queries
│   │   ├── groupModel.js
│   │   └── templateModel.js   # Fetches plan templates from DB
│   │
│   ├── middlewares/        # Express Middlewares
│   │   ├── auth.js         # Verifies JWT tokens for protected routes
│   │   └── errorHandler.js # Global error catching
│   │
│   └── app.js              # Express app configuration & middlewares
│
├── server.js               # Application entry point (starts the server)
├── .env                    # Environment variables (DB credentials, API Keys) - DO NOT COMMIT
├── .gitignore              # Specifies intentionally untracked files (node_modules, .env)
├── package.json            # Project dependencies (express, mysql2, bcrypt, etc.)
└── README.md               # Project documentation and setup instructions