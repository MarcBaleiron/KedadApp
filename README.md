# KedadApp

This repository follows a strict **Layered Architecture (N-Tier)** to ensure maintainability and separation of concerns. As defined in our Architecture Decision Records (ADRs), the UI is completely decoupled from the database and optimized for desktop environments.


## Project structure

```text
KedadApp/
├── public/                  # Presentation Layer (browser)
│   ├── css/
│   │   ├── style.css        # entry point, imports everything below
│   │   ├── base/            # tokens (design values) and reset
│   │   ├── layout/          # topbar, sidebar, page grid
│   │   ├── components/      # reusable: button, form, card, badge
│   │   ├── features/        # one file per feature: calendar, chat, map, survey, plans
│   │   └── utilities.css
│   ├── html/
│   │   ├── dashboard.html
│   │   ├── group.html
│   │   └── index.html
│   └── js/
│       ├── script.js        # entry point
│       ├── core/            # ApiClient (Singleton), Observable (Observer), FeatureFactory (Factory)
│       ├── models/          # MVC Model: state, business rules, data access
│       ├── views/           # MVC View: render + emit user events (no API, no rules)
│       ├── controllers/     # MVC Controller: wires a view to a model
│       ├── data/            # mock data until the backend is ready
│       └── utils/           # DOM helpers
├── server.js                # Express: serves public/ (and, later, the API)
├── src/                     # Controller, Service and Data Access layers (server)
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

## Design patterns (frontend)

| Pattern | Where | Purpose |
|---|---|---|
| **MVC** | `models/` · `views/` · `controllers/` | Model holds state and rules, View only renders, Controller connects them. |
| **Observer** | `core/Observable.js` (extended by `models/Model.js`) | When a model changes, its controller refreshes the view. |
| **Singleton** | `core/ApiClient.js` | One shared API client, as the architecture document requires. |
| **Factory** | `core/FeatureFactory.js` | `data-view="chat"` in the HTML → builds the Chat model, view and controller. |
| **Template Method** | `controllers/Controller.js` | `mount()` fixes the steps; each controller fills in `bind()` / `load()`. |

Flow: `user → View → Controller → Model → ApiClient`, and back `Model → (Observer) → Controller → View.render()`.
To add a feature: create its Model, View and Controller and register them in `FeatureFactory`.

## Run it

```bash
npm install
npm start        # http://localhost:3000
```

ES modules don't load from `file://`, so open the app through the server, not by double-clicking the HTML.