# KedadApp 🗺️📅
KedadApp es una plataforma centralizada para organizar eventos y planes en grupos grandes, resolviendo problemas de disponibilidad e incertidumbre sobre qué actividades realizar, ajustándose a la ubicación de cada miembro.

## Stack Tecnológico 🛠️
Frontend: HTML5, CSS3, Vanilla JavaScript
Backend: Node.js, Express.js
Base de Datos: MySQL
Despliegue: Vercel
---
## Estructura del Proyecto (Esqueleto) 📂
El proyecto sigue una Arquitectura en Capas (N-Tier) para separar la lógica de negocio, el acceso a datos y la interfaz de usuario, garantizando así un código modular y mantenible.
```text
KedadApp/
│
├── public/                 # FRONTEND: Archivos estáticos servidos al cliente
│   ├── css/                # Estilos globales y específicos
│   │   ├── style.css
│   │   ├── calendar.css
│   │   └── map.css
│   ├── js/                 # Lógica del lado del cliente (Peticiones fetch, DOM)
│   │   ├── api.js          # Funciones para comunicarse con el backend
│   │   ├── chat.js         # Lógica del chat en tiempo real
│   │   ├── map.js          # Integración con Google Maps API
│   │   └── calendar.js     # Lógica del calendario compartido
│   ├── assets/             # Imágenes, iconos y fuentes
│   ├── index.html          # Página principal (Login / Registro)
│   ├── dashboard.html      # Panel principal del usuario y sus grupos
│   └── group.html          # Vista específica de un grupo (Mapa, Chat, Calendario)
│
├── src/                    # BACKEND: Lógica del servidor (Node + Express)
│   ├── config/             # Configuraciones globales
│   │   ├── db.js           # Conexión al pool de MySQL
│   │   └── env.js          # Carga de variables de entorno (.env)
│   │
│   ├── routes/             # Enrutadores (Endpoints de la API REST)
│   │   ├── authRoutes.js   # /api/auth (Login, Registro)
│   │   ├── groupRoutes.js  # /api/groups (Crear grupos, añadir miembros)
│   │   ├── chatRoutes.js   # /api/chat (Enviar y recibir mensajes)
│   │   └── planRoutes.js   # /api/plans (Plantillas y sugerencias por ubicación)
│   │
│   ├── controllers/        # Controladores: Validan peticiones y llaman a servicios
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   └── planController.js
│   │
│   ├── services/           # Lógica de Negocio y algoritmos complejos
│   │   ├── authService.js
│   │   ├── chatService.js
│   │   └── locationService.js # Cálculo del punto medio de localizaciones
│   │
│   ├── models/             # Capa de Acceso a Datos (DAL): Consultas SQL
│   │   ├── userModel.js    # Consultas a la tabla Users
│   │   ├── groupModel.js   # Consultas a la tabla Groups
│   │   └── messageModel.js # Consultas a la tabla Messages
│   │
│   ├── middlewares/        # Middlewares de Express
│   │   ├── auth.js         # Verificación de tokens JWT
│   │   └── errorHandler.js # Manejo global de errores
│   │
│   └── utils/              # Funciones de ayuda (Helpers)
│       └── formatters.js   # Formateo de fechas, sanitización de inputs, etc.
│
├── .env.example            # Ejemplo de variables de entorno (Sin contraseñas reales)
├── .gitignore              # Archivos ignorados por Git (node_modules, .env)
├── package.json            # Dependencias del proyecto (Express, mysql2, bcrypt, jsonwebtoken)
├── server.js               # Punto de entrada principal de la aplicación
└── README.md               # Documentación del proyecto (Este archivo)
```