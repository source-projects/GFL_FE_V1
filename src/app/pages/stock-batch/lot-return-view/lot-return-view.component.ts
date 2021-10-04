import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NbPopoverDirective } from "@nebular/theme";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { cloneDeep } from "lodash";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { PageData } from "../../../@theme/model/page-data.model";
import { ResponseData } from "../../../@theme/model/response-data.model";
import { DataFilter } from "../../../@theme/model/datafilter.model";
import { FilterParameter } from "../../../@theme/model/filterparameter.model";
import { RequestData } from "../../../@theme/model/request-data.model";
import { StockBatchService } from "../../../@theme/services/stock-batch.service";
import { InputBatchComponent } from "../input-batch/input-batch.component";

@Component({
  selector: "ngx-lot-return-view",
  templateUrl: "./lot-return-view.component.html",
  styleUrls: ["./lot-return-view.component.scss"],
})
export class LotReturnViewComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public disabled: boolean = false;
  tablestyle = "bootstrap";
  searchStr: string = '';
  radioSelect = 0;
  radioArray = [
    { id: 1, value: "View Own", disabled: false },
    { id: 2, value: "View Group", disabled: false },
    { id: 3, value: "View All", disabled: false },
  ];
  public stockList: Array<any> = [];
  public copyStockList: Array<any> = [];
  tableHeaders: string[] = ["chlNo", "partyName", "qualityName", "batchReturnList", "broker", "tempoNo"];
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

  private destroy$ = new Subject<void>();

  constructor(
    private lotReturnService: StockBatchService,
    private route: Router,
    private modalService: NgbModal
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.requestData.data = new DataFilter();
    this.requestData.getBy = "all";
    this.getAllReturnLots();
  }

  getAllReturnLots() {
    this.loading = true;
    this.lotReturnService
      .returnLotgetAllPaginated(this.requestData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: ResponseData) => {
          if (res["success"]) {
            // this.stockList = this.copyStockList = res["data"];
            const pageData = res.data as PageData;
            this.copyStockList = this.stockList = pageData.data;
            this.requestData.data.total = pageData.total;
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    if (val) {
      this.stockList = this.copyStockList.filter(
        (f) =>
          this.matchString(f, "partyName", val) ||
          this.matchString(f, "qualityName", val) ||
          this.matchString(f, "chlNo", val) ||
          this.matchString(f, "batchId", val) ||
          this.matchString(f, "broker", val) ||
          this.matchString(f, "tempoNo", val) 
      );
    } else {
      this.stockList = cloneDeep(this.copyStockList);
    }
  }

  matchString(item, key, searchString) {
    if (key == "batchId") {
      return (
        item["batchReturnList"].filter(
          (f) =>
            f.mtr.toString().toLowerCase().includes(searchString) ||
            f.wt.toString().toLowerCase().includes(searchString)
        ).length > 0
      );
    } else {
      return item[key].toString().toLowerCase().includes(searchString);
    }
  }

  print(item) {
    this.route.navigate([
      `pages/stock-batch/return-lot/print`],
      { queryParams: { chlNo: item.chlNo } },
    );
  }

  setViewJobValue(event) {
    if (event === "view table") {
      this.route.navigate(["/pages/stock-batch/view"]);
    } else if (event === "job card") {
      const modalRef = this.modalService.open(InputBatchComponent);
    } else if (event === "pending") {
      this.route.navigate(["/pages/stock-batch/pending"]);
    } else if (event == "return") {
      this.route.navigate(["/pages/stock-batch/return-lot"]);
    }
  }

  setPage(pageInfo) {
    this.requestData.data.pageIndex = pageInfo.offset;
    this.getAllReturnLots();
  }

  pageSizeChanged(){
    this.requestData.data.pageSize = Number(this.selectedPageSize);
    this.getAllReturnLots();
  }

  onOpenFilter(column) {

    if (true) {
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
    this.getAllReturnLots();
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
      this.getAllReturnLots();
    }

  }

  closeFilterPopover() {
    this.popover.hide();
  }

  onClearFilter() {
    this.popover.hide();
    if (this.requestData.data.parameters.length > 0) {
      this.requestData.data.parameters = [];
      this.getAllReturnLots();
    }
  }
}
