const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.get('/', (req, res) => {
    res.send('User routes are working')
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ error: 'Name, email, and password are required' });
        }

        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ user, message: 'Registration successful, Account created' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Something went wrong during registration' });
    }
});

router.post('/login', async (req, res) => {
    console.log(res);
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email: email });

        if (!user) {
            throw new Error('User does not exist');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error('Password does not match');
        }

        const token = jwt.sign({
            _id: user._id
        }, JWT_SECRET_KEY = 'ta123', {expiresIn: '1 day'});

        res.send({ user, token , message: "Logged in successfully"});
    }
    catch(err) {
        console.log(err.message);
        res.status(400).send({ message: 'Login error' });
    }
    
});

module.exports = router;