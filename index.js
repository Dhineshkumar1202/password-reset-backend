const express = require('express');
const connectDB = require('./config/db');
const passwordRoutes = require('./routes/passwordRoute');
require('dotenv').config();
const cors = require('cors');

connectDB();

const app = express();


app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["PUT", "POST"],
  })
);


app.use('/api', passwordRoutes);


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

