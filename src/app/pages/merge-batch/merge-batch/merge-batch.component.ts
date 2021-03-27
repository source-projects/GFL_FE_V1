import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { PartyService } from "../../../@theme/services/party.service";
import { MergeBatch } from "../../../@theme/model/merge-batch";
import { QualityService } from "../../../@theme/services/quality.service";
import { StockBatchService } from "../../../@theme/services/stock-batch.service";

@Component({
  selector: "ngx-merge-batch",
  templateUrl: "./merge-batch.component.html",
  styleUrls: ["./merge-batch.component.scss"],
})
export class MergeBatchComponent implements OnInit {
  public filterDetails: MergeBatch[] = [];
  public partyList: any[];
  public qualityList: any = [];
  public finalGrList: any = [];
  public DROP_LIST_IDS: any = [];
  public refreshCount = 0;

  constructor(
    private toastr: ToastrService,
    private partyService: PartyService,
    private qualityService: QualityService,
    private stockBatchService: StockBatchService
  ) {
    this.filterDetails.push(this._clone(new MergeBatch()));
    this.filterDetails.push(this._clone(new MergeBatch()));
  }

  async ngOnInit() {
    await this.getAllParties();
  }

  _clone(obj): any{
    return JSON.parse(JSON.stringify(obj));
  }

  addId(i) {
    this.DROP_LIST_IDS.push('cdk-drop-list-' + i);
    return i;
}

  getAllParties() {
    this.partyList = [];
    this.partyService.getAllPartyList(0, "all").subscribe((data) => {
      if (data["success"]) {
        this.partyList = data["data"];
      }
    });
  }

  partySelected(event, i) { //get quality by party
    this.filterDetails[i].qualityList = [];
    if (event) {
      this.qualityService
        .getQualityByParty(this.filterDetails[i].partyId)
        .subscribe((data) => {
          if (data["success"]) {
            this.filterDetails[i].qualityList = data["data"]["qualityDataList"];
          }
        });
    } else {
      this.filterDetails[i].qualityId = null;
    }
  }

  qualitySelected(event, i){ // get batch list by party
    this.filterDetails[i].batchList = [];
    if(event){
      this.stockBatchService.getBatchesByPartyQuality(this.filterDetails[i].qualityId, this.filterDetails[i].partyId).subscribe(
        data=>{
          if(data['success']){
            this.filterDetails[i].batchList = data['data'];
          }
        }
      )
    }else{
      this.filterDetails[i].batchId = null;
    }
    if(this.refreshCount > 10){
      this.refreshCount = 0;
    }else{
      this.refreshCount++;
    }
  }

  addRemoveThirdFilterDetail(isAdd){
    if(isAdd){
      this.filterDetails.push(this._clone(new MergeBatch()));
    }else{
      this.filterDetails.splice(this.filterDetails.length-1, 1);
    }
  }

  batchSelected($event, i){
    if(this.refreshCount > 10){
      this.refreshCount = 0;
    }else{
      this.refreshCount++;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
