# UniChat - Academic Communication Platform

UniChat is a role-based academic communication and productivity platform designed for universities. It centralizes academic chats, task management, and productivity tools using real-time communication and AI summarization.

## 🚀 Features

- **Role-based Access**: Student, Faculty, and Admin roles with different permissions
- **Real-time Chat**: WebSocket-based messaging with 1:1 and group conversations
- **Task Management**: Create, assign, and track tasks and assignments
- **Academic Calendar**: Event management with RSVP functionality
- **AI Assistant**: GPT-powered summarization and study planning
- **Admin Panel**: User management, system logs, and global broadcasts

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Socket.IO** for real-time communication
- **JWT** for authentication
- **OpenAI API** for AI features
- **Firebase Admin** (optional for SSO)

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Socket.IO Client** for real-time features
- **Axios** for API communication

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- OpenAI API key (for AI features)
- Firebase project (optional, for SSO)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd unichat
```

### 2. Backend Setup
```bash
cd unichat-backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env with your configuration
# Required variables:
# - MONGO_URI
# - JWT_SECRET
# - OPENAI_API_KEY
# - PORT (optional, defaults to 5000)

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd unichat-frontend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env with your configuration
# Required variables:
# - VITE_API_URL (defaults to http://localhost:5000/api)

# Start development server
npm run dev
```

### 4. Database Setup
Make sure MongoDB is running and accessible. The application will automatically create the necessary collections.

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/unichat

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# Firebase Configuration (Optional)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY=your-firebase-private-key

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

#### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Socket Configuration
VITE_SOCKET_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=UniChat
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_AI=true
VITE_ENABLE_SOCKETS=true
```

## 📁 Project Structure

```
unichat/
├── docs/                    # Documentation
├── unichat-backend/         # Backend application
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   └── package.json
└── unichat-frontend/        # Frontend application
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── context/        # React contexts
    │   ├── hooks/          # Custom hooks
    │   ├── layouts/        # Layout components
    │   ├── pages/          # Page components
    │   ├── routes/         # Routing configuration
    │   ├── services/       # API services
    │   ├── styles/         # CSS styles
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # App entry point
    └── package.json
```

## 🔐 Authentication & Authorization

The application uses JWT-based authentication with role-based access control:

- **Students**: Can chat, manage tasks, view calendar, use AI tools
- **Faculty**: Same as students + assignment creation and tracking
- **Admin**: Full system control, user management, system logs

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/user/me` - Get current user profile

### Chat
- `POST /api/chat/messages` - Send message
- `GET /api/chat/conversations` - Get conversations
- `GET /api/chat/messages/:id` - Get conversation messages

### Tasks
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Calendar
- `GET /api/calendar` - Get events
- `POST /api/calendar` - Create event
- `POST /api/calendar/:id/rsvp` - RSVP to event

### AI Tools
- `POST /api/ai/summarize-doc` - Summarize document
- `POST /api/ai/extract-tasks` - Extract tasks from text
- `POST /api/ai/study-plan` - Generate study plan

### Admin (Admin only)
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/logs` - System logs
- `POST /api/admin/broadcast` - Send global message
- `GET /api/admin/users` - Get all users

## 🐛 Common Issues & Solutions

### 1. MongoDB Connection Error
**Error**: `MongoDB connection error`
**Solution**: 
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env` file
- Verify network connectivity

### 2. JWT Token Issues
**Error**: `Invalid token` or `Token expired`
**Solution**:
- Check `JWT_SECRET` in backend `.env`
- Ensure token is being sent in Authorization header
- Clear browser storage and re-login

### 3. CORS Errors
**Error**: `CORS policy blocked`
**Solution**:
- Verify `CORS_ORIGIN` in backend `.env`
- Ensure frontend URL matches CORS configuration

### 4. Socket.IO Connection Issues
**Error**: `Socket connection failed`
**Solution**:
- Check `VITE_SOCKET_URL` in frontend `.env`
- Ensure backend server is running
- Verify authentication token

### 5. OpenAI API Errors
**Error**: `OpenAI API error`
**Solution**:
- Verify `OPENAI_API_KEY` in backend `.env`
- Check API key permissions and quota
- Ensure proper API key format

## 🧪 Testing

### Backend Tests
```bash
cd unichat-backend
npm test
```

### Frontend Tests
```bash
cd unichat-frontend
npm test
```

## 📦 Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set secure `JWT_SECRET`
4. Configure CORS for production domain
5. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Update `VITE_API_URL` to production backend URL
2. Build the application: `npm run build`
3. Deploy the `dist` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `docs/` folder
- Review the API documentation in `docs/08-api-routes.md`

## 🔄 Recent Fixes

### Fixed Issues:
1. **Database Schema Mismatch**: Updated models to match documentation
2. **Missing API Routes**: Added tasks, calendar, AI, and admin routes
3. **Frontend Template**: Replaced default Vite template with proper UniChat app
4. **Missing Components**: Created layout components and dashboard pages
5. **Authentication**: Fixed JWT middleware and user lookup
6. **Environment Configuration**: Added proper environment file templates
7. **Dependencies**: Added missing security and utility packages

### Next Steps:
1. Implement remaining frontend pages (Tasks, Calendar, AI Assistant)
2. Add comprehensive error handling
3. Implement file upload functionality
4. Add comprehensive testing
5. Set up CI/CD pipeline 