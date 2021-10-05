import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewContainerRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as errorData from "../../../@theme/json/error.json";
import {
  QualityListEmpty,
  Shade,
  ShadeDataList,
} from "../../../@theme/model/shade";
import { CommonService } from "../../../@theme/services/common.service";
import { PartyService } from "../../../@theme/services/party.service";
import { QualityService } from "../../../@theme/services/quality.service";
import { ShadeService } from "../../../@theme/services/shade.service";
import { SupplierService } from "../../../@theme/services/supplier.service";
import { ToastrService } from "ngx-toastr";
import { NgSelectComponent } from "@ng-select/ng-select";

@Component({
  selector: "ngx-add-edit-shade",
  templateUrl: "./add-edit-shade.component.html",
  styleUrls: ["./add-edit-shade.component.scss"],
})
export class AddEditShadeComponent implements OnInit, OnDestroy {
  @ViewChildren("data") data: QueryList<NgSelectComponent>;
  public loading = false;
  public disableButton = false;
  public errorData: any = (errorData as any).default;

  shadeDataListArray: ShadeDataList[] = [];

  shadeObj: Shade = new Shade();
  shadeDataList: ShadeDataList = new ShadeDataList();
  qualityListEmpty: QualityListEmpty = new QualityListEmpty();

  //Form Validation
  formSubmitted: boolean = false;
  partyShadeNoExist:boolean = false;
  index: any;
  //to Store UserId
  user: any;
  userHead;
  //To store current Shade Id
  currentShadeId: any;
  //to Store Current Shade data
  currentShade: [];
  //To store Supplier data
  supplierList: any;
  checked = true;
  qualityList: any[];
  processList: any[];
  qualityId: any;
  color: any = "";
  supplierListRate: any;
  partyList: any[];
  categoryList = [{ name: "LIGHT" }, { name: "MEDIUM" },{name : "DARK"},{name:"SPECIAL"}];
  refreshFlag: any = 0;
  totalAmount: any = 0;
  costKg: any = 0;
  costMtr: any = 0;
  amountArray: any[] = [];
  apcFlag: any = false;
  public wt100m: any = 0;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private _route: ActivatedRoute,
    private partyService: PartyService,
    private commonService: CommonService,
    private qualityService: QualityService,
    private supplierService: SupplierService,
    private shadeService: ShadeService,
    private route: Router,
    public vcRef: ViewContainerRef,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {
    this.apcFlag = this.route.getCurrentNavigation().extras.state;
  }

  async ngOnInit() {
    await this.getQualityList();
    await this.getPartyList();
    await this.getProcessList();
    await this.getSupplierList();
    this.getUserId();
    if (this.currentShadeId) {
      this.getShadeById();
    } else {
      this.shadeDataListArray.push(this.shadeDataList);
      this.shadeObj.shadeDataList = this.shadeDataListArray;
    }
  }

  updateColor() {
    this.shadeObj.colorTone = this.color;
  }

  public getUserId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentShadeId = this._route.snapshot.paramMap.get("id");
  }

  public getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getSupplierList() {
    this.loading = true;
    this.supplierService.getAllSupplierRates().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          if (data["data"] && data["data"].length > 0) {
            this.supplierList = data["data"];
            this.supplierList = this.supplierList.filter((item) => {
              if (item.itemType == "Color") {
                return true;
              }
            });
            this.getAllSupplier();
            this.loading = false;
          } else {
            this.loading = false;
          }
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getAllSupplier() {
    this.loading = true;
    this.supplierService.getSupplierNameV1().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.supplierListRate = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getProcessList() {
    this.loading = true;
    this.shadeService.getAllDyeingProcess().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.processList = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  async getQualityList() {
    this.loading = true;
    return await new Promise((resolve,reject) => {
      this.qualityService.getQualityNameData().pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.qualityList = data["data"] || [];
            if(this.qualityList && this.qualityList.length) {
              this.qualityList.forEach(ele => {
                ele['qualityEntryId'] = ele.id;
              })
            }
            resolve(true);
            this.loading = false;
          } else {
            resolve(true);
            this.loading = false;
          }
        },
        (error) => {
          resolve(false);
          this.loading = false;
        }
      );
    });
   
  }

  getShadeById() {
    this.loading = true;
    this.shadeService.getCurrentShadeData(this.currentShadeId).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          let res = data["data"];
          this.shadeObj = res;
          if (this.shadeObj.extraRate) {
            this.shadeObj.isExtraRate = true;
          } else {
            this.shadeObj.isExtraRate = false;
          }
          this.color = this.shadeObj.colorTone;
          this.shadeObj.shadeDataList.forEach((item, i) => {
            this.shadeObj.shadeDataList[i].rate = Number(item.rate.toFixed(2));
          });
          if (!this.shadeObj.shadeDataList.length) {
            this.shadeDataListArray.push(this.shadeDataList);
            this.shadeObj.shadeDataList = this.shadeDataListArray;
          } else {
            this.shadeDataListArray = this.shadeObj.shadeDataList;
          }
          let qualityIndex =
            this.qualityList && this.qualityList.length
              ? this.qualityList.findIndex((v) => v.qualityEntryId == res.qualityEntryId)
              : -1;
          if (qualityIndex > -1) {
            this.shadeObj.qualityEntryId = this.qualityList[qualityIndex].qualityEntryId;
            this.shadeObj.qualityName = this.qualityList[
              qualityIndex
            ].qualityName;
            this.shadeObj.qualityType = this.qualityList[
              qualityIndex
            ].qualityType;
            this.qualityList.forEach((element) => {
              if (this.shadeObj.qualityEntryId == element.qualityEntryId) {
                this.shadeObj.qualityId = element.qualityId;
                this.shadeObj.qualityName = element.qualityName;
                this.shadeObj.qualityType = element.qualityType;
                this.shadeObj.partyId = element.partyId;
                this.shadeObj.qualityEntryId = element.qualityEntryId;
                this.shadeObj.qualityNameId = element.qualityNameId;
                this.wt100m = element.wtPer100m;
              }
            });
            this.shadeDataListArray.forEach((element, index) => {
              this.calculateAmount(index);
            });
          }
          this.shadeService.getItemListFromQuality(this.shadeObj.qualityNameId).subscribe(
            (res)=>{
              if(res){
                this.supplierList = res["data"];
              }
            }
          )

          this.setProcessName(this.shadeObj.processId);
          this.loading = false;
          this.disableButton = false;
        } else {
          this.loading = false;
          this.disableButton = false;
        }
      },
      (error) => {
        this.loading = false;
        this.disableButton = false;
      }
    );
    this.disableButton = false;
  }

  resetAmount() {
    this.totalAmount = 0;
    this.costKg = 0;
    this.costMtr = 0;
  }

  qualityIdSelected(event) {
    if (event == undefined) {
      this.shadeObj.qualityName = null;
      this.shadeObj.qualityType = null;
      this.shadeObj.shadeDataList = [];
      this.shadeObj.shadeDataList.push(new ShadeDataList());
      this.resetAmount();
    } else {
      this.qualityList.forEach((element) => {
        if (this.shadeObj.qualityEntryId == element.qualityEntryId) {
          this.shadeObj.qualityId = element.qualityId;
          this.shadeObj.qualityName = element.qualityName;
          this.shadeObj.qualityType = element.qualityType;
          this.shadeObj.partyId = element.partyId;
          this.shadeObj.qualityEntryId = element.qualityEntryId;
          this.shadeObj.processId = element.processId;
          this.shadeObj.qualityNameId = element.qualityNameId;
          this.wt100m = element.wtPer100m;
        }
      });
      this.calculateTotalAmount(true);
      this.shadeService.getItemListFromQuality(this.shadeObj.qualityNameId).subscribe(
        (res)=>{
          if(res){
            this.supplierList = res["data"];
          }
        }
      )

    }
    this.checkPartyShadeNo();
  }

  getQualityFromParty(event) {
    this.loading = true;
    this.shadeObj.qualityId = null;
    this.shadeObj.qualityName = null;
    this.shadeObj.qualityType = null;
    if (event == undefined) {
      this.getPartyList();
      this.getQualityList();
      this.shadeObj.qualityId = null;
      this.shadeObj.qualityName = null;
      this.shadeObj.qualityType = null;
      this.shadeObj.shadeDataList = [];
      this.shadeObj.shadeDataList.push(new ShadeDataList());
      this.resetAmount();
      this.loading = false;
    } else {
      this.shadeService.getQualityFromParty(this.shadeObj.partyId).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.qualityList = data["data"].qualityDataList;
            this.shadeObj.qualityId = this.qualityList[0].qualityId;
            this.shadeObj.qualityName = this.qualityList[0].qualityName;
            this.shadeObj.qualityType = this.qualityList[0].qualityType;
            this.shadeObj.qualityEntryId = this.qualityList[0].qualityEntryId;
            this.shadeObj.qualityNameId = this.qualityList[0].qualityNameId;
            this.qualityList.forEach((e) => {
              e.partyName = data["data"].partyName;
              this.loading = false;
            });
            this.loading = false;
            this.qualityList.forEach((element) => {
              if (this.shadeObj.qualityEntryId == element.qualityEntryId) {
                this.shadeObj.qualityId = element.qualityId;
                this.shadeObj.qualityName = element.qualityName;
                this.shadeObj.qualityType = element.qualityType;
                this.shadeObj.partyId = element.partyId;
                this.shadeObj.processId = element.processId;
                this.shadeObj.qualityEntryId = element.qualityEntryId;
                this.shadeObj.qualityNameId = element.qualityNameId;
                this.wt100m = element.wtPer100m;
              }
            });
            this.calculateTotalAmount(true);
            this.checkPartyShadeNo();
            this.shadeService.getItemListFromQuality(this.shadeObj.qualityNameId).subscribe(
              (res)=>{
                if(res){
                  this.supplierList = res["data"];
                }
              }
            )

          } else {
            this.qualityList = null;
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
    }

  }


  itemSelected(rowIndex, row, event) {
    if (event) {
      if (this.refreshFlag > 1000) {
        this.refreshFlag = 0;
      }
      this.refreshFlag++;
      let newSupplierId;
      for (let s of this.supplierList) {
        if (row.supplierItemId == s.id) {
          newSupplierId = s.supplierId;
          row.itemName = s.itemName;
          row.rate = s.gstRate.toFixed(2);
          break;
        }
      }
      for (let s1 of this.supplierListRate) {
        if (newSupplierId == s1.id) {
          this.shadeObj.shadeDataList[rowIndex].supplierName = s1.supplierName;
          this.shadeObj.shadeDataList[rowIndex].supplierId = s1.id;
          break;
        }
      }
      this.calculateAmount(rowIndex);
    } else {
      this.shadeObj.shadeDataList[rowIndex].supplierName = null;
      this.shadeObj.shadeDataList[rowIndex].supplierId = null;
      this.shadeObj.shadeDataList[rowIndex].rate = null;
      this.shadeObj.shadeDataList[rowIndex].amount = null;
      this.shadeObj.shadeDataList[rowIndex].concentration = null;
    }
    this.calculateTotalAmount(false);
  }

  checkQualitySelected() {
    if (!this.shadeObj.qualityId) {
      this.toastr.warning("Select Quality first");
      return false;
    }
  }

  calculateAmount(rowIndex) {
    if (this.shadeObj.qualityId) {
      if (this.shadeObj.shadeDataList[rowIndex].concentration) {
        let con = Number(this.shadeObj.shadeDataList[rowIndex].concentration);
        let newRate = Number(this.shadeObj.shadeDataList[rowIndex].rate);

        let amount = Number((Number(con) * Number(newRate)).toFixed(2));
        this.shadeObj.shadeDataList[rowIndex].amount = Number(
          amount.toFixed(2)
        );

        this.calculateTotalAmount(false);
      } else {
        this.shadeObj.shadeDataList[rowIndex].amount = 0;
        this.calculateTotalAmount(false);
      }
    } else {
      this.shadeObj.shadeDataList[rowIndex].concentration = null;
      return;
    }
  }

  calculateTotalAmount(isQualityChanged) {
    if (isQualityChanged) {
      this.shadeObj.shadeDataList.forEach((element, i) => {
        this.calculateAmount(i);
      });
    }

    this.totalAmount = 0;
    this.shadeObj.shadeDataList.forEach((e) => {
      if (e.amount) this.totalAmount += e.amount;
    });

    this.totalAmount = this.totalAmount.toFixed(2);
    if (this.wt100m) {
      if (this.shadeObj.qualityId) {
        this.costKg = (this.totalAmount / 100).toFixed(2);
        let A = 100 / this.wt100m;
        this.costMtr = (this.costKg / A).toFixed(2);
      }
    }
  }

  setProcessName(id) {
    let processIndex =
      this.processList && this.processList.length
        ? this.processList.findIndex((v) => v.id == id)
        : -1;
    if (processIndex > -1) {
      this.shadeObj.processName = this.processList[processIndex].name;
    } else {
      this.shadeObj.processName = "";
    }
  }

  onKeyUp(e, rowIndex, colIndex, colName) {
    this.refreshFlag++;
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "supplierList" + (rowIndex + 1) + "-" + colName;
      if (rowIndex === this.shadeObj.shadeDataList.length - 1) {
        let item = this.shadeObj.shadeDataList[rowIndex];
        if (colName == "itemName") {
          if (!item.itemName) {
            this.toastr.error("Enter item name", "item name required");
            return;
          }
        } else if (colName == "concentration") {
          if (!item.concentration) {
            this.toastr.error("Enter concentration", "concentration required");
            return;
          }
        } else if (colName == "supplierName") {
          if (!item.supplierName) {
            this.toastr.error("Enter supplier name", "supplier name required");
            return;
          }
        } else if (colName == "rate") {
          if (!item.rate) {
            this.toastr.error("Enter rate", "rate is required");
            return;
          }
        } else if (colName == "amount") {
          if (!item.amount) {
            this.toastr.error("Enter amount", "amount is required");
            return;
          }
        }
        let obj = {
          itemName: null,
          concentration: null,
          supplierName: null,
          rate: null,
          amount: null,
          supplierId: null,
          supplierItemId: null,
        };
        let list = this.shadeObj.shadeDataList;
        list.push(obj);
        this.shadeObj.shadeDataList = [...list];

        this.data.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.data.last.focus();
        });
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

  reset(shadeForm) {
    shadeForm.reset();
    this.formSubmitted = false;
    this.shadeObj.colorTone = null;
    this.color = "";
    this.totalAmount = 0;
    this.costKg = 0;
    this.costMtr = 0;
    this.shadeDataListArray = [];
    this.ngOnInit();
  }

  isExtraChanged(event) {
    if (!event) {
      this.shadeObj.extraRate = 0;
    }
  }

  addShade(shadeForm) {
    this.disableButton = true;
    this.formSubmitted = true;
    if (
      (this.shadeObj.isExtraRate && this.shadeObj.extraRate) ||
      !this.shadeObj.isExtraRate
    ) {
      if (shadeForm.valid) {
        this.shadeObj.createdBy = this.user.userId;
        this.shadeObj.userHeadId = this.userHead.userHeadId;

        if (
          (this.shadeObj.shadeDataList.length == 1 &&
            !this.shadeObj.shadeDataList[0].supplierItemId) ||
          this.shadeObj.pending
        ) {
          this.shadeObj.shadeDataList = [];
        }

        this.shadeService.addShadeData(this.shadeObj).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              shadeForm.reset();
              this.formSubmitted = false;
              this.reset(shadeForm);
              this.disableButton = false;
              this.toastr.success(data["msg"]);
            } else {
              this.toastr.error(data["msg"]);
              this.toastr.error(data["msg"]);
            }
            this.disableButton = false;
          },
          (error) => {
            // this.toastr.error(errorData.Serever_Error);
            this.disableButton = false;
          }
        );
      } else {
        if (
          this.shadeObj.partyId &&
          this.shadeObj.processId &&
          this.shadeObj.qualityId && 
          this.shadeObj.pending
        ) {
          if (
            (this.shadeObj.shadeDataList.length == 1 &&
              !this.shadeObj.shadeDataList[0].supplierItemId) ||
            this.shadeObj.pending
          ) {
            this.shadeObj.shadeDataList = [];
          }

          this.shadeObj.createdBy = this.user.userId;
          this.shadeObj.userHeadId = this.userHead.userHeadId;
          this.shadeService.addShadeData(this.shadeObj).pipe(takeUntil(this.destroy$)).subscribe(
            (data) => {
              if (data["success"]) {
                shadeForm.reset();
                this.formSubmitted = false;
                this.reset(shadeForm);
                this.disableButton = false;
                this.toastr.success(data["msg"]);
              } else {
                this.toastr.error(data["msg"]);
              }
              this.disableButton = false;
            },
            (error) => {
              this.disableButton = false;
            }
          );
        }
        this.disableButton = false;
        const errorField = this.renderer.selectRootElement("#target");
        errorField.scrollIntoView();
      }
    }
    this.disableButton = false;
  }

  removeItem(id) {
    //remove row
    let idCount = this.shadeObj.shadeDataList.length;
    let item = this.shadeObj.shadeDataList;
    if (idCount == 1) {
      item[0].itemName = null;
      item[0].concentration = null;
      item[0].supplierName = null;
      item[0].rate = null;
      item[0].amount = null;
      item[0].supplierItemId = null;
      this.shadeObj.shadeDataList = [...item];
    } else {
      let removed = item.splice(id, 1);
      this.shadeObj.shadeDataList = [...item];
    }
    this.calculateTotalAmount(false);
  }

  updateShade(shadeForm) {
    this.disableButton = true;

    this.loading = true;
    this.formSubmitted = true;
    if (
      !this.shadeObj.isExtraRate ||
      (this.shadeObj.isExtraRate && this.shadeObj.extraRate)
    ) {
      if (shadeForm.valid) {
        this.shadeObj.updatedBy = this.user.userId;
        this.shadeService.updateShadeData(this.shadeObj).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.route.navigate(["/pages/shade"]);
              this.toastr.success(data["msg"]);
              this.disableButton = false;
            } else {
              this.toastr.error(data["msg"]);
              this.disableButton = false;
            }
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.disableButton = false;
          }
        );
      } else {
        if (
          this.shadeObj.partyId &&
          this.shadeObj.processId &&
          this.shadeObj.qualityId
        ) {
          let length = this.shadeObj.shadeDataList.length;
          if (
            this.shadeObj.shadeDataList.length &&
            !Object.keys(this.shadeObj.shadeDataList[0]).length
          ) {
            this.shadeObj.shadeDataList = [];
          } else if(!this.shadeObj.shadeDataList[length-1].itemName){
            this.toastr.error('Fill all shade data')
          }
           else {
            this.shadeService.updateShadeData(this.shadeObj).pipe(takeUntil(this.destroy$)).subscribe(
              (data) => {
                if (data["success"]) {
                  this.route.navigate(["/pages/shade/pending-apc"]);
                  this.toastr.success(data["msg"]);
                  this.disableButton = false;
                } else {
                  this.toastr.error(data["msg"]);
                  this.disableButton = false;
                }
                this.loading = false;
              },
              (error) => {
                this.toastr.error(errorData.Serever_Error);
                this.loading = false;
                this.disableButton = false;
              }
            );
          }

          this.disableButton = false;
          this.loading = false;
          const errorField = this.renderer.selectRootElement("#target");
          errorField.scrollIntoView();
        }
        this.loading = false;
      }
    } else {
      this.disableButton = false;
      this.loading = false;
    }
  }

  tableChange(event){
    if (event === "view table") {
      this.route.navigate(['/pages/shade/view']);
    }
  }

  checkPartyShadeNo(){
    this.partyShadeNoExist = false;
    let id = 0;
    if (this.shadeObj.partyShadeNo && this.shadeObj.partyId && this.shadeObj.qualityEntryId) {
      
      if (this.currentShadeId) id = this.currentShadeId;
      
      this.shadeService
        .partyShadeNoCheck(id,this.shadeObj.qualityEntryId,this.shadeObj.partyShadeNo)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.partyShadeNoExist = data["data"];
          },
          (error) => { }
        );
    }

  }
}
