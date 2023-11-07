//TASK 1

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// TASK 2/4

const todos = []; 

// GET 
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST 
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }
  const newTodo = { id: Date.now(), title, description };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT 
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  const todoToUpdate = todos.find(todo => todo.id === id);
  if (!todoToUpdate) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  if (title) {
    todoToUpdate.title = title;
  }

  if (description) {
    todoToUpdate.description = description;
  }

  res.json(todoToUpdate);
});

// DELETE 
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  todos.splice(index, 1);
  res.json({ message: 'Todo deleted.' });
});

// TASK 3

// Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
