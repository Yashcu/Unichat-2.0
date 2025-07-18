# Project Report

## Table of Contents
1. [Brief Description](#brief-description)
2. [Features](#features)
3. [User Flow](#user-flow)
4. [Technical Stack](#technical-stack)
5. [Design Guidelines](#design-guidelines)
6. [Backend Structure](#backend-structure)
7. [Security Measures](#security-measures)
8. [In-Scope and Out-of-Scope](#in-scope-and-out-of-scope)

---

## Brief Description
UniChat is a modern, AI-integrated full-stack web platform designed to centralize academic communication, task management, collaboration, and personal productivity for universities. It replaces fragmented tools like WhatsApp, email, LMS forums, and third-party calendars with a secure, role-based environment that respects student privacy while enabling smarter workflows for students, faculty, and admins. The platform provides a real-time communication hub, a smart AI assistant for summarizing and planning, and productivity tools tailored for university life—all accessible from a single dashboard.

---

## Features
- Authentication (SSO, role-based)
- Role-based dashboards
- Real-time 1:1 and group chat
- Task & assignment manager
- Academic calendar
- AI productivity tools
- Privacy and controls
- Academic tools (materials, grades)
- Productivity extras (digest, habit tracker, focus mode)
- Admin portal

---

## User Flow
1. User lands on the **Landing Page** and chooses to log in or sign up.
2. After authentication, the user is directed to their **Dashboard** (role-based).
3. From the dashboard, the user can:
   - Access **Chat** (1:1 or group)
   - Manage **Tasks**
   - View the **Calendar**
   - Use **AI Tools**
   - Edit their **Profile**
4. **Admins** can access the **Admin Portal** for user management, logs, and broadcasts.
5. **Faculty** can manage assignments, materials, and grading.
6. **Universal pages** (Notifications, Help/Support, 404) are accessible as needed.

---

## Technical Stack
- **Frontend:** React with Vite
- **Backend:** Node.js with Express
- **Database:** PostgreSQL
- **Real-time Communication:** WebSockets
- **AI Integration:** OpenAI API
- **Authentication:** Auth0 or Firebase

---

## Design Guidelines
- **Styling:** Calming blue/green palette, clean sans-serif fonts
- **UI Components:** Intuitive, clearly labeled
- **Layout:** Centralized dashboard, split chat view
- **Navigation:** Sidebar, dropdowns for settings/profile

---

## Backend Structure
- **Database:**
  - User schema: ID, role, profile, preferences
  - Task schema: ID, user, tags, deadlines, status
  - Message schema: ID, sender, receiver, content, timestamp
- **API Endpoints:**
  - `/api/auth/login`, `/api/users`, `/api/tasks`, `/api/messages`, `/api/calendar`

---

## Security Measures
- JWT for session management
- HTTPS for data transmission
- Regular vulnerability assessments

---

## In-Scope and Out-of-Scope
| In-Scope                                      | Out-of-Scope                        |
|-----------------------------------------------|-------------------------------------|
| Core features as listed above                 | Mobile app version                  |
| Role-based dashboards, chat, tasks, calendar  | Advanced analytics/reporting        |
| AI productivity tools                         | Integration with external systems   |
| Admin portal                                  |                                     |

---

