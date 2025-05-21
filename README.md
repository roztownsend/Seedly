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
cd frontend
npm install
```
A simple `npm install` should be fine for most of these, but if you need individual packages:

React and React-DOM  
`npx create-react-app your-app-name --template typescript`

For API requests:

Axios (or Fetch API)  
` npm install axios` 

For Routing:

React Router  
`npm install react-router-dom @types/react-router-dom`

For Swagger frontend client (optional if you want API integration help):

swagger-ui-react  
`npm install swagger-ui-react`

State Management:

Zustand  
`npm install zustand`

### Install backend dependencies

```bash
cd backend
npm install
```
---

And if you need individual backend packages:

Express (web framework)  
`npm install express`

TypeScript  
`npm install typescript ts-node @types/node @types/express`

Swagger (for API documentation)  
`npm install swagger-jsdoc swagger-ui-express`

Database:

For PostgreSQL:  
`npm install pg` 

CORS  
`npm install cors`

dotenv (for environment variables)  
`npm install dotenv`

Nodemon  
`npm install nodemon --save-dev`

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

Backend .env → Private values (DB password, secrets).
Frontend .env → Only public values (API URL, public keys, etc.).


```

---

## Features

- User Registration & Login
- Task Creation, Editing, Deletion
- Responsive Frontend UI
- API with full Swagger documentation
- PostgreSQL Database Integration
- Weekly Team Reflections

---

## Project Structure

```
frontend/
backend/
database/
documentation/
```

- `frontend/` - React frontend application.
- `backend/` - Node.js API server.
- `database/` - SQL scripts.
- `documentation/` - Wireframes and weekly reflections.

---

## Documentation

- Swagger API Docs:
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

- **Daily Standups** for progress updates (daily chat updates works as well )
- **Sprint Planning** to define sprint goals
- **Sprint Reviews** after each sprint
- **Weekly Reflections** stored in `/documentation/weekly-reflections/`

---

## License

This project is for educational purposes only.
