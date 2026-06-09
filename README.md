# PrepRoute

PrepRoute is a modern test management platform that enables administrators to create, edit, schedule, preview, and manage online tests. The platform supports rich text questions, CSV-based bulk uploads, question management, and test scheduling.

---

## Features

### Test Management

* Create new tests
* Edit existing tests
* Delete tests
* View complete test details
* Schedule test publishing
* Publish tests instantly

### Question Management

* Create MCQ questions manually
* Rich Text Editor support
* Image insertion inside questions
* Add explanations/solutions
* Select difficulty level
* Select topic and sub-topic
* Mark correct answers

### Bulk Upload

* Upload questions using CSV
* Automatic validation
* Required field checking
* Correct option validation
* Question count validation

### Preview System

* Preview complete test before publishing
* View test metadata
* View all questions and answers
* Highlight correct answers

### Dashboard

* Search tests
* Filter tests
* View test status
* Manage published and draft tests

---

## Tech Stack

### Frontend

* React.js
* TypeScript
* React Router
* Axios
* Bootstrap
* Lucide React
* Tiptap Rich Text Editor

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Development Tools

* Vite
* ESLint
* Git
* GitHub

---

## Project Structure

```bash
PrepRoute/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   └── axios.ts
│   │
│   ├── assets/
│   │   └── images/
│   │       ├── admin-profile.png
│   │       ├── admin-profile1.png
│   │       ├── bell-icon.png
│   │       ├── logo.png
│   │       ├── logo1.png
│   │       ├── testtube-login.png
│   │       └── testtube-login1.png
│   │
│   ├── components/
│   │   ├── CreateTestForm/
│   │   ├── EditTestModal/
│   │   ├── Header/
│   │   ├── QuestionCreation/
│   │   ├── RecentTestsTable/
│   │   ├── RichTextEditor/
│   │   ├── Sidebar/
│   │   ├── StatsCard/
│   │   └── ViewTestModal/
│   │
│   ├── layouts/
│   │   ├── DashboardLayout/
│   │   ├── DashboardLayout.css
│   │   └── DashboardLayout.tsx
│   │
│   ├── pages/
│   │   ├── AddQuestions/
│   │   ├── ConfirmationScreen/
│   │   ├── CreateTest/
│   │   ├── Dashboard/
│   │   ├── EditTest/
│   │   └── Login/
│   │
│   ├── routes/
│   │   └── router.tsx
│   │
│   ├── services/
│   │   ├── authService.ts
│   │   ├── detailTestService.ts
│   │   ├── questionService.ts
│   │   ├── subjectService.ts
│   │   ├── subTopicService.ts
│   │   ├── testService.ts
│   │   └── topicService.ts
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   └── question.ts
│   │
│   ├── utils/
│   │   └── parseQuestionCsv.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── README.md
```

## Architecture Overview

The application follows a modular React architecture:

- Pages handle route-level screens.
- Components contain reusable UI modules.
- Services manage API communication.
- Types define TypeScript interfaces.
- Utils contain helper functions and CSV parsing logic.
- Layouts provide shared dashboard structure.
- Routes manage navigation and protected screens.
- Axios is configured centrally for API requests.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/PrepRoute.git
```

### Navigate to Project

```bash
cd PrepRoute
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Update values according to your backend configuration.

---

## CSV Upload Format

Example:

```csv
question,option1,option2,option3,option4,correctOption,explanation,difficulty
What is React?,Library,Framework,Language,Database,option1,React is a JavaScript library,easy
```

### Supported Correct Options

```text
option1
option2
option3
option4
```

### Supported Difficulty Levels

```text
easy
medium
hard
```

---

## Rich Text Editor Features

* Bold Text
* Italic Text
* Underline
* Bullet Lists
* Ordered Lists
* Hyperlinks
* Image Uploads

---

## Core Workflows

### Test Creation

1. Create Test
2. Configure Test Details
3. Add Questions
4. Preview Test
5. Schedule or Publish
6. Manage from Dashboard

### Question Creation

1. Manual MCQ Creation
2. CSV Upload
3. Rich Text Formatting
4. Add Explanations
5. Select Correct Answer
6. Save & Publish

---

## Screens

### Dashboard

* Test listing
* Search functionality
* Status indicators
* Quick actions

### Test Creation

* Test metadata configuration
* Subject selection
* Topic/Sub-topic mapping

### Question Management

* Rich Text Editor
* CSV Upload
* Manual MCQ Creation
* Validation System

### Preview

* Complete test preview
* Question review
* Correct answer highlighting

---

## Future Enhancements

* Student Portal
* Test Attempt System
* Analytics Dashboard
* Performance Tracking
* Question Bank
* AI-based Question Generation
* AI-based Test Analysis
* Role-Based Access Control

---

## Author

**Ishika Marwaha**

Frontend Developer | React Developer

GitHub: https://github.com/ishikaa2218

---

## License

This project is intended for educational, learning, and portfolio purposes.
