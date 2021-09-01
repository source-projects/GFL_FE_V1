import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import * as errorData from "../../../@theme/json/error.json";
import { BatchData, FinishedMeter } from "../../../@theme/model/finished-meter";
import { CommonService } from "../../../@theme/services/common.service";
import { FinishedMeterService } from "../../../@theme/services/finished-meter.service";
import { PartyService } from "../../../@theme/services/party.service";
import { QualityService } from "../../../@theme/services/quality.service";
import { ToastrService } from "ngx-toastr";
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../../../@theme/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: "ngx-add-edit-finished-meter",
  templateUrl: "./add-edit-finished-meter.component.html",
  styleUrls: ["./add-edit-finished-meter.component.scss"],
})
export class AddEditFinishedMeterComponent implements OnInit, OnDestroy {
  public errorData: any = (errorData as any).default;
  currentFinishedMeter;
  user;
  formSubmitted = false;
  public isAddButtonClicked: boolean = false;
  public isMergeBatch: boolean = false;
  userHead;
  masterList;
  partyList;
  batchList;
  qualityList;
  index: string;
  indexOfBatchData: number = 1;
  sequenceArray: Array<number> = [];
  public totalFinishMeter: number = 0;
  public totalGrMeter: number = 0;
  public totalWeight:number = 0;
  public selectedBatch: string = "";
  public searchBatchString: string = "";
  public batchListCopy: Array<any> = [];

  finishedMeterForm: FinishedMeter = new FinishedMeter();

  public destroy$: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private commonService: CommonService,
    private partyService: PartyService,
    private qualityService: QualityService,
    private toastr: ToastrService,
    private finishedMeterService: FinishedMeterService,
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.getData();
    this.getAllParty();
    this.getAllQuality();
    this.getAllMasters();
    this.getAllBatchForFinishMtr();
  }

  //resetForm..
  resetAll(myForm) {
    this.batchList = [];
    this.batchListCopy = [];
    this.getAllBatchForFinishMtr();
    this.finishedMeterForm.batchId = null;
    myForm.reset();
  }

  //get userId and userHeadId of logged in user and get current finishedMeter id from url
  getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
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

  //getAll quality list
  getAllQuality() {
    this.qualityService.getAllQualityWithNameOnly().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"];
        } //else this.toastr.error(data["msg"]);
      },
      (error) => {
        //this.toastr.error(errorData.Internal_Error);
      }
    );
  }

  //getAll master list
  getAllMasters() {
    this.finishedMeterService.getAllUserHeads().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.masterList = data["data"];
        } //else this.toastr.error(data["msg"]);
      },
      (error) => {
        //this.toastr.error(errorData.Internal_Error);
      }
    );
  }

  getAllBatchForFinishMtr() {
    this.finishedMeterService.getAllBatchForFinishMeter().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.batchList = data["data"];
          this.batchListCopy = data["data"];
        } //else this.toastr.error(data["msg"]);
      },
      (error) => {
        //this.toastr.error(errorData.Internal_Error);
      }
    );
  }

  //Party change event | get quality by partyId
  enableQuality(event) {
    this.qualityList = null;
    this.finishedMeterForm.qualityId = null;
    if (event != undefined) {
      this.finishedMeterService
        .getAllQualityByParty(this.finishedMeterForm.partyId)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.qualityList = data["data"].qualityDataList;
              this.qualityList.forEach((element) => {
                element.partyName = data["data"].partyName;
                element.partyId = data["data"].partyId;
              });
            } else this.toastr.error(data["msg"]);
          },
          (error) => {
            this.toastr.error(errorData.Internal_Error);
          }
        );

      //clear master list
      this.finishedMeterForm.masterId = null;
    } else {
      this.batchList = [];
      this.batchListCopy = [];
      this.getAllBatchForFinishMtr();
      this.getAllParty();
      this.getAllQuality();
    }
  }

  filterBySearchBatches() {
    this.finishedMeterForm.batchId = null;
    this.batchList = this.batchListCopy.filter(f => f.batchId.toString().includes(this.searchBatchString));
  }

  //get batch data from batchId...
  batchSelected(event) {
    if (event) {
      if (event.target.value.toString().indexOf("-") > -1) {
        this.isMergeBatch = true;
      } else {
        this.isMergeBatch = false;
      }
      let controlId: string;
      this.finishedMeterForm.batchId = event.target.value;
      this.batchList.forEach((b) => {
        if (this.finishedMeterForm.batchId == b.batchId) {
          controlId = b.controlId;
          if (this.finishedMeterForm.masterId) {
            //set party and quality according to batch
            this.finishedMeterForm.partyId = b.partyId;
            this.finishedMeterForm.qualityId = b.qualityEntryId;
          }
        }
      });

      this.finishedMeterService
        .getBatchDataBybatchNo(this.finishedMeterForm.batchId, controlId)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.finishedMeterForm.batchData = data["data"];
              this.totalFinishMeter = 0;
              this.finishedMeterForm.batchData.forEach((e) => {
                this.totalFinishMeter += Number(e.finishMtr);
                if (e.mtr) e.sequenceId = e.id;
              });
              this.CalculateTotalGrMtr();
              this.setSequenceNo(false);
              this.setArrayOfSequence();
              this.setfinishedSequenceAccordingToIdReverse();
              this.setSequenceNo(false);
            } //else this.toastr.error(data["msg"]);
          },
          (error) => {
            // this.toastr.error(errorData.Internal_Error);
          }
        );
    }
  }

  //Quality change event
  qualitySelected(event) {
    if (event != undefined) {
      this.finishedMeterForm.batchId = null;
      this.batchList = null;
      this.batchListCopy = null;
      let pid;
      let qid;

      //set party from quality...
      if (!this.finishedMeterForm.partyId) {
        let obj = this.qualityList.find(
          (ob) => ob.id === this.finishedMeterForm.qualityId
        );
        this.finishedMeterForm.partyId = obj.partyId;
      }

      this.qualityList.forEach((e) => {
        let id = e.id ? e.id : e.qualityEntryId;
        if (id == this.finishedMeterForm.qualityId) {
          pid = e.partyId;
          qid = id;
        }
      });

      this.finishedMeterService.getBatchesByPartyQuality(qid, pid).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.batchList = data["data"];
            this.batchListCopy = data['data'];
          } //else this.toastr.error(data["msg"]);
        },
        (error) => {
          //this.toastr.error(errorData.Internal_Error);
        }
      );

      //clear master list
      this.finishedMeterForm.masterId = null;
    } else {
      this.finishedMeterForm.batchId = null;
      this.batchList = [];
      this.batchListCopy = [];
      this.getAllQuality();
    }
  }

  //Master change event | get party and quality by masterId and batch list by masterId
  masterSelected(event) {
    this.batchList = null;
    this.batchListCopy = null;
    this.finishedMeterForm.batchId = null;
    if (event != undefined) {
      this.qualityList.forEach((e) => {
        let id = e.id ? e.id : e.qualityEntryId;
        if (id == this.finishedMeterForm.qualityId)
          this.finishedMeterForm.partyId = e.partyId;
      });

      //get batch by masterId
      this.finishedMeterService
        .getBatchByMasterId(this.finishedMeterForm.masterId)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.batchList = data["data"];
              this.batchListCopy = data['data']
            } else this.toastr.error(data["msg"]);
          },
          (error) => { }
        );

      //clear party and quality
      this.finishedMeterForm.qualityId = null;
      this.finishedMeterForm.partyId = null;
    } else {
      this.getAllParty();
    }
  }

  numberOnly(evt) {
    // Only ASCII charactar in that range allowed
    var ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (ASCIICode == 46) return true;
    if (
      (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) ||
      ASCIICode == 69
    )
      return false;
    return true;
  }

  CalculateTotalGrMtr() {
    this.totalGrMeter = 0;
    this.totalWeight = 0;
    this.finishedMeterForm.batchData.forEach((element) => {
      this.totalGrMeter += Number(element.mtr ? element.mtr : 0);
      this.totalWeight += Number(element.wt ? element.wt : 0);
    });
  }

  onKeyUpMeter(e?, rowIndex?, colIndex?, colName?) {
    this.CalculateTotalGrMtr();
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13 && (colIndex == 2)) {
      if (this.finishedMeterForm.batchData.length > rowIndex + 1) {
        this.index = "batchData" + (rowIndex + 1) + "-" + colIndex;
        let interval = setInterval(() => {
          let field = document.getElementById(this.index) as any;
          if (field != null) {
            field.focus();
            field.select();
            clearInterval(interval);
            let objDiv = document.getElementById(this.index);
            if (objDiv) {
              objDiv.scrollIntoView(true)
            }
          }else{
            let objDiv = document.querySelector('datatable-scroller');
            if(objDiv){
              objDiv.scrollBy(0, 10)
            }
          }
        }, 10);
      }
    }
  }

  //On enter pressed -> check empty field, add new row
  onKeyUp(e?, rowIndex?, colIndex?, colName?) {
    //catculate total finish meter
    this.totalFinishMeter = 0;
    this.finishedMeterForm.batchData.forEach((element) => {
      let b = 0;
      let a = element.finishMtr.toString();
      if (a.indexOf("+") > -1) {
        let mtrs = a.split("+");
        for (let i of mtrs) {
          b += Number(i);
        }
      }
      this.totalFinishMeter += Number(b ? b : a);
    });

    if (e && rowIndex > -1 && colIndex > -1 && colName) {
      var keyCode = e.keyCode ? e.keyCode : e.which;
      if (keyCode == 13 && (colIndex == 3 || colIndex == 4)) {
        this.index = "batchData" + (rowIndex + 1) + "-" + colIndex;
        let interval = setInterval(() => {
          let field = document.getElementById(this.index) as any;
          if (field != null) {
            field.focus();
            field.select();
            clearInterval(interval);
            let objDiv = document.getElementById(this.index);
            if (objDiv) {
              objDiv.scrollIntoView(true)
            }
          }else{
            let objDiv = document.querySelector('datatable-scroller');
            if(objDiv){
              objDiv.scrollBy(0, 10)
            }
          }
        }, 10);
      }
    }
  }

  //Remove meter data row from batchData list
  removeMeter(event, rowIndex) {
    let idCount = this.finishedMeterForm.batchData.length;
    let item = this.finishedMeterForm.batchData;
    if (idCount == 1) {
      let obj = new BatchData();
      obj.batchId = this.finishedMeterForm.batchData[0].batchId;
      obj.controlId = this.finishedMeterForm.batchData[0].controlId;
      let list = [{ ...obj }];
      this.finishedMeterForm.batchData = [...list];
    } else {
      let removed = item.splice(rowIndex, 1);
      let list = item;
      this.finishedMeterForm.batchData = [...list];
    }
    //re calculate total finish meter.
    this.onKeyUp();
    this.CalculateTotalGrMtr();
  }

  arrangeAllSequenceNo() {
    this.finishedMeterForm.batchData.forEach((element) => {
      if (element.sequenceId != element.seqNo) {
        element.sequenceId = element.seqNo;
      }
    });
  }

  splitExtraMeters() {
    this.finishedMeterForm.batchData.forEach((element) => {
      if (element.finishMtr.toString().indexOf("+") > -1) {
        let mtrs = element.finishMtr.split("+");
        for (let i = 0; i < mtrs.length; i++) {
          if (i == 0) {
            element.finishMtr = mtrs[i];
          } else {
            //if (!element.isExtra) {
            let obj = new BatchData();
            obj.sequenceId = element.sequenceId;
            obj.batchId = element.batchId;
            obj.controlId = element.controlId;
            obj.finishMtr = mtrs[i];
            obj.isExtra = true;
            obj.mtr = element.mtr;
            obj.mergeBatchId = element.mergeBatchId;
            let list = [...this.finishedMeterForm.batchData];
            list.push(obj);
            this.finishedMeterForm.batchData = [...list];
            // }
          }
        }
      }
    });
  }

  //Add finished Meter data
  addFinishedMeter(myForm) {
    this.isAddButtonClicked = true;
    let isFinishMtrflag = false;

    this.finishedMeterForm.batchData.forEach((b) => {
      if (b.finishMtr == null) {
        isFinishMtrflag = true;
      }
    });
    if (isFinishMtrflag == false) {
      let f = false;
      this.finishedMeterForm.batchData.forEach((e) => {
        if (!e.mtr || e.mtr)
          if ((!e.finishMtr || e.finishMtr <= "0") && e.sequenceId) f = true;
      });
      if (f) {
        this.isAddButtonClicked = false;
        this.toastr.error("Please fill sequence id and finish meter both.");
      } else {
        let count = 0;
        this.finishedMeterForm.batchData.forEach((e) => {
          if (
            e.id == 0 &&
            (e.mtr == null || e.mtr == 0) &&
            (e.finishMtr == "0" ||
              e.finishMtr == null ||
              Number(e.finishMtr) <= 0)
          ) {
            this.finishedMeterForm.batchData.splice(count, 1);
          }
          count++;
        });

        let allSequenceValid = true;
        this.setfinishedSequenceAccordingToId();
        this.finishedMeterForm.batchData.forEach((e) => {
          let isIdValid = this.finishedMeterForm.batchData.some(
            (ob) => ob.id === e.sequenceId
          );
          if (!isIdValid) allSequenceValid = false;
        });
        if (allSequenceValid) {
          //split extra meters....
          this.splitExtraMeters();

          this.finishedMeterService
            .addFinishedMeter(this.finishedMeterForm.batchData)
            .pipe(takeUntil(this.destroy$)).subscribe(
              (data) => {
                if (data["success"]) {
                  this.toastr.success(data["msg"]);
                  myForm.reset();
                  this.batchList = null;
                  this.batchListCopy = null;
                  this.isAddButtonClicked = false;
                  this.finishedMeterForm = new FinishedMeter();
                  this.finishedMeterForm.batchData = null;
                  this.totalFinishMeter = 0;
                  this.getAllBatchForFinishMtr();
                } else {
                  this.isAddButtonClicked = false;
                  this.toastr.error(data["msg"]);
                  this.setSequenceNo(false);
                }
              },
              (error) => {
                this.isAddButtonClicked = false;
                this.toastr.error(errorData.Internal_Error);
                this.setSequenceNo(false);
              }
            );
        } else {
          this.isAddButtonClicked = false;
          this.toastr.error("Invalid sequence-id entered");
          this.setfinishedSequenceAccordingToIdReverse();
        }
      }
    } else {
      this.isAddButtonClicked = false;
      this.toastr.error("Enter all data");
    }
  }

  setArrayOfSequence() {
    for (let i = 0; i < this.indexOfBatchData - 1; i++) {
      if (this.finishedMeterForm.batchData[i].mtr)
        this.sequenceArray[i] = this.finishedMeterForm.batchData[i].id;
    }
  }

  //for add
  setfinishedSequenceAccordingToId() {
    this.finishedMeterForm.batchData.forEach((e) => {
      e.sequenceId = this.sequenceArray[e.sequenceId - 1];
    });
  }

  //for update
  setfinishedSequenceAccordingToIdReverse() {
    this.finishedMeterForm.batchData.forEach((e) => {
      e.sequenceId = this.sequenceArray.indexOf(e.sequenceId) + 1;
    });
  }

  setSequenceNo(isFirstTime) {
    this.indexOfBatchData = 1;
    this.finishedMeterForm.batchData.forEach((e) => {
      e.seqNo = this.indexOfBatchData;
      this.indexOfBatchData++;
      if (isFirstTime) e.sequenceId = e.id;
    });
  }

  remove(batch){
    const modelRef = this.modalService.open(ConfirmationDialogComponent);
    modelRef.result
      .then((result) => {
        if (result) {
          this.finishedMeterService.removeBatch(batch.productionId).pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              this.finishedMeterForm.batchId = null;
              this.toastr.success(errorData.Delete);
              this.getAllBatchForFinishMtr();
            },
            (error) => {
              this.toastr.error(errorData.Serever_Error);
            }
          );
        }
      })
  }
}
