import { Component, OnInit } from "@angular/core";
import { FinishedMeter } from "app/@theme/model/finished-meter";
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from "app/@theme/services/party.service";
import { QualityService } from "app/@theme/services/quality.service";
import { FinishedMeterService } from "app/@theme/services/finished-meter.service";
import { ToastrService } from "ngx-toastr";
import * as errorData from "app/@theme/json/error.json";
import { BatchData } from "app/@theme/model/finished-meter";

@Component({
  selector: "ngx-add-edit-finished-meter",
  templateUrl: "./add-edit-finished-meter.component.html",
  styleUrls: ["./add-edit-finished-meter.component.scss"],
})
export class AddEditFinishedMeterComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  currentFinishedMeter;
  user;
  formSubmitted = false;
  userHead;
  masterList;
  partyList;
  batchList;
  qualityList;
  index: string;
  indexOfBatchData:number = 1;
  sequenceArray :Array<number> = [];

  finishedMeterForm: FinishedMeter = new FinishedMeter();

  constructor(
    private commonService: CommonService,
    private partyService: PartyService,
    private qualityService: QualityService,
    private toastr: ToastrService,
    private finishedMeterService: FinishedMeterService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getAllParty();
    this.getAllQuality();
    this.getAllMasters();
  }

  //resetForm..
  resetAll(myForm){
    this.batchList = null;
    myForm.reset();
  }

  //get userId and userHeadId of logged in user and get current finishedMeter id from url
  getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
  }

  //getAll party list
  getAllParty() {
    this.partyService.getAllPartyWithNameOnly().subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
        } else this.toastr.error(data["msg"]);
      },
      (error) => {
        this.toastr.error(errorData.Internal_Error);
      }
    );
  }

  //getAll quality list
  getAllQuality() {
    this.qualityService.getAllQualityWithNameOnly().subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"];
        } else this.toastr.error(data["msg"]);
      },
      (error) => {
        this.toastr.error(errorData.Internal_Error);
      }
    );
  }

  //getAll master list
  getAllMasters() {
    this.finishedMeterService.getAllUserHeads().subscribe(
      (data) => {
        if (data["success"]) {
          this.masterList = data["data"];
        } else this.toastr.error(data["msg"]);
      },
      (error) => {
        this.toastr.error(errorData.Internal_Error);
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
          (error) => {
            this.toastr.error(errorData.Internal_Error);
          }
        );
    } else {
      this.batchList = null;
      this.getAllParty();
      this.getAllQuality();
    }
  }

  //get batch data from batchId...
  batchSelected(event) {
    let controlId: string;
    this.batchList.forEach((b) => {
      if (this.finishedMeterForm.batchId == b.batchId) {
        controlId = b.controlId;
        //set party and quality according to batch
        this.finishedMeterForm.partyId = b.partyId;
        this.finishedMeterForm.qualityId = b.qualityEntryId;
      }
    });

    this.finishedMeterService
      .getBatchDataBybatchNo(this.finishedMeterForm.batchId, controlId)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.finishedMeterForm.batchData = data["data"];
            this.setSequenceNo();
            this.setArrayOfSequence();
            this.setfinishedSequenceAccordingToIdReverse();
            this.finishedMeterForm.batchData.push({
              seqNo: this.indexOfBatchData,
              id: 0,
              mtr: null,
              wt: null,
              batchId: data["data"][0].batchId,
              controlId: data["data"][0].controlId,
              isProductionPlanned: false,
              isExtra: false,
              sequenceId: 0,
              finishMtr: 0,
              isBillGenrated: false,
            });
            
          } else this.toastr.error(data["msg"]);
        },
        (error) => {
          this.toastr.error(errorData.Internal_Error);
        }
      );
  }

  //Quality change event
  qualitySelected(event) {
    if (event != undefined) {
      this.finishedMeterForm.batchId = null;
      this.batchList = null;
      let pid;
      let qid;
      this.qualityList.forEach((e) => {
        if (
          e.id ? e.id : e.qualityEntryId == this.finishedMeterForm.qualityId
        ) {
          pid = e.partyId;
          qid = e.id ? e.id : e.qualityEntryId;
        }
      });

      this.finishedMeterService.getBatchesByPartyQuality(qid, pid).subscribe(
        (data) => {
          if (data["success"]) {
            this.batchList = data["data"];
          } else this.toastr.error(data["msg"]);
        },
        (error) => {
          this.toastr.error(errorData.Internal_Error);
        }
      );
    } else {
      this.finishedMeterForm.batchId = null;
      this.batchList = null;
      this.getAllQuality();
    }
  }

  //Master change event | get party and quality by masterId and batch list by masterId
  masterSelected(event) {
    this.batchList = null;
    this.finishedMeterForm.batchId = null;
    if (event != undefined) {
      this.qualityList.forEach(e => {
        let id = e.id?e.id:e.qualityEntryId
        if(id == this.finishedMeterForm.qualityId)
          this.finishedMeterForm.partyId = e.partyId
      });

      //get batch by masterId
      this.finishedMeterService
        .getBatchByMasterId(this.finishedMeterForm.masterId)
        .subscribe(
          (data) => {
            if (data["success"]) {
              this.batchList = data["data"];
            } else this.toastr.error(data["msg"]);
          },
          (error) => {}
        );
    } else {
      this.getAllParty();
    }
  }

  //On enter pressed -> check empty field, add new row
  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13 && (colIndex == 3 || colIndex == 4)) {
      this.index = "batchData" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.finishedMeterForm.batchData.length - 1) {
        let item = this.finishedMeterForm.batchData[rowIndex];
        if (colName == "fMeter") {
          if (!item.finishMtr) {
            this.toastr.error("Enter finish meter and sequence to add new row");
            return;
          }
        }else if (colName == "sequence") {
          if (!item.finishMtr) {
            this.toastr.error("Enter finish meter and sequence to add new row");
            return;
          }
        }
          let obj = new BatchData();
          obj.seqNo = this.indexOfBatchData+1;
          obj.batchId = this.finishedMeterForm.batchData[0].batchId;
          obj.controlId = this.finishedMeterForm.batchData[0].controlId;
          let list = this.finishedMeterForm.batchData;
          list.push(obj);
          this.finishedMeterForm.batchData = [...list];
          let interval = setInterval(() => {
            let field = document.getElementById(this.index);
            if (field != null) {
              field.focus();
              clearInterval(interval);
            }
          }, 10);
          this.setSequenceNo();
        }
      } else {
        this.toastr.error("Go to any last row input to add new row");
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
        let list = [{...obj}];
        this.finishedMeterForm.batchData = [...list];
      } else if (idCount - 1 == rowIndex) {
        this.toastr.error("You can't remove last row");
      } else {
        let removed = item.splice(rowIndex, 1);
        let list = item;
        this.finishedMeterForm.batchData = [...list];
        this.sequenceArray.splice(rowIndex,1)
      }
    this.setSequenceNo();
  }

  //Add finished Meter data
  addFinishedMeter(myForm) {
    let isFinishMtrflag = false;
    let isSeqIdForExtraflag2 = false;
    let totalMtr = 0;
    let totalFMtr = 0;
    this.finishedMeterForm.batchData.forEach((b) => {
      if (b.finishMtr == null) {
        isFinishMtrflag = true;
      }
      if (
        b.id == 0 &&
        b.finishMtr > 0 &&
        (b.sequenceId == 0 || b.sequenceId == null)
      )
      isSeqIdForExtraflag2 = true;
      else {
        totalMtr += b.mtr;
        totalFMtr += b.finishMtr;
      }
    });
    if (isFinishMtrflag == false) {
      if (isSeqIdForExtraflag2) {
        this.toastr.error("Please enter sequence id for extra meter");
      } else {
        let f = false;
        this.finishedMeterForm.batchData.forEach((e) => {
          if ( ((e.finishMtr != 0 || e.finishMtr == null) && !e.sequenceId) || (!e.finishMtr && (e.sequenceId != 0 || e.sequenceId == null) ))
            f = true;
        });
        if (f) {
          this.toastr.error("Please fill sequence id and finish meter both.");
        } else {
          let count = 0;
          this.finishedMeterForm.batchData.forEach((e) => {
            if (
              e.id == 0 &&
              e.mtr == null &&
              (e.finishMtr == 0 || e.finishMtr == null)
            ) {
              this.finishedMeterForm.batchData.splice(count, 1);
            }
            count++;
          });

          this.setfinishedSequenceAccordingToId();
          
          this.finishedMeterService
            .addFinishedMeter(this.finishedMeterForm.batchData)
            .subscribe(
              (data) => {
                if (data["success"]) {
                  this.toastr.success(data["msg"]);
                  myForm.reset();
                  this.batchList = null;
                  this.finishedMeterForm.batchData = null;
                } else{
                  this.toastr.error(data["msg"]);
                  this.setSequenceNo();
                } 
              },
              (error) => {
                this.toastr.error(errorData.Internal_Error);
                this.setSequenceNo();
              }
            );
        }
      }
    } else {
      this.toastr.error("Enter all data");
    }
  }

  setArrayOfSequence(){
    for(let i = 0; i< this.indexOfBatchData-1; i++){
      this.sequenceArray[i] = this.finishedMeterForm.batchData[i].id
    }
  }

  //for add
  setfinishedSequenceAccordingToId(){
    this.finishedMeterForm.batchData.forEach(e => {
      e.sequenceId = this.sequenceArray[e.sequenceId-1]
    });
  }

  //for update
  setfinishedSequenceAccordingToIdReverse(){
    this.finishedMeterForm.batchData.forEach(e => {
      e.sequenceId = this.sequenceArray.indexOf(e.sequenceId)+1
    });
  }

  setSequenceNo(){
    this.indexOfBatchData = 1
    this.finishedMeterForm.batchData.forEach(e=>{
      e.seqNo = this.indexOfBatchData
      this.indexOfBatchData++;
    })
  }
}
