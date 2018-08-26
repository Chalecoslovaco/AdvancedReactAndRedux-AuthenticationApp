const User = require('../models/user');

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
            res.json(user);
        });
    });
}
