import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FinishedMeter } from "app/@theme/model/finished-meter";
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from "app/@theme/services/party.service";
import { QualityService } from "app/@theme/services/quality.service";
import { FinishedMeterService } from "app/@theme/services/finished-meter.service";
import { ToastrService } from "ngx-toastr";
import * as errorData from "app/@theme/json/error.json";

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
  index;
  finishedMeterForm: FinishedMeter = new FinishedMeter();

  constructor(
    private commonService: CommonService,
    private route: Router,
    private partyService: PartyService,
    private qualityService: QualityService,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private finishedMeterService: FinishedMeterService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getAllParty();
    this.getAllQuality();
    this.getAllMasters();
    this.getAllBatches();
  }

  //get userId and userHeadId of logged in user and get current finishedMeter id from url
  getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentFinishedMeter = this._route.snapshot.paramMap.get("id");
    if (this.currentFinishedMeter != null) this.getUpdateData();
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

  //G4getAll batch list
  getAllBatches() {}

  //get finished meter data for edit
  getUpdateData() {}

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
      this.getAllQuality();
    }
  }

  //get batch data from batchId...
  batchSelected(event) {
    let batchId: string;
    this.batchList.forEach((b) => {
      if (this.finishedMeterForm.batchId == b.controlId) batchId = b.batchId;
    });

    this.finishedMeterService
      .getBatchDataBybatchNo(batchId, this.finishedMeterForm.batchId)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.finishedMeterForm.batchData = data["data"];
            this.finishedMeterForm.batchData.push({
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
        (error) => {}
      );
  }

  //Quality change event
  qualitySelected(event) {
    if (event != undefined) {
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
      this.getAllQuality();
    }
  }

  //Master change event | get party and quality by masterId and batch list by masterId
  masterSelected(event) {
    this.batchList = null;
    this.finishedMeterForm.batchId = null;
    if (event != undefined) {
      this.finishedMeterService
        .getPartyQualityByMaster(this.finishedMeterForm.masterId)
        .subscribe(
          (data) => {
            if (data["success"]) {
              //Parties....
              data["data"].forEach((e) => {
                this.partyList.id = e.partyId;
                this.partyList.partyName = e.partyName;
              });

              //Qualities....
              this.qualityList = null;
              data["data"].forEach((e) => {
                this.qualityList += e.qualityDataList;
              });
            } else this.toastr.error(data["msg"]);
          },
          (error) => {
            this.toastr.error(errorData.Internal_Error);
          }
        );
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
    }
  }

  //On enter pressed -> check empty field, add new row
  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13 && colIndex == 3) {
      this.index = "batchList" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.finishedMeterForm.batchData.length - 1) {
        let item = this.finishedMeterForm.batchData[rowIndex];
        if (colName == "mtr") {
          if (!item.finishMtr) {
            this.toastr.show("Enter finish meter", "required");
            return;
          }

          let obj = {
            id: 0,
            mtr: null,
            wt: null,
            batchId: this.finishedMeterForm[0].batchId,
            controlId: this.finishedMeterForm[0].controlId,
            isProductionPlanned: false,
            isExtra: false,
            sequenceId: 0,
            finishMtr: 0,
            isBillGenrated: false,
          };
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
        } else {
          alert("go to any last row input to add new row");
        }
      }
    }
  }

  //Add finished Meter data
  addFinishedMeter(myForm) {
    //console.log(myForm.value);
    let flag1 = false;
    let flag2 = false;
    let totalMtr = 0;
    let totalFMtr = 0;
    this.finishedMeterForm.batchData.forEach((b) => {
      if (b.finishMtr == null) {
        flag1 = true;
      }
      if (
        b.id == 0 &&
        b.finishMtr > 0 &&
        (b.sequenceId == 0 || b.sequenceId == null)
      )
        flag2 = true;
      else {
        totalMtr += b.mtr;
        totalFMtr += b.finishMtr;
      }
    });
    if (flag1 == false) {
      if (totalMtr < totalFMtr)
        this.toastr.error("Finished meter is more than actual meter");
      else if (flag2) {
        this.toastr.error("Please enter sequence id for extra meter");
      } else {
        let count = 0;
        this.finishedMeterForm.batchData.forEach((e) => {
          if (e.id == 0 && e.mtr == null) {
            this.finishedMeterForm.batchData.splice(count, 1);
          }
          count++;
        });
        this.finishedMeterService
          .addFinishedMeter(this.finishedMeterForm.batchData)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.toastr.success(data["msg"]);
                this.route.navigate(["/pages/finishedMeter"]);
              } else this.toastr.error(data["msg"]);
            },
            (error) => {
              this.toastr.error(errorData.Internal_Error);
            }
          );
      }
    } else {
      this.toastr.error("Enter all data");
    }
  }

  //Update finished Meter data
  updateFinishedMeter() {}
}
