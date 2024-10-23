const express = require('express');
const connectDB = require('./config/db'); 
const passwordRoutes = require('./routes/passwordRoute'); 
require('dotenv').config(); 
const cors = require('cors'); 


const app = express();


connectDB();


app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:3001", 
    methods: ["POST", "PUT"], 
  })
);


app.use('/api', passwordRoutes); 


app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error' }); 
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
