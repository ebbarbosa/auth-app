const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Middleware
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB!'));


// Routes
app.use('/api/user', authRouter);
app.use('/api/token')

app.listen(3000, () => console.log('Server up and running on port 3000...'));