require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000' // Assuming your frontend runs on port 3000
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
