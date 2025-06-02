# Final Project - Seedly

//project description

---

## Tech Stack

- Frontend: React + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL
- API Documentation: Swagger (OpenAPI)

---

## Installation

### Clone the repository

```bash
git clone git@github.com:roztownsend/Seedly.git
cd final-project
```

### Install frontend dependencies

```bash
cd frontend/vite-project
npm install
```
A simple `npm install` should be fine for most of these.


### Install backend dependencies

```bash
cd backend
npm install
```
---

### Install backend dependencies

```bash
cd backend
npm install
```
---

## Running the Application

### Run Backend

```bash
cd backend
npm run dev
```

### Run Frontend

```bash
cd frontend/vite-project
npm run dev
```

Backend will typically run on `http://localhost:5000/`, and frontend on `http://localhost:3000/`.

---

## Environment Variables

Create a `.env` file inside the `backend/` directory with the following:

```bash
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Create a .env file inside the frontend/ directory:
REACT_APP_API_URL=http://localhost:5000

SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_URL=your_supabase_url

```
Create a `.env` file inside the `frontend/vite-project` directory with the following:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Features

- User Registration & Login
- Product Listings
- Purchase Flow
- Task Creation, Editing, Deletion
- Responsive Frontend UI
- API with full Swagger documentation
- PostgreSQL Database Integration
- Weekly Team Reflections

---

## Project Structure

```
frontend/vite-project
backend/
database/
documentation/
```

- `frontend/vite-project` - React frontend application.
- `backend/` - Node.js API server.
- `database/` - SQL scripts.
- `documentation/` - Wireframes and weekly reflections.

---

## Documentation

- Swagger API Docs: `http://localhost:5000/docs/` when the backend is running.
- Wireframe/style notes: [View on Figma](https://www.figma.com/design/gMn627cuSapgWL1CenFnWa/Seedly-Wireframe?node-id=0-1&t=nsUu9aTIooXdR5Vv-1)
- Product Pitch Document: [View on Google Docs](https://docs.google.com/document/d/1KjFo1T9YKlO1MeHd6rgLfnSx8KKZHpXvHecRJZiAnIM/edit?usp=sharing)
- Weekly Reflections: `/documentation/weekly-reflections/`

---

## Team Members

- Roz (Product Owner)
- Carmelo (Scrum Master)
- Joao (Developer)
- Jacob (Developer)
- Sudipta (Developer)
- Merve (Initial Repo setup, Former Scrum Master)

---

## Scrum & Work Process

- **Daily Standups** for progress updates (daily chat updates)
- **Sprint Planning** every Tuesday to define sprint goals
- **Sprint Retros** after each sprint; every Tuesday before sprint planning
- **Weekly Reflections** stored in `/documentation/weekly-reflections/`

---

## License

This project is for educational purposes only.
