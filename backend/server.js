const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
    host: 'db',
    user: 'postgres',
    password: 'password',
    database: 'todo_db'
});

app.get('/todos', async (req, res) => {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
});

app.post('/todos', async (req, res) => {
    const { task } = req.body;
    await pool.query('INSERT INTO todos (task) VALUES ($1)', [task]);
    res.sendStatus(201);
});

// API to delete a task
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await pool.query('DELETE FROM todos WHERE id = $1', [id]);
      res.json({ success: true });
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
    console.log('Backend running on port 3000');
});
