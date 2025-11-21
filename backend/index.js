const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes')
const userRoutes = require('./routes/userRoutes')

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

app.use(cors());         // enable CORS

// Middleware
app.use(express.json()); // parse JSON request bodies
app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})


// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/user', userRoutes)


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
