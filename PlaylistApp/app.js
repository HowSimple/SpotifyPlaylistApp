var createError = require('http-errors');
var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const querystring = require('querystring');
var indexRouter = require('./routes/index');
// for Spotify API authorization
var client_id = 'da3e944b84d94983be9887955b701b31';
var redirect_uri = 'http://localhost:3000/redirect';
var auth_token;

const generateRandomString = (myLength) => {
  const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
/*app.use(function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

});*/
app.get('/redirect/', async function(req, res) {
  console.log(req.query)
  auth_token = req.query.code
  //res.render('index', { title: 'Express token:'+req.query.code });
    res.json(req.query.code)
});
app.get('/token/',  function(req, res) {

  //res.render('index', { title: 'Express token:'+req.query.code });
  // console.log("test")
  //res.json(auth_token)
  //res.json(["test"])
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "*");

  res.json(["test"])
});

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email playlist-read-private';

  res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
});
/*
app.get('/callback', async function(req, res, next) {
    res.render('index', { title: 'Express'+res.code });
});
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
