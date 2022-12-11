

require('dotenv').config();

let port = process.env.PORT || 3002;


const cors =  require('cors') 

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/Routes');




mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express(); 


app.use(cors());
app.use(express.json());
app.use('/api', routes)
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})