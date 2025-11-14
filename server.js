// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// Get all portfolio records
app.get('/api/portfolio', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM portfolio ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get one record by ID
app.get('/api/portfolio/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM portfolio WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Create a new record
app.post('/api/portfolio', async (req, res) => {
  const { owner_name, project_title, description, status, started_date, completed_date } = req.body;
  if (!owner_name) return res.status(400).json({ message: 'owner_name required' });

  try {
    const [result] = await db.query(
      'INSERT INTO portfolio (owner_name, project_title, description, status, started_date, completed_date) VALUES (?, ?, ?, ?, ?, ?)',
      [owner_name, project_title, description, status, started_date, completed_date]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update a record
app.put('/api/portfolio/:id', async (req, res) => {
  const { owner_name, project_title, description, status, started_date, completed_date } = req.body;
  try {
    await db.query(
      'UPDATE portfolio SET owner_name=?, project_title=?, description=?, status=?, started_date=?, completed_date=? WHERE id=?',
      [owner_name, project_title, description, status, started_date, completed_date, req.params.id]
    );
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a record
app.delete('/api/portfolio/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM portfolio WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
