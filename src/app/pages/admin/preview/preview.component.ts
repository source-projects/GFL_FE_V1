import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'ngx-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() billList : any;
 // @Input() materialList : any;
  picUrl = [];
  constructor() { }
 

  ngOnInit(): void {
  console.log(this.billList )
    
    
  }

}
