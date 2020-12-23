import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ProductionPlanningService} from 'app/@theme/services/production-planning.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ShadeService } from 'app/@theme/services/shade.service';

@Component({
  selector: 'ngx-shade-with-batch',
  templateUrl: './shade-with-batch.component.html',
  styleUrls: ['./shade-with-batch.component.scss']
})
export class ShadeWithBatchComponent implements OnInit {
allShade:any[];
shade:any[];
loading = false;

//batch:any;
color:any;
  constructor(    
    private productionPlanningService: ProductionPlanningService,
    private shadeService: ShadeService,
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
              // this.allShade.forEach((e)=>
              // {
              //   this.getShade(e.partyId,e.qualityEntryId);
              // }
              // );
              // console.log(this.allShade);
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

    onClick(event){
      console.log(event.target.innerText);
      this.allShade.forEach((e)=>{
        if(e.batchId==event.target.innerText){
          this.activeModal.close(e);
        }
      });
     
    }

}
