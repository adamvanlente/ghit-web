// ******************************************
// Schema for Error messages
// __________________________________________

var mongoose = require('mongoose');

var ErrorMessage = function() {

    var _schemaModel = mongoose.Schema({

        message      : String,
        created      : {
            type: Date,
            default: Date.now
        }
    });

    var _model = mongoose.model('ErrorMessage', _schemaModel);

    // Create a new Error message.
    var _createNew = function(userObject, callback) {
        _model.create(userObject, function(err, doc) {
          if (err) {
              fail(err);
          } else {
              callback(doc);
          }
        });
    };

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
        findAll: _findAll,
        schema: _schemaModel,
        model: _model
    }
}();

module.exports = ErrorMessage;
