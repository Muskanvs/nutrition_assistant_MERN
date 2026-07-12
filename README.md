# Nutrition Assistant

A complete MERN stack nutrition assistant with JWT authentication, profile management, food tracking, diet plans, nutritional analysis, recommendations, and reporting.

## Structure

- `client` - React + Vite frontend
- `server` - Express + MongoDB backend following MVC

## Quick Start

```bash
npm run install:all
```

Create or update `server/.env`:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/Nutrition_Assistant
JWT_SECRET=change-this-secret
CLIENT_URL=http://localhost:5173
```

Run both apps:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:8000`
