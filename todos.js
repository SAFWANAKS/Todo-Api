const express = require('express');
const router = express.Router();

// In-memory data storage
let todos = [];
let nextId = 1;

// GET /todos - Retrieve all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// POST /todos - Add a new todo
router.post('/', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = { id: nextId++, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// GET /todos/:id - Retrieve a todo by ID
router.get('/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// PUT /todos/:id - Update an existing todo
router.put('/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// DELETE /todos/:id - Delete a todo
router.delete('/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
