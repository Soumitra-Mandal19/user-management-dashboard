# User Management Dashboard

A simple React app for managing users.

## What it does

- View a list of users in a table.
- Add new users with a form.
- Edit existing users.
- Delete users (with confirmation).
- Search and filter users.
- Sort table columns by clicking headers.
- Frontend pagination to handle large lists.

## Tech stack

- React (JavaScript)
- Vite for building
- TailwindCSS for styling
- Axios for API calls
- React Router for navigation
- JSONPlaceholder as mock API

## Features

### User Management

- View all users in a table format.
- Add new users with validation.
- Edit user details.
- Delete users with confirmation dialog.

### Search & Filter

- Search by name, email, or company.
- Filter by first name, last name, email, or company.
- Real-time filtering as you type.

### Table Features

- Sort columns by clicking headers (asc → desc → reset).
- Pagination with customizable items per page.
- Responsive design.

### Form Validation

- Required field validation.
- Email format validation.
- Error messages show only after user interaction.
- Pre-filled forms for editing.

## How to run

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open browser to `http://localhost:5173`

## Project structure

```
src/
├── components/          # Reusable UI components
│   ├── UserTable.jsx   # Table for displaying users
│   ├── UserForm.jsx     # Form for adding/editing users
│   ├── SearchBar.jsx    # Search input
│   └── Pagination.jsx   # Pagination controls
├── pages/              # Page components
│   ├── UsersPage.jsx   # Main users list page
│   ├── AddUserPage.jsx # Add new user page
│   └── EditUserPage.jsx # Edit user page
├── services/           # API layer
│   └── api.js          # API functions with local state
└── App.jsx             # Main app component
```

## API Integration

The app uses JSONPlaceholder as a mock API. I implemented a local state management system in `api.js` that:

- Fetches data from API on first load.
- Stores data locally for faster subsequent loads.
- Updates local state after successful API operations.
- Handles errors gracefully.

## Things used

- React hooks (useState, useEffect)
- Form handling and validation
- API integration with error handling
- Component composition
- State management patterns
- CSS with TailwindCSS

## Assumptions in API service (api.js)

- Local state is maintained in memory and will be lost on page refresh.
- API calls are assumed to be successful for optimistic updates.
- No data persistence between browser sessions.
- Single user environment (no concurrent user conflicts).
- JSONPlaceholder API responses are trusted without additional validation.
- Local copy is considered the source of truth after initial API fetch.
- Error handling assumes network issues are temporary and retryable.
