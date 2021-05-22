import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { AdvancePayment } from '../../../@theme/model/advance-payment';
import { CommonService } from '../../../@theme/services/common.service';
import { JwtTokenService } from '../../../@theme/services/jwt-token.service';
import { PartyService } from '../../../@theme/services/party.service';
import { PaymentService } from '../../../@theme/services/payment.service';

@Component({
  selector: 'ngx-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.scss']
})
export class AdvancePaymentComponent implements OnInit, OnDestroy {

  @ViewChildren('data') data: QueryList<NgSelectComponent>;

  AdvancebillBanks = [];
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

  public destroy$ : Subject<void> = new Subject<void>();
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

    this.advancePaymentArray.push(this.advancePaymentValues);
  }

  ngOnInit(): void {
    this.userId = this.jwt.getDecodeToken("userId");
    this.userHeadId = this.commonService.getUserHeadId().userHeadId;
    this.getPartyList();
    this.getUserId();
    this.getPaymentType();
    this.getAdvanceBillBank();
  }


  getAdvanceBillBank(){
    this.loading = true;
    this.paymentService.getAllAdvancePaymentBanks().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.AdvancebillBanks = data["data"];
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
    this.currentAdvancePaymentId = this._route.snapshot.paramMap.get("id");

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

  getPaymentType() {
    this.paymentService.getAllPaymentType().pipe(takeUntil(this.destroy$)).subscribe(
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

  reset(form){
    form.reset();
    this.formSubmitted = false;
    this.advancePaymentArray = [];
    this.advancePaymentArray.push(this.advancePaymentValues);


  }

  addAdvancePayment(event) {
    this.formSubmitted = true;
    this.advancePaymentArray.forEach(element => {
      element.payTypeId = Number(element.payTypeId);
      element.no = Number(element.no);
    })

    this.paymentService.addAdvancePayment(this.advancePaymentArray).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        if (data['success']) {
         // this.route.navigate(["/pages/payment/bill-payment"]);
          this.toastr.success(data['msg']);
          this.reset(event)
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      error => {
      }
    )
  }

  bankSelected(value,index,colName){
    
    if(colName == "bank"){
      this.advancePaymentArray[index].bank = value.label;
    }
    this.AdvancebillBanks.push({name:value.label});
  }

}
