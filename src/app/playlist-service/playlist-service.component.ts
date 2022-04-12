import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {HttpClient, HttpHeaders} from "@angular/common/http";
//import {AuthorizationRequestComponent} from "../authorization-request/authorization-request.component";
@Component({
  selector: 'app-playlist-service',
  templateUrl: './playlist-service.component.html',
  styleUrls: ['./playlist-service.component.css']
})
export class PlaylistServiceComponent implements OnInit {


  playlist_songs!: Song[]
  searchResults!: any
  playlist_url:string="";
  genres: string[] = [];
  selectedGenre:string = "";
  selectGenre(genre:any){
    this.selectedGenre = genre.target.value
  }
  constructor(
                private httpClient: HttpClient,
               private _activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
  }
  getPlaylistId(playlistUrl:string){
    var index = playlistUrl.search("playlist/")
    console.log(playlistUrl.slice(index+9,index+31))
    return playlistUrl.slice(index+9,index+31)
  }
  getPlaylistSongs(playlistUrl: string){
    this.playlist_url = playlistUrl
    var request = `http://localhost:3000/playlist?id=${this.getPlaylistId(playlistUrl)}`;
    const options = {method: 'GET', headers: {},
        Accept: 'application/json'};

    fetch(request, options)
      .then(response => response.json())
      .then(response => {

        this.playlist_songs = response.tracks;
        this.genres = response.genres;
      })
      .catch(err => console.error(err));
  }
  savePlaylist(title:string,playlistTracks:any,){
    var trackIds = playlistTracks.map(function(a:any) {return a.uri;});
    const options = {method: 'GET', headers: {},
      Accept: 'application/json'};
    this.httpClient.post<any>("http://localhost:3000/save/",{ name: title , tracks: trackIds},options).subscribe(data => {
      console.log(data)
    })
  }

  searchPlaylistByGenre(playlistUrl: string, genre:string){
      var request = `http://localhost:3000/playlist?id=${this.getPlaylistId(playlistUrl)}&genre=${genre}`;
    const options = {method: 'GET', headers: {},
      Accept: 'application/json'};
    fetch(request, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);

        this.searchResults = response.tracks;
        this.genres = response.genres;
      })
      .catch(err => console.error(err));
  }
}
export interface Song {
  name:string;
  artist:string;

}
