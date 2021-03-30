import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import * as errorData from '../../../@theme/json/error.json';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvancePayment } from '../../../@theme/model/advance-payment';
import { CommonService } from '../../../@theme/services/common.service';
import { JwtTokenService } from '../../../@theme/services/jwt-token.service';
import { PartyService } from '../../../@theme/services/party.service';
import { PaymentService } from '../../../@theme/services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'ngx-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.scss']
})
export class AdvancePaymentComponent implements OnInit {

  @ViewChildren('data') data: QueryList<NgSelectComponent>;

  userId: any;
  userHeadId: any;
  currentAdvancePaymentId: string;
  chequeAmt: Number;
  total: Number = 0;
  index: any;
  formSubmitted = false;
  loading = false;
  cashSelected = false;

  party: any[];
  paymentTypeList: any[];

  advancePaymentValues: AdvancePayment = new AdvancePayment();
  advancePaymentArray: AdvancePayment[] = [];

  constructor(
    private partyService: PartyService,
    private route: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private jwt: JwtTokenService,
    private commonService: CommonService,
    private paymentService: PaymentService
  ) {

    this.advancePaymentArray.push(this.advancePaymentValues);
  }

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
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getPaymentType() {
    this.paymentService.getAllPaymentType().subscribe(
      (data) => {
        if (data["success"]) {
          this.paymentTypeList = data["data"];
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

  paymentTypeSelected(event) {
    if (event == 14460) {
      this.cashSelected = true;
      this.advancePaymentValues.amt = 0;
    } else {
      this.cashSelected = false;

    }
  }

  onKeyUp(e, rowIndex, colIndex, colName) {

    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "advancePaymentList" + (rowIndex + 1) + "-" + colName;
      if (rowIndex === this.advancePaymentArray.length - 1) {
        let item = this.advancePaymentArray[rowIndex];
        if (colName == "payTypeId") {
          if (item.payTypeId == null) {
            this.toastr.error("Enter payment type", "payment type required");
            return;
          }
        } else if (colName == "amt") {
          if (item.amt == null) {
            this.toastr.error("Enter amount", "amount required");
            return;
          }
        }

        let obj = {
          partyId: this.advancePaymentArray[rowIndex].partyId,
          amt: null,
          payTypeId: null,
          paymentBunchId: null,
          remark: null,
          no: null,
          bank: null,
          createdBy: null,
          creditId: null,
        };
        let list = this.advancePaymentArray;
        list.push(obj);
        this.advancePaymentArray = [...list];
        
        
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
        }, 50);
      }
    }
  }

  removeItem(id) {
    //remove row
    let idCount = this.advancePaymentArray.length;
    let item = this.advancePaymentArray;
    if (idCount == 1) {
      item[0].payTypeId = null;
      item[0].amt = null;
      item[0].remark = null;
      item[0].bank = null;
      item[0].no = null;

      let list = item;
      this.advancePaymentArray = [...list];
    } else {
      let removed = item.splice(id, 1);
      let list = item;
      this.advancePaymentArray = [...list];
    }
  }

  typeSelected(rowIndex, row, elementId) {
    let id = this.advancePaymentArray[rowIndex].payTypeId;
    let flag = false;
    let count = 0;
    this.advancePaymentArray.forEach((e) => {
      if (count != rowIndex) {
        if (e.payTypeId == id) flag = true;
        count++;
      } else count++;
    });
  }

  addAdvancePayment(event) {
    this.formSubmitted = true;
    this.advancePaymentArray.forEach(element => {
      element.payTypeId = Number(element.payTypeId);
      element.no = Number(element.no);
    })

    this.paymentService.addAdvancePayment(this.advancePaymentArray).subscribe(
      data => {
        if (data['success']) {
          this.route.navigate(["/pages/payment/bill-payment"]);
          this.toastr.success(data['msg']);
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      error => {
      }
    )
  }

}
