// ******************************************
// Schema for User accounts
// __________________________________________

var mongoose = require('mongoose');

var StoredUser = function() {

    var _schemaModel = mongoose.Schema({

        email        : String,
        name         : String,
        username     : String,
        privateRepos : Number,
        publicRepos  : Number,
        created      : {
            type: Date,
            default: Date.now
        }
    });

    var _model = mongoose.model('StoredUser', _schemaModel);

    // Create a new User account.
    var _createNew = function(userObject, callback) {
        _model.create(userObject, function(err, doc) {
          if (err) {
              fail(err);
          } else {
              callback(doc);
          }
        });
    };

    // Find a user account by _id.
    var _findByUsername = function(name, callback) {
        _model.findOne({ 'username' : name}, function(err, doc) {
            if(err) {
                console.log('error!!', err);
            } else {
                callback(doc);
            }
        });
    }

    // Return all user accounts.
    var _findAll = function(callback) {
        _model.find({}, function(err, doc) {
            if(err) {
                fail(err);
            } else {
                callback(doc);
            }
        });
    }

    return {
        createNew: _createNew,
        findByUsername: _findByUsername,
        schema: _schemaModel,
        findAll: _findAll,
        model: _model
    }
}();

module.exports = StoredUser;
