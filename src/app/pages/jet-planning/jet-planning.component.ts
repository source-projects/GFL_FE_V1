import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShadeWithBatchComponent } from '../production-planning/shade-with-batch/shade-with-batch.component';

@Component({
  selector: 'ngx-jet-planning',
  templateUrl: './jet-planning.component.html',
  styleUrls: ['./jet-planning.component.scss']
})
export class JetPlanningComponent implements OnInit {

  constructor(
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
  }

  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period'
  ];
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        this.timePeriods,
        event.previousIndex,
        event.currentIndex);
    }
  }

  addNew(event){
    const modalRef = this.modalService.open(ShadeWithBatchComponent);
   
  }
}


