import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AdvancePayment, Payment, PaymentData} from 'app/@theme/model/payment'
import { CommonService } from 'app/@theme/services/common.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { PartyService } from 'app/@theme/services/party.service';
import { PaymentService } from 'app/@theme/services/payment.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ngx-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.scss']
})
export class BillPaymentComponent implements OnInit {
  userId: any;
  userHeadId: any;
  index: any;

  currentPaymentId: string;
  total:Number=0;
  totalAdvance:Number=0;
  totalCredit:Number = 0;
  formSubmitted = false;
  loading = false;
  party: any[];
  invoiceList: any[];
  paymentTypeList:any[];
  paymentDetails:any[];
  paymentDataListArray: PaymentData[] = [];

  paymentValues: Payment = new Payment();

  advancePaymentList: AdvancePayment = new AdvancePayment();
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

  partySelected(event){
    this.getPendingInvoices(event);
    this.getAdvancePaymentList(event);
    this.getPaymentDetailsByParty(event);
  }

  getPendingInvoices(event){
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
  getAdvancePaymentList(event){
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

  getPaymentDetailsByParty(event){
    this.loading = true;
    if (event != undefined) {
      if (this.paymentValues.partyId) {
        this.paymentService.getAdvancePayment(this.paymentValues.partyId).subscribe(
          (data) => {
              if (data["success"]) {
                this.paymentDetails = data["data"];
                console.log(this.paymentDetails);
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

  setPaymentDetails(){
    //this.paymentValues.rdAmt = this.paymentDetails.rd
  }

  invoiceSelected(event){
    this.total=0;
    event.selected.forEach(element => {
      this.paymentValues.totalBill=this.total+element.amt;
    });
  }

  advancePaymentSelected(event){
    this.totalCredit=0;
    event.selected.forEach(element => {
      this.totalCredit=this.totalCredit+element.amt;
    });
  }

  getPaymentType(){
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
  

  typeSelected(rowIndex, row,elementId) {
    console.log(rowIndex ,row, elementId);
    let id = this.paymentValues.paymentData[rowIndex].payType;
    let flag = false;
    let count = 0;
    this.paymentValues.paymentData.forEach((e) => {
      if (count != rowIndex) {
        if (e.payType == id) flag = true;
        count++;
      } else count++;
    });
    }
  

  onKeyUp(e, rowIndex, colIndex, colName) {
    console.log(e, rowIndex, colIndex, colName);
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "paymentDetailsList" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.paymentValues.paymentData.length - 1) {
        let item = this.paymentValues.paymentData[rowIndex];
        console.log(item);
        if (colName == "payType") {
          if (!item.payType) {
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
        payType: null,
        payAmt: null,
        chequeDate: null,
        chequeNo: null,
        bank: null,
        remark: null,
        chequeStatus:null,
        controlId:null,
        id:null,
      };
      let list = this.paymentValues.paymentData;
      list.push(obj);
      this.paymentValues.paymentData = [...list];
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
        }, 50); alert("go to any last row input to add new row");
      }
     }
  }

  removeItem(id) {
    //remove row
    let idCount = this.paymentValues.paymentData.length;
    let item = this.paymentValues.paymentData;
    console.log(item);
    if (idCount == 1) {
      item[0].payType = null;
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

  onAddPayment(){
    if(this.total!=this.totalAdvance){
      this.toastr.error("total and advance payment are not equal");
    }
    else{
      
    }
  }

}
