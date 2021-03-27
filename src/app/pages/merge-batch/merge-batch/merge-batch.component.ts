import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-merge-batch',
  templateUrl: './merge-batch.component.html',
  styleUrls: ['./merge-batch.component.scss']
})
export class MergeBatchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    // this.updateFlag = 1;
    // this.findmtrsum();
    // this.findwtsum();
    // this.shuffleForm.controls['totalrowsPart1'].setValue(this.batches.length);
    // this.shuffleForm.controls['totalrowsPart2'].setValue(this.part2.length);
  }

}
