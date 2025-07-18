# Database Schema

UniChat uses MongoDB with Mongoose for schema definition. Below are the main data models used in the application.

```js
// User Schema
const UserSchema = new mongoose.Schema({
  name: String, // Full name
  email: { type: String, unique: true }, // University email
  studentId: String, // Student ID
  role: { type: String, enum: ['student', 'faculty', 'admin'] }, // User role
  preferences: Object, // User preferences
  createdAt: { type: Date, default: Date.now }
});

// Message Schema
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Sender reference
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Receiver reference
  content: String, // Message content
  isAnonymous: Boolean, // Anonymous flag
  timestamp: { type: Date, default: Date.now }, // Sent time
  summary: String // AI-generated summary
});

// Task Schema
const TaskSchema = new mongoose.Schema({
  title: String, // Task title
  description: String, // Task details
  tags: [String], // Tags for filtering
  deadline: Date, // Due date
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Creator
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Assignees
  isCompleted: Boolean, // Completion status
  createdAt: { type: Date, default: Date.now }
});

// Event Schema
const EventSchema = new mongoose.Schema({
  title: String, // Event title
  description: String, // Event details
  type: { type: String, enum: ['exam', 'holiday', 'deadline', 'custom'] }, // Event type
  date: Date, // Event date
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Attendees
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Creator
});

// System Log Schema
const LogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User reference
  action: String, // Action performed
  timestamp: { type: Date, default: Date.now }, // Action time
  metadata: Object // Additional info
});
```

## Entity Relationships (Text Summary)
- **User** can send and receive many **Messages**.
- **User** can create and be assigned to many **Tasks**.
- **User** can create and attend many **Events**.
- **User** can have many **Logs** (system actions).
- **Task** can be related to multiple **Messages** (e.g., task discussions).
- **Event** can include multiple **Tasks** (e.g., assignment deadlines for an event).