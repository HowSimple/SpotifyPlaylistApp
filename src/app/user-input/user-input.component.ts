import {Component, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  playlist: string = "";
  genre: string = "";
  prompt: string;
  @Output() submitPlaylistEvent = new EventEmitter<string>();

  //header: string;
  constructor() {

    //this.header = "Genre to search for"
    this.prompt = ""
  }
  onSubmit(){

  }
  ngOnInit(): void {
  }
  updatePrompt() {

  }
  spotifyPlaylistQuery() {

  }

  SubmitQuery(playlist: string) {
    this.submitPlaylistEvent.emit(playlist)


  }
}
