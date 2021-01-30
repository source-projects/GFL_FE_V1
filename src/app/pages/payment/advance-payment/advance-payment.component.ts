import { Component, OnInit } from '@angular/core';
import * as errorData from 'app/@theme/json/error.json';
import { ActivatedRoute, Router } from '@angular/router';
import {AdvancePayment} from 'app/@theme/model/payment';
import { CommonService } from 'app/@theme/services/common.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { PartyService } from 'app/@theme/services/party.service';
import { PaymentService } from 'app/@theme/services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.scss']
})
export class AdvancePaymentComponent implements OnInit {

  userId: any;
  userHeadId: any;
  currentAdvancePaymentId: string;
  chequeAmt:Number;
  total:Number=0;

  formSubmitted = false;
  loading = false;
  cashSelected = false;
  
  party: any[];
  paymentTypeList:any[];
  //advancePaymentList: any[];

  advancePaymentValues: AdvancePayment = new AdvancePayment();


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
    this.getPaymentType();
  }

  public getUserId() {
    this.currentAdvancePaymentId = this._route.snapshot.paramMap.get("id");
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

  getPaymentType(){
    this.paymentService.getAllPaymentType().subscribe(
      (data) => {
          if (data["success"]) {
            this.paymentTypeList = data["data"];
            console.log(this.paymentTypeList);
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

  paymentTypeSelected(event){
    if(event == 14460){
      this.cashSelected = true;
      this.advancePaymentValues.amt = 0;
    }else{
      this.cashSelected = false;

    }
  }

  addAdvancePayment(event){
    delete event.value.chequeAmt;
    this.paymentService.addAdvancePayment(event.value).subscribe(
      data => {
        if (data['success']) {
          this.route.navigate(["/pages/payment/advance-payment"]);
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
