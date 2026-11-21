# TaskFlow – Redux Toolkit Todo App

A modern Todo Management Application built using React and Redux Toolkit. TaskFlow helps users manage daily tasks with CRUD operations, status filtering, search functionality and persistent backend storage using MockAPI.io.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as Completed or Not Completed
- Search tasks by name and description
- Filter tasks by status
- Dashboard with total, completed and pending task counts
- Persistent data storage using MockAPI.io
- Global state management using Redux Toolkit
- Responsive user interface

## Tech Stack

- React.js
- JavaScript
- Redux Toolkit
- React Redux
- Axios
- CSS3
- MockAPI.io
- Vite

## State Management

This project uses Redux Toolkit for centralized state management.

Concepts implemented:

- `configureStore`
- `createSlice`
- `createAsyncThunk`
- `useSelector`
- `useDispatch`
- Redux Provider
- Async API operations

## API Integration

MockAPI.io is used as the backend to perform CRUD operations.

API operations:

- GET – Fetch all tasks
- POST – Create a new task
- PUT – Update an existing task
- DELETE – Remove a task

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd taskflow-redux-toolkit-todo-app
```

Install dependencies:

```bash
npm install
```

Install required packages if needed:

```bash
npm install @reduxjs/toolkit react-redux axios
```

Start the development server:

```bash
npm run dev
```

## Project Structure

```text
src/
├── api/
│   └── todoApi.js
├── app/
│   └── store.js
├── components/
│   ├── Header.jsx
│   ├── Main.jsx
│   └── TodoCard.jsx
├── features/
│   └── todos/
│       └── todosSlice.js
├── App.jsx
├── main.jsx
└── index.css
```

## Learning Outcomes

- Understanding centralized state management
- Managing asynchronous API requests
- Implementing CRUD operations
- Integrating React with Redux Toolkit
- Handling backend data persistence
- Building reusable React components

## Author

Harish

