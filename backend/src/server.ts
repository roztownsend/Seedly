import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// route, to fill out later
app.get('/', (_req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
