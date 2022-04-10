import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {mock_getPlaylistSongs} from "../mock";
import {SpotifyService} from "../spotify.service";
import {async} from "@angular/core/testing";
import {spotifyService} from "../spotify-service";
import {Song} from "../playlist-service/playlist-service.component";


@Component({
  selector: 'app-show-playlist',
  templateUrl: './show-playlist.component.html',
  styleUrls: ['./show-playlist.component.css']
})

export class ShowPlaylistComponent implements OnInit {
  //@Input()  response:any;

  @Input() songs:any;
//  @Input() genres:any;
 // @Output()  selectedGenreEvent = new EventEmitter<string>();

  isHidden:boolean = false;

  constructor() {

    /*this.songs = [{name:'Name1',artist:'Artist1'},
      {name:'Name2',artist:'Artist2'},{name:'Name3',artist:'Artist3'}]
    *///spotify.getPlaylistSongs()
    //this.song_list.push(mock_getPlaylistSongs());
    //this.getPlaylistSongs('10b4AJidmIHekntNpPo3R1')


    //mock_response = JSON.parse(mock_response)
    //this.getQuery("test")
    //this.song_list =mock_getPlaylistSongs()

    //console.log("TEST",this.song_list)
    }
   ngOnInit() {
    //this.tracks= this.querySpotifyApi('playlists/10b4AJidmIHekntNpPo3R1').subscribe()
    // this.querySpotifyApi("playlists/10b4AJidmIHekntNpPo3R1")

   // console.log( this.tracks)


      //@Input() list:any;
  }

  async querySpotifyApi(query:string) {
    const url: string = `https://api.spotify.com/v1/${query}/tracks`;
    const token: string = "BQAcY01Yc-ROUCGlWspt6cSJwMWkfdZw7vrMrY2JlLkPJcMiJHKbX0pIAA28Qf5LaJf7wX5ltXLuFBwhMyRHXFd2EbYkYTwF1xE3Anxe0Sk83WHwiFPIQY4Wn7z6Qo1971B3N1c_XBQ97R33aN-S4wqjdHlCJA"

    //const token = "BQCl68dLDA2jpqYNlTc3TANWG77D1PW30VdKW6k4wFmDT3nJ3WLirQMMsBCd1aLkIRc5CK-agepPO-qIVTLfDzCxh1AKjmfBlhzQzX8g9jYdV8gjQ_GtpmOMXJ0VxeXrQ8RB9InHxVip8fjt9NXQVEw33OV-rQ"
    //r dat = []
    return fetch(url, {
      method: 'GET', headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.json().then(
          (data) => {
            console.log(data)
            //this.songs = data.tracks
            //this.songs.push.apply(this.songs, data.songs)


            //dat = data;
          }
        ));
      });
  }
  toggleVisibility() {
    if (this.isHidden == false)
      this.isHidden = true;
    else this.isHidden = false;
  }
  public getQuery(query: string){
    const url: string = `https://api.spotify.com/v1/${query}`;
    const token = "BQCl68dLDA2jpqYNlTc3TANWG77D1PW30VdKW6k4wFmDT3nJ3WLirQMMsBCd1aLkIRc5CK-agepPO-qIVTLfDzCxh1AKjmfBlhzQzX8g9jYdV8gjQ_GtpmOMXJ0VxeXrQ8RB9InHxVip8fjt9NXQVEw33OV-rQ"
    // const headers = new HttpHeaders({'Authorization': `Bearer ${token}`, 'Accept' : 'application/json'} )
    fetch('https://api.spotify.com/v1/artists/21E3waRsmPlU7jZsS13rcj', {
      method: 'GET', headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.json().then(
          (data) => { console.log(data) }
        ));
      });


  }

}
