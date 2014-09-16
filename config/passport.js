// PASSPORT CONFIG

// Strategy for GitHub.
var GitHubStrategy   = require('passport-github').Strategy;

// Set user model.
var User       		   = require('../app/models/user');
var bcrypt           = require('bcrypt-nodejs');

// Get the authorization variables.
var configAuth       = require('./auth');

// Expose function to app using module.exports.
module.exports = function(passport) {

    // Serialize user for session.
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize user for session.
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(user) {
            done(null, user);
        });
    });

    // ====================================
    // ====================================
    // GITHUB LOGIN =======================
    // ====================================
    // ====================================
    passport.use(new GitHubStrategy({
        clientID        : configAuth.githubAuth.clientID,
        clientSecret    : configAuth.githubAuth.clientSecret,
        callbackURL     : configAuth.githubAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {

        process.nextTick(function() {

            User.findGithubUserById( profile.id, function(user) {

                if (user) {
                    return done(null, user);
                } else {

                    var newUser             = {};
                    newUser.id       = profile.id;
                    newUser.token    = token;
                    newUser.name     = profile.displayName;
                    newUser.email    = profile.emails[0].value;
                    newUser.username = profile.username;

                    User.createNew(newUser, function(doc) {
                        return done(null, doc);
                    }, function(err) {
                        console.log(err);
                    });

                }
            });
      });
    }));


    // ====================================
    // ====================================
    // HELPER FUNCTIONS ===================
    // ====================================
    // ====================================

    // Generate a hash for PW.
    function generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // Confirm that a hash is valid.
     function validPassword(password, userPass) {
        return bcrypt.compareSync(password, userPass);
    };


};
