import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep, sortBy } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BatchCard, BatchMrtWt, StockBatch } from '../../../@theme/model/stock-batch';
import { StockBatchService } from '../../../@theme/services/stock-batch.service';
import { PartyService } from '../../../@theme/services/party.service';
import { QualityService } from '../../../@theme/services/quality.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-stock-in',
  templateUrl: './stock-in.component.html',
  styleUrls: ['./stock-in.component.scss']
})
export class StockInComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public currentStockId: number;
  private unsubscribe$ = new Subject<void>();
  public stockDataValues = [];
  public finalStockDataValues:any = [];
  public stockBatch: StockBatch = new StockBatch();
  public partyList = [];
  public qualityList = [];
  public wtPer100mtrCopy;
  public production_flag: any = [];
  public selectedPChallan;
  public selectedBatch;
  public selectedBatchList = [];
  public selectedChallanList:any = [];
  public checkedChallanList = [];
  public chlListToTransfer = [];
  currentBatchSequence = 0;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private partyService: PartyService,
    private qualityService: QualityService,
    private stockBatchService: StockBatchService,
    private toastr: ToastrService,
  ) { }

  ngOnDestroy(): void {
    localStorage.removeItem('stockdata');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.currentStockId = Number(this.activeRoute.snapshot.queryParamMap.get('id'));
    if(localStorage.getItem('stockdata')){
      this.getPartyList();
      this.getQualityList();
      this.getStockBatchById();
    }else if(this.currentStockId){
      this.router.navigate(["/pages/stock-batch/edit",this.currentStockId]);
    }else{
      this.router.navigate(["/pages/stock-batch"]);
    }
    
  }

  getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getQualityList() {
    this.loading = true;
    this.qualityService.getQualityNameData().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (data) => {
        if (data["success"]) {
          if (data["data"] && data["data"].length > 0) {
            this.qualityList = data["data"];
          } else {
          }
        } else {
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getStockBatchById() {
    this.loading = true;
    this.stockBatchService
      .getStockBatchById(this.currentStockId)
      .pipe(takeUntil(this.unsubscribe$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.stockBatch.receiveDate = new Date(data["data"].receiveDate);
            this.stockBatch.qualityId = data["data"].qualityId;
            this.stockBatch = data["data"];
            this.stockBatch.chlDate = new Date(this.stockBatch.chlDate);
            this.stockBatch.receiveDate = new Date(this.stockBatch.receiveDate);
            if (!this.stockBatch.batchData.length) {
            } else {
              this.stockBatch.batchData = sortBy(
                data["data"].batchData,
                "pchallanRef"
              );
              let batch1 = this.stockBatch.batchData.map((element) => {
                element.pchallanRef;
              });

              this.setStockDataValues1();
            }
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  setStockDataValues1() {
    let pChallanIDs = [
      ...new Set(this.stockBatch.batchData.map((x) => x.pchallanRef)),
    ];
    this.stockDataValues = [];
    pChallanIDs.forEach((x, i) => {
      this.stockDataValues.push(new BatchCard());
      this.stockDataValues[i].pchallanRef = pChallanIDs[i];
      this.stockDataValues[i]['old'] = true;
    });
    if (this.qualityList.length != 0) {
      this.qualityList.forEach((element) => {
        if (element.id == this.stockBatch.qualityId) {
          this.wtPer100mtrCopy = element.wtPer100m;
          this.stockBatch.unit = element.unit;
        }
      });
    }

    this.stockDataValues.forEach((batch, i) => {
      this.production_flag[i] = false;
      this.stockBatch.batchData.forEach((x, j) => {
        if (x.pchallanRef == batch.pchallanRef) {
          batch.batchMW.push(
            new BatchMrtWt(
              x.mtr,
              x.wt,
              x.isProductionPlanned,
              x.id,
              x.controlId
            )
          );
          //batch.isProductionPlanned = x.isProductionPlanned;
          if (x.isProductionPlanned)
            this.production_flag[i] = true;
        }
      });

    });
  }

  batchPChallanSelected(pchallanRef){
    this.selectedPChallan = pchallanRef;
    this.checkedChallanList = [];
    this.selectedChallanList = this.stockDataValues.filter(f => f.pchallanRef == this.selectedPChallan)[0];
    console.log(this.selectedChallanList)
  }

  batchSelected(batchId){
    this.selectedBatch = batchId;
  }

  addBatch(e){
    var ob = new BatchCard();
    ob.batchMW.push(new BatchMrtWt());
    if (this.finalStockDataValues.length) {
      let index = this.finalStockDataValues.findIndex((v) => v.batchId == null);
      if (index > -1) {
        this.toastr.error("Please fill all the required fields");
      } else {
        let itemList = [...this.finalStockDataValues];
        itemList = sortBy(itemList, "pchallanRef", "asc");
        let nextBatchId = itemList[itemList.length - 1].batchId;
        //call update sequence api.....
            
        this.stockBatchService.getBatchSequence(true).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
          if (data["success"]) {
            ob.batchId = data["data"].sequence;
            if (ob.batchId < this.currentBatchSequence) {
              ob.batchId = this.currentBatchSequence;
              this.selectedBatch = this.currentBatchSequence;
            }
        this.finalStockDataValues.push({ ...ob });
        const className = "collapsible-panel--expanded";
        if (e.target.classList.contains(className)) {
          e.target.classList.remove(className);
        } else {
          e.target.classList.add(className);
        }
          }
        });
      }
    } else {
      this.finalStockDataValues = [];
      var ob = new BatchCard();
      ob.batchMW.push(new BatchMrtWt());
      this.finalStockDataValues.push({ ...ob });
      this.getCurrentBatchSequence();
      this.finalStockDataValues[0].batchId = this.currentBatchSequence;
    }
  }

  getCurrentBatchSequence() {
    this.stockBatchService.getBatchSequence(true).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      if (data["success"]) {
        this.currentBatchSequence = data["data"]["sequence"];
        // this.currentBatchSeqId = data["data"]["id"];
        if (this.finalStockDataValues && this.finalStockDataValues[0])
          this.finalStockDataValues[0].batchId = this.currentBatchSequence;
          this.selectedBatch = this.currentBatchSequence;
      }
    });
  }

  onChallanSelection(event){
  }

  removeItemFromBatchList(index){
  }

  transferClicked(){
    
  }

}
