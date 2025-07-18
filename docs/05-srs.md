# Software Requirements Specification (SRS)

## Revision History
| Version | Date       | Author      | Description     |
|---------|------------|-------------|-----------------|
| 1.0     | YYYY-MM-DD | [Your Name] | Initial draft   |

---

## 1. Introduction

### 1.1 Purpose
UniChat is a role-based academic communication and productivity platform designed for universities. This document outlines the functional and non-functional requirements for the development of the UniChat MVP.

### 1.2 Scope
UniChat centralizes academic chats, task management, and productivity tools using real-time communication and AI summarization. It supports different roles (Student, Faculty, Admin) and provides them with a personalized dashboard.

### 1.3 Definitions, Acronyms, and Abbreviations
- **MVP:** Minimum Viable Product
- **SSO:** Single Sign-On
- **AI:** Artificial Intelligence
- **API:** Application Programming Interface

### 1.4 References
- OpenAI GPT API Docs
- Firebase Auth Documentation
- Supabase Documentation
- React, Vite, Tailwind, shadcn/ui Docs

---

## 2. Overall Description

### 2.1 Product Perspective
UniChat is a standalone full-stack web application.

### 2.2 Product Functions
- Role-based login and dashboard
- Real-time chat (1:1 and group)
- Task and assignment manager
- Academic calendar with event RSVP
- AI assistant for summarization and planning
- Admin tools for user and system control

### 2.3 User Classes and Characteristics
- **Student:** Can chat, manage tasks, view calendar, use AI tools
- **Faculty:** Same as Student + assignment creation and tracking
- **Admin:** Full system control, user and calendar management

### 2.4 Operating Environment
- Web browser (Chrome, Firefox, Safari)
- Hosted backend (Node.js/Express)
- PostgreSQL database (Supabase or hosted)

### 2.5 Design and Implementation Constraints
- Use Firebase/Auth0 for authentication
- PostgreSQL for all data storage
- OpenAI API for GPT features

---

## 3. Functional Requirements

### 3.1 Authentication & Authorization
- Login with student ID or email via Firebase/Auth0
- Role-based access to features and routes

### 3.2 Dashboard
- Dynamic widgets based on user role
- Displays upcoming tasks, recent chats, and calendar highlights

### 3.3 Real-Time Chat
- WebSocket (Socket.IO or Firebase)
- 1:1 and group chats
- Anonymous mode for students
- GPT-based chat summarization
- Block/report user feature

### 3.4 Task & Assignment Manager
- Manual task creation with tags
- Assignment upload with deadline tracking
- Notification system via email/push

### 3.5 Academic Calendar
- Sync with university master calendar
- Create and RSVP to events
- Filter by event type (exam, holiday, deadline)

### 3.6 AI Productivity Tools
- AI assistant chatbot (GPT-4)
- Document/chat summarizer
- Study plan generator from syllabus or messages
- Task extractor from chat

### 3.7 Admin Panel
- User role management
- Calendar control
- System logs and activity monitoring
- Global broadcast messaging

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Chat messages delivered in real-time (<500ms latency)
- API response time <1s

### 4.2 Security
- JWT for session management
- HTTPS enforced
- Role-based permission enforcement

### 4.3 Usability
- Clean, intuitive UI with clear visual hierarchy
- Responsive design for all screen sizes

### 4.4 Scalability
- Easily extendable for mobile apps or more users
- Modular backend structure with separated services

---

## 5. External Interface Requirements

### 5.1 User Interfaces
- React with Tailwind CSS + shadcn/ui
- Sidebar navigation with dashboard, chat, tasks, calendar

### 5.2 APIs
| Endpoint                | Description                        |
|------------------------|------------------------------------|
| /api/auth/login        | Login and session handling          |
| /api/users             | CRUD for users and roles            |
| /api/messages          | Send and fetch messages             |
| /api/tasks             | Task and assignment management      |
| /api/calendar          | Calendar CRUD and RSVP              |
| /api/ai/summarize      | Summarize document/chat             |
| /api/ai/generate-plan  | Study plan generator                |
| /api/ai/extract-tasks  | Auto-task extraction                |
| /api/broadcast         | Send global messages                |
| /api/logs              | View system activity logs           |

---

## 6. Use Cases (Text Summary)
- User can log in and access their dashboard based on role.
- User can participate in real-time chat (1:1 and group).
- User can manage tasks and assignments.
- User can view and RSVP to calendar events.
- User can use AI tools for summarization and planning.
- Faculty can create assignments and grade submissions.
- Admin can manage users, view logs, and broadcast messages.

---

## 7. Future Enhancements (Post-MVP)
- Mobile App Version (PWA or Native)
- Grade prediction and analytics tools
- Study group matching algorithm
- Offline mode for key features

---

## 8. Appendices
- Sample data schemas
- Wireframe sketches (if any)
- GPT prompt templates

End of Document

