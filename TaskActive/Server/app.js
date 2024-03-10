const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes');
const User = require('./models/User');
const Task = require('./models/Task');

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}))

app.use(cors({
    origin: ['http://localhost:3000/tasks'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}))

app.use(bodyParser.json());

require('dotenv').config();
require('./db');
const port = 3000;

app.post('/register', (req, res) => {
    User.create(req.body)
    .then(User => res.json(User))
    .catch(err => res.json(err))
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(User => {
        if(User) {
            if(User.password === password){
                res.json('Login success')
            }
            else{
                res.json('Incorrect password')
            }
        }
        else{
            res.json('Records not found')
        }
    })
    .catch
})

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'TaskActive is working'
    })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});