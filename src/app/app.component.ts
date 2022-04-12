import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'playlist-app';
  constructor() {
  }
  onChange($event:any)
  {
    console.log('TEST'+$event.authorizationToken)

  }
}
