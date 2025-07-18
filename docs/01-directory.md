# Project Directory Structure

This document describes the organization of the UniChat project, including backend and frontend components.

unichat/
├── unichat-backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                  # MongoDB connection
│   │   │   ├── firebase.js            # Firebase/Auth0 setup
│   │   │   └── openai.js              # OpenAI API setup
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── task.controller.js
│   │   │   ├── message.controller.js
│   │   │   ├── calendar.controller.js
│   │   │   ├── ai.controller.js
│   │   │   ├── admin.controller.js
│   │   │   └── notification.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── task.routes.js
│   │   │   ├── message.routes.js
│   │   │   ├── calendar.routes.js
│   │   │   ├── ai.routes.js
│   │   │   ├── admin.routes.js
│   │   │   ├── notification.routes.js
│   │   │   └── index.js               # Central route aggregation
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Message.js
│   │   │   ├── Task.js
│   │   │   ├── Event.js
│   │   │   ├── Log.js
│   │   │   └── Notification.js
│   │   ├── middleware/
│   │   │   ├── auth.js                # JWT & Role middleware
│   │   │   ├── errorHandler.js
│   │   │   ├── logger.js
│   │   │   └── validate.js
│   │   ├── services/
│   │   │   ├── ai.service.js
│   │   │   ├── calendar.service.js
│   │   │   └── notification.service.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── app.js                     # Express config
│   │   └── server.js                  # Main entry
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
├── unichat-frontend/
│   ├── public/                        # Vite public assets
│   ├── src/
│   │   ├── assets/                    # Images, icons, fonts
│   │   ├── components/                # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ChatBubble.jsx
│   │   ├── layouts/                   # Role-based layout wrappers
│   │   │   ├── StudentLayout.jsx
│   │   │   ├── FacultyLayout.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── pages/
│   │   │   ├── student/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Chat.jsx
│   │   │   │   ├── Tasks.jsx
│   │   │   │   ├── Calendar.jsx
│   │   │   │   ├── AiTools.jsx
│   │   │   │   ├── Materials.jsx
│   │   │   │   └── Profile.jsx
│   │   │   ├── faculty/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Chat.jsx
│   │   │   │   ├── Tasks.jsx
│   │   │   │   ├── Calendar.jsx
│   │   │   │   ├── Materials.jsx
│   │   │   │   └── Profile.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Users.jsx
│   │   │   │   ├── Logs.jsx
│   │   │   │   ├── CalendarControl.jsx
│   │   │   │   ├── Broadcast.jsx
│   │   │   │   └── Profile.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   └── AuthCallback.jsx
│   │   │   ├── Help.jsx
│   │   │   └── NotFound.jsx
│   │   ├── routes/
│   │   │   ├── Router.jsx
│   │   │   ├── StudentRoutes.jsx
│   │   │   ├── FacultyRoutes.jsx
│   │   │   ├── AdminRoutes.jsx
│   │   │   └── PublicRoutes.jsx
│   │   ├── services/                  # API client services
│   │   │   ├── api.js                 # Axios base instance
│   │   │   ├── auth.js
│   │   │   ├── tasks.js
│   │   │   ├── chat.js
│   │   │   └── ai.js
│   │   ├── context/                   # Auth & Global Context
│   │   │   ├── AuthProvider.jsx
│   │   │   └── ThemeProvider.jsx
│   │   ├── hooks/                     # Custom hooks (e.g., useAuth)
│   │   ├── styles/                    # Tailwind & global styles
│   │   └── main.jsx                   # Vite entry point
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   ├── .env
│   └── README.md
├── README.md                         # Monorepo README
└── docs/                             # Architecture, diagrams, planning docs
```

## Best Practices
- **Shared Env:** Use .env files per project or .env.shared in monorepo root
- **API Proxy:** Use vite.config.js to proxy /api to localhost:5000 during dev
- **Component Library:** Integrate shadcn/ui for consistent components
- **Deployment:** Use Docker or PM2 for backend, Vercel/Netlify for frontend
- **Linting/Formatting:** Add ESLint + Prettier in both frontend/backend