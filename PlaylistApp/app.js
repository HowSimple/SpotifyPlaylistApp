var createError = require('http-errors');
var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const querystring = require('querystring');
var indexRouter = require('./routes/index');
// for Spotify API authorization
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'da3e944b84d94983be9887955b701b31',
  clientSecret: '88a7ab0f48cc472b9972dccf30af1282',
  redirectUri: 'http://localhost:4200/redirect'
});
spotifyApi.setAccessToken("BQDseOtspjVcDiNZDcuknyO-9F72HOBh2dLoaJ4rUdbV8gXel8iotGW8zYw03z01aJ3EQcSBDzpwSjtxWilPROW9Vcsfrj3eJXgQu8zf6Xz06w4CefLH44QHZPGdmfKXVEGuKjgciA3DBRfpElFQXZRrTSep73unTfYC2TBnw-51GdjhJY4ZN-2gYD78IXx1WDMMh9Y8cjvqwmJRROkcmwIM")


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
app.get('/playlist/',  function(req, res) {
 results =  spotifyApi
    .getPlaylistTracks('3MBz0XGauQW6cFj9Ze9tAK', {
      offset: 1,
      limit: 5,
      fields: 'items(track(name,id,href,album(name,href))) '
    })
    .then(
      function(data) {
        //console.log('The playlist contains these tracks', data.body.items);
        let tracks = data.body.items.map(a => a.track.id);
        console.log(tracks)
        res.json(data.body.items)
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );

  res.header("Access-Control-Allow-Origin", "*");


});
/*
function getPlaylistTrackIds()
app.get('/merge/',  function(req, res) {
  var tracks = JSON.parse(req.params.tracks)
  console.log(tracks)
  for (var i= 0; i<re )

  results =  spotifyApi
    .addTracksToPlaylist('3MBz0XGauQW6cFj9Ze9tAK', {
      offset: 1,
      limit: 5,
      fields: 'items(track(name,href,album(name,href))) '
    })
    .then(
      function(data) {
        console.log('The playlist contains these tracks', data.body.items);
        res.json(data.body.items)
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );

  res.header("Access-Control-Allow-Origin", "*");


});
*/
app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email playlist-read-private';

  res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: spotifyApi.getClientId(),
        scope: scope,
        redirect_uri: spotifyApi.getRedirectURI(),
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
