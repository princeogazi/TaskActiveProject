const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = 'mongodb+srv://princewillogazi:Ogazi1997@cluster0.yhtitwh.mongodb.net/';
const DB_NAME = process.env.DB_NAME;

mongoose.connect(MONGO_URL, {
    dbName: DB_NAME
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB' + err)
})