import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvancePayList, Payment, PaymentData } from 'app/@theme/model/payment'
import { CommonService } from 'app/@theme/services/common.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { PartyService } from 'app/@theme/services/party.service';
import { PaymentService } from 'app/@theme/services/payment.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from 'app/@theme/json/error.json';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'ngx-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.scss']
})
export class BillPaymentComponent implements OnInit {
  @ViewChildren('data') data: QueryList<NgSelectComponent>;
  userId: any;
  userHeadId: any;
  index: any;
  selectedInvoice;
  selected;
  currentPaymentId: string;
  //total:Number=0;
  totalAdvance = 0;
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
    this.selected = [];
    // this.paymentValues.rdAmt = 0;
    // this.paymentValues.cdAmt = 0;
    // this.paymentValues.otherDiff = 0;
    // this.paymentValues.amtPaid = 0;

  }

  public getUserId() {
    this.currentPaymentId = this._route.snapshot.paramMap.get("id");
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

  partySelected(event) {
    this.selected = [];
    this.getPendingInvoices(event);
    this.getAdvancePaymentList(event);
    //this.getPaymentDetailsByParty(event);
  }

  getPendingInvoices(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.paymentValues.partyId) {
        this.paymentService.getPendingBillByPartyId(this.paymentValues.partyId).subscribe(
          (data) => {
            if (data["success"]) {
              this.invoiceList = data["data"];
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
    }

  }
  getAdvancePaymentList(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.paymentValues.partyId) {
        this.paymentService.getAdvancePayment(this.paymentValues.partyId).subscribe(
          (data) => {
            if (data["success"]) {
              this.advancePaymentList = data["data"];
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
    }
  }

  getPaymentDetailsByParty(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.paymentValues.partyId) {
        this.paymentService.getAdvancePayment(this.paymentValues.partyId).subscribe(
          (data) => {
            if (data["success"]) {
              this.paymentDetails = data["data"];
              this.loading = false;
              //this.setPaymentDetails();
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
    }

  }

  setPaymentDetails() {
    //this.paymentValues.rdAmt = this.paymentDetails.rd
  }

  invoiceSelected(event) {
    let selected = event.selected;
    let inv = [];
    selected.forEach(element => {
      inv.push(element.invoicNo);
    })
    this.paymentValues.invoices = inv;
    this.totalInvoice = 0;
    event.selected.forEach(element => {
      this.totalInvoice = this.totalInvoice + element.amt;
    });
    this.paymentValues.totalBill = this.totalInvoice;
    this.paymentValues.amtToPay = this.totalInvoice;
  }

  advancePaymentSelected(event) {
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
    }
  }

  gstSelected(event) {
    if (event.target.value || event.target.value == "") {
      this.paymentValues.totalBill = this.totalInvoice;
      this.paymentValues.amtToPay = this.totalInvoice;
    }
    let gst = Number(event.target.value);
    this.paymentValues.amtToPay = this.totalInvoice - gst;
  }

  getPaymentType() {
    this.paymentService.getAllPaymentType().subscribe(
      (data) => {
        if (data["success"]) {
          this.paymentTypeList = data["data"];
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
          payTypeId: null,
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
        // list.forEach(element=>{
        //   this.totalCurrentPayment = this.totalCurrentPayment + element.payAmt;
        // })
        list.push(obj);
        this.paymentValues.paymentData = [...list];

        this.data.changes.subscribe(() => {
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
  currentPaymentAdded(event,index) {
    let curPay = Number(event.target.value);
    this.amountObj[index] = {
      curPay
    }
    this.totalCurrentPayment = 0;
    Object.keys(this.amountObj).forEach(ele=>{
      this.totalCurrentPayment += this.amountObj[ele].curPay; 
    })
    this.paymentValues.amtPaid = 0;
    if (this.totalCredit != 0 || this.totalCurrentPayment != 0) {
      this.paymentValues.amtPaid = this.totalCredit + this.totalCurrentPayment;
    }
  }



  cdSelected(event) {
    let val = Number(event.target.value);
    this.paymentValues.amtToPay = this.totalInvoice - (this.paymentValues.cdAmt + this.paymentValues.rdAmt + this.paymentValues.otherDiff);
  }

  reset(paymentForm){
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
    this.invoiceList = [];
    this.advancePaymentList = [];
  }

  onAddPayment(paymentForm) {
    if (this.paymentValues.amtToPay != this.paymentValues.amtPaid) {
      this.toastr.error("amount to pay and amount paid are not equal");
    }
    else {
      this.paymentService.savePayment(this.paymentValues).subscribe(
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

}
