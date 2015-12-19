express = require 'express'
path = require 'path'
favicon = require 'serve-favicon'
logger = require 'morgan'
cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'
iot = require './routes/iot'
mongooseSetup = require './data/mongoose-setup'

app = express()

app.use(require('connect-livereload')())

env = process.env.NODE_ENV || 'development'
app.locals.ENV = env
app.locals.ENV_DEVELOPMENT = env == 'development'

# app.use(favicon(__dirname + '/public/img/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

config = require('./config/' + (process.env.NODE_ENV || 'development') + '.json')

mongooseSetup.init(config).then((db) ->
  console.log('DB OK')
 ,
 (reason) ->
   console.log(reason)
)

app.use('/api/iot', iot)

# catch 404 and forward to error handler
app.use((req, res, next) ->
  err = new Error('Not Found')
  err.status = 404
  next(err)
)

# error handlers

# development error handler
# will print stacktrace

if (app.get('env') == 'development')
  app.use((err, req, res, next) ->
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    })
  )

# production error handler
# no stacktraces leaked to user
app.use((err, req, res, next) ->
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  })
)

app.set('port', process.env.PORT || 3000)

server = app.listen(app.get('port'), () ->
  console.log('Express server listening on port ' + server.address().port)
)
