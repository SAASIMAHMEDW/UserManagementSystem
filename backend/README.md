# User Management System – Backend

This repository contains the **backend service** for the User Management System.  
It provides authentication, role-based access control, and user administration APIs with strong validation, testing, and Docker support.

The backend is built with **Node.js, Express, TypeScript, MongoDB**, and follows a **modular, production-grade architecture**.

---

## Table of Contents

-   Overview
-   Tech Stack
-   Core Features
-   System Workflow
-   Role & Authorization Model
-   API Modules
-   Database Design
-   Project Structure
-   Environment Variables
-   Running the Project
-   Testing
-   Docker Setup
-   Design Decisions & Notes

---

## Overview

The backend exposes REST APIs to:

-   Register and authenticate users
-   Automatically assign the **first registered user as Admin**
-   Enforce **role-based access control (RBAC)**
-   Allow admins to manage users
-   Ensure **at least one admin is always active**
-   Secure endpoints using JWT authentication
-   Provide fully tested, predictable behavior

The service is designed to be consumed by a frontend client (e.g., React).

---

## Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express
-   **Language**: TypeScript (ES Modules)
-   **Database**: MongoDB (Mongoose ODM)
-   **Authentication**: JWT (JSON Web Tokens)
-   **Validation**: Zod
-   **Security**:
    -   bcrypt (password hashing)
    -   Helmet (security headers)
    -   CORS
-   **Testing**:
    -   Jest
    -   Supertest
-   **Containerization**: Docker

---

## Core Features

-   User signup & login
-   Secure password hashing
-   JWT-based authentication
-   Role-based authorization (`admin`, `user`)
-   User profile management
-   Admin-only user listing
-   Admin-only user activation/deactivation
-   Protection against deactivating the **last active admin**
-   Clean API responses
-   Full test coverage for auth and user flows

---

## System Workflow

### Authentication Flow

1. User signs up
2. Password is hashed and stored
3. Role assignment:
    - **First registered user → `admin`**
    - All subsequent users → `user`
4. JWT token is issued
5. Client sends token in `Authorization: Bearer <token>` header
6. Protected routes validate token and role

---

### User Lifecycle

-   `active`: user can authenticate and access routes
-   `inactive`: user exists but cannot perform restricted actions
-   Admins can activate/deactivate users
-   The system enforces **at least one active admin at all times**

---

## Role & Authorization Model

### Roles

| Role  | Capabilities       |
| ----- | ------------------ |
| user  | Access own profile |
| admin | Manage all users   |

### Authorization Rules

-   Authentication is required for all protected routes
-   Admin-only routes are protected using role middleware
-   Deactivating the **last admin** is blocked by business logic

---

## API Modules

### Auth Module (`/api/auth`)

-   `POST /signup` – Register a new user
-   `POST /login` – Authenticate and receive JWT

### Users Module (`/api/users`)

-   `GET /me` – Fetch authenticated user profile
-   `GET /` – List all users (admin only)
-   `PUT /:id/activate` – Activate a user (admin only)
-   `PUT /:id/deactivate` – Deactivate a user (admin only)

---

## Database Design

### User Schema

```ts
{
    fullName: string
    email: string(unique)
    password: string(hashed)
    role: 'admin' | 'user'
    status: 'active' | 'inactive'
    lastLogin: Date | null
    createdAt: Date
    updatedAt: Date
}
```

# Indexes:

-   Unique index on email
-   Indexed role and status fields for admin queries

# Project Structure

```
backend/
│
├── src/
│   ├── config/           # Environment & DB config
│   ├── models/           # Mongoose models
│   ├── modules/
│   │   ├── auth/         # Auth logic (routes, controller, service,schema)
│   │   └── users/        # User management logic
│   ├── middlewares/      # Auth, role, error handling
│   ├── utils/            # JWT, password, response helpers
│   ├── app.ts            # Express app setup
│   ├── routes.ts         # Express routes setup
│   └── server.ts         # Server bootstrap
│
├── tests/                # Jest + Supertest tests
│   ├── auth/             # Auth test
│   ├── users/            # users test
├── Dockerfile
├── package.json
├── tsconfig.json
├── ***
└── README.md
```

-   Architecture follows a feature-based modular approach, keeping business logic isolated from controllers.

# Environment Variables

-   Check .env.sample file for production
-   check .env.test.sample file for testing

# Running the Project (Local)

```code
pnpm install
pnpm dev
```

```bash
URL: http://localhost:3000

Health check:
GET /health
```

# Testing

The backend includes fully isolated integration tests.

```
pnpm test
```

### Testing highlights:

-   Database is reset before each test
-   JWT tokens are recreated per test
-   Auth and user flows are tested independently
-   Admin safety rules are validated

# Docker Setup

The backend is fully dockerized.

Build Image
`docker build -t user-management-backend .`

Run Container

```
docker run -d --name ums_backend -p 3000:3000 -e PORT=3000 -e JWT_SECRET=019b6b4c-fc18-77b7-83b1-f79301446c6b -e JWT_EXPIRES_IN=1h -e FRONTEND_URL=http://localhost:5173 -e MONGO_DB_HOST_URI="mongodb+srv://aasimahmed_ums_db_user:svw6juWkfPtB7utR@ums.afqy2dz.mongodb.net/ums?appName=UMS" ums_backend
```

The container runs the compiled production build.

## Architecture Decisions

### First User Becomes Admin

-   **Decision:** The first registered account is granted the `admin` role automatically.
-   **Reasoning:** Avoids manual admin creation and simplifies initial bootstrapping.

### At Least One Admin Invariant

-   **Decision:** Deactivating the last active admin is forbidden.
-   **Reasoning:** Protects against accidental system lockout and ensures continuous administrative access.

### JWT-Only Authentication

-   **Decision:** Use stateless JWT authentication without server-side sessions.
-   **Reasoning:** Simplifies scaling and avoids session store complexity while still allowing secure token-based auth [web:9].

### Feature-Based Folder Structure

-   **Decision:** Organize by feature (`auth`, `users`) instead of layering.
-   **Reasoning:** Improves modularity, makes features easier to reason about, and scales better as the codebase grows [web:9].

### Strong Validation with Zod

-   **Decision:** Validate all request payloads using Zod schemas at the boundary.
-   **Reasoning:** Prevents invalid data from reaching business logic and pairs well with TypeScript types for safer refactoring.
