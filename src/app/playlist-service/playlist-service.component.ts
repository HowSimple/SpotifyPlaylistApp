import { Component, OnInit } from '@angular/core';
import "../mock";
import {mock_getPlaylistSongs} from "../mock";
@Component({
  selector: 'app-playlist-service',
  templateUrl: './playlist-service.component.html',
  styleUrls: ['./playlist-service.component.css']
})
export class PlaylistServiceComponent implements OnInit {


  mock_songs = mock_getPlaylistSongs()


  constructor() {
    mock_getPlaylistSongs()

    this.getPlaylistSongs("10b4AJidmIHekntNpPo3R1")}

  ngOnInit(): void {
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
