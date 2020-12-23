import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShadeWithBatchComponent } from '../production-planning/shade-with-batch/shade-with-batch.component';
import { JetPlanningService } from 'app/@theme/services/jet-planning.service';
import{JetPlanning,ProductionData} from "app/@theme/model/jet-planning";
@Component({
  selector: 'ngx-jet-planning',
  templateUrl: './jet-planning.component.html',
  styleUrls: ['./jet-planning.component.scss']
})
export class JetPlanningComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private jetService: JetPlanningService

  ) { }

  ngOnInit(): void {
   this.getJetData();
   // console.log(this.jetPlanning);

   // this.jetPlanning.productionData=[];
    //console.log(this.jetPlanning);

  }
  index:any;
  productionList=[];
  production=[];
  jet:any[];
  loading = false;

  jetPlanning: JetPlanning = new JetPlanning();
  jetData: JetPlanning[]=[];
   productionData: ProductionData = new ProductionData();
  // ProductionArray: ProductionData[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.production, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        this.production,
        event.previousIndex,
        event.currentIndex);
    }
  }

  addNew(event,index){
   console.log(index);
    this.index=index;
    const modalRef = this.modalService.open(ShadeWithBatchComponent).result.then(
     
      (result)=>{
        console.log(result);

        this.jetPlanning[index].productionData= result;
        //this.jetData.push(result);
        //this.ProductionArray.push(result);
       //this.jetPlanning.productionData=this.ProductionArray;
        //this.jetPlanning.productionData.push(result);
        console.log(this.jetPlanning);
       
        //this.jetPlanning.production=result;
        //this.productionList.push(result);
        //this.productionList[index]=result.batchId;
        //document.getElementById('p1').innerHTML=result.batchId;
        // console.log(this.production);
        // this.productionList[index] = this.production;
        //console.log(this.jetPlanning);
       // console.log(result);}
       } );
   
  }

  getJetData(){
    this.loading=true;
    this.jetService.getAllJetData().subscribe(
      (data)=>{
        if(data["success"]){
          this.jet=data["data"];

          Object.keys(this.jet).forEach((key)=>{
            this.jetPlanning[key] = this.jet[key];
            this.jetPlanning.productionData=[];
            //this.jetPlanning[this.jetPlanning.productionData]
          })
          //this.jetData.push(this.jet);
          //this.jetData=this.jet;
          console.log(this.jetPlanning);


          
          //let ret = Object.assign(this.jetPlanning,this.jet)
          
         // this.jetPlanning.=this.jet;
          //console.log(ret);
          //this.jetPlanning=ret;
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
    );
  }
}


