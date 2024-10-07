require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

const corsOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'https://once-frontend.vercel.app', 'https://once-frontend-git-development-ozans-projects-6669b5a2.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || corsOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Add this new route for the root path
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Once-id Backend API" });
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
