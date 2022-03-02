import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() { }
  token = "BQAzSs6eudLt1R970eKMobUK3dh6NGsW52YtPiAaRU9bqJe6wNKiYhFWEe0QE4O3Mq6y_segNemGTCgLm0V29gIw5eI0zGuFERQsHPNtQZ4Rm1S649AHrEWCrItQY_vSqWRCTPkG8pHQLJWiSqTqJmscxpYamA"


  getUserPlaylists(){

    this.querySpotifyApi("me/playlists")

  }
   getPlaylistSongs(playlistID: string){

    return this.querySpotifyApi(`playlists/${playlistID}`)


  }

  async querySpotifyApi(query:string){
    const url: string = `https://api.spotify.com/v1/${query}`;
    //const token = "BQCl68dLDA2jpqYNlTc3TANWG77D1PW30VdKW6k4wFmDT3nJ3WLirQMMsBCd1aLkIRc5CK-agepPO-qIVTLfDzCxh1AKjmfBlhzQzX8g9jYdV8gjQ_GtpmOMXJ0VxeXrQ8RB9InHxVip8fjt9NXQVEw33OV-rQ"
    //r dat = []
    fetch(url, {
      method: 'GET', headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
      .then((response) => {
        console.log(response.json().then(
          (data) => {
            console.log(data)
            return data
            //dat = data;
          }
        ));
      });

  }
}
