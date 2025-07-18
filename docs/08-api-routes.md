# API Routes

All routes are prefixed with `/api` and require authentication via JWT unless otherwise noted. Versioning is handled via the base path (e.g., `/api/v1/`).

## Auth Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | /auth/register | Register user with role, email, ID |
| POST | /auth/login | Login with university email or ID |
| GET  | /auth/me | Get current user (JWT-based) |
| POST | /auth/logout | Logout user |
| POST | /auth/sso/callback | OAuth2 or Firebase SSO callback |

## User Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET    | /users/ | Get all users (admin only) |
| GET    | /users/:id | Get user by ID |
| PUT    | /users/:id | Update user profile/settings |
| DELETE | /users/:id | Delete user (admin only) |
| PATCH  | /users/:id/role | Change user role (admin only) |
| PATCH  | /users/:id/block | Block or unblock user |

## Chat & Message Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST   | /messages/ | Send a new message (1:1 or group) |
| GET    | /messages/conversation/:id | Get all messages in a conversation |
| POST   | /messages/summarize | GPT-based summarization of chat thread |
| POST   | /messages/flag/:id | Flag/report a message |
| DELETE | /messages/:id | Delete a message (if allowed) |

## Task Manager Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET    | /tasks/ | Get all tasks for current user |
| POST   | /tasks/ | Create a new task |
| GET    | /tasks/:id | Get single task |
| PUT    | /tasks/:id | Update task details |
| DELETE | /tasks/:id | Delete task |
| POST   | /tasks/submit/:id | Submit assignment file |
| GET    | /tasks/summary/weekly | Get weekly digest of tasks |

## Calendar & Events Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET    | /calendar/ | Get all relevant events (global + user) |
| POST   | /calendar/ | Create new event |
| PUT    | /calendar/:id | Edit event |
| DELETE | /calendar/:id | Delete event |
| POST   | /calendar/rsvp/:id | RSVP to event |
| GET    | /calendar/feed/master | Sync with university calendar feed |

## AI Tools Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST   | /ai/summarize-doc | Summarize uploaded document |
| POST   | /ai/extract-tasks | Extract tasks/deadlines from chat or text |
| POST   | /ai/study-plan | Generate AI-powered study plan |
| POST   | /ai/assistant | AI chatbot endpoint |

## Admin Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET    | /admin/dashboard | Admin overview: stats, logs |
| GET    | /admin/logs | View login/activity logs |
| POST   | /admin/broadcast | Send global message to all users |
| POST   | /admin/event | Publish global calendar event |

## Notifications Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET    | /notifications/ | Get notifications for current user |
| POST   | /notifications/subscribe | Subscribe to push/email notifications |
| DELETE | /notifications/:id | Dismiss a specific notification |

## Misc & Utilities
| Method | Route | Description |
|--------|-------|-------------|
| GET    | /utils/health | Health check endpoint |
| GET    | /utils/version | Return current app version/release |

## Authentication & Middleware
Each route can be guarded by middleware like:
- `isAuthenticated()`
- `isAdmin()`
- `hasRole('faculty')`
- `canAccessConversation()`

## Example: Send Message
**Request:**
```http
POST /api/messages
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "to": "userId_or_groupId",
  "content": "Hey, what’s the deadline?"
}
```
**Response:**
```json
{
  "messageId": "123",
  "status": "sent"
}
```