const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes');
const { mongoDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

// Start server only if MongoDB is connected
mongoDb.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoDb.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
