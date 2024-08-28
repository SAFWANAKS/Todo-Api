const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON bodies

// Import routes
const todosRoutes = require('./todos');
app.use('/todos', todosRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
