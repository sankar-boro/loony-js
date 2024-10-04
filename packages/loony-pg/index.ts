import express from 'express';
import { pg_pool } from './db'

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/users', async (req, res) => {
  try {
    const result = await pg_pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
