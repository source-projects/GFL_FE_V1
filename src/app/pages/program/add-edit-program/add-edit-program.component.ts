import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from 'app/@theme/services/party.service';
import { QualityService } from 'app/@theme/services/quality.service';
import { Program, ProgramRecords } from 'app/@theme/model/program';
import { ToastrService } from 'ngx-toastr';
import * as errorData from 'app/@theme/json/error.json';
import { ProgramService } from 'app/@theme/services/program.service';
import { error } from 'console';
import { CommonService } from 'app/@theme/services/common.service';

@Component({
  selector: 'ngx-add-edit-program',
  templateUrl: './add-edit-program.component.html',
  styleUrls: ['./add-edit-program.component.scss']
})
export class AddEditProgramComponent implements OnInit {

  //programValues
  programRecordArray: ProgramRecords[] = [];
  programValues: Program = new Program();
  programRecord: ProgramRecords = new ProgramRecords();

  public errorData: any = (errorData as any).default;
  //form Validation
  formSubmitted: boolean = false;
  //for fatching dropdown list data
  party: any[];
  qualityList: any[];
  partyShade: any[];
  batchData: any[];
  stockData: any[];
  priorityData = [{ name: 'Very High' },
  { name: 'High' },
  { name: 'Medium' },
  { name: 'Low' }]
  //for knowing the row index
  index: any;
  currentProgramId: any;
  user: any;

  constructor(private partyService: PartyService,
    private _route: ActivatedRoute,
    private qualityService: QualityService,
    private programService: ProgramService,
    private route: Router,
    private commonService: CommonService,
    private toastr: ToastrService) {
    this.programRecordArray.push(this.programRecord);
    this.programValues.programRecords = this.programRecordArray;
  }

  ngOnInit(): void {
    this.getCurrentId();
    if (this.currentProgramId) {
      this.getUpdateData();
    }
    this.getPartyList();
    this.getQualityList();
    this.getPartyShadeList();
  }

  getCurrentId() {
    this.user = this.commonService.getUser();
    this.programValues.createdBy = this.user.userId;
    this.currentProgramId = this._route.snapshot.paramMap.get('id')
  }

  getPartyList() {
    this.partyService.getAllPartyList().subscribe(
      (data) => {
        if (data['success']) {
          this.party = data["data"];
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  public getQualityList() {
    this.qualityService.getallQuality().subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"];
        }
        else {
          this.toastr.error(data['msg']);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  public getPartyShadeList() {
    this.programService.getShadeDetail().subscribe(
      data => {
        if (data['success']) {
          this.partyShade = data['data'];
        }
        else {
          this.toastr.error(data['msg']);
        }
      },
      error => {
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }

  public getUpdateData() {
    if (this.currentProgramId != null) {
      console.log("update data")
      this.programService.getProgramDetailsById(this.currentProgramId).subscribe(
        data => {
          if (data['success']) {
            this.programValues = data['data'];
            this.qualityService.getallQuality().subscribe(
              data => {
                this.qualityList = data['data'];
                this.qualityList.forEach(element => {
                  if (this.programValues.qualityEntryId == element.id) {
                    this.programValues.qualityId = element.qualityId;
                    this.programValues.qualityName = element.qualityName;
                    this.programValues.qualityType = element.qualityType;
                  }
                });

                if (this.batchData == null) {
                  this.programService.getBatchDetailByQualityId(this.programValues.qualityEntryId).subscribe(
                    data => {
                      if (data['success']) {
                        this.batchData = data['data'];
                        console.log(this.batchData);
                      }
                      else {
                        this.toastr.error(data['msg']);
                      }
                    },
                    error => {
                      this.toastr.error(errorData.Serever_Error);
                    }
                  )
                }

                if (this.stockData == null) {
                  this.programService.getStockQualityList(this.programValues.qualityEntryId).subscribe(
                    data => {
                      if (data['success']) {
                        this.stockData = data['data'];
                        console.log(this.stockData);
                      }
                      else {
                        this.toastr.error(data['msg']);
                      }
                    },
                    error => {
                      this.toastr.error(errorData.Serever_Error);
                    }
                  )
                }
              },
              error => {
                this.toastr.error(errorData.Serever_Error);
              }
            )
          }
          else {
            this.toastr.error(data['msg']);
          }
        },
        error => {
          this.toastr.error(errorData.Serever_Error);
        }
      )
    }
  }

  //put quality name and quality type
  public getQualityInfo(value) {
    let id = value;
    this.programValues.qualityName = this.qualityList[id - 1].qualityName;
    this.programValues.qualityType = this.qualityList[id - 1].qualityType;
    this.programValues.qualityEntryId = this.qualityList[0].id;
    this.programService.getBatchDetailByQualityId(this.programValues.qualityEntryId).subscribe(
      data => {
        if (data['success']) {
          this.batchData = data['data'];
          console.log(this.batchData);
        }
        else {
          this.toastr.error(data['msg']);
        }
      },
      error => {
        this.toastr.error(errorData.Serever_Error);
      }
    )
    this.programService.getStockQualityList(this.programValues.qualityEntryId).subscribe(
      data => {
        if (data['success']) {
          this.stockData = data['data'];
          console.log(this.stockData);
        }
        else {
          this.toastr.error(data['msg']);
        }
      },
      error => {
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }

  public partyShadeNoSelected(rowIndex) {
    let id = this.programValues.programRecords[rowIndex].partyShadeNo;
    this.partyShade.forEach(element => {
      if (id == element.partyShadeNo) {
        this.programValues.programRecords[rowIndex].shadeNo = element.id
        this.programValues.programRecords[rowIndex].colourTone = element.colorTone;
      }
    });
  }

  public selectQualityId() {
    if (this.programValues.qualityId == null && (this.batchData == null || this.stockData == null)) {
      if (this.qualityList[0].quantityId == null) {
        this.toastr.warning(errorData.Add_quality_indicator);
      }
    }
  }

  public setQuantity(rowIndex, col, value) {
    if (value == 'batch') {
      let id = this.programValues.programRecords[rowIndex].branchId;
      this.batchData.forEach(element => {
        if (id == element.batchId) {
          this.programValues.programRecords[rowIndex].quantity = element.totalWt;
        }
      });
    }
    else {
      let id = this.programValues.programRecords[rowIndex].branchId;
      this.batchData.forEach(element => {
        if (id == element.batchId) {
          this.programValues.programRecords[rowIndex].quantity = element.qty;
        }
      });
    }
  }

  //On enter pressed -> check empty field, add new row
  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if (keyCode == 13) {
      this.index = "qualityList" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.programValues.programRecords.length - 1) {
        let item = this.programValues.programRecords[rowIndex];
        if (colName == 'partyShadeNo') {
          if (!item.partyShadeNo) {
            this.toastr.error("Enter Party Shade No", "Party shade No Field required");
            return;
          }
        } else if (colName == 'shade_no') {
          if (!item.shadeNo) {
            this.toastr.error("Select Shade No", "Shade No Field required");
            return;
          }
        } else if (colName == 'colour_tone') {
          if (!item.colourTone) {
            this.toastr.error("Enter Colour Tone", "Colour Tone Field required");
            return;
          }
        } else if (colName == 'quantity') {
          if (!item.quantity) {
            this.toastr.error("Enter quantity", "quantity Field required");
            return;
          }
        } else if (colName == 'batch') {
          if (!item.branchId) {
            this.toastr.error("Enter No. of Batch", "Batch Field required");
            return;
          }
        } else if (colName == 'stockId') {
          if (!item.stockId) {
            this.toastr.error("Enter Lot No", "Lot No Field required");
            return;
          }
        }
        let obj = {
          id: null,
          partyId: null,
          priority: null,
          programGivenBy: null,
          branchId: null,
          colourTone: null,
          stockId: null,
          partyShadeNo: null,
          quantity: null,
          remark: null,
          shadeNo: null,
          qualityId: null,
          qualityName: null,
          qualityType: null,
        };
        let list = this.programValues.programRecords;
        list.push(obj);
        this.programValues.programRecords = [...list];
        let interval = setInterval(() => {
          let field = document.getElementById(this.index)
          if (field != null) {
            field.focus()
            clearInterval(interval)
          }
        }, 500)
      } else {
        alert("Go to any last row input to add new row");
      }
    }
  }

  removeItem(id) {
    let idCount = this.programValues.programRecords.length
    let item = this.programValues.programRecords;
    if (idCount == 1) {
      item[0].partyShadeNo = null;
      item[0].shadeNo = null;
      item[0].colourTone = null;
      item[0].quantity = null;
      item[0].branchId = null;
      item[0].stockId = null;
      item[0].remark = null;
      let list = item;
      this.programValues.programRecords = [...list];
    }
    else {
      let removed = item.splice(id, 1);
      let list = item;
      this.programValues.programRecords = [...list];
    }
  }

  public addProgram(myForm) {
    this.formSubmitted = true
    if (myForm.valid) {
      delete this.programValues.qualityId;
      delete this.programValues.qualityName;
      delete this.programValues.qualityType;
      delete this.programValues.programRecords[0].branchId;
      delete this.programValues.programRecords[0].stockId;
      this.programService.saveProgram(this.programValues).subscribe(
        data => {
          if (data['success']) {
            this.route.navigate(["/pages/program"]);
            this.toastr.success(errorData.Add_Success);
          } else {
            this.toastr.error(errorData.Add_Error);
          }
        },
        error => {
          this.toastr.error(errorData.Serever_Error);
        }
      )
    }
    else {
      return
    }
  }

  public updateProgram(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      delete this.programValues.qualityId;
      delete this.programValues.qualityName;
      delete this.programValues.qualityType;
      delete this.programValues.programRecords[0].branchId;
      delete this.programValues.programRecords[0].stockId;
      this.programService.updateProgram(this.programValues).subscribe(
        data => {
          if (data['success']) {
            this.route.navigate(["/pages/program"]);
            this.toastr.success(errorData.Update_Success)
          } else {
            this.toastr.error(errorData.Update_Error);
          }
        },
        error => {
          this.toastr.error(errorData.Serever_Error);
        }
      )
    }
    else {
      return
    }
  }
}



