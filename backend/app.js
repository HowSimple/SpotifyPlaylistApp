var createError = require('http-errors');
var express = require('express');
var app = express();
var  cors = require('cors')
const corsOptions = {
  origin: true,
  credentials: true
}
app.options('*', cors(corsOptions));
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const querystring = require('querystring');
var indexRouter = require('./routes/index');
const config = require('config');

// for Spotify API authorization

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
  clientId: config.get("Spotify.clientId"),
  clientSecret: config.get("Spotify.clientSecret"),
  redirectUri: config.get("Spotify.redirectAddress")
});

spotifyApi.setAccessToken(config.get("Spotify.accessToken")
  )// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/save/',  function(req, res) {
  // Create a playlist
  spotifyApi.createPlaylist('My playlist', { 'description': 'Automatically generated by Playlist App', 'public': true })
    .then(function(data) {
      console.log('Created playlist!',data.body.id,req.body.tracks);
      spotifyApi.addTracksToPlaylist(data.body.id, req.body.tracks)
        .then(function(data) {
          console.log('Added tracks to playlist!');
          //res.json(data)
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "*");
          res.sendStatus(200)
        }, function(err) {
          console.log('Something went wrong!', err);
        });
    },function(err) {
      console.log('Something went wrong!', err);
    })
});

app.get('/playlist/',  function(req, res) {
  var playlist = req.query.id
  spotifyApi
    .getPlaylistTracks(playlist, {
      offset: 1,
      limit: 10,
      fields: 'items(track(name,id,href,uri,artists(id, name),album(name) )) '
    })
    .then(function (data){
        var  tracks = data.body.items.map(a => a.track)
        var artists = tracks.map(a => a.artists)
        var artistsIds = []
        for  (a in artists)
          artistsIds.push(artists[a][0].id)
      spotifyApi.getArtists(artistsIds)
        .then(function(data) {
          var searchGenre = req.query.genre
          var results = []
          var resultIds = []
          genres = data.body.artists.map(a => a.genres).flat([1])
          var playlistGenres = new Set()
          for  (genre in genres)
            playlistGenres.add(genres[genre])
          if (searchGenre != null)
            for (track in tracks)
              if (data.body.artists.map(a => a.genres)[track].includes(searchGenre))
              {
                results.push(tracks[track])
                resultIds.push(tracks[track].id)
                console.log(resultIds[track])
              }


          if (searchGenre != null)
            tracks = results
           response = {tracks:tracks, genres:Array.from(playlistGenres)}
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.json(response)
        })
    }, function(err) {
        console.log('Something went wrong!', err);
      }
    )
});

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

