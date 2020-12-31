import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShadeWithBatchComponent } from '../production-planning/shade-with-batch/shade-with-batch.component';
import { JetPlanningService } from 'app/@theme/services/jet-planning.service';
import { JetPlanning, JetDataList } from "app/@theme/model/jet-planning";
import { ToastrService } from 'ngx-toastr';
import * as errorData from "app/@theme/json/error.json";

@Component({
  selector: 'ngx-jet-planning',
  templateUrl: './jet-planning.component.html',
  styleUrls: ['./jet-planning.component.scss']
})
export class JetPlanningComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private jetService: JetPlanningService,
    private toastr: ToastrService,


  ) { }

  ngOnInit(): void {
    this.getJetData();
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
    // batchId: Number
  }
  loading = false;
  count = 0;
  countArr = [];
  jetPlanning: JetPlanning = new JetPlanning();
  jetDataList: JetDataList = new JetDataList();
  JetDataListArray: JetDataList[] = [];

  drop(event: CdkDragDrop<string[]>,i) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.jet[i].jetDataList, event.previousIndex, event.currentIndex);
    }
    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //     this.jet,
    //     event.previousIndex,
    //     event.currentIndex);
    // }
  }

  addNew(event, index) {
    const modalRef = this.modalService.open(ShadeWithBatchComponent).result.then(
      (result) => {
        console.log(result);
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
        
        console.log(jetData2);
        this.jetService.saveJetData(jetData2).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Add_Success);
              this.getJetData();
            }

          }
        )

        // this.jetData1.batchId = result.batchId;
        if(this.jet[index].jetDataList==null){
          this.jet[index].jetDataList = this.jetData1;
        }
        else{
          this.jet[index].jetDataList.push(this.jetData1);
        }
      });


  }

  getJetData() {
    this.loading = true;
    this.jetService.getAllJetData().subscribe(
      (data) => {
        if (data["success"]) {
          this.jet = data["data"];
          console.log(this.jet);


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


