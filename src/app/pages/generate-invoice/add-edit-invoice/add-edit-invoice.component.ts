import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import * as errorData from "../../../@theme/json/error.json";
import { Invoice, invoiceobj } from "../../../@theme/model/invoice";
import { GenerateInvoiceService } from "../../../@theme/services/generate-invoice.service";
import { JwtTokenService } from "../../../@theme/services/jwt-token.service";
import { PartyService } from "../../../@theme/services/party.service";
import { keys } from "lodash";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "../../../@theme/services/common.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PrintLayoutComponent } from "../print-Layout/print-layout.component";
import { PasswordDailogComponent } from "../../../@theme/components/password-dailog/password-dailog.component";

@Component({
  selector: "ngx-add-edit-invoice",
  templateUrl: "./add-edit-invoice.component.html",
  styleUrls: ["./add-edit-invoice.component.scss"],
})
export class AddEditInvoiceComponent implements OnInit, OnDestroy {
  flag: any;
  discountChange;
  remark;
  discountFlag: boolean = false;
  obj = {
    batchAndStockIdList: [],
    createdBy: null,
    invoiceNo: null,
    userHeadId: null,
  };

  invoiceObj = {
    batchAndStockIdList: [],
  };
  finalcheckedrows = [];
  party: any[];
  batch: any[];
  finalbatch = [];
  mtrList: any[];
  public disableButton = false;
  public updateFlag;
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
  invoiceNo: any;

  public destroy$: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private generateInvoiceService: GenerateInvoiceService,
    private partyService: PartyService,
    private route: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private jwt: JwtTokenService,
    private commonService: CommonService,
    private modalService: NgbModal
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
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            if (data["success"]) {
              this.invoiceValues.partyId = data["data"].partyId;
              this.discountFlag = true;
              this.discountChange = data["data"].percentageDiscount;
              this.remark = data["data"].remark;
              this.flag = data["data"].isSendToParty;
              this.batch = data["data"].batchWithControlIdList;
              this.finalbatch = [...this.batch];
              this.merge = [...this.finalbatch];
              // this.generateInvoiceService
              //   .getBatchByParty(this.invoiceValues.partyId)
              //   .pipe(takeUntil(this.destroy$)).subscribe(
              //     (data) => {
              //       if (data["success"]) {
              //         data["data"].forEach((element) => {
              //           this.finalbatch.push(element);
              //         });
              //         this.merge = this.finalbatch;
              //         this.loading = false;
              //       } else {
              //         this.loading = false;
              //       }
              //     },
              //     (error) => {
              //       this.loading = false;
              //       this.merge = [];
              //     }
              //   );
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
    this.partyService
      .getAllPartyNameList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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
    this.party.forEach((ele) => {
      if (ele.id == this.invoiceValues.partyId) {
        this.discountChange = ele.percentageDiscount;
      }
    });
    this.discountFlag = true;

    this.loading = true;
    if (event != undefined) {
      if (this.invoiceValues.partyId) {
        this.generateInvoiceService
          .getBatchByParty(this.invoiceValues.partyId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.finalbatch = data["data"];
                this.finalbatch.forEach((ele) => {
                  ele.wt = ele.wt.toFixed(2);
                });
                this.merge = this.finalbatch;
                this.finalcheckedrows = [];
                this.selected = [];
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
    let temp = this.party.filter((f) => f.id == this.invoiceValues.partyId);
    if (this.finalcheckedrows.length <= 4) {
      this.formSubmitted = true;
      this.final = [];
      if (this.finalcheckedrows.length > 0) {
        this.finalcheckedrows.map((ele) => {
          let obj: invoiceobj = new invoiceobj();
          obj.batchId = ele.batchId;
          obj.stockId = ele.controlId;
          obj.rate = ele.rate;
          this.final.push(obj);
        });
        let obj = {
          batchAndStockIdList: this.final,
          createdBy: this.userId,
          userHeadId: this.userHeadId,
          cgst: null,
          sgst: null,
          percentageDiscount: this.discountChange,
          discount: null,
          taxAmt: null,
          netAmt: null,
          password: "",
          passwordFlag: null,
          remark: this.remark,
          createFlag: true,
        };

        if (temp[0].pendingAmt > temp[0].creditLimit) {
          const modalRef = this.modalService.open(PasswordDailogComponent);
          modalRef.result.then((res) => {
            if (res) {
              const modalRef = this.modalService.open(PrintLayoutComponent, {
                size: "xl",
              });
              modalRef.componentInstance.finalInvoice = obj;
              modalRef.componentInstance.previewFlag = true;
              modalRef.componentInstance.discount = this.discountChange;
              modalRef.componentInstance.remark = this.remark;
              modalRef.componentInstance.updateFlag = false;

              modalRef.result.then((result) => {
                if (result) {
                  obj.cgst = result.cgst;
                  obj.sgst = result.sgst;
                  obj.discount = result.discount;
                  obj.netAmt = Math.round(result.netAmt);
                  obj.taxAmt = result.taxAmt;
                  obj.password = res;
                  obj.passwordFlag = true;
                  if (invoiceForm.valid) {
                    this.generateInvoiceService
                      .addInvoicedata(obj)
                      .pipe(takeUntil(this.destroy$))
                      .subscribe(
                        async (data) => {
                          if (data["success"]) {
                            this.invoiceNo = data["data"];
                            this.toastr.success(errorData.Add_Success);
                            this.merge = [];
                            this.disableButton = false;
                            if (result.print === "print") {
                              this.print(this.invoiceNo);
                            }
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
                  //Clear selected party
                  this.invoiceValues.partyId = null;
                  this.discountFlag = false;
                  this.discountChange = null;
                  this.remark = "";
                } else {
                  this.disableButton = false;
                }
              });
            }
          });
        } else {
          const modalRef = this.modalService.open(PrintLayoutComponent, {
            size: "xl",
          });
          modalRef.componentInstance.finalInvoice = obj;
          modalRef.componentInstance.previewFlag = true;
          modalRef.componentInstance.discount = this.discountChange;
          modalRef.componentInstance.remark = this.remark;
          modalRef.componentInstance.updateFlag = false;

          modalRef.result.then((result) => {
            if (result) {
              obj.cgst = result.cgst;
              obj.sgst = result.sgst;
              obj.discount = result.discount;
              obj.netAmt = Math.round(result.netAmt);
              obj.taxAmt = result.taxAmt;
              obj.password = "";
              obj.passwordFlag = false;
              if (invoiceForm.valid) {
                this.generateInvoiceService
                  .addInvoicedata(obj)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe(
                    async (data) => {
                      if (data["success"]) {
                        this.invoiceNo = data["data"];
                        this.toastr.success(errorData.Add_Success);
                        this.merge = [];
                        this.disableButton = false;
                        if (result.print === "print") {
                          this.print(this.invoiceNo);
                        }
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
              //Clear selected party
              this.invoiceValues.partyId = null;
              this.discountFlag = false;
              this.discountChange = null;
              this.remark = "";
            } else {
              this.disableButton = false;
            }
          });
        }
      }
    } else {
      this.toastr.warning("Select upto 4 batches only");
    }
  }
  print(invoiceNo) {
    const queryParams: any = {};

    queryParams.invoice = invoiceNo;
    const navigationExtras: NavigationExtras = {
      queryParams,
    };

    this.route.navigate(["/pages/generate_invoice/print"], navigationExtras);
  }

  updateInvoice(invoiceForm) {
    let temp = this.party.filter((f) => f.id == this.invoiceValues.partyId);
    if (this.finalcheckedrows.length <= 4) {
      this.disableButton = true;
      this.formSubmitted = true;

      this.final = [];

      this.finalcheckedrows.map((ele, i) => {
        let obj: invoiceobj = new invoiceobj();
        obj.batchId = ele.batchId;
        obj.stockId = ele.controlId;
        obj.rate = ele.rate;
        this.final.push(obj);
      });

      let obj = {
        batchAndStockIdList: this.final,
        createdBy: this.userId,
        userHeadId: this.userHeadId,
        invoiceNo: this.currentInvoiceId,
        cgst: null,
        sgst: null,
        percentageDiscount: this.discountChange,
        discount: null,
        taxAmt: null,
        netAmt: null,
        password: "",
        passwordFlag: null,
        remark: this.remark,
        createFlag: false,
      };

      if (temp[0].pendingAmt > temp[0].creditLimit) {
        const modalRef = this.modalService.open(PasswordDailogComponent);
        modalRef.result.then((res) => {
          if (res) {
            const modalRef = this.modalService.open(PrintLayoutComponent, {
              size: "xl",
            });
            modalRef.componentInstance.finalInvoice = obj;
            modalRef.componentInstance.previewFlag = true;
            modalRef.componentInstance.discount = this.discountChange;
            modalRef.componentInstance.remark = this.remark;
            modalRef.componentInstance.updateFlag = true;

            modalRef.result.then((result) => {
              if (result) {
                obj.cgst = result.cgst;
                obj.sgst = result.sgst;
                obj.discount = result.discount;
                obj.netAmt = Math.round(result.netAmt);
                obj.taxAmt = result.taxAmt;
                obj.password = res;
                obj.passwordFlag = true;

                if (invoiceForm.valid) {
                  this.generateInvoiceService
                    .updateInvoice(obj)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(
                      (data) => {
                        if (data["success"]) {
                          this.invoiceNo = data["data"];
                          if (result.print === "print") {
                            this.print(this.invoiceNo);
                          }
                          // this.route.navigate(["/pages/generate_invoice"]);
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
                //Clear selected party
                this.invoiceValues.partyId = null;
                this.discountFlag = false;
                this.discountChange = null;
                this.remark = "";
              } else {
                this.disableButton = false;
              }
            });
          }
        });
      } else {
        const modalRef = this.modalService.open(PrintLayoutComponent, {
          size: "xl",
        });
        modalRef.componentInstance.finalInvoice = obj;
        modalRef.componentInstance.previewFlag = true;
        modalRef.componentInstance.discount = this.discountChange;
        modalRef.componentInstance.remark = this.remark;
        modalRef.componentInstance.updateFlag = true;

        modalRef.result.then((result) => {
          if (result) {
            obj.cgst = result.cgst;
            obj.sgst = result.sgst;
            obj.discount = result.discount;
            obj.netAmt = Math.round(result.netAmt);
            obj.taxAmt = result.taxAmt;
            obj.password = "";
            obj.passwordFlag = false;
            if (invoiceForm.valid) {
              this.generateInvoiceService
                .updateInvoice(obj)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  (data) => {
                    if (data["success"]) {
                      this.invoiceNo = data["data"];
                      if (result.print === "print") {
                        this.print(this.invoiceNo);
                      }
                      // this.route.navigate(["/pages/generate_invoice"]);
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
            //Clear selected party
            this.invoiceValues.partyId = null;
            this.discountFlag = false;
            this.discountChange = null;
            this.remark = "";
          } else {
            this.disableButton = false;
          }
        });
      }
    } else {
      this.toastr.warning("Select upto 4 batches only");
    }
  }

  onSelect(value: any) {
    let arr: any[] = value.selected;
    if (arr.length <= 4) {
    } else {
      this.toastr.warning("Select upto 4 batches only");
    }

    this.finalcheckedrows = arr;
  }

  tableChange(event) {
    if (event === "view table") {
      this.route.navigate(["/pages/generate_invoice/view"]);
    } else if (event === "report") {
      this.route.navigate(["/pages/generate_invoice/report"]);
    } else if(event == 'sign'){
      this.route.navigate(["/pages/generate_invoice/sign"]);
    } else if(event == 'received'){
      this.route.navigate(["/pages/generate_invoice/sign/view"]);
    }
  }

  enterClicked(rowIndex, e) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      if (rowIndex < this.merge.length) {
        let id = "invoice" + (rowIndex + 1) + "-rateChange";
        let inter = setInterval(() => {
          const element = document.getElementById(id) as any;
          if (element) {
            element.focus();
            element.select();
            clearInterval(inter);
          }
        });
      }
    }
  }
}
