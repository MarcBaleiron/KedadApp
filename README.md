# KedadApp

This repository follows a strict **Layered Architecture (N-Tier)** to ensure maintainability and separation of concerns. As defined in our Architecture Decision Records (ADRs), the UI is completely decoupled from the database and optimized for desktop environments.


## Project structure

```text
KedadApp/
├── public/
│   ├── css/
│   │   ├── calendar.css
│   │   ├── map.css
│   │   └── style.css
│   ├── html/
│   │   ├── dashboard.html
│   │   ├── group.html
│   │   └── index.html
│   └── js/
│       ├── api.js
│       ├── calendar.js
│       ├── chat.js
│       └── map.js
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   └── planController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── groupModel.js
│   │   ├── messageModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── groupRoutes.js
│   │   └── planRoute.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── chatService.js
│   │   └── locationService.js
│   └── utils/
│       └── formatters.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```