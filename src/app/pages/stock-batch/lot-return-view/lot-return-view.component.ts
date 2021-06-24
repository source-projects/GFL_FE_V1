import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { cloneDeep } from "lodash";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
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
  radioSelect = 0;
  radioArray = [
    { id: 1, value: "View Own", disabled: false },
    { id: 2, value: "View Group", disabled: false },
    { id: 3, value: "View All", disabled: false },
  ];
  public stockList: Array<any> = [];
  public copyStockList: Array<any> = [];

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
    this.getAllReturnLots();
  }

  getAllReturnLots() {
    this.loading = true;
    this.lotReturnService
      .returnLotgetAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          if (res["success"]) {
            this.stockList = this.copyStockList = res["data"];
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
}
