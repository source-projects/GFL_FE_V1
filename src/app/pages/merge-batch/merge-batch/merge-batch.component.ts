import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, ElementRef, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { PartyService } from "../../../@theme/services/party.service";
import { MergeBatch } from "../../../@theme/model/merge-batch";
import { QualityService } from "../../../@theme/services/quality.service";
import { StockBatchService } from "../../../@theme/services/stock-batch.service";
import { MergeBatchService } from "../../../@theme/services/merge-batch.service";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../@theme/services/common.service";

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
  public newBatchId = "";
  public loading: boolean = false;
  public showMergeBox: boolean = false;
  disable = false;
  user: any;
  userHead;
  currentId;
  currentMergeBatch;
  constructor(
    private toastr: ToastrService,
    private partyService: PartyService,
    private qualityService: QualityService,
    private stockBatchService: StockBatchService,
    private mergeBatchService: MergeBatchService,
    private commonService: CommonService,
    private _route: ActivatedRoute
  ) {
    this.filterDetails.push(this._clone(new MergeBatch()));
    this.filterDetails.push(this._clone(new MergeBatch()));
  }

  async ngOnInit() {
    this.getUserId();
    if (this.currentId) {
      this.getCurrentMergeBatchData();
      this.disable = true;
    }
    await this.getAllParties();
    for (let i = 1; i <= 3; i++) {
      this.addId(i);
    }
  }

  public getUserId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentId = this._route.snapshot.paramMap.get("id");
  }

  getCurrentMergeBatchData() {
    this.mergeBatchService.getMergeBatchById(this.currentId).subscribe(
      (data) => {
        if (data["success"]) {
          this.currentMergeBatch = data["data"];

          let partyId = this.currentMergeBatch.partyId.split(",");
          let qualityId = this.currentMergeBatch.qualityEntryId.split(",");
          let batchId = this.currentMergeBatch.batchId.split(",");

          partyId.forEach((element, i) => {
            this.filterDetails[i].partyId = Number(element);
            this.partySelected(element, i);
          });
          qualityId.forEach((element, i) => {
            this.filterDetails[i].qualityId = Number(element);
            this.qualitySelected(element, i);
          });

          batchId.forEach((element, i) => {
            this.filterDetails[i].batchId = Number(element);
            this.batchSelected(element, i);
          });
          this.showMergeBox = true;
          this.finalGrList = this.currentMergeBatch.batchDataList;
        }
      },
      (error) => {}
    );
  }

  _clone(obj): any {
    return JSON.parse(JSON.stringify(obj));
  }

  addId(i) {
    this.DROP_LIST_IDS.push("cdk-drop-list-" + i);
  }

  getAllParties() {
    this.partyList = [];
    this.partyService.getAllPartyList(0, "all").subscribe((data) => {
      if (data["success"]) {
        this.partyList = data["data"];
      }
    });
  }

  partySelected(event, i) {
    //get quality by party
    this.filterDetails[i].qualityList = [];
    this.filterDetails[i].qualityId = null;
    this.filterDetails[i].batchId = null;
    if (event) {
      this.qualityService
        .getQualityByParty(this.filterDetails[i].partyId)
        .subscribe((data) => {
          if (data["success"]) {
            this.filterDetails[i].qualityList = data["data"]["qualityDataList"];
          }
        });
    }
    if (this.refreshCount > 10) {
      this.refreshCount = 0;
    } else {
      this.refreshCount++;
    }
  }

  qualitySelected(event, i) {
    // get batch list by party
    this.filterDetails[i].batchList = [];
    this.filterDetails[i].batchId = null;
    if (event) {
      this.mergeBatchService
        .getBatchesByPartyQuality(
          this.filterDetails[i].qualityId,
          this.filterDetails[i].partyId
        )
        .subscribe((data) => {
          if (data["success"]) {
            this.filterDetails[i].batchList = data["data"];
          }
        });
    }
    if (this.refreshCount > 10) {
      this.refreshCount = 0;
    } else {
      this.refreshCount++;
    }
  }

  addRemoveThirdFilterDetail(isAdd) {
    if (isAdd) {
      this.filterDetails.push(this._clone(new MergeBatch()));
    } else {
      this.filterDetails.splice(this.filterDetails.length - 1, 1);
    }
  }

  batchSelected(event, i) {
    this.enableMergeBox();
    this.filterDetails[i].grList = [];
    if (event) {
      // let stockId = 0;
      // this.filterDetails[i].batchList.forEach((element) => {
      //   if (element.batchId == this.filterDetails[i].batchId) {
      //     stockId = element.controlId;
      //   }
      // });
      this.stockBatchService
        .getBatchGRById(this.filterDetails[i].batchId)
        .subscribe((data) => {
          if (data["success"]) {
            this.filterDetails[i].grList = data["data"];
          }
        });
    } else {
      this.filterDetails.forEach((element, i1) => {
        if (element.batchId) {
          this.batchSelected(element.batchId, i1);
        }
      });
    }
    if (this.refreshCount > 10) {
      this.refreshCount = 0;
    } else {
      this.refreshCount++;
    }
    // this.finalGrList = [];
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

  enableMergeBox() {
    let count = 0;
    this.filterDetails.forEach((element) => {
      if (element.batchId) count++;
    });
    if (count > 1) {
      this.showMergeBox = true;
    } else {
      this.showMergeBox = false;
    }
  }

  saveMergedBatch(myForm) {
    this.loading = true;
    if (this.finalGrList && this.finalGrList.length) {
      //check if more than 1 batches are selected
      let count = 0;
      this.filterDetails.forEach((element) => {
        if (element.batchId) count++;
      });

      if (count > 1) {
        //get Batch Sequence for new batchId...
        if (!this.currentId) {
          this.stockBatchService.getBatchSequence(true).subscribe((data) => {
            if (data["success"]) {
              this.newBatchId = data["data"]["sequence"];
            }
          });
        }
        setTimeout(() => {
          //save merged batches....
          if (!this.currentId) {
            this.mergeBatchService
              .saveMergedBatch({
                mergeBatchId: this.newBatchId,
                batchDataList: this.finalGrList,
              })
              .subscribe(
                (data) => {
                  if (data["success"]) {
                    this.toastr.success(data["msg"]);
                    this.loading = false;
                    this.showMergeBox = false;
                    this.resetForm(myForm);
                  }
                  this.loading = false;
                },
                (error) => {
                  this.loading = false;
                }
              );
          } else {
            this.mergeBatchService
              .updateMergeBatch({
                mergeBatchId: this.currentMergeBatch.mergeBatchId,
                batchDataList: this.finalGrList,
              })
              .subscribe(
                (data) => {
                  if (data["success"]) {
                    this.toastr.success(data["msg"]);
                    this.loading = false;
                    this.showMergeBox = false;
                    this.resetForm(myForm);
                  }
                  this.loading = false;
                },
                (error) => {
                  this.loading = false;
                }
              );
          }
        }, 1000);
      } else {
        this.toastr.error("Please select another batch to merge");
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }

  resetForm(myForm) {
    this.finalGrList = [];
    myForm.reset();
    this.filterDetails = [];
    this.filterDetails.push(this._clone(new MergeBatch()));
    this.filterDetails.push(this._clone(new MergeBatch()));
    this.showMergeBox = false;
  }

  crossClick(item, i) {
    this.finalGrList.splice(i, 1);
    this.filterDetails.forEach((element) => {
      if (element.batchId == item.batchId) {
        element.grList = [...element.grList, item];
      }
    });
  }

  updateMergedBatch(form) {
    this.saveMergedBatch(form);
  }
}
