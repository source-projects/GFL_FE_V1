import { Component, OnInit } from '@angular/core';
import { StockBatch, StockBatchData } from 'app/@theme/model/stock-batch';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

import * as errorData from 'app/@theme/json/error.json';
import { PartyService } from 'app/@theme/services/party.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/@theme/services/common.service';
import { StockBatchService } from 'app/@theme/services/stock-batch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-edit-stock-batch',
  templateUrl: './add-edit-stock-batch.component.html',
  styleUrls: ['./add-edit-stock-batch.component.scss']
})
export class AddEditStockBatchComponent implements OnInit {
  public errorData: any = (errorData as any).default;
//toaster config
config: NbToastrConfig;
destroyByClick = true;
duration = 2000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;
status

  formSubmitted = false;
  selectedFabricId=null;

  party: any[];
  user:any;
  index;
  stockList;
  blocks=[
    {
      batchNo:null,
    },
  ];

  stockBatchArray:StockBatchData[]=[];
  stockBatch :StockBatch=new StockBatch();
  stockBatchData: StockBatchData= new StockBatchData();

  
  blockNumber;

  constructor(
    private partyService: PartyService,
    private toastr:ToastrService,
    private route:Router,
    private commonService:CommonService,
    private stockBatchService:StockBatchService

  ) { 
    this.stockBatchArray.push(this.stockBatchData);
    this.stockBatch.stockBatchData=this.stockBatchArray;
  }

  ngOnInit(): void {
    this.getPartyList();
  }


  getPartyList() {
    this.partyService.getAllPartyList().subscribe(
      (data) => {
        if(data['success']){
          if (data["data"] && data["data"].length > 0) {
            this.party = data["data"];
          } else {
             this.toastr.error(errorData.Add_Error)
          }
        }
        else{
          this.toastr.error(errorData.Internal_Error)
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error)
      }
    );
  }

  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if (keyCode == 13){
      //toaster
      this.status = "danger"
      const config = {
      status: this.status,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    this.index = "stockList" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.stockBatch.stockBatchData.length - 1) {
        let item = this.stockBatch.stockBatchData[rowIndex];
        if(colName == 'meter'){
          if (!item.mtr) {
            this.toastr.error("Enter Meter",'Meter Field required');
            return;
          }
        }else if(colName == 'weight'){
          if (!item.wt) {
            this.toastr.error("Enter Weight",'Weight Field required');
            return;
            
          }
        }
       
        let obj = {
         
          mtr: null,
          wt: null,
          batchNo:null,
         
        };
        let list = this.stockBatch.stockBatchData;
        list.push(obj);
        this.stockBatch.stockBatchData = [...list];
        let interval = setInterval(()=>{
          let field = document.getElementById(this.index)
          if(field != null){
            field.focus()
            clearInterval(interval)
          }
        }, 500)
      } else {
        alert("go to any last row input to add new row");
      }
    }
  }

  removeItem(id){
    let idCount = this.stockBatch.stockBatchData.length;
    let item = this.stockBatch.stockBatchData;
    if(idCount == 1){
      item[0].mtr = null;
      item[0].wt = null;
     
      let list = item;
      this.stockBatch.stockBatchData = [...list];
    }
    else{
      let removed = item.splice(id,1);
      let list = item;
      this.stockBatch.stockBatchData = [...list];
    }
 }

 addStockBatch(stockBatch){
   console.log(this.stockBatch)
  this.formSubmitted = true;
    if (stockBatch.valid) {
      this.stockBatchService.addStockBatch(this.stockBatch).subscribe(
        data => {
          if (data['success']) {
            this.route.navigate(["/pages/stock-batch"]);
            this.toastr.success(errorData.Add_Success)
          }
          else {
            this.toastr.error(errorData.Internal_Error)
          }
        },
        error => {
          this.toastr.error(errorData.Serever_Error)
        }
      )
    }
 }

 updateStockBatch(stockBatch){
  this.formSubmitted = true;
    if (stockBatch.valid) {
      this.stockBatchService.updateStockBatch(this.stockBatch).subscribe(
        data => {
          if (data['success']) {
            this.route.navigate(["/pages/stock-batch"]);
            this.toastr.success(errorData.Update_Success);
          }
        },
        error => {
          this.toastr.error(errorData.Update_Error);
        }
      )
    }
 }

 addNew(event){
   let item = this.blocks;
   let ob={
    batchNo:null,
   }
  console.log("called");
  item.push(ob)
  this.blocks=item;
  debugger
  document.getElementById("new").style.visibility='visible';
  const className = 'collapsible-panel--expanded';
    if (event.target.classList.contains(className)) {
        event.target.classList.remove(className);
    } else {
        event.target.classList.add(className);
    }
  }


}
