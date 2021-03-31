import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'ngx-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() billList : any;
  imageIndex = 0;
  @Input() materialList : any;
  picUrl = [];
  constructor() { }
 

  ngOnInit(): void {    
    console.log(this.billList , this.materialList)
  }

  previous(type){
    if(this.imageIndex){
      this.imageIndex--;

    }else{
      if(type == "bill"){
        this.imageIndex = this.billList.length - 1;
      }
      else{
        this.imageIndex = this.materialList.length - 1;

      }
    }
  }

  next(type){
    if(type == "bill"){
      if(this.imageIndex < (this.billList.length - 1)){
        this.imageIndex++;
      }
      else{
        this.imageIndex = 0;
      }
  
    }else{
      if(this.imageIndex < (this.materialList.length - 1)){
        this.imageIndex++;
      }
      else{
        this.imageIndex = 0;
      }
    }
    
  }

}
