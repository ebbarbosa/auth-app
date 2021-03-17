require('dotenv').config();

const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');

// Middleware
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB!'));

// Routes
app.use('/auth', authRouter);

app.listen(process.env.PORT_AUTH, () => console.log(`Server up and running on port ${process.env.PORT_AUTH}...`));