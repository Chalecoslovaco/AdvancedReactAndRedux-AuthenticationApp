const Authentication = require('./controllers/authentication');
const passport = require('passport');

const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
    app.post('/signup', Authentication.signup)
}