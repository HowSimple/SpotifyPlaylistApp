import {Component, Input, OnInit} from '@angular/core';
import {mock_getPlaylistSongs} from "../mock";
@Component({
  selector: 'app-show-playlist',
  templateUrl: './show-playlist.component.html',
  styleUrls: ['./show-playlist.component.css']
})
export class ShowPlaylistComponent implements OnInit {
  song_list = [];
  constructor() {
    this.song_list = mock_getPlaylistSongs();
  }

  ngOnInit(): void {
  }

  isHidden:boolean = false;
  @Input() list:any;


  toggleVisibility() {
    if (this.isHidden == false)
      this.isHidden = true;
    else this.isHidden = false;
  }
}
