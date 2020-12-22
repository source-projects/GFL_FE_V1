import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ProductionPlanningService} from 'app/@theme/services/production-planning.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'ngx-shade-with-batch',
  templateUrl: './shade-with-batch.component.html',
  styleUrls: ['./shade-with-batch.component.scss']
})
export class ShadeWithBatchComponent implements OnInit {
allShade:any[];
loading = false;
  constructor(    private productionPlanningService: ProductionPlanningService,
    private _NgbActiveModal: NgbActiveModal, 
    ) { }

  ngOnInit(): void {
    this.getAllBatchWithShade();
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  getAllBatchWithShade(){

    this.loading=true;

    this.productionPlanningService.getAllProductionPlan().subscribe(
      (data) => {
            if (data["success"]) {
              this.allShade = data["data"];
              console.log(this.allShade);
            }
            else {
              // this.toastr.error(data["msg"]);
              this.loading = false;
            }
          },
      (error) => {
            // this.toastr.error(errorData.Serever_Error);
            this.loading = false;
          }
    );}

}
