const jwt = require('jwt-simple');

const User = require('../models/user');
const config = require('../config');

function tokenForuser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
    // User already has email and password auth'd
    // We need to give them a token
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) return res.status(422).send({ error: 'Email and Password are mandatory.'})

    // Check if the user's mail exists
    User.findOne({ email }, function(err, existingUser) {
        if(err) return next(err);

        // If exists return error
        if(existingUser) return res.status(422).send({ error: 'Email is already registered' });
    
        // If doesn't exists create the user
        const user = new User({
            email: email,
            password: password
        });

        // Then save the user into the db
        user.save( err => {
            if (err) return next(err);

            // Respond to the request with an identifying token
            res.json({ token: tokenForuser(user)});
        });
    });
}
