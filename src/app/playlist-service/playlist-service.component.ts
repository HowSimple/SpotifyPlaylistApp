import { Component, OnInit } from '@angular/core';
import "../mock";
import { ActivatedRoute } from '@angular/router';
import {mock_getPlaylistSongs} from "../mock";
import {spotifyService} from "../spotify-service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
//import {AuthorizationRequestComponent} from "../authorization-request/authorization-request.component";
@Component({
  selector: 'app-playlist-service',
  templateUrl: './playlist-service.component.html',
  styleUrls: ['./playlist-service.component.css']
})
export class PlaylistServiceComponent implements OnInit {

  // prompt: string;
  // header: string;

  clientId:string;
  accessToken:string | null;
  redirectAfterAuth:string;
  playlist_songs: Song[]
  searchResults!: Song[]
  playlist_url:string;
  genres: string[] = [];
  selectedGenre:string = "";
    authEventHandler($event:any){
    this.accessToken = $event
    console.log(this.accessToken)
  }
  selectGenre(genre:any){
    this.selectedGenre = genre.target.value
  }
  constructor(
                private httpClient: HttpClient,
               private _activatedRoute: ActivatedRoute) {

    this.playlist_url = ""
    console.log(this.genres)
    this.redirectAfterAuth ='http://localhost:4200/redirect';
    this.clientId = 'da3e944b84d94983be9887955b701b31';
    this.accessToken ="AQAvEBSGqZHdmqpm87D5y-1fdO11qUoP02gEcIJkjXC6PSgXvLHdEVCWJj1m5YHjBIm3Av05MsStODE7pesAOp7Dv9YiSxcIvIDChWxYdiUnVNpKruCjHlfJwQ_HqM4HREQFm1brpQV1fakIOCnJwh8ymXtX10aeb0Qr5MWi1pTmz-QE6RlE7HwCuVn5kKA6BHGRCR85KXjsvsewJj6EeMJuqImePMjvaSQwWwgZpgueqgJWd5BRaCJrieei";
    this.playlist_songs = [{name:'Name1',artist:'Artist1'},
      {name:'Name2',artist:'Artist2'},{name:'Name3',artist:'Artist3'}]


    //this.getPlaylistSongs("10b4AJidmIHekntNpPo3R1")}
  }
  ngOnInit(): void {

    //const filter = this._activatedRoute.snapshot.queryParamMap.get('code');
    //console.log(filter);
    //this.accessToken = this._activatedRoute.snapshot.paramMap.get('code');



  }
  login(){
    //var spotifyAuthRequest = "https://accounts.spotify.com/authorize?"
    var spotifyAuthRequest = "http://localhost:3000/token"
   //document.location.href = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectAfterAuth}`;
 // this._spotify.getAuth("BQAobpLZeBpUeq0Znn7-1n_m_xIQyy3nOfqMXYrOqwKcol2sunCTyUuCk4CsYm8MjEDq4YV8tzIbk55ktlLhWvy-YyZR1mpCuHzYD_4wixRc8wIaCym8RCSNWT021Gjd-jQMoKngeuf8HjUDPz7R4nePnNJ6SQ").then(r => console.log(r))

  }



  getPlaylistId(playlistUrl:string){
    var index = playlistUrl.search("playlist/")
    console.log(playlistUrl.slice(index+9,index+31))

    return playlistUrl.slice(index+9,index+31)
  }
  getPlaylistSongs(playlistUrl: string){

    //this.querySpotifyApi(`/playlists/${playlistUrl}`)
    this.playlist_url = playlistUrl
    var request = `http://localhost:3000/playlist?id=${this.getPlaylistId(playlistUrl)}`;
    const options = {method: 'GET', headers: {},
        Accept: 'application/json'};

    fetch(request, options)
      .then(response => response.json())
      .then(response => {

        this.playlist_songs = response.tracks;
        this.genres = response.genres;
        console.log(this.genres)
        //console.log(this.playlist_songs);
        // this.recipeList.push.apply(this.recipeList, response.hits);
      })
      .catch(err => console.error(err));



  }
  savePlaylist(){

  //  var request = `http://localhost:3000/save?name=${"test"}&genre=${}`;
    var request = `http://localhost:3000/save2`;
    //var trackIds = this.searchResults.map(track => track.id)
    this.sendEmail()
    /*const options = {method: 'POST', headers: {'contentType':"application/json"},body: JSON.stringify({name: "test",tracks:this.searchResults}),
     };

    fetch(request, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);

        this.searchResults = response.tracks;
        this.genres = response.genres;
        // this.recipeList.push.apply(this.recipeList, response.hits);
      })
      .catch(err => console.error(err));*/
  }


  sendEmail() {
    //return this.httpClient.post(, "test");
    const options = {method: 'GET', headers: {},
      Accept: 'application/json'};
    this.httpClient.post<any>("http://localhost:3000/save2/",{ title: 'Angular POST Request Example' },options).subscribe(data => {
      console.log(data)
    })
  }
  searchPlaylistByGenre(playlistUrl: string, genre:string){

    //this.querySpotifyApi(`/playlists/${playlistUrl}`)
    var request = `http://localhost:3000/playlist?id=${this.getPlaylistId(playlistUrl)}&genre=${genre}`;
    const options = {method: 'GET', headers: {},
      Accept: 'application/json'};

    fetch(request, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);

        this.searchResults = response.tracks;
        this.genres = response.genres;
        // this.recipeList.push.apply(this.recipeList, response.hits);
      })
      .catch(err => console.error(err));



  }



}
export interface Song {
  name:string;
  artist:string;

}
