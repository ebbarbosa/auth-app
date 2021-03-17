require('dotenv').config();

const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');

// Middleware
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB!'));

// Routes
app.use('/api/posts', postsRouter);

app.listen(process.env.PORT, () => console.log(`Server up and running on port ${process.env.PORT}...`));