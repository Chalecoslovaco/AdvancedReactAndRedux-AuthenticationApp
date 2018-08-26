const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define the model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// On Save Hook scrypt password
// Before saving a model run this function
userSchema.pre('save', function(next) {
    const user = this; // Get access to the user model
    
    // Generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);

        // Hash password using the salt then run callback
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) return next(err);

            // Overwrite password with the encrypted one
            user.password = hash;
            // Save the model
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return callback(err);

        callback(null, isMatch);
    });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;