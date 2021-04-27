import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadComponent implements OnChanges {
    
    @Input() msg: any;
    @Input() showMoreLabel = '... Show More';
    @Input() showLessLabel = 'Show Less';
  
    @Input() maxLines = 2;
    @Input() maxLength = 100;
    @ViewChild('content', { static: false }) content: ElementRef<HTMLDivElement>;
  
    @ViewChild('btn', { static: false }) btn: ElementRef<HTMLButtonElement>;
    showEllipsis;
    elementHeight = this.maxLines * 20;
    addressFlag:boolean=false
  
    constructor() {
      
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes.maxLines && changes.maxLines.currentValue) {
        this.elementHeight = this.maxLines * 20;
      }
    }
    ngOnInit(){
      if(this.msg){
        this.addressFlag=true
        this.showEllipsis=true
      }else{
        this.addressFlag=false
      }
      console.log("init msg",this.msg)
    }
  }
