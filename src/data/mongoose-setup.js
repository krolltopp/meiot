var MongooseSetup, Q, mongoose;

mongoose = require('mongoose');

Q = require('q');

MongooseSetup = (function() {
  function MongooseSetup() {}

  MongooseSetup.init = function(config) {
    var db, dbUrl, deferred;
    dbUrl = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database;
    mongoose.connect(dbUrl);
    deferred = Q.defer();
    db = mongoose.connection;
    db.on('error', function() {
      return deferred.reject('error');
    });
    db.on('open', function() {
      return deferred.resolve(db);
    });
    return deferred.promise;
  };

  return MongooseSetup;

})();

module.exports = MongooseSetup;
