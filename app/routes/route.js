// ******************************************
// Main route handler.
// __________________________________________

// User mongoose model.
var User       		   = require('../models/user');

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
     res.render('index.jade', { user : req.user });
	});

  app.get('/getUserToken', function(req, res) {

    // will/may want different behavior here for iphone vs web browsers.
    var userAgent = res.req.headers["user-agent"];
    var isIphone = userAgent.search('iPhone') != -1;

    res.writeHead(302, {
        'Location': configAuth.urlScheme + req.user.token + '/' + req.user.username
    });
    res.end();

  });

};
