# Pages & Features

## Table of Contents
1. [Student Role](#student-role)
2. [Faculty Role](#faculty-role)
3. [Admin Role](#admin-role)
4. [Universal Pages](#universal-pages)
5. [UI/UX Suggestions](#uiux-suggestions)
6. [Page Relationships](#page-relationships)

---

## Student Role

### Dashboard
| Feature   | Description |
|-----------|-------------|
| Widgets   | Today’s tasks, upcoming deadlines, unread messages |
| Smart cards | Priority tasks, AI summaries |
| Morning greeting | Daily focus tip |

### Chat / Messages
| Feature   | Description |
|-----------|-------------|
| 1:1 & Group chat | Course, club, batch |
| Anonymous toggle | For students |
| GPT-based summarization | Summarize chat threads |
| Flag/report | Report messages |

### Tasks & Assignments
| Feature   | Description |
|-----------|-------------|
| Manual task creation | Tags, due dates |
| Assignment uploads | Tracker |
| AI task extraction | From chat |
| Reminders | Notifications |

### Calendar
| Feature   | Description |
|-----------|-------------|
| Sync | Master university calendar |
| Personal events | Add/edit |
| RSVP | Event participation |

### AI Productivity Tools
| Feature   | Description |
|-----------|-------------|
| Study planner | Generator |
| Summarizer | Document & chat |
| Q&A bot | Subjects/tasks |

### Profile & Settings
| Feature   | Description |
|-----------|-------------|
| Edit profile | Name, avatar, theme |
| Privacy controls | Profile visibility |
| Notification preferences | Customization |

---

## Faculty Role

### Dashboard
| Feature   | Description |
|-----------|-------------|
| Upcoming lectures | Schedule overview |
| Pending submissions | Student work |
| Messages | From students |

### Chat / Messages
| Feature   | Description |
|-----------|-------------|
| 1:1 & Group chat | With students |
| Filter messages | By course/batch |
| AI summarization | Long chats |

### Task & Assignment Manager
| Feature   | Description |
|-----------|-------------|
| Create tasks | For students |
| View submissions | Due dates |
| Tag | By batch/course |

### Calendar
| Feature   | Description |
|-----------|-------------|
| Add events | Exams, lectures |
| View RSVPs | Student responses |
| Sync | Personal calendar |

### Course Materials
| Feature   | Description |
|-----------|-------------|
| Upload | Slides, notes, videos |
| Organize | By topic/date |

### Profile & Settings
| Feature   | Description |
|-----------|-------------|
| Edit profile | Name, avatar, office hours |

---

## Admin Role

### Admin Dashboard
| Feature   | Description |
|-----------|-------------|
| System metrics | Users active, messages sent |
| Logs overview | Logins, activity |
| Flagged content | Reports |

### User Management
| Feature   | Description |
|-----------|-------------|
| View/search users | All users |
| Change role | Deactivate, reset password |
| Block/report | Handling |

### Broadcast Messages
| Feature   | Description |
|-----------|-------------|
| Send announcement | To everyone |
| Set priority | Info, warning, urgent |
| Schedule | For later |

### System Logs
| Feature   | Description |
|-----------|-------------|
| Track activity | Logins, flagged content |
| Export | As CSV |

### Event Management
| Feature   | Description |
|-----------|-------------|
| Add global events | University calendar |
| Approve submissions | From faculty |

---

## Universal Pages
| Page         | Role Access | Features                                 |
|--------------|-------------|------------------------------------------|
| Login/Signup | All         | Student ID/Email login, SSO, role detection |
| Notifications| All         | Event reminders, task alerts, admin messages |
| 404 / Errors | All         | Clean error pages with return CTA         |
| Help/Support | All         | FAQ, contact form                         |

---

## UI/UX Suggestions
| Area        | Suggestion                                 |
|-------------|--------------------------------------------|
| Color Themes| Calming mix of blue and green              |
| Layout      | Minimal clutter, clear CTAs, visual focus  |
| Accessibility| High contrast, keyboard navigation        |

---

## Page Relationships
- The **Dashboard** is the central hub and links to Chat, Tasks, Calendar, AI Tools, and Profile pages.
- **Chat** can access AI Tools for summarization and links back to the Dashboard.
- **Tasks** and **Calendar** are interconnected; tasks with deadlines appear on the calendar.
- **Admin Dashboard** provides access to User Management, Broadcast Messages, System Logs, and Event Management.
- **Faculty Dashboard** links to Course Materials, Task Manager, Calendar, Chat, and Profile.
- **Universal pages** (Login/Signup, Notifications, Help/Support, 404) are accessible from any role as needed.
