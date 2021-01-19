import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Payment} from 'app/@theme/model/payment'
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
  currentPaymentId: string;
  total:Number=0;
  totalAdvance:Number = 0;
  formSubmitted = false;
  loading = false;
  party: any[];
  paymentList: any[];
  advancePaymentList: any[];

  paymentValues: Payment = new Payment();

  constructor(
    private partyService: PartyService,
    private route: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private jwt: JwtTokenService,
    private commonService: CommonService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.userId = this.jwt.getDecodeToken("userId");
    this.userHeadId = this.commonService.getUserHeadId().userHeadId;
    this.getPartyList();
    this.getUserId();
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
  getPendingInvoices(event){
    this.getAdvancePaymentList(event);
    this.loading = true;
    if (event != undefined) {
      if (this.paymentValues.partyId) {
        this.paymentService.getPendingBillByPartyId(this.paymentValues.partyId).subscribe(
          (data) => {
              if (data["success"]) {
                this.paymentList = data["data"];
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

  invoiceSelected(event){
    this.total=0;
    event.selected.forEach(element => {
      this.total=this.total+element.amt;
    });
  }

  advancePaymentSelected(event){
    this.totalAdvance=0;
    event.selected.forEach(element => {
      this.totalAdvance=this.totalAdvance+element.amt;
    });
  }

  onAddPayment(){
    if(this.total!=this.totalAdvance){
      this.toastr.error("total and advance payment are not equal");
    }
    else{
      
    }
  }

}
