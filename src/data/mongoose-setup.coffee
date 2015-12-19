mongoose = require 'mongoose'
Q = require 'q'

class MongooseSetup
  @init: (config) ->
    dbUrl = 'mongodb://' +
    config.mongodb.host +
    ':' +
    config.mongodb.port +
    '/' + config.mongodb.database

    mongoose.connect(dbUrl)
    deferred = Q.defer()
    db = mongoose.connection
    db.on('error',()->
      deferred.reject('error')
    )
    db.on('open', () ->
      deferred.resolve(db)
    )
    deferred.promise

module.exports = MongooseSetup
