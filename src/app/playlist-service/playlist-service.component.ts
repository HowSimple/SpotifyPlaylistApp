import { Component, OnInit } from '@angular/core';
import "../mock";
import { ActivatedRoute } from '@angular/router';
import {mock_getPlaylistSongs} from "../mock";
import {spotifyService} from "../spotify-service";
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
  playlist_url:string;
  genre:string;
  authEventHandler($event:any){
    this.accessToken = $event
    console.log(this.accessToken)
  }

  constructor(
                private _spotify: spotifyService,
               private _activatedRoute: ActivatedRoute) {

    this.playlist_url = ""
    this.genre =""
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
   document.location.href = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectAfterAuth}`;


    //console.log(this.accessToken)
/*

    const options = {method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      }};

    fetch(spotifyAuthRequest, options)
      .then(response => response.json())
      .then(response => {
        console.log("response"+response);

        //this.recipeList.push.apply(this.recipeList, response.hits);
      })
      .catch(err => console.error(err));


*/



  }


  getUserPlaylists(){

    this.querySpotifyApi("/me/playlists")

  }
  getPlaylistSongs(playlistID: string){

    this.querySpotifyApi(`/playlists/${playlistID}`)


  }
  querySpotifyApi(query:string){

    var request = `https://api.spotify.com/v1/${query}&app_id=7d5182c5&app_key=a0fa0e82fa892fcae09dd4af3f6a2993`;
    const options = {method: 'GET', headers: {Authorization: 'Bearer:BQCXtU7BqJy05uaSD6rTXJOy2kBH50S6LzxSitV28QFBqU_3IaVlvh7DJYsGSc_weajmFpRXkVQAmOt38jnM5k3dZfOE9IfCP_qYkBXx9E-MbTK8W8J1DJIEFPHYViIyinjIIzvzOEdBeUw4K-UMFSY8N-O5Vw',
        Accept: 'application/json'}};

    fetch(request, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
       // this.recipeList.push.apply(this.recipeList, response.hits);
      })
      .catch(err => console.error(err));
  }


}
export interface Song {
  name:string;
  artist:string;

}
