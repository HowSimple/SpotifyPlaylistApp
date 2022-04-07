import { Component } from '@angular/core';
import {spotifyService} from "./spotify-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'playlist-app';
  constructor(private _spotify:spotifyService) {
  }
  onChange($event:any)
  {
    console.log('TEST'+$event.authorizationToken)

  }
}
