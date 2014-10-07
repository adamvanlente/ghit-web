// ******************************************
// Route handler for logins.
// __________________________________________

module.exports = function(app, passport) {

  // ====================================
  // ====================================
  // GITHUB =============================
  // ====================================
  // ====================================
	app.get('/auth/github', passport.authenticate('github'));

	app.get('/auth/github/callback', passport.authenticate('github', {
			successRedirect : '/getUserToken',
			failureRedirect : '/'
	}));


  // ====================================
  // ====================================
  // LOGOUT =============================
  // ====================================
  // ====================================
	app.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
	});

};

// Confirm that a user is logged in.
function isLoggedIn(req, res, next) {

  	// Move along if all is well.
  	if (req.isAuthenticated())
  		return next();

  	// Kick back to home page if no user is detected.
  	res.redirect('/');
}
