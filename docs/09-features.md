# UniChat Campus Connect – Features & Modules

## Feature Matrix
| Feature                  | Student | Faculty | Admin |
|--------------------------|:-------:|:-------:|:-----:|
| Real-time Chat           |   ✓     |   ✓     |   ✓   |
| Task Manager             |   ✓     |   ✓     |   ✓   |
| Academic Calendar        |   ✓     |   ✓     |   ✓   |
| AI Productivity Tools    |   ✓     |   ✓     |   ✓   |
| Course Materials         |   ✓     |   ✓     |       |
| Grade Tracking           |   ✓     |   ✓     |       |
| Admin Portal             |         |         |   ✓   |
| User Management          |         |         |   ✓   |
| System Logs              |         |         |   ✓   |
| Broadcast Messaging      |         |         |   ✓   |

---

## 1. Project Overview
UniChat Campus Connect is a centralized, AI-powered web platform designed to unify academic communication, productivity, and planning for universities. It provides role-based dashboards, real-time messaging, academic management, and AI tools—streamlining and replacing fragmented tools like WhatsApp, LMS forums, and email.

---

## 2. Key Modules & Features

| Module                | Features                                                                                 |
|-----------------------|------------------------------------------------------------------------------------------|
| **Authentication**    | University ID/email login, Role-based access, SSO/OAuth                                   |
| **Role-Based Dashboards** | Personalized widgets for tasks, events, and messages per user role                  |
| **Communication**     | Real-time 1:1 & group chat, anonymous mode, AI (GPT) summarization                       |
| **Task & Assignment Manager** | Manual/AI-based task creation, Submission tracker, Notifications              |
| **Academic Calendar** | Sync with master calendar, RSVP, personal events                                         |
| **AI Productivity Tools** | Chatbot, summarizers, auto-extractors, study planner                              |
| **Privacy & Controls**| Block/report, visibility settings, no phone/email required                               |
| **Academic Tools**    | Material repository, Grade tracker, AI-based prediction                                  |
| **Productivity Extras**| Weekly digest, Habit tracker, Focus mode                                                |
| **Admin Portal**      | User/role management, system logs, calendar & broadcast tools                            |

---

## 3. Module Explanations & Real-Life Examples

| Module           | Purpose                        | Example Use                                                      |
|------------------|--------------------------------|------------------------------------------------------------------|
| Authentication   | Secure login & access control  | Student logs in with ID; Faculty accesses advanced tools         |
| Dashboards       | Personalized summary view      | Student sees deadlines, unread messages, and today's classes     |
| Chat System      | Centralized communication      | Student chats with prof or forms a study group by course         |
| Task Manager     | Assignment tracking            | Tasks added manually or extracted by AI from messages            |
| Calendar         | Event visibility & scheduling  | Midterms auto-synced from university calendar                    |
| AI Tools         | Productivity enhancement       | Uploads PDF syllabus, AI generates 4-week study plan             |
| Privacy          | Identity & data protection     | Anonymous student questions in group chat                        |
| Academic Tools   | Resource & grade center        | Student checks predicted grade based on submissions              |
| Productivity     | Time & habit management        | Weekly digest of assignments + chat highlights                   |
| Admin Portal     | Platform control               | Admin adds new course-wide event for all users                   |

---

## 4. Suggested Page/Route Structure

| Route                | Description                                                      |
|----------------------|------------------------------------------------------------------|
| `/`                  | Landing Page (info + login/signup)                               |
| `/login` `/signup`   | Auth pages (ID/email login, SSO)                                 |
| `/dashboard`         | Main personalized dashboard                                      |
| `/chat`              | Chat system (1:1, group)                                         |
| `/tasks`             | Task manager & submission tracker                                |
| `/calendar`          | Academic + personal calendar                                     |
| `/assistant`         | AI tools & chatbot                                               |
| `/materials`         | Course materials repository                                      |
| `/grades`            | Grade tracking & predictions                                     |
| `/focus`             | Focus mode + Pomodoro timer                                      |
| `/admin`             | Admin portal (role = admin only)                                 |
| `/profile`           | Profile & privacy settings                                       |

---

## 5. Detailed Page Breakdown

<!-- For full details, see [Pages & Features](./Pages%20&%20Features.md) -->

### Landing Page (`/`)
- **Display:** Overview, benefits, login/signup buttons
- **Functions:** Redirect to Auth
- **UI Tips:** Clean, value-focused, minimal distractions

### Login / Signup (`/login`, `/signup`)
- **Display:** Email/ID form, role selector (if needed), SSO options
- **Functions:** Auth with backend API
- **API:** `/api/auth/login`
- **UI Tips:** Trust-building design, remember me toggle, error messages

### Dashboard (`/dashboard`)
- **Display:** Widgets – upcoming tasks, events, messages, digest
- **Functions:** Role-based widget load
- **APIs:**
  - `/api/tasks?user_id=xxx`
  - `/api/messages/unread`
  - `/api/calendar/events`
- **UI Tips:** Drag-and-drop widgets, collapsible sections

### Chat System (`/chat`)
- **Display:** Sidebar for users/groups, main chat area, message input
- **Functions:** Real-time chat, anonymous toggle, summarization
- **APIs:**
  - WebSocket (real-time)
  - `/api/messages` (fetch/send)
  - `/api/messages/summarize` (AI summary)
- **UI Tips:** Auto-scroll, read receipts, search, AI summary button

### Tasks Page (`/tasks`)
- **Display:** Task list, add/edit forms, upload field, filter by tag/status
- **Functions:** Manual/AI task creation, submission uploads, reminders
- **APIs:**
  - `/api/tasks` (CRUD)
  - `/api/tasks/extract-from-chat` (AI extraction)
  - `/api/tasks/submit`
- **UI Tips:** Tag color-coding, deadline progress bar, notification settings

### Calendar Page (`/calendar`)
- **Display:** Monthly/weekly view, toggle between personal/course/global events
- **Functions:** RSVP, sync, add events
- **API:** `/api/calendar`
- **UI Tips:** Color-coded categories, drag-to-create events

### AI Assistant Page (`/assistant`)
- **Display:** Chat UI + upload field
- **Functions:** Study planning, summarization
- **APIs:**
  - `/api/ai/ask`
  - `/api/ai/summarize`
  - `/api/ai/generate-study-plan`
- **UI Tips:** Tabs: "Chat", "Planner", "Summarizer", show loading spinner

### Materials Page (`/materials`)
- **Display:** File grid/list by course
- **Functions:** Upload/download, preview, organize
- **API:** `/api/materials`
- **UI Tips:** File type icons, drag-to-upload, version history

### Grades Page (`/grades`)
- **Display:** Gradebook with course-wise scores
- **Functions:** Prediction based on progress
- **APIs:** `/api/grades`, `/api/grades/predict`
- **UI Tips:** Graphs showing trends, prediction confidence %

### Focus Mode (`/focus`)
- **Display:** Pomodoro timer, tasks in focus
- **Functions:** Timer, task list integration, habit tracker
- **APIs:** `/api/habits`, `/api/tasks`
- **UI Tips:** Distraction-free, soothing color mode

### Admin Panel (`/admin`)
- **Display:** User list, logs, calendar editor, broadcaster
- **Functions:** Manage users, roles, messages
- **APIs:**
  - `/api/users`
  - `/api/logs`
  - `/api/calendar/global`
  - `/api/broadcast`
- **UI Tips:** Audit trails, confirmation modals for critical actions

---

## 6. Tech Stack & Optimization

**Current Choices:**
- **React + Next.js:** Fast, modern development
- **PostgreSQL:** Robust relational database
- **WebSocket:** Real-time chat
- **OpenAI:** GPT-based AI tools
- **shadcn/ui:** Rapid prototyping and consistent UI

**Suggestions:**
- **State Management:** Use Zustand or Redux Toolkit for scalable data flow
- **Monorepo:** Consider Turborepo for managing frontend/backend
- **Code Modularization:**
  - `/components/`, `/hooks/`, `/lib/`, `/services/`, `/pages/api/`
  - Each major feature in its own folder/module

---

## 7. Development Roadmap
1. Auth & Role Setup
2. User Dashboard
3. Chat System
4. Task Manager
5. Calendar
6. AI Tools
7. Academic Tools
8. Admin Portal
9. Polish UX/UI
10. Testing & Security

---

*For more details, see [API Routes](./APIRoutes.md), [Pages & Features](./Pages%20&%20Features.md), and the codebase README.*

