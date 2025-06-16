# Momentum API

A NestJS backend API for managing todos and time entries, integrated with Firebase Authentication and Firestore for secure and scalable data management.

## Features

- **User Authentication**: Secure endpoints using Firebase ID tokens.
- **Todos Management**: Create, read, update, and delete todos per authenticated user.
- **Time Entries**: Track and manage time entries for users.
- **Validation**: Utilizes `class-validator` for robust DTO validation.
- **CORS Enabled**: Configured for seamless frontend integration.

## Tech Stack

- [NestJS](https://nestjs.com/) (TypeScript)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firestore](https://firebase.google.com/docs/firestore)
- [class-validator](https://github.com/typestack/class-validator)

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher is recommended.
- **Firebase Project**: Set up a Firebase project with service account credentials.

### Installation

1. Clone the repository:
   ```bash
   git clone (https://github.com/vhmvdrezv/momentum-backend.git)
   cd momentum-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Obtain your Firebase service account JSON file from the Firebase Console.
2. Save it as `firebase-service-account.json` in the project root.
3. Ensure the `project_id` in the service account JSON matches your Firebase project.

### Running the App

- **Development**:
  ```bash
  npm run start
  ```

- **Watch Mode** (auto-reload on changes):
  ```bash
  npm run start:dev
  ```

- **Production**:
  ```bash
  npm run build
  npm run start:prod
  ```

The API will be available at `http://localhost:3000` by default.

## API Endpoints

### Todos

All endpoints require a valid Firebase ID token in the `Authorization` header as `Bearer <token>`.

- **POST** `/todos`: Create a new todo.
- **GET** `/todos`: Retrieve all todos for the authenticated user.
- **PATCH** `/todos/:id`: Update a specific todo by ID.
- **DELETE** `/todos/:id`: Delete a specific todo by ID.

### Time Entries

- **GET** `/time-entries`: Retrieve all time entries for the authenticated user.
- **POST** `/time-entries`: Create a new time entry.

## Testing

- **Unit Tests**:
  ```bash
  npm run test
  ```

- **End-to-End (E2E) Tests**:
  ```bash
  npm run test:e2e
  ```

## Project Structure

```
src/
├── auth/               # Authentication logic and guards
├── firebase/           # Firebase Admin SDK provider and module
├── todos/              # Todos module (controller, service, DTOs)
├── time-entries/       # Time entries module (controller, service)
└── app.module.ts       # Main NestJS module
```

## Notes

- Ensure your server has internet access to verify Firebase ID tokens.
- Only Firebase ID tokens issued by your Firebase project will be accepted.
- Avoid embedding credentials in source code to prevent unauthorized access. Use environment variables or secure vaults for sensitive data.

## Security Considerations

- **Hardcoded Credentials**: Embedding credentials in source code risks unauthorized access. Store sensitive information like Firebase service account details securely.
- **Firebase Token Validation**: Ensure tokens are validated correctly to prevent unauthorized API access.