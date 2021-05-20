import { Subject } from 'rxjs';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {
    destroy$: Subject<void> = new Subject<void>();
  @Input("billList") billList : any;
  imageIndex = 0;
  @Input("materialList") materialList : any;
  picUrl = [];
  constructor(
    private _NgbActiveModal: NgbActiveModal,

  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
 

  ngOnInit(): void {    
  }

  get activeModal() {
    return this._NgbActiveModal;
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
