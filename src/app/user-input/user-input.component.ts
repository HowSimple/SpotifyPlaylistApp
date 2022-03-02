import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  playlist: any;
  prompt: string;
  //header: string;
  constructor() {

    //this.header = "Genre to search for"
    this.prompt = ""
  }

  ngOnInit(): void {
  }
  updatePrompt() {

  }
  spotifyPlaylistQuery() {

  }
}
