import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { elementAt, takeUntil } from "rxjs/operators";
import { FinishedMeterService } from "../../../@theme/services/finished-meter.service";
import { QualityService } from "../../../@theme/services/quality.service";
import { CommonService } from "../../../@theme/services/common.service";
import { StockBatchService } from "../../../@theme/services/stock-batch.service";
import { MergeBatchService } from "../../../@theme/services/merge-batch.service";
import { PartyService } from "../../../@theme/services/party.service";
import { cloneDeep, sortBy } from "lodash";

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
  public disableFields: boolean = false;
  public formSubmitted: boolean = false;
  public isDiffParty: boolean = false;
  public broker: string;
  public tempoNo: string;
  public diffPartyName: string;
  public diffPartyAddr: string;
  public diffPartyGst: string;
  public pattern = /^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;

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
    private partyService: PartyService
  ) {}

  ngOnInit(): void {
    this.userId = this.commonService.getUser().userId;
    this.userHeadId = this.commonService.getUserHeadId().userHeadId;
    this.getAllParty();
    this.getAllQuality();
  }

  //getAll party list
  getAllParty() {
    this.partyService
      .getAllPartyWithNameOnly()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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
    } else if(event == "view"){
      this.route.navigate(["/pages/stock-batch/return-lot/view"]);
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
    this.selectedBatch = event;
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

  geSelected(event) {
    this.selectedGRListTemp = [];
    this.selectedGRListTemp = event.selected;
  }

  onSelection() {
    this.selectedGRListTemp.forEach((element) => {
      if (!this.selectedGRList.filter((f) => f.id === element.id).length) {
        this.selectedGRList.push(cloneDeep(element));
      }
    });
    this.selectedGRList = sortBy(this.selectedGRList, "batchId");
    if (!this.selectedGRList.length) {
      this.disableFields = false;
    } else {
      this.disableFields = true;
    }
  }

  removeFromSelectedGr(id) {
    this.selectedGRList = this.selectedGRList.filter((f) => f.id !== id);
    this.selectedGRListTemp = this.selectedGRListTemp.filter(
      (f) => f.id !== id
    );
    if (!this.selectedGRList.length) {
      this.disableFields = false;
    } else {
      this.disableFields = true;
    }
  }

  saveReturnLot(saveAndPrint, myForm) {
    this.formSubmitted = true;
    if (this.selectedGRList.length && this.broker && this.tempoNo) {
      if(myForm.valid){
        this.loading = true;
      let obj = {
        broker: this.broker,
        tempoNo: this.tempoNo,
        createdBy: this.commonService.getUser().userId,
        batchDataList: [],
        diffDeliveryParty: this.isDiffParty,
        diffPartyName: this.diffPartyName,
        diffPartyAddress: this.diffPartyAddr,
        diffGst: this.diffPartyGst
      };
      obj.batchDataList = this.selectedGRList.map((m) => {
        return { id: m.id, controlId: m.controlId };
      });
      this.stockBatchService
        .returnLotPost(obj)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            if (res["success"]) {
              this.toastr.success(res["msg"]);
              this.resetForm(myForm);
              if (saveAndPrint) {
                this.route.navigate([
                  `pages/stock-batch/return-lot/print`],
                  { queryParams: { chlNo: res['data'] } },
                );
              }
            } else {
              this.toastr.error(res["msg"]);
            }
            this.loading = false;
          },
          (error) => {
            this.loading = false;
          }
        );
      }
    } else {
      this.toastr.error("Select atleast one GR-data to return");
    }
  }

  resetForm(myForm) {
    this.selectedGRList = [];
    this.selectedGRListTemp = [];
    this.batchList = [];
    this.selectedBatch = null;
    this.selectedParty = null;
    this.selectedQuality = null;
    this.grList = [];
    this.disableFields = false;
    this.formSubmitted = false;
    this.broker = null;
    this.tempoNo = null;
    this.diffPartyGst = null;
    this.diffPartyAddr = null;
    this.diffPartyName = null;
    this.isDiffParty = null;
    myForm.reset();
  }
}
