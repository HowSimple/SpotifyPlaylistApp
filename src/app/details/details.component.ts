import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  details = [];
  isHidden:boolean = false;
  @Input() list:any;
  constructor() { }
  onHide(){}
  ngOnInit() {
  }


  toggleVisibility() {
    if (this.isHidden == false)
      this.isHidden = true;
    else this.isHidden = false;
  }
}
