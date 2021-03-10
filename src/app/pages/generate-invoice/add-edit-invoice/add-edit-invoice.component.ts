import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as errorData from "app/@theme/json/error.json";
import { Invoice, invoiceobj } from "app/@theme/model/invoice";
import { GenerateInvoiceService } from "app/@theme/services/generate-invoice.service";
import { JwtTokenService } from "app/@theme/services/jwt-token.service";
import { PartyService } from "app/@theme/services/party.service";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "app/@theme/services/common.service";

@Component({
  selector: "ngx-add-edit-invoice",
  templateUrl: "./add-edit-invoice.component.html",
  styleUrls: ["./add-edit-invoice.component.scss"],
})
export class AddEditInvoiceComponent implements OnInit {
  flag: any;
  obj = {
    batchAndStockIdList: [],
    createdBy: null,
    invoiceNo: null,
    userHeadId: null,
  };
  finalcheckedrows = [];
  party: any[];
  batch: any[];
  finalbatch = [];
  mtrList: any[];
  public disableButton = false;
  public errorData: any = (errorData as any).default;
  mtr = [];
  invoiceValues: Invoice = new Invoice();
  formSubmitted = false;
  public loading = false;
  qualityList: any[];
  cid: any;
  bid: any;
  userId: any;
  myInvoiceId;
  currentInvoiceId: any;
  Invoice: any[];
  userHeadId;
  merge = [];

  constructor(
    private generateInvoiceService: GenerateInvoiceService,
    private partyService: PartyService,
    private route: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private jwt: JwtTokenService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.userId = this.jwt.getDecodeToken("userId");
    this.userHeadId = this.commonService.getUserHeadId().userHeadId;
    this.getPartyList();
    this.getUserId();
    if (this.currentInvoiceId) this.getUpdateData();
  }
  public getUserId() {
    this.currentInvoiceId = this._route.snapshot.paramMap.get("id");
  }

  getUpdateData() {
    this.loading = true;
    if (this.currentInvoiceId != null) {
      this.generateInvoiceService
        .getDataByInvoiceNumber(this.currentInvoiceId)
        .subscribe(
          (data) => {
            if (data["success"]) {
              this.invoiceValues.partyId = data["data"].partyId;
              this.flag = data["data"].isSendToParty;
              this.batch = data["data"].batchWithControlIdList;
              this.finalbatch = [...this.batch];
              this.merge = [...this.finalbatch];
              this.generateInvoiceService
                .getBatchByParty(this.invoiceValues.partyId)
                .subscribe(
                  (data) => {
                    if (data["success"]) {
                      data["data"].forEach((element) => {
                        this.finalbatch.push(element);
                      });
                      this.merge = this.finalbatch;
                      this.loading = false;
                    } else {
                      this.loading = false;
                    }
                  },
                  (error) => {
                    this.loading = false;
                    this.merge = [];
                  }
                );
              this.loading = false;
              this.disableButton = false;
              this.selected = data["data"].batchWithControlIdList;
              this.finalcheckedrows = [...this.selected];
            } else {
              this.loading = false;
              this.disableButton = false;
              this.merge = [];
            }
          },
          (error) => {
            this.loading = false;
            this.disableButton = false;
            this.merge = [];
          }
        );
    }
    this.disableButton = false;
  }

  getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().subscribe(
      (data) => {
        if (data["success"]) {
          this.party = data["data"];
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

  getBatchList(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.invoiceValues.partyId) {
        this.generateInvoiceService
          .getBatchByParty(this.invoiceValues.partyId)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.finalbatch = data["data"];
                this.finalbatch.forEach((ele) => {
                  ele.wt = ele.wt.toFixed(2);
                });
                this.merge = this.finalbatch;
                this.loading = false;
              } else {
                this.loading = false;
                this.merge = [];
              }
            },
            (error) => {
              this.loading = false;
              this.merge = [];
            }
          );
      }
    } else {
      this.loading = false;
    }
  }

  final = [];
  selected = [];
  addInvoice(invoiceForm) {
    this.disableButton = true;
    this.formSubmitted = true;

    this.finalcheckedrows.map((ele) => {
      let obj: invoiceobj = new invoiceobj();
      obj.batchId = ele.batchId;
      obj.stockId = ele.controlId;
      this.final.push(obj);
    });
    let obj = {
      batchAndStockIdList: this.final,
      createdBy: this.userId,
      userHeadId: this.userHeadId,
    };

    if (invoiceForm.valid) {
      this.generateInvoiceService.addInvoicedata(obj).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/generate_invoice"]);
            this.toastr.success(errorData.Add_Success);
            this.merge = [];
            this.disableButton = false;
          } else {
            this.disableButton = false;
            this.toastr.error(errorData.Add_Error);
            this.merge = [];
          }
        },
        (error) => {
          this.disableButton = false;
          this.toastr.error(errorData.Serever_Error);
        }
      );
    } else {
      this.disableButton = false;
    }
  }

  updateInvoice(invoiceForm) {
    this.disableButton = true;
    this.formSubmitted = true;

    this.final = [];
    this.finalcheckedrows.map((ele) => {
      let obj: invoiceobj = new invoiceobj();
      obj.batchId = ele.batchId;
      obj.stockId = ele.controlId;
      this.final.push(obj);
    });
    let obj = {
      batchAndStockIdList: this.final,
      createdBy: this.userId,
      invoiceNo: this.currentInvoiceId,
      updatedBy: this.userId,
    };

    if (invoiceForm.valid) {
      this.generateInvoiceService.updateInvoice(obj).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/generate_invoice"]);
            this.toastr.success(errorData.Update_Success);
            this.disableButton = false;
          } else {
            this.disableButton = false;
            this.toastr.error(errorData.Update_Error);
          }
        },
        (error) => {
          this.disableButton = false;
          this.toastr.error(errorData.Serever_Error);
        }
      );
    } else {
      this.disableButton = false;
    }
  }

  onSelect(value: any) {
    let arr: any = value.selected;
    this.finalcheckedrows = arr;
  }
}
