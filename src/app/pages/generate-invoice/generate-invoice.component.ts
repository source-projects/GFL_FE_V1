import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { NbPopoverDirective } from "@nebular/theme";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataFilter } from "../../@theme/model/datafilter.model";
import { RequestData } from "../../@theme/model/request-data.model";
import { PasswordDailogComponent } from '../../@theme/components';
import { GenerateInvoiceService } from "../../@theme/services/generate-invoice.service";
import { FilterParameter } from "../../@theme/model/filterparameter.model";

// import { Invoice } from "app/@theme/model/invoice";

@Component({
  selector: "ngx-generate-invoice",
  templateUrl: "./generate-invoice.component.html",
  styleUrls: ["./generate-invoice.component.scss"],
})
export class GenerateInvoiceComponent implements OnInit, OnDestroy {
  checked = false;
  in: number = 2;
  public loading = false;
  InvoiceList = [];
  copyInvoiceList = [];
  Invoice = [];
  finalcheckedrows = [];

  hidden: boolean = true;
  hiddenEdit: boolean = true;
  hiddenView: boolean = true;

  numberFlag: boolean = false;
  stringFlag: boolean = false;
  pageSizes: number[] = [10, 20, 50, 100];
  selectedPageSize: number = 20;
  requestData: RequestData = new RequestData();
  filterWord: string = '';
  selectedColumnForFilter:string = '';
  operatorSelected = null;
  @ViewChild('searchfilter', { static: true }) filterTextBox!: ElementRef;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  public tableHeaders = ["invoiceNo", "partyName", "batchList", "totalMtr", "finishMtr","netAmt","date"];
  searchStr = "";
  searchANDCondition = false;
  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private generateInvoiceService: GenerateInvoiceService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.requestData.data = new DataFilter();
    this.requestData.getBy = "all";
    this.getAllInvoice();
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.copyInvoiceList[0]);
    this.InvoiceList = this.copyInvoiceList.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] == "batchList") {
          for (let j = 0; j < item[keys[i]].length; j++) {
            if ((item[keys[i]][j].batchId &&
              item[keys[i]][j].batchId.toString().toLowerCase().indexOf(val) !== -1) ||
              !val) {
              return true;
            }

          }

        } else {
          if (
            (item[keys[i]] &&
              item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
            !val
          ) {
            return true;
          }
        }

      }


    });
  }

  getAllInvoice() {
    this.loading = true;

    this.generateInvoiceService.getAllDipatchV1(this.requestData).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.InvoiceList = data["data"];
          this.InvoiceList.forEach(ele => {
            ele.netAmt = ele.netAmt.toFixed(2);
          })
          this.copyInvoiceList = data["data"];
          this.copyInvoiceList.forEach(ele => {
            ele.netAmt = Number(ele.netAmt).toFixed(2);
          })
          this.Invoice = this.InvoiceList.map((element) => ({
            date: element.date,
            id: element.id,
            invoiceNo: element.invoiceNo,
            partyName: element.partyName,
            isSendToParty: element.isSendToParty,
            netAmt: element.netAmt,
            totalMtr: element.totalMtr,
            finishMtr: element.finishMtr
          }));
          this.copyInvoiceList = this.InvoiceList.map((element) => ({
            id: element.id,
            date: element.date,
            invoiceNo: element.invoiceNo,
            partyName: element.partyName,
            isSendToParty: element.isSendToParty,
            netAmt: element.netAmt,
            totalMtr: element.totalMtr,
            finishMtr: element.finishMtr

          }));
        } else {
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  print() {
    const queryParams: any = {};
    const arrayOfValues = this.finalcheckedrows;
    if (arrayOfValues.length != 0) {
      queryParams.myArray = JSON.stringify(arrayOfValues);
      const navigationExtras: NavigationExtras = {
        queryParams,
      };

      this.router.navigate(
        ["/pages/generate_invoice/print/"],
        navigationExtras
      );
    }
  }

  goToReport() {
    this.router.navigate(["/pages/generate_invoice/report"]);
  }

  onSelect(value: any) {
    this.finalcheckedrows = [];
    let arr: any[] = value.selected;
    arr.forEach((ele) => {
      this.finalcheckedrows.push(ele.invoiceNo);
    });
  }

  printCurrentInvoice($event, row) {
    this.finalcheckedrows = [];
    this.finalcheckedrows.push(row.invoiceNo);
    this.print();
  }

  deleteInvoice(invoiceNo){
    const modalRef = this.modalService.open(PasswordDailogComponent, {
      size: "sm",
    });
    modalRef.componentInstance.title = "Delete Invoice"
    modalRef.result.then((result) => {
      if (result) {
        this.loading = true;
        this.generateInvoiceService.deleteByInvoiceNo(invoiceNo).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success("Deleted Successfully.");
              this.getAllInvoice();
              this.loading = false;
            }
            else{
              this.loading = false;
            }
          },
        );
      }
    });
  }

  setPage(pageInfo) {
    this.requestData.data.pageIndex = pageInfo.offset;
    this.getAllInvoice();
  }

  pageSizeChanged(){
    this.requestData.data.pageSize = Number(this.selectedPageSize);
    this.getAllInvoice()
  }

  onOpenFilter(column) {

    if (column == "stockInType" || column == "partyName" || column == "qualityName" || column == "chlNo") {
      this.stringFlag = true;
      this.numberFlag = false;
    } else {
      if (column == "batchList") {
        this.numberFlag = true;
        this.stringFlag = false;
      }
    }

    const indexForOpen = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == column));
    if (indexForOpen > -1) {
      this.filterWord = this.requestData.data.parameters[indexForOpen].value;
      this.operatorSelected = this.requestData.data.parameters[indexForOpen].operator;
    }
    else {
      this.filterWord = '';
      this.operatorSelected = null;
    }
    this.selectedColumnForFilter = column;
    this.popover.show();
  }

  onApplyFilter() {
    this.popover.hide();
    const index = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == this.selectedColumnForFilter));
    if (index > -1) {
      this.requestData.data.parameters[index].operator = this.operatorSelected;
      this.requestData.data.parameters[index].value = this.filterWord;
    } else {
      let parameter = new FilterParameter();
      parameter.field = [this.selectedColumnForFilter];
      parameter.value = this.filterWord;
      parameter.operator = this.operatorSelected;
      this.requestData.data.parameters.push(parameter);
    }
    this.requestData.data.pageIndex = 0;
    this.getAllInvoice();
  }

  onClear(column?) {

    let index;
    if(column){
      index = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == column));
    } else{
      index = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == this.selectedColumnForFilter));
    }
    
    if (index > -1) {
      this.filterWord = '';
      this.operatorSelected = null;
      this.requestData.data.parameters.splice(index, 1);
      this.requestData.data.pageIndex = 0;
      this.getAllInvoice();
    }

  }

  closeFilterPopover() {
    this.popover.hide();
  }

  onClearFilter() {
    this.popover.hide();
    if (this.requestData.data.parameters.length > 0) {
      this.requestData.data.parameters = [];
      this.getAllInvoice();
    }
  }
}
