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
spotifyApi.setAccessToken(
"BQC8BN-TF1yeAaoRTOU8zoMizhZIL9Uw5u-I5PYJDZ7ATisyfOHxc84ANx1QwpLEiYJK1flC8ADj7p5MtFDkzEoevVysGr2QuImhJuX865W0bZa9Sy1F3hVskJtMUUfaz3A8_MaQHHykJenz4OukpHXVurdePU15PFTqIRWPsqC8o3--G2TQv5nJk7EKee_zx93_k08silTlMMaE7GLzvzozt3RnExFlv1Q"
)// view engine setup
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


});
app.get('/playlist/',  function(req, res) {
  var artists
  var tracks
  var artistsIds = []
  var results = []
  var resultIds = []
  var resultPlaylistUrl = ""
  var playlistGenres = new Set()
  var playlist = req.query.id
  var searchGenre = req.query.genre
  console.log("playlist ID:",playlist,"genre: ",searchGenre)

  spotifyApi
    .getPlaylistTracks(req.query.id, {
      offset: 1,
      limit: 10,
      fields: 'items(track(name,id,href,artists(id),album(name) )) '
    })
    .then(
      function(data) {
        artists = data.body.items.map(a => a.track.artists)
        tracks = data.body.items.map(a => a.track)
        for  (a in artists)
          artistsIds.push(artists[a][0].id)


       // console.log('The playlist contains these artists', artistsIds);
        spotifyApi.getArtists(artistsIds, )
          .then(function(data) {
            // adds all genres to set
            genres = data.body.artists.map(a => a.genres).flat([1])

            //console.log(genres)
            for  (genre in genres){

              playlistGenres.add(genres[genre])
              //if (searchGenre==genres[genre])

            }
            if (searchGenre != null)
            {
              for (track in tracks)
              {
                //console.log(tracks)
                if (data.body.artists.map(a => a.genres)[track].includes(searchGenre))
                {
                  results.push(tracks[track])
                  resultIds.push(tracks[track].id)
                  console.log(resultIds[track])
                }
              }
            }
            if (searchGenre== null)
            response = {tracks:tracks, genres: Array.from(playlistGenres)}
            else response = {tracks:results, genres:Array.from(playlistGenres)}
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.json(response)
          }, function(err) {
            console.error(err);
          });
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );
 /* // Get multiple artists
    spotifyApi.getArtists(artistsIds)
    .then(function(data) {
      console.log('Artists information', data.body);
    }, function(err) {
      console.error(err);
    });*/

});
app.get('/profile/',  function(req, res) {
  var currentUser
  spotifyApi.getMe()
    .then(function(data) {
      currentUser = data.body.id
      console.log('Some information about the authenticated user', data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });


   // Get a user's playlists
    spotifyApi.getUserPlaylists(currentUser, {fields: 'id,name,description,href',})
      .then(function(data) {
        console.log('Retrieved playlists', data.body);
      },function(err) {
        console.log('Something went wrong!', err);
      });
});

//function getPlaylistTrackIds()
app.get('/searchByGenre/',  function(req, res) {
  playlist = req.query.id
  genre = req.query.genre
  console.log("playlist ID:",playlist,"genre: ",genre)
  tracks = []
  artistsIds = []
  searchResults = []

  playlistGenres = []
  results =  spotifyApi
    .getPlaylistTracks(req.query.id, {
      offset: 1,
      limit: 5,
      fields: 'items(track(name,id,href,artists(name),album(name,href))),genres'
    })
    .then(
      function(data) {
        artists = data.body.items.map(a => a.track.artists)
        tracks = data.body.items.map(a => a.track)
        for  (a in artists)
          artistsIds.push(artists[a][0].id)
        spotifyApi.getArtists(artistsIds)
          .then(function(data) {
            // adds all genres to set
            genres = data.body.artists.map(a => a.genres).flat([1])
            for  (genre in genres)
              playlistGenres.add(genres[genre])
            console.log("genres",playlistGenres)
          }, function(err) {
            console.error(err);
          });
        //console.log('The playlist contains these tracks', tracks);
        for (t in tracks){
         // searchResults.add(tracks[track])

          //console.log(tracks[t])
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(data.body.items)
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );


});






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

/*

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
*/

