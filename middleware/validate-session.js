const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const user = sequelize.import('../models/user-model');


const validateSession = (req, res, next) => {
    const token = req.headers.authorization;

jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if(!err && decodedToken) {
        user.findOne({ where : { id: decodedToken.id}})
        .then(user => {
            if(!user) throw 'err';

            req.user = user;
            return next();
        })
        .catch(err => res.status(501).json({ error : err}))
    } else {
        return res.status(500).json({ error : 'Unauthorized'})
    }
});
}
module.exports = validateSession;