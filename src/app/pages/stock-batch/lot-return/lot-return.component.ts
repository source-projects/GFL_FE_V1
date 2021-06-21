import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { elementAt, takeUntil } from "rxjs/operators";
import { FinishedMeterService } from "../../../@theme/services/finished-meter.service";
import { QualityService } from "../../../@theme/services/quality.service";
import { CommonService } from "../../../@theme/services/common.service";
import { StockBatchService } from "../../../@theme/services/stock-batch.service";
import { MergeBatchService } from "../../../@theme/services/merge-batch.service";
import { PartyService } from "../../../@theme/services/party.service";
import { cloneDeep, sortBy } from 'lodash'

@Component({
  selector: "ngx-lot-return",
  templateUrl: "./lot-return.component.html",
  styleUrls: ["./lot-return.component.scss"],
})
export class LotReturnComponent implements OnInit {
  public loading = false;
  public selectedGRList = [];
  public selectedGRListTemp = [];
  public userId: number;
  public userHeadId: number;
  public partyList = [];
  public qualityList = [];
  public batchList = [];
  public grList = [];
  public selectedParty;
  public selectedQuality;
  public selectedBatch;

  public destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private toastr: ToastrService,
    private stockBatchService: StockBatchService,
    private mergeBatchService: MergeBatchService,
    private commonService: CommonService,
    private route: Router,
    private finishedMeterService: FinishedMeterService,
    private qualityService: QualityService,
    private partyService: PartyService,
  ) {}

  ngOnInit(): void {
    this.userId = this.commonService.getUser().userId;
    this.userHeadId = this.commonService.getUserHeadId().userHeadId;
    this.getAllParty();
    this.getAllQuality();
  }

  //getAll party list
  getAllParty() {
    this.partyService.getAllPartyWithNameOnly().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
        } //else this.toastr.error(data["msg"]);
      },
      (error) => {
        //this.toastr.error(errorData.Internal_Error);
      }
    );
  }

  selectionChanges(event) {
    if (event === "view table") {
      this.route.navigate(["/pages/stock-batch/view"]);
    } else if (event === "job card") {
      this.route.navigate(["/pages/stock-batch/view"]);
    } else if (event === "pending") {
      this.route.navigate(["/pages/stock-batch/pending"]);
    } else if (event == "add") {
      this.route.navigate(["/pages/stock-batch/pending"]);
    }
  }

  //Party change event | get quality by partyId
  enableQuality(event) {
    this.qualityList = null;
    this.selectedQuality = null;
    if (event != undefined) {
      this.finishedMeterService
        .getAllQualityByParty(this.selectedParty)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            if (data["success"]) {
              this.qualityList = data["data"].qualityDataList;
              this.qualityList.forEach((element) => {
                element.partyName = data["data"].partyName;
                element.partyId = data["data"].partyId;
              });
            } else this.toastr.error(data["msg"]);
          },
          (error) => {}
        );
    } else {
      this.batchList = [];
      this.grList = [];
      this.getAllQuality();
    }
  }

  getAllBatchByQuality() {
    this.batchList = [];
    this.mergeBatchService
      .getBatchesByPartyQuality(this.selectedQuality, this.selectedParty)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          if (res["success"]) {
            this.batchList = res["data"];
          }
        },
        (error) => {}
      );
  }

  //getAll quality list
  getAllQuality() {
    this.qualityService
      .getAllQualityWithNameOnly()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.qualityList = data["data"];
          }
        },
        (error) => {}
      );
  }

  //Quality change event
  qualitySelected(event) {
    if (event != undefined) {
      this.selectedBatch = null;
      this.batchList = [];
      let pid;
      let qid;

      //set party from quality...
      if (!this.selectedParty) {
        let obj = this.qualityList.find((ob) => ob.id === this.selectedQuality);
        this.selectedParty = obj.partyId;
      }

      this.qualityList.forEach((e) => {
        let id = e.id ? e.id : e.qualityEntryId;
        if (id == this.selectedQuality) {
          pid = e.partyId;
          qid = id;
        }
      });

      this.getAllBatchByQuality();
    } else {
      this.selectedBatch = null;
      this.batchList = [];
      this.grList = [];
      this.getAllQuality();
    }
  }

  batchSelected(event) {
    this.selectedBatch=event;
    this.grList = [];
    this.stockBatchService
      .getBatchGRById(this.selectedBatch)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data["success"]) {
          this.grList = data["data"];
        }
      });
  }

  geSelected(event){
    this.selectedGRListTemp = [];
    this.selectedGRListTemp = event.selected
  }

  onSelection(){
    this.selectedGRListTemp.forEach(element => {
      if(!this.selectedGRList.filter(f => f.id === element.id).length){
        this.selectedGRList.push(cloneDeep(element));
      } 
    });
    this.selectedGRList = sortBy(this.selectedGRList, 'batchId')
  }

  removeFromSelectedGr(id){
    this.selectedGRList = this.selectedGRList.filter(f=> f.id !== id);
  }

  saveReturnLot(){
    if(this.selectedGRList.length){
      this.loading = true;
      let obj = {
        batchDataList: []
      }
      obj.batchDataList = this.selectedGRList.map(m => { return {id: m.id, controlId: m.controlId} });
      this.stockBatchService.returnLotPost(obj).pipe(takeUntil(this.destroy$)).subscribe(
        res=>{
          if(res['success']){
            this.toastr.success(res['msg']);
            this.resetForm();
          }else{
            this.toastr.error(res['msg']);
          }
          this.loading = false;
        }, error=>{
          this.loading = false;
        }
      )
    }else{
      this.toastr.error("Select atleast 1 gr-data to return")
    }
  }

  resetForm(){
    this.selectedGRList = [];
    this.selectedGRListTemp = [];
    this.batchList = [];
    this.qualityList = [];
    this.partyList = [];
    this.selectedBatch = null;
    this.selectedParty = null;
    this.selectedQuality = null;
    this.grList = [];
  }
}
