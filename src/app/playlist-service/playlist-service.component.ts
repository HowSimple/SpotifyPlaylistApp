import { Component, OnInit } from '@angular/core';
import "../mock";
import {mock_getPlaylistSongs} from "../mock";
@Component({
  selector: 'app-playlist-service',
  templateUrl: './playlist-service.component.html',
  styleUrls: ['./playlist-service.component.css']
})
export class PlaylistServiceComponent implements OnInit {

  // prompt: string;
  // header: string;
  clientId:string;
  redirectAfterAuth:string;
  playlist_songs: Song[]
  playlist_url:string;
  genre:string;
  constructor() {
   // this.header = "Search your playlist"
    //this.prompt = "Enter your playlist"
    this.playlist_url = ""
    this.genre =""
    this.redirectAfterAuth ='';
    this.clientId = 'da3e944b84d94983be9887955b701b31';

    this.playlist_songs = [{name:'Name1',artist:'Artist1'},
      {name:'Name2',artist:'Artist2'},{name:'Name3',artist:'Artist3'}]

    //mock_getPlaylistSongs()

    //this.getPlaylistSongs("10b4AJidmIHekntNpPo3R1")}
  }
  ngOnInit(): void {

  }
  login(){
    var spotifyAuthRequest = "https://accounts.spotify.com/authorize?"
    const options = {method: 'CODE'};

    fetch(spotifyAuthRequest, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        //this.recipeList.push.apply(this.recipeList, response.hits);
      })
      .catch(err => console.error(err));



    document.location.href = '';
  }


  getUserPlaylists(){

    this.querySpotifyApi("/me/playlists")

  }
  getPlaylistSongs(playlistID: string){

    this.querySpotifyApi(`/playlists/${playlistID}`)


  }
  querySpotifyApi(query:string){

    var request = `https://api.spotify.com/v1/${query}&app_id=7d5182c5&app_key=a0fa0e82fa892fcae09dd4af3f6a2993`;
    const options = {method: 'GET', headers: {Accept: 'application/json'}};

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
