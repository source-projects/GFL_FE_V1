import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ProductionPlanningService} from 'app/@theme/services/production-planning.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ShadeService } from 'app/@theme/services/shade.service';
import * as errorData from "app/@theme/json/error.json";
import { ToastrService } from 'ngx-toastr';
import { JetPlanningService } from 'app/@theme/services/jet-planning.service';

@Component({
  selector: 'ngx-shade-with-batch',
  templateUrl: './shade-with-batch.component.html',
  styleUrls: ['./shade-with-batch.component.scss']
})
export class ShadeWithBatchComponent implements OnInit {
allShade:any[];
shade:any[];
loading = false;
public errorData: any = (errorData as any).default;
jet:any;
jetList:any[]=[];
formSubmitted: boolean = false;

//batch:any;
color:any;
  constructor(    
    private productionPlanningService: ProductionPlanningService,
    private shadeService: ShadeService,
    private _NgbActiveModal: NgbActiveModal, 
    private toastr: ToastrService,
    private jetService: JetPlanningService,

    ) { }

  ngOnInit(): void {
    this.getJetData();

    //this.getAllBatchWithShade();
  }

  get activeModal() {
    return this._NgbActiveModal;
  }
  getJetData() {
    this.loading = true;
    this.jetService.getAllJetData().subscribe(
      (data) => {
        if (data["success"]) {
          this.jetList = data["data"];
          console.log(this.jetList);
          // this.jet.forEach(ele => {
          //   this.connectedTo.push(ele)
          // })
        }

        else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  // getAllBatchWithShade(){

  //   this.loading=true;

  //   this.productionPlanningService.getAllProductionPlan().subscribe(
  //     (data) => {
  //           if (data["success"]) {
  //             this.allShade = data["data"];

              
  //           }
  //           else {
  //             // this.toastr.error(data["msg"]);
  //             this.loading = false;
  //           }
  //         },
  //     (error) => {
  //           // this.toastr.error(errorData.Serever_Error);
  //           this.loading = false;
  //         }
  //   );}

    onClick(event){
      console.log(event);
      this.activeModal.close(event.value);
      // this.allShade.forEach((e)=>{
      //   if(e.batchId==event.target.innerText){
      //     
      //   }
      // });
     
    }

}
