const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        const decoded = jwt.verify(token, JWT_SECRET_KEY = 'ta123');
        const user = await User.findOne({
            _id: decoded._id,
        })

        if(!user){
            throw new Error('Unable to login');
        }

        req.user = user;
        req.token = token;
        next();

    }
    catch(err){
        res.status(401).send({err: err.message})
    }
}

module.exports = auth;