import{Injectable} from "@angular/core";
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
@Injectable()
export class spotifyService{
  constructor(private http: HttpClient){

  }
  public getClientID(){
    return "da3e944b84d94983be9887955b701b31"
  }
  public getClientSecret(){
    return "88a7ab0f48cc472b9972dccf30af1282"
  }
  public getQuery(query: string){
    const url: string = `https://api.spotify.com/v1/${query}`;
    const token = "BQCl68dLDA2jpqYNlTc3TANWG77D1PW30VdKW6k4wFmDT3nJ3WLirQMMsBCd1aLkIRc5CK-agepPO-qIVTLfDzCxh1AKjmfBlhzQzX8g9jYdV8gjQ_GtpmOMXJ0VxeXrQ8RB9InHxVip8fjt9NXQVEw33OV-rQ"
   // const headers = new HttpHeaders({'Authorization': `Bearer ${token}`, 'Accept' : 'application/json'} )
    fetch('https://api.spotify.com/v1/artists/21E3waRsmPlU7jZsS13rcj', {
      method: 'GET', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => {
        console.log(response.json().then(
          (data) => { console.log(data) }
        ));
      });


  }
}
