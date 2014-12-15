// ******************************************
// Main route handler.
// __________________________________________

// User mongoose model.
var User       		   = require('../models/user');
var StoredUser       = require('../models/stored_user');
var ErrorMessage       = require('../models/error_message');

// Get the authorization variables.
var configAuth       = require('../../config/auth');

// Export main routes to app.
module.exports = function(app, passport) {

 // ====================================
 // ====================================
 // HOME PAGE ROUTE ====================
 // ====================================
 // ====================================
  app.get('/', function(req, res) {
     res.render('index.jade');
	});

  // ====================================
  // ====================================
  // HOME PAGE ROUTE ====================
  // ====================================
  // ====================================
   app.get('/about', function(req, res) {
      res.render('about.jade');
   });

  // ====================================
  // ====================================
  // PRIVACY POLICY =====================
  // ====================================
  // ====================================
   app.get('/privacy_policy', function(req, res) {
      res.render('privacy.jade');
   });

  // ====================================
  // ====================================
  // ALL USER INFO ======================
  // ====================================
  // ====================================
  app.get('/allUsers', function(req, res) {

      StoredUser.findAll(function(doc) {

          var response        = {};
          response.count      = doc.length;
          response.results    = doc;

          res.json(response);
      });
  });

  // ====================================
  // ====================================
  // LOG AN ERROR MESSAGE
  // ====================================
  // ====================================
  app.get('/errorMsg/:msg', function(req, res) {

      var msg                  = req.params.msg;

      var newMessage           = {};
      newMessage.message       = msg;

      ErrorMessage.createNew(newMessage, function(doc) {
        res.json(doc);
      });
  });

  // ====================================
  // ====================================
  // STORE USER INFO ====================
  // ====================================
  // ====================================
  app.get('/storeUser/:email/:name/:username/:privateCount/:publicCount', function(req, res) {

      var email        = req.params.email;
      var name         = req.params.name;
      var username     = req.params.username;
      var privateCount = req.params.privateCount;
      var publicCount  = req.params.publicCount;

      console.log(email, name, username, privateCount, publicCount);

      StoredUser.findByUsername(username, function(doc) {
        if (doc) {
            console.log('wont store, found one');
            doc.type = 'found existing';
            res.json(doc);
        } else {

            var newUser           = {};
            newUser.email         = email;
            newUser.name          = name;
            newUser.username      = username;
            newUser.privateRepos  = privateCount;
            newUser.publicRepos   = publicCount;

            StoredUser.createNew(newUser, function(doc) {
                doc.type = 'created new';
                res.json(doc);
            });
        }
      });
  });
};
