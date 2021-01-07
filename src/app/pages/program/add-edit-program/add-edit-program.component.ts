import { Component, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as errorData from "app/@theme/json/error.json";
import { Program, ProgramRecords } from "app/@theme/model/program";
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from "app/@theme/services/party.service";
import { ProgramService } from "app/@theme/services/program.service";
import { QualityService } from "app/@theme/services/quality.service";
import { StockBatchService } from 'app/@theme/services/stock-batch.service';
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-add-edit-program",
  templateUrl: "./add-edit-program.component.html",
  styleUrls: ["./add-edit-program.component.scss"],
})
export class AddEditProgramComponent implements OnInit {
  //programValues
  public loading = false;
  public disableButton = false;
  programRecordArray: ProgramRecords[] = [];
  programValues: Program = new Program();
  programRecord: ProgramRecords = new ProgramRecords();

  public errorData: any = (errorData as any).default;

  //form Validation
  formSubmitted: boolean = false;
  //for fatching dropdown list data
  pName:any;
  party: any[];
  qualityList: any[];
  partyShade: any[];
  batchData: any[];
  stockData: any[];
  masterList: any[];
  priorityData = [
    { name: "Very High" },
    { name: "High" },
    { name: "Medium" ,SELECTED: true},
    { name: "Low" },
  ];

  //for knowing the row index
  index: any;
  currentProgramId: any;
  user: any;
  list=[];
  userHead;
  allBatchData: any[];
  partyQuality:any[];
  constructor(
    private partyService: PartyService,
    private _route: ActivatedRoute,
    private qualityService: QualityService,
    private programService: ProgramService,
    private route: Router,
    private commonService: CommonService,
    private toastr: ToastrService,
    private stockBatchService: StockBatchService,
    private renderer: Renderer2
  ) {
    this.programRecordArray.push(this.programRecord);
    this.programValues.programRecords = this.programRecordArray;
  }

  ngOnInit(): void {
    this.getCurrentId();
    if (this.currentProgramId != null) this.getUpdateData();
    this.getPartyList();
    this.getQualityList();
    this.getPartyShadeList();
    this.getAllBatchData()
    this.getMasterList();
    this.programValues.priority = "Medium";
    this.getAllStockBatchData();
    this.getAllBatchData();
  }

  getCurrentId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentProgramId = this._route.snapshot.paramMap.get("id");
  }

  getAllStockBatchData() {
    this.programService.getAllStock().subscribe(
      (data) => {
        if (data["success"]) this.stockData = data["data"];
      },
      (error) => {}
    );
  }

  // getAllBatchData() {
  //   this.programService.getAllBatch().subscribe(
  //     (data) => {
  //       if (data["success"]) this.batchData = data["data"];
  //     },
  //     (error) => {}
  //   );
  // }

  getMasterList() {
    this.programService.getAllMasters().subscribe(
      (data) => {
        if (data["success"]) {
          this.masterList = data["data"];
        }
      },
      (error) => {
        this.toastr.error(errorData.Internal_Error);
      }
    );
  }

  getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().subscribe(
      (data) => {
        if (data["success"]) {
          this.party = data["data"];
          this.loading = false;
        } else {
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

  public getQualityList() {
    this.loading = true;
    this.qualityService.getQualityNameData().subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"];
          console.log(this.qualityList);
          this.loading = false;
        } else {
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

  public getPartyShadeList() {
    this.loading = true;
    this.programService.getShadeDetail().subscribe(
      (data) => {
        if (data["success"]) {
          this.partyShade = data["data"];
          this.loading = false;
        } else {
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

  public getAllBatchData(){
    this.stockBatchService.getAllBatch().subscribe(
      (data) => {
        if (data["success"]) {
          this.allBatchData = data["data"];
          console.log(this.allBatchData);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
    }

  public getUpdateData() {
    this.loading = true;
    this.programService.getProgramDetailsById(this.currentProgramId).subscribe(
      (data) => {
        if (data["success"]) {
          this.programValues = data["data"];
          this.programValues.createdBy = data["data"].createdBy;
          this.qualityService.getallQuality(0, "all").subscribe(
            (data) => {
              this.qualityList = data["data"];
              this.qualityList.forEach((element) => {
                if (this.programValues.qualityEntryId == element.id) {
                  this.programValues.qualityId = element.qualityId;
                  this.programValues.qualityName = element.qualityName;
                  this.programValues.qualityType = element.qualityType;
                }
                this.loading = false;
                this.disableButton=false;

              });

              if (this.batchData == null) {
                this.programService
                  .getBatchDetailByQualityId(this.programValues.qualityEntryId)
                  .subscribe(
                    (data) => {
                      if (data["success"]) this.batchData = data["data"];
                      this.loading = false;
                    },
                    (error) => {
                      // this.toastr.error(errorData.Serever_Error);
                      this.loading = false;
                      this.disableButton=false;

                    }
                  );
              }

              if (this.stockData == null) {
                this.programService
                  .getStockQualityList(this.programValues.qualityEntryId)
                  .subscribe(
                    (data) => {
                      if (data["success"]) {
                        this.stockData = data["data"];
                      } else {
                        // this.toastr.error(data["msg"]);
                        this.loading = false;
                      }
                      this.loading = false;
                    },
                    (error) => {
                      // this.toastr.error(errorData.Serever_Error);
                      this.loading = false;
                      this.disableButton=false;

                    }
                  );
              }
            },
            (error) => {
              // this.toastr.error(errorData.Serever_Error);
              this.loading = false;
            }
          );
        } else {
          // this.toastr.error(data["msg"]);
          this.disableButton=false;

          this.loading = false;
        }
      },
      (error) => {
        this.disableButton=false;

        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }

  shadeNoSelected(index, column) {
    //set partyShade and color tone
    this.partyShade.forEach((e) => {
      if (e.id == this.programValues.programRecords[index].shadeNo) {
        this.programValues.programRecords[index].partyShadeNo = e.partyShadeNo;
        this.programValues.programRecords[index].colourTone = e.colorTone;
        this.programValues.qualityId = e.qualityId;
        this.programValues.partyId = e.partyId;
      }
    });

    this.qualityList.forEach((e) => {
      if (e.qualityId == this.programValues.qualityId) {
        this.programValues.qualityName = e.qualityName;
        this.programValues.qualityType = e.qualityType;
        if (e.id != undefined) this.programValues.qualityEntryId = e.id;
        else this.programValues.qualityEntryId = e.qualityEntryId;
      }
    });

    //getStock and batch from quality
    this.getStockBatchData();
  }

  enableQuality(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.programValues.partyId) {
        this.programService
          .getQualityByParty(this.programValues.partyId)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.qualityList = data["data"].qualityDataList;
                this.qualityList.forEach((element) => {
                  element.partyName = data["data"].partyName;
                });
                this.programValues.qualityId = this.qualityList[0].qualityId;
                this.programValues.qualityName = this.qualityList[0].qualityName;
                this.programValues.qualityType = this.qualityList[0].qualityType;
                this.programValues.qualityEntryId = this.qualityList[0].qualityEntryId;
                this.getStockBatchData();
              } else {
                this.programValues.qualityId = null;
                this.programValues.qualityName = null;
                this.programValues.qualityType = null;
                this.qualityList = [];
              }
              this.loading = false;
            },
            (error) => {
              this.qualityList = [];
              this.loading = false;
            }
          );
      }
    } else {
      this.programValues.partyId = null;
      this.programValues.qualityId = null;
      this.programValues.qualityName = null;
      this.programValues.qualityType = null;
      this.getPartyList();
      this.getQualityList();
      this.loading = false;
    }
  }

  //get Stock Batch data
  getStockBatchData() {
    //to batch data
    this.loading = true;
    this.programService
      .getBatchDetailByQualityId(this.programValues.qualityEntryId)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.batchData = data["data"];
            console.log(this.batchData);
            this.loading = false;
          } else {
            // this.toastr.error(data["msg"]);
            this.loading = false;
          }
        },
        (error) => {
          // this.toastr.error(errorData.Serever_Error);
          this.loading = false;
        }
      );
    //to add stock data
    this.programService
      .getStockQualityList(this.programValues.qualityEntryId)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.stockData = data["data"];
            this.loading = false;
          } else {
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

  //put quality name and quality type
  public getQualityInfo(e, value) {
    if (e != undefined) {
      let id = value;
      this.qualityList.forEach((e) => {
        if (e.qualityId == id) {
          this.programValues.qualityName = e.qualityName;
          this.programValues.qualityType = e.qualityType;
          //this.pName=e.partyName;
          this.programValues.partyId = e.partyId;
         // this.programValues.partyId = 
          if (e.id != undefined)
            this.programValues.qualityEntryId = e.id;
          else
            this.programValues.qualityEntryId = e.qualityEntryId
          if (e.id != undefined) this.programValues.qualityEntryId = e.id;
          else this.programValues.qualityEntryId = e.qualityEntryId;
        }
      });
      this.getStockBatchData();

      //set Party...
      this.qualityList.forEach((e) => {
        if (e.qualityId == this.programValues.qualityId)
          this.programValues.partyId = e.partyId;
      });
    } else {
      this.programValues.partyId = null;
      this.programValues.qualityId = null;
      this.programValues.qualityName = null;
      this.programValues.qualityType = null;
      this.getQualityList();
    }
  }

  clearData(event) {
    if (event == undefined) {
    }
  }

  public partyShadeNoSelected(rowIndex) {
    let id = this.programValues.programRecords[rowIndex].partyShadeNo;
    this.partyShade.forEach((element) => {
      if (id == element.partyShadeNo) {
        this.programValues.programRecords[rowIndex].shadeNo = element.id;
        this.programValues.programRecords[rowIndex].colourTone =
          element.colorTone;
        this.programValues.qualityId = element.qualityId;
        this.programValues.partyId = element.partyId;
      }
    });

    //set quality info
    this.qualityList.forEach((e) => {
      if (e.qualityId == this.programValues.qualityId) {
        this.programValues.qualityName = e.qualityName;
        this.programValues.qualityType = e.qualityType;
        if (e.id != undefined) this.programValues.qualityEntryId = e.id;
        else this.programValues.qualityEntryId = e.qualityEntryId;
      }
    });

    //getStock and batch from quality
    this.getStockBatchData();
  }

  public selectQualityId() {
   
    if (
      this.programValues.qualityId == null &&
      (this.batchData == null || this.stockData == null)
    ) {
      if (this.qualityList[0].quantityId == null) {
        // this.toastr.warning(errorData.Add_quality_indicator);
      }
    }
  }

  public setQuantity(rowIndex, col, value) {
    if (value == "batch") {
      let id = this.programValues.programRecords[rowIndex].batchId;
      console.log(id);
     console.log(this.allBatchData)
      this.allBatchData.forEach((element) => {
        if (id == element.batchId) {
          let q_id=element.qualityId;
          this.programValues.programRecords[rowIndex].quantity = element.totalWt;
          this.qualityList.filter((x) =>
          { 
            if(x.qualityId===q_id){
              this.list.push(x);
          }
          });
          console.log(this.list);
        }
      }); 
  // if(this.programValues.qualityId == null || this.programValues.partyId == null){
  //     this.qualityList=this.list;
  //   }
  //   console.log(this.list);
      if (this.batchData != undefined) {
        this.batchData.forEach((element) => {
          if (id == element.batchId) {
            this.programValues.programRecords[rowIndex].quantity =
            Number(element.totalWt.toFixed(2));
            this.programValues.partyId=element.partyId;
            this.programValues.qualityId=element.qualityId;
            this.programValues.qualityName=element.qualityName;
            this.programValues.qualityEntryId=element.qualityEntryId;
          }
        });
        this.setQualityTypeForStockBatch();
      }

      //setQuality party info
      

    } else {
      let id = this.programValues.programRecords[rowIndex].stockId;
      this.stockData.forEach((element) => {
        let stockId = element.id?element.id:element.stockId
        if (id == stockId) {
          let qty:number = 0;
          element.batchData.forEach(e => {
            qty += e.wt
          });
          this.programValues.programRecords[rowIndex].quantity = Number(qty.toFixed(2));
          console.log(id)
          this.batchData.forEach(element => {
            if(id==element.controlId){
              this.programValues.partyId=element.partyId;
              this.programValues.qualityId=element.qualityId;
              this.programValues.qualityName=element.qualityName;
              this.programValues.qualityEntryId=element.qualityEntryId;
            }
          });
          this.setQualityTypeForStockBatch();  
        }
      });
      //setQuality party info
    }
    // if(this.programValues.qualityId == null || this.programValues.partyId == null){
    //   this.qualityList=this.list;
    // }
    // console.log(this.list);
  }

  setQualityTypeForStockBatch(){
    this.qualityList.forEach(element => {
      if(element.qualityId==this.programValues.qualityId){
        this.programValues.qualityType=element.qualityType;
      }
    });
  }
  
  

  //On enter pressed -> check empty field, add new row
  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "program" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.programValues.programRecords.length - 1) {
        let item = this.programValues.programRecords[rowIndex];

        if (colName == "partyShadeNo") {
          if (!item.partyShadeNo) {
            this.toastr.error(
              "Enter Party Shade No",
              "Party shade No Field required"
            );
            return;
          }
        } else if (colName == "shade_no") {
          if (!item.shadeNo) {
            this.toastr.error("Select Shade No", "Shade No Field required");
            return;
          }
        } else if (colName == "colour_tone") {
          if (!item.colourTone) {
            this.toastr.error("Enter Colour Tone");
            return;
          }
        } else if (colName == "quantity") {
          if (!item.quantity) {
            this.toastr.error("Enter quantity");
            return;
          }
        } else if (colName == "batch") {
          if (!item.batchId) {
            //this.toastr.error("Enter No. of Batch", "Batch Field required");
            this.toastr.error("Enter No. of Batch");
            return;
          }
        } else if (colName == "stockId") {
          if (!item.stockId) {
            this.toastr.error("Enter Lot No");
            return;
          }
        }
        // let obj = {
        //   id: null,
        //   partyId: null,
        //   priority: null,
        //   programGivenBy: null,
        //   batchId: null,
        //   colourTone: null,
        //   stockId: null,
        //   partyShadeNo: null,
        //   quantity: null,
        //   remark: null,
        //   shadeNo: null,
        //   qualityId: null,
        //   qualityName: null,
        //   qualityType: null,
        // };
        let obj = new ProgramRecords();
        let list = this.programValues.programRecords;
        list.push(obj);
        this.programValues.programRecords = [...list];
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 50);
      } else {
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 50);
      }
    }
  }

  removeItem(id) {
    let idCount = this.programValues.programRecords.length;
    let item = this.programValues.programRecords;
    if (idCount == 1) {
      item[0].partyShadeNo = null;
      item[0].shadeNo = null;
      item[0].colourTone = null;
      item[0].quantity = null;
      item[0].batchId = null;
      item[0].stockId = null;
      item[0].remark = null;
      let list = item;
      this.programValues.programRecords = [...list];
    } else {
      let removed = item.splice(id, 1);
      let list = item;
      this.programValues.programRecords = [...list];
    }
  }

  public addProgram(myForm) {
    this.disableButton=true;
    this.formSubmitted = true;
    if (myForm.valid) {
      this.programValues.createdBy = this.user.userId;
      this.programValues.userHeadId = this.userHead.userHeadId;
      delete this.programValues.qualityId;
      delete this.programValues.qualityName;
      delete this.programValues.qualityType;
      delete this.programValues.programRecords[0].batchId;
      delete this.programValues.programRecords[0].stockId;
      this.programService.saveProgram(this.programValues).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/program"]);
            this.toastr.success(errorData.Add_Success);
           
          } else {
            this.toastr.error(errorData.Add_Error);
          }

        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
    } else {
      this.disableButton=false;
      const errorField = this.renderer.selectRootElement("#target");
      errorField.scrollIntoView();
    }
  }

  public updateProgram(myForm) {
    this.disableButton=true;
    this.loading = true;
    this.formSubmitted = true;
    if (myForm.valid) {
      this.programValues.updatedBy = this.user.userId;
      delete this.programValues.qualityId;
      delete this.programValues.qualityName;
      delete this.programValues.qualityType;
      delete this.programValues.programRecords[0].batchId;
      delete this.programValues.programRecords[0].stockId;
      this.programService.updateProgram(this.programValues).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/program"]);
            this.toastr.success(errorData.Update_Success);
            
           
          } else {
            this.toastr.error(errorData.Update_Error);
            
          }
          this.loading = false;
        },
        (error) => {
          this.disableButton=false;
          this.toastr.error(errorData.Serever_Error);
          this.loading = false;
        }
      );
    } else {
      this.disableButton=false;
      this.loading = false;
      const errorField = this.renderer.selectRootElement("#target");
      errorField.scrollIntoView();
      
    }
  }
}
