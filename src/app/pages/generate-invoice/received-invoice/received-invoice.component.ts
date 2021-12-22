import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbPopoverDirective } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataFilter } from '../../../@theme/model/datafilter.model';
import { FilterParameter } from '../../../@theme/model/filterparameter.model';
import { PageData } from '../../../@theme/model/page-data.model';
import { RequestData } from '../../../@theme/model/request-data.model';
import { ResponseData } from '../../../@theme/model/response-data.model';
import { ConfirmationDialogComponent } from '../../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { GenerateInvoiceService } from '../../../@theme/services/generate-invoice.service';

@Component({
  selector: 'ngx-received-invoice',
  templateUrl: './received-invoice.component.html',
  styleUrls: ['./received-invoice.component.scss']
})
export class ReceivedInvoiceComponent implements OnInit {
  InvoiceList = [];
  copyInvoiceList = [];
  public loading: boolean = false;
  private destroy$ : Subject<void> = new Subject<void>();
  
  numberFlag: boolean = false;
  stringFlag: boolean = false;
  pageSizes: number[] = [10, 20, 50, 100];
  selectedPageSize: number = 20;
  requestData: RequestData = new RequestData();
  filterWord: string = '';
  selectedColumnForFilter:string = '';
  operatorSelected = null;
  public tableHeaders = ["invoiceNo", "partyName", "batchList", "totalMtr", "finishMtr","netAmt","date"];
  searchStr = "";
  searchANDCondition = false;
  @ViewChild('searchfilter', { static: true }) filterTextBox!: ElementRef;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  constructor(
    private route: Router,
    private generateInvoiceService: GenerateInvoiceService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.requestData.data = new DataFilter();
    this.requestData.getBy = "all";
    this.getAllInvoice();
  }

  tableChange(event) {
    if (event === "sign") {
      this.route.navigate(["/pages/generate_invoice/sign"]);
    } else if (event === "generate") {
      this.route.navigate(["/pages/generate_invoice/"]);
    }
  }

  deleteSignedInvoice(id){
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.generateInvoiceService.saveNewSignedInvoice([{invoiceNo: id, signByParty: false}]).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(data['msg']);
              this.getAllInvoice();
            } else {
              this.toastr.error(data['msg']);
            }
            this.loading = false;
          },
          (error) => {
            this.loading = false;
          }
        );
      }
    });
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    if(val){
      this.InvoiceList = this.copyInvoiceList.filter( f=>
        this.matchString(f, 'partyName', val) ||
        this.matchString(f, 'invoiceNo', val) ||
        this.matchString(f, 'totalMtr', val) ||
        this.matchString(f, 'batchList', val) ||
        this.matchString(f, 'finishMtr', val) ||
        this.matchString(f, 'netAmt', val)
      );
    }else{
      this.InvoiceList = cloneDeep(this.copyInvoiceList); 
    }
  }

  matchString(item, key, searchString){
    if(key == 'batchList'){
      return item[key].filter(f => f.batchId.toLowerCase().includes(searchString)).length > 0
    }else{
      return item[key].toString().toLowerCase().includes(searchString);
    }
  }

  getAllInvoice() {
    this.loading = true;
    this.InvoiceList = [];
    this.copyInvoiceList = [];
    this.generateInvoiceService.getAllDipatchV1(this.requestData,'signed').pipe(takeUntil(this.destroy$)).subscribe(
      (data: ResponseData) => {
        if (data["success"]) {
          const pageData = data.data as PageData;
          this.InvoiceList = pageData.data;
          this.requestData.data.total = pageData.total;
          this.InvoiceList.forEach(ele => {
            ele.netAmt = ele.netAmt.toFixed(2);
          })
          this.copyInvoiceList = data["data"];
        } else {
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
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

    if (column == "invoiceNo" || column == "partyName" || column == "createdAt") {
      this.stringFlag = true;
      this.numberFlag = false;
    } else {
      this.numberFlag = true;
      this.stringFlag = false;
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
