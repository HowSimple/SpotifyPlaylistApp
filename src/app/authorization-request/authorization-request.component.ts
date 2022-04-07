import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-authorization-request',
  templateUrl: './authorization-request.component.html',
  styleUrls: ['./authorization-request.component.css']
})

export class AuthorizationRequestComponent implements OnInit {
  authorizationToken!: string | null;
  redirectAddress = "localhost:4200/redirect"
  clientId  = 'da3e944b84d94983be9887955b701b31';
  clientSecret = '88a7ab0f48cc472b9972dccf30af1282';
  constructor(private route: ActivatedRoute) { }
  @Output() authorizationEvent = new EventEmitter<string>();
  ngOnInit(): void {
    var authorizationCode = this.route.snapshot.queryParamMap.get('code')
    var client = btoa(this.clientId+':'+this.clientSecret)
    client = 'ZGEzZTk0NGI4NGQ5NDk4M2JlOTg4Nzk1NWI3MDFiMzE6ODhhN2FiMGY0OGNjNDcyYjk5NzJkY2NmMzBhZjEyODI='
    var request = `https://api.spotify.com/v1/api/token/grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${this.redirectAddress}`;
    const options = {method: 'GET', headers: {'Content-Type': 'application/json'
        ,'Authorization':`Basic ${client}` }};

    fetch(request, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);

      })
      .catch(err => console.error(err));
  }



/*
  console.log(this.authorizationToken)
  console.log(this.route.snapshot.queryParamMap)

  if(this.authorizationToken != null)
  this.authorizationEvent.emit(this.authorizationToken)*/
}
