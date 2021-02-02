import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShadeWithBatchComponent } from '../production-planning/shade-with-batch/shade-with-batch.component';
import { JetPlanningService } from 'app/@theme/services/jet-planning.service';
import { JetPlanning, JetDataList } from "app/@theme/model/jet-planning";
import { ToastrService } from 'ngx-toastr';
import * as errorData from "app/@theme/json/error.json";
import { ProductionPlanningService } from 'app/@theme/services/production-planning.service';
import { WarningPopupComponent } from 'app/@theme/components/warning-popup/warning-popup.component';
import { PlanningSlipComponent } from './planning-slip/planning-slip.component';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'ngx-jet-planning',
  templateUrl: './jet-planning.component.html',
  styleUrls: ['./jet-planning.component.scss']
})
export class JetPlanningComponent implements OnInit {
  public sendBatchId:string;
  public sendSotckId:number;
  finalobj = [];
  public connectedTo: CdkDropList[] = [];
  items = [{ title: 'Change Status' }, { title: 'Print' }, {title: 'Edit And Print'}];
  allShade: any;
  constructor(
    private modalService: NgbModal,
    private jetService: JetPlanningService,
    private toastr: ToastrService,
    private productionPlanningService: ProductionPlanningService,
    private menuService: NbMenuService,
  ) { }

  ngOnInit(): void {

    this.getJetData();
    this.getshade();
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if(title === 'Print') this.generateSlip(true);
        else if(title === 'Edit And Print') this.generateSlip(false);
      });
  }

  setIndexForSlip(index){
    //on click set batchId stockId to get print-slip data 
    this.sendBatchId = index.batchId;
    this.sendSotckId = index.productionId;
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

  drop(event: CdkDragDrop<any[]>, i) {


    if (event.previousContainer === event.container) {
      moveItemInArray(this.jet[i].jetDataList, event.previousIndex, event.currentIndex);
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
        "from": fromobj,
        "to": toobj
      }
      this.jetService.updateJetData(obj).subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(errorData.Add_Success);
          }

        }
      )

    }
    else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
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
          "from": fromobj,
          "to": toobj
        }
        this.jetService.updateJetData(obj).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Add_Success);
            }
  
          }
        )
  
    }
  }
  getshade() {
    this.productionPlanningService.getAllProductionPlan().subscribe(
      (data) => {
        if (data["success"]) {
          this.allShade = data["data"];
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

    if (this.allShade == null || this.allShade == undefined) {
      const modalRef = this.modalService.open(WarningPopupComponent)
    }
    else {
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
          let jetData2 = this.jetData1;
          let arr =[];
          arr.push(jetData2)
          this.jetService.saveJetData(arr).subscribe(
            (data) => {
              if (data["success"]) {
                this.toastr.success(errorData.Add_Success);
                this.getJetData();
                this.getshade();
              }
              else {
                this.toastr.error("Weight is more than jet capacity");
                this.getJetData();
                this.getshade();
              }

            }
          )

          if (this.jet[index].jetDataList == null) {
            this.jet[index].jetDataList = this.jetData1;
          }
          else {
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
          this.jet.forEach(ele => {
            this.connectedTo.push(ele)
          })
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

  generateSlip(directPrint){
    const modalRef = this.modalService.open(PlanningSlipComponent);
    modalRef.componentInstance.isPrintDirect = directPrint;
    modalRef.componentInstance.batchId = this.sendBatchId;
    modalRef.componentInstance.stockId = this.sendSotckId;
    modalRef.result.then((result) => {
      if (result) {
        console.log("Done");
      }
    });
  }

}


