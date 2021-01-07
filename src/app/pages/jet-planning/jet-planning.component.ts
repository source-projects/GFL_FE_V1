import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShadeWithBatchComponent } from '../production-planning/shade-with-batch/shade-with-batch.component';
import { JetPlanningService } from 'app/@theme/services/jet-planning.service';
import { JetPlanning, JetDataList } from "app/@theme/model/jet-planning";
import { ToastrService } from 'ngx-toastr';
import * as errorData from "app/@theme/json/error.json";
import { ProductionPlanningService } from 'app/@theme/services/production-planning.service';
import { WarningPopupComponent } from 'app/@theme/components/warning-popup/warning-popup.component';

@Component({
  selector: 'ngx-jet-planning',
  templateUrl: './jet-planning.component.html',
  styleUrls: ['./jet-planning.component.scss']
})
export class JetPlanningComponent implements OnInit {

  finalobj = [];
  allShade:any;
  constructor(
    private modalService: NgbModal,
    private jetService: JetPlanningService,
    private toastr: ToastrService,
    private productionPlanningService: ProductionPlanningService,

  ) { }

  ngOnInit(): void {
    
    this.getJetData();
    this.getshade();
  }

  public errorData: any = (errorData as any).default;

  array = [];
  array1 = [];
  index: any;
  productionList = [];
  production: any[];
  jet: any[];
  jetData: any[];
  jetData1 = {
    controlId: Number,
    productionId: Number,
    sequence: Number,
  }
  loading = false;
  count = 0;
  countArr = [];
  jetPlanning: JetPlanning = new JetPlanning();
  jetDataList: JetDataList = new JetDataList();
  JetDataListArray: JetDataList[] = [];

  drop(event: CdkDragDrop<any[]>,i) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.jet[i].jetDataList, event.previousIndex, event.currentIndex);
      console.log("cont:",event.container.data[event.currentIndex].productionId)
      console.log("previous:",event.previousIndex);
      console.log("Current:",event.currentIndex)
      let fromobj = {
        "jetId": this.jet[i].id,
        "productionId": event.container.data[event.currentIndex].productionId,
        "sequence": event.previousIndex + 1
      }  
      let toobj = {
        "jetId": this.jet[i].id,
        "productionId": event.container.data[event.currentIndex].productionId,
        "sequence": event.currentIndex + 1
      }
      let obj = {
        "from":fromobj,
        "to":toobj
      }
      this.jetService.updateJetData(obj).subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(errorData.Add_Success);
          }

        }
      )
      
    } 
    // else {
    //   transferArrayItem(event.previousContainer.data,
    //     this.jet[i].jetDataList,
    //     event.previousIndex,
    //     event.currentIndex);
    //     console.log("previous1:",event.previousIndex);
    //     console.log("Current1:",event.currentIndex)

    // }
  }
  getshade(){
    this.productionPlanningService.getAllProductionPlan().subscribe(
      (data) => {
            if (data["success"]) {
              this.allShade = data["data"];
              console.log("AllShade:",this.allShade)
            }
            else {
              // this.toastr.error(data["msg"]);
              this.loading = false;
              this.allShade = null;
            }
          },
      (error) => {
            // this.toastr.error(errorData.Serever_Error);
            this.loading = false;
            this.allShade = null;
          }
    );

  }

  addNew(event, index) {

    if (this.allShade == null || this.allShade == undefined)
    {
      const modalRef = this.modalService.open(WarningPopupComponent)
    }
    else
    {
      const modalRef = this.modalService.open(ShadeWithBatchComponent).result.then(
        (result) => {
          //this.jet[index].production.push(result.batchId);
          //this.jet[index]
          // if(this.jet[index].jetDataList == null){
          //   this.jet[index].jetDataList = result;
          // }
          // else{
          //   this.jet[index].jetDataList.push(result);
  
          // }
  
          this.jetData1.controlId = this.jet[index].id;
          this.jetData1.productionId = result.id;
          this.jetData1.sequence = index + 1;
          let jetData2 = [this.jetData1];
          
          this.jetService.saveJetData(jetData2).subscribe(
            (data) => {
              if (data["success"]) {
                this.toastr.success(errorData.Add_Success);
                this.getJetData();
                this.getshade();
              }
              else{
                this.toastr.error("Weight is more than jet capacity");
                this.getJetData();
                this.getshade();
              }
  
            }
          )
  
          if(this.jet[index].jetDataList==null){
            this.jet[index].jetDataList = this.jetData1;
          }
          else{
            this.jet[index].jetDataList.push(this.jetData1);
          }
        });
  
    }
    

  }

  getJetData() {
    this.loading = true;
    this.jetService.getAllJetData().subscribe(
      (data) => {
        if (data["success"]) {
          this.jet = data["data"];
          console.log("JetData:",this.jet)

          // Object.keys(this.jet).forEach((key) => {
          //   this.jetPlanning[key] = this.jet[key];

          // })
          // this.jetData = Object.keys(this.jetPlanning).map(key => {
          //   return this.jetPlanning[key];
          // })
          // this.jet.forEach(element => {

          //   element["production"] = [];
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

}


