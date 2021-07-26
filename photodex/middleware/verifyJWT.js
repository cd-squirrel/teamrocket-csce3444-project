const jwt = require('jsonwebtoken');
require('dotenv').config();

//validating jwt in cookie
const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    
    //login

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) 
            {
                console.log(err.message);
                res.redirect('/login')
                next();
            } 
            else 
            {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
};

module.exports = { verifyJWT };
