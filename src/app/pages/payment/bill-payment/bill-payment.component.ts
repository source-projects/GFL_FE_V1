import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvancePayList, Payment, PaymentData } from '../../../@theme/model/payment'
import { CommonService } from '../../../@theme/services/common.service';
import { JwtTokenService } from '../../../@theme/services/jwt-token.service';
import { PartyService } from '../../../@theme/services/party.service';
import { PaymentService } from '../../../@theme/services/payment.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from '../../../@theme/json/error.json';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'ngx-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.scss']
})
export class BillPaymentComponent implements OnInit, OnDestroy {
  @ViewChildren('data') data: QueryList<NgSelectComponent>;

  billBanks = [];
  userId: any;
  userHeadId: any;
  index: any;
  selectedInvoice;
  selected;
  currentPaymentId: string;
  //total:Number=0;
  totalAdvance = 0;
  gstAmount = 0;
  netAmount = 0;
  taxAmount = 0;
  temp1: any;
  temp2: any;
  temp3: any;
  totalCredit = 0;
  totalInvoice = 0;
  totalCurrentPayment = 0;
  formSubmitted = false;
  loading = false;
  party: any[];
  invoiceList: any[];
  paymentTypeList: any[];
  paymentDetails: any[];
  advancePaymentList: any[];
  paymentDataListArray: PaymentData[] = [];

  paymentValues: Payment = new Payment();
  advancePayList: AdvancePayList = new AdvancePayList();
  // advancePaymentList: AdvancePayment = new AdvancePayment();
  paymentDataList: PaymentData = new PaymentData();

  public destroy$: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private partyService: PartyService,
    private route: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private jwt: JwtTokenService,
    private commonService: CommonService,
    private paymentService: PaymentService
  ) {
    this.paymentDataListArray.push(this.paymentDataList);
    this.paymentValues.paymentData = this.paymentDataListArray;
  }

  ngOnInit(): void {
    this.userId = this.jwt.getDecodeToken("userId");
    this.userHeadId = this.commonService.getUserHeadId().userHeadId;
    this.getPartyList();
    this.getUserId();
    this.getPaymentType();
    this.getBillBank();

    this.selected = [];

  }

  getBillBank() {
    this.loading = true;
    this.paymentService.getAllBillBank().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.billBanks = data["data"];
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

  public getUserId() {
    this.currentPaymentId = this._route.snapshot.paramMap.get("id");
  }
  getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().pipe(takeUntil(this.destroy$)).subscribe(
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

  partySelected(event) {
    this.selected = [];
    this.getPendingInvoices(event);
    this.getAdvancePaymentList(event);
  }

  getPendingInvoices(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.paymentValues.partyId) {
        this.paymentService.getPendingBillByPartyId(this.paymentValues.partyId).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.invoiceList = data["data"];
              this.loading = false;
            } else {
              this.invoiceList = [];
              this.loading = false;
            }
          },
          (error) => {
            this.loading = false;
          }
        );
      }
    }

  }
  getAdvancePaymentList(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.paymentValues.partyId) {
        this.paymentService.getAdvancePayment(this.paymentValues.partyId).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.advancePaymentList = data["data"];
              this.loading = false;
            } else {
              this.advancePaymentList = [];
              this.loading = false;
            }
          },
          (error) => {
            this.loading = false;
          }
        );
      }
    }
  }

  getPaymentDetailsByParty(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.paymentValues.partyId) {
        this.paymentService.getAdvancePayment(this.paymentValues.partyId).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.paymentDetails = data["data"];
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
    }

  }


  invoiceSelected(event) {
    let selected = event.selected;
    let inv = [];
    selected.forEach(element => {
      inv.push(element.invoicNo);
    })
    this.paymentValues.invoices = inv;
    this.totalInvoice = 0;
    this.gstAmount = 0;
    this.netAmount = 0;
    this.taxAmount = 0;
    event.selected.forEach(element => {
      this.totalInvoice = this.totalInvoice + element.netAmt;
      this.gstAmount = this.gstAmount + element.cgst + element.sgst;
      this.taxAmount = this.taxAmount + element.taxAmt;
    });
    this.paymentValues.totalBill = this.totalInvoice;
    this.paymentValues.gstAmt = this.gstAmount;
    this.paymentValues.amtToPay = this.paymentValues.totalBill;
    this.paymentValues.taxAmt = this.taxAmount;
    this.paymentValues.tdsAmt = (this.paymentValues.taxAmt * 2)/100;
    this.paymentValues.amtToPay = Math.ceil(this.paymentValues.amtToPay - this.paymentValues.tdsAmt);
  }

  advancePaymentSelected(event) {
    if (event.selected) {
      let selected = event.selected;
      let advance = [];
      selected.forEach(element => {
        advance.push(element.id);
      })

      this.paymentValues.advancePayList = advance;

      this.totalCredit = 0;
      event.selected.forEach(element => {
        this.totalCredit = this.totalCredit + element.amt;
      });
      if (this.totalCredit != 0 || this.totalCurrentPayment != 0) {
        this.paymentValues.amtPaid = this.totalCredit + this.totalCurrentPayment;
      } else {
        this.paymentValues.amtPaid = 0;
      }
    }

  }


  getPaymentType() {
    this.paymentService.getAllPaymentType().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.paymentTypeList = data["data"];
          this.paymentValues.paymentData.forEach((e) => {
            let ele = this.paymentTypeList.find(v => v.paymentType == "Cheque");
            if(ele){
              e.payTypeId = ele.id;
            }
          });
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


  typeSelected(rowIndex, row, elementId) {
    let id = this.paymentValues.paymentData[rowIndex].payTypeId;
    let flag = false;
    let count = 0;
    this.paymentValues.paymentData.forEach((e) => {
      if (count != rowIndex) {
        if (e.payTypeId == id) flag = true;
        count++;
      } else count++;
    });
  }


  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "paymentDetailsList" + (rowIndex + 1) + "-" + colName;
      if (rowIndex === this.paymentValues.paymentData.length - 1) {
        let item = this.paymentValues.paymentData[rowIndex];
        if (colName == "payType") {
          if (!item.payTypeId) {
            this.toastr.error("Enter payment type", "payment type required");
            return;
          }
        } else if (colName == "payAmt") {
          if (!item.payAmt) {
            this.toastr.error("Enter amount", "amount required");
            return;
          }
        } else if (colName == "chequeDate") {
          if (!item.chequeDate) {
            this.toastr.error("Enter date", "date required");
            return;
          }
        } else if (colName == "remark") {
          if (!item.remark) {
            this.toastr.error("Enter remark", "remark is required");
            return;
          }
        } else if (colName == "bank") {
          if (!item.bank) {
            this.toastr.error("Enter bank", "bank is required");
            return;
          }
        }
        let obj = {
          payTypeId: 3548230,
          payAmt: null,
          chequeDate: null,
          chequeNo: null,
          bank: null,
          remark: null,
          chequeStatus: null,
          controlId: null,
          id: null,
        };
        let list = this.paymentValues.paymentData;

        list.push(obj);
        this.paymentValues.paymentData = [...list];

        this.data.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.data.last.focus();
        })
      } else {
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 10);
      }
    }
  }

  removeItem(id) {
    //remove row
    let idCount = this.paymentValues.paymentData.length;
    let item = this.paymentValues.paymentData;
    if (idCount == 1) {
      item[0].payTypeId = null;
      item[0].payAmt = null;
      item[0].chequeDate = null;
      item[0].remark = null;
      item[0].bank = null;
      let list = item;
      this.paymentValues.paymentData = [...list];
    } else {
      let removed = item.splice(id, 1);
      let list = item;
      this.paymentValues.paymentData = [...list];
    }
  }

  amountObj = {};
  currentPaymentAdded(event, index) {
    let curPay = Number(event.target.value);
    this.amountObj[index] = {
      curPay
    }
    this.totalCurrentPayment = 0;
    Object.keys(this.amountObj).forEach(ele => {
      this.totalCurrentPayment += this.amountObj[ele].curPay;
    })
    this.paymentValues.amtPaid = 0;
    if (this.totalCredit != 0 || this.totalCurrentPayment != 0) {
      this.paymentValues.amtPaid = this.totalCredit + this.totalCurrentPayment;
    }
  }



  cdSelected(event) {
    let val = Number(event.target.value);
    this.paymentValues.amtToPay = Math.ceil(this.totalInvoice - (this.paymentValues.cdAmt + this.paymentValues.rdAmt + this.paymentValues.otherDiff + this.paymentValues.tdsAmt));
  }

  reset(paymentForm) {
    paymentForm.reset();
    this.formSubmitted = false;
    this.paymentValues.rdAmt = 0;
    this.paymentValues.cdAmt = 0;
    this.paymentValues.otherDiff = 0;
    this.paymentValues.amtPaid = 0;
    this.paymentValues.amtToPay = 0;
    this.totalCurrentPayment = 0;
    this.paymentValues.paymentData = [];
    this.paymentValues.invoices = [];
    this.paymentValues.advancePayList = [];
    this.paymentValues.totalBill = 0;
    this.paymentValues.gstAmt = 0;
    this.paymentValues.netAmt = 0;
    this.paymentDataListArray = [];
    this.paymentValues.paymentData = [];
    this.invoiceList = [];
    this.advancePaymentList = [];
    this.paymentDataListArray.push(this.paymentDataList);
    this.paymentValues.paymentData = this.paymentDataListArray;
  }

  onAddPayment(paymentForm) {
    if (this.paymentValues.amtToPay != this.paymentValues.amtPaid) {
      this.toastr.error("Amount to pay and Amount paid are not equal");
    } else if (this.paymentValues.amtToPay == 0 && this.paymentValues.amtPaid == 0){
      this.toastr.error("No Invoices are selected");
    } else {
      this.paymentService.savePayment(this.paymentValues).pipe(takeUntil(this.destroy$)).subscribe(
        data => {
          if (data['success']) {
            this.route.navigate(["/pages/payment/bill-payment"]);
            this.reset(paymentForm);
            this.toastr.success(errorData.Add_Success);
          }
          else {
            this.toastr.error(errorData.Add_Error)
          }
        },
        error => {
          this.toastr.error(errorData.Serever_Error)
        }
      )
    }
  }

  bankSelected(value, index, colName) {

    if (colName == "bank") {
      this.paymentValues.paymentData[index].bank = value.label;
    }
    this.billBanks.push({ name: value.label });
  }

  tableChange(event) {
    if (event === "view table") {
      this.route.navigate(['/pages/payment/payment']);
    }
  }

}
