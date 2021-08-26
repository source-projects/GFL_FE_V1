import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sortBy } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BatchCard, BatchMrtWt, StockBatch } from '../../../@theme/model/stock-batch';
import { StockBatchService } from '../../../@theme/services/stock-batch.service';
import { PartyService } from '../../../@theme/services/party.service';
import { QualityService } from '../../../@theme/services/quality.service';
import { ToastrService } from 'ngx-toastr';
import { JobCardComponent } from '../job-card/job-card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'ngx-stock-in',
  templateUrl: 'stock-in.component.html',
  styleUrls: ['stock-in.component.scss']
})
export class StockInComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public currentStockId: number;
  private unsubscribe$ = new Subject<void>();
  public stockDataValues = [];
  public finalStockDataValues: any = [];
  public stockBatch: StockBatch = new StockBatch();
  public partyList = [];
  public qualityList = [];
  public wtPer100mtrCopy;
  public production_flag: any = [];
  public selectedPChallan;
  public selectedBatch;
  public selectedBatchIndex;
  public selectedBatchList = [];
  public selectedChallanList: any = [];
  public checkedChallanList = [];
  public chlListToTransfer = [];
  currentBatchSequence = 0;
  SelectionType = SelectionType;


  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private partyService: PartyService,
    private qualityService: QualityService,
    private stockBatchService: StockBatchService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnDestroy(): void {
    localStorage.removeItem('stockdata');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.currentStockId = Number(this.activeRoute.snapshot.queryParamMap.get('id'));
    // if(localStorage.getItem('stockdata')){
    this.getPartyList();
    this.getQualityList();
    this.getStockBatchById();
    // }else if(this.currentStockId){
    //   this.router.navigate(["/pages/stock-batch/edit",this.currentStockId]);
    // }else{
    //   this.router.navigate(["/pages/stock-batch"]);
    // }

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

              this.setStockDataValues1(data["data"]);
            }
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  setStockDataValues1(data) {
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

          let totatmtr = 0;
          let totalwt = 0;
          batch.batchMW.forEach(item => {
            totatmtr += item.mtr;
            totalwt += item.wt;
          });
          batch["totalMtr"] = totatmtr;
          batch["totalWt"] = totalwt;
          batch.batchMW[batch.batchMW.length - 1]['batchId'] = x.batchId;
          batch.batchMW[batch.batchMW.length - 1]['pchallanRef'] = x.pchallanRef;
          if (x.isProductionPlanned)
            this.production_flag[i] = true;
        }
      });

    });

    //for edit.....
    data.batchData.forEach(element => {
      if (!this.finalStockDataValues) {
        this.finalStockDataValues = [];
      }
      if (this.finalStockDataValues && element.batchId) {
        let index = this.finalStockDataValues.findIndex(f => f.batchId == element.batchId);
        if (index > -1) {
          if (this.finalStockDataValues[index].batchMW && !this.finalStockDataValues[index].batchMW.length) {
            this.finalStockDataValues[index].batchMW = [];
          }
          this.finalStockDataValues[index].batchMW.push(new BatchMrtWt(
            element.mtr,
            element.wt,
            element.isProductionPlanned,
            element.id,
            element.controlId
          ));
          let totatmtr = 0;
          let totalwt = 0;
          this.finalStockDataValues[index].batchMW.forEach(item => {
            totatmtr += item.mtr;
            totalwt += item.wt;
          });
          this.finalStockDataValues[index]["totalMtr"] = totatmtr;
          this.finalStockDataValues[index]["totalWt"] = totalwt;
          this.finalStockDataValues[index].batchMW[this.finalStockDataValues[index].batchMW.length - 1]['batchId'] = element.batchId;
          this.finalStockDataValues[index].batchMW[this.finalStockDataValues[index].batchMW.length - 1]['pchallanRef'] = element.pchallanRef;
          let i = this.stockDataValues.findIndex(f => f.batchMW.filter(m => m.id == element.id && m.pchallanRef == element.pchallanRef && !m.color).length);
          if (i > -1) {
            let rowIndex = this.stockDataValues[i].batchMW.findIndex(f => f.id == element.id && f.pchallanRef == element.pchallanRef && !f.color);
            if (rowIndex > -1) {
              this.stockDataValues[i].batchMW[rowIndex].color = this.finalStockDataValues[index].backColor;
            }
          }
        } else {
          if (!this.finalStockDataValues) {
            this.finalStockDataValues = [];
          }
          this.finalStockDataValues.push({ batchId: element.batchId, batchMW: [] })
          let idx = this.finalStockDataValues.length - 1;
          this.getRandomColor(this.finalStockDataValues[idx]);

          this.finalStockDataValues[idx].batchMW.push(new BatchMrtWt(
            element.mtr,
            element.wt,
            element.isProductionPlanned,
            element.id,
            element.controlId
          ));
          this.finalStockDataValues[idx].batchMW[this.finalStockDataValues[idx].batchMW.length - 1]['batchId'] = element.batchId;
          this.finalStockDataValues[idx].batchMW[this.finalStockDataValues[idx].batchMW.length - 1]['pchallanRef'] = element.pchallanRef;
          // this.stockDataValues[i].batchMW[rowindex].color
          let i = this.stockDataValues.findIndex(f => f.batchMW.filter(m => m.id == element.id && m.pchallanRef == element.pchallanRef && !m.color).length);
          if (i > -1) {
            let rowIndex = this.stockDataValues[i].batchMW.findIndex(f => f.id == element.id && f.pchallanRef == element.pchallanRef && !f.color);
            if (rowIndex > -1) {
              this.stockDataValues[i].batchMW[rowIndex].color = this.finalStockDataValues[idx].backColor;
            }
          }
        }
      }
    });

    //set isProductionFlag..
    this.finalStockDataValues.forEach(element => {
      if (element.batchMW.filter(f => f.isProductionPlanned).length) {
        element['isProductionPlanned'] = true;
      }
    });
  }

  batchPChallanSelected(pchallanRef) {
    this.selectedPChallan = pchallanRef;
    this.checkedChallanList = [];
    this.selectedChallanList = this.stockDataValues.filter(f => f.pchallanRef == this.selectedPChallan)[0];
  }

  batchSelected(batchId, i) {
    this.selectedBatch = batchId;
    this.selectedBatchIndex = i;
  }

  addBatch(e) {
    var ob = new BatchCard();
    // ob.batchMW.push();
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
              this.currentBatchSequence = ob.batchId
              this.selectedBatch = this.currentBatchSequence;
              this.selectedBatchIndex = this.finalStockDataValues.length - 1;
            }
            this.getRandomColor(ob);
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
      // ob.batchMW.push(new BatchMrtWt());
      this.getRandomColor(ob);
      this.finalStockDataValues.push({ ...ob });
      this.getCurrentBatchSequence();
      this.finalStockDataValues[0].batchId = this.currentBatchSequence;
      this.selectedBatch = this.currentBatchSequence;
      this.selectedBatchIndex = this.finalStockDataValues.length - 1;
    }
  }

  getCurrentBatchSequence() {
    this.stockBatchService.getBatchSequence(true).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      if (data["success"]) {
        this.currentBatchSequence = data["data"]["sequence"];
        if (this.finalStockDataValues && this.finalStockDataValues[0])
          this.finalStockDataValues[0].batchId = this.currentBatchSequence;
        this.selectedBatch = this.currentBatchSequence;
        this.selectedBatchIndex = this.finalStockDataValues.length - 1;
      }
    });
  }

  challanGRSelected(event) {
    this.checkedChallanList = event.selected
  }

  removeItemFromBatchList(index) {
    let removed = this.finalStockDataValues[this.selectedBatchIndex].batchMW.splice(index, 1);
    if (removed && removed[0] && removed[0].pchallanRef) {
      let idx = this.stockDataValues.findIndex(f => f.pchallanRef == removed[0].pchallanRef);
      removed[0]['batchId'] = null;
      removed[0].color = '';

      let value = this.stockDataValues[idx].batchMW.findIndex(v => v.id == removed[0].id);
      // this.stockDataValues[idx].batchMW = [...this.stockDataValues[idx].batchMW, removed[0]]
      this.stockDataValues[idx].batchMW[value].color = '';
      this.stockDataValues[idx].batchMW[value].batchId = null;
      this.finalStockDataValues[this.selectedBatchIndex].batchMW = [...this.finalStockDataValues[this.selectedBatchIndex].batchMW];
      let temp = {};
      let sumMtr = 0;
      let sumWt = 0;
      let count = 0;
      this.finalStockDataValues[this.selectedBatchIndex].batchMW.forEach(element => {
        sumMtr += element.mtr;
        sumWt += element.wt;
        count = count + 1;
      });
      temp["mtr"] = sumMtr;
      temp["wt"] = sumWt;
      temp["pcs"] = count;
      this.totalObj[this.selectedBatch] = temp;
      this.cdr.detectChanges();
    }
  }

  deleteBatch(batch, i) {
    batch.batchMW.forEach(element => {
      // element.batchId = null;

      let idx = this.stockDataValues.findIndex(f => f.batchMW.filter(m => m.batchId == element.batchId && m.batchId).length);
      // this.stockDataValues[idx].batchMW = [...this.stockDataValues[idx].batchMW, element]
      if (idx > -1) {
        let rowIndex = this.stockDataValues[idx].batchMW.findIndex(f => f.batchId == element.batchId && f.batchId);
        if (rowIndex > -1) {
          this.stockDataValues[idx].batchMW[rowIndex].batchId = null;
          this.stockDataValues[idx].batchMW[rowIndex].color = '';
        }
      }
      element.batchId = null;
      console.log(element, this.stockDataValues[idx])
    });
    let removed = this.finalStockDataValues.splice(i, 1);
    this.selectedBatch = null;
    this.selectedBatchIndex = -1;
  }

  transferedMtr = null;
  transferedWt = null;
  totalObj = {};
  transferClicked() {
    if (this.selectedBatch) {
      let batch = this.finalStockDataValues.filter(v => v.batchId == this.selectedBatch);
      if (batch && batch.length && batch[0]) {
        if (batch[0].isProductionPlanned) {
          this.toastr.error("Production planned for this batch!");
        }
        else {
          if (this.checkedChallanList && this.checkedChallanList.length) {
            if (this.finalStockDataValues.length && this.selectedBatch) {
              let index = this.finalStockDataValues.findIndex(f => f.batchId == this.selectedBatch);
              let invalid = false;
              let temp = {};

              this.checkedChallanList.forEach(e => {
                if (e.color) {
                  invalid = true;
                  return;
                }
                else {
                  this.finalStockDataValues[index].batchMW.push([e].map(m => ({ ...m, batchId: this.selectedBatch, pchallanRef: e.pchallanRef }))[0])
                  let i = this.stockDataValues.findIndex(item => item.pchallanRef == e.pchallanRef);
                  let rowindex = this.stockDataValues[i].batchMW.findIndex(val => val.id == e.id);
                  this.stockDataValues[i].batchMW[rowindex].batchId = this.selectedBatch;
                  this.stockDataValues[i].batchMW[rowindex].color = this.finalStockDataValues[index].backColor;
                  this.finalStockDataValues[index].batchMW = [...this.finalStockDataValues[index].batchMW];
                  let sumMtr = 0;
                  let sumWt = 0;
                  let count = 0;
                  this.finalStockDataValues[index].batchMW.forEach(element => {
                    sumMtr += element.mtr;
                    sumWt += element.wt;
                    count = count + 1;
                  });
                  temp["mtr"] = sumMtr;
                  temp["wt"] = sumWt;
                  temp["pcs"]=count;
                  this.totalObj[this.selectedBatch] = temp;

                }
              });
              if (invalid) {
                this.toastr.error("Selected GR already exist in batch");
              }
              this.checkedChallanList = [];
            } else {
              this.toastr.error("Select Batch first");
            }
          } else {
            this.toastr.error("Select challan grs first");
          }
        }
      }
    }
    else {
      this.toastr.error("Select Batch first");
    }

  }

  addUpdateStockBatch(myForm, print?) {
    if (this.finalStockDataValues && this.finalStockDataValues.length) {
      this.stockBatch.batchData = [];
      for (let batch of this.finalStockDataValues) {
        if (batch.batchMW && batch.batchMW) {
          batch.batchMW.forEach(element => {
            this.stockBatch.batchData.push({ ...element });
          });
        } else {
          this.toastr.error(`${batch.batchId} GRs are empty`);
          return false;
        }
      }
      this.loading = true;
      this.stockBatchService.updateStockBatch(this.stockBatch).pipe(takeUntil(this.unsubscribe$)).subscribe(
        res => {
          if (res['success']) {
            this.toastr.success(res['msg']);
            if (print) {
              this.printJobCard(myForm, res['data']);
            }
            this.router.navigate(['pages/stock-batch']);
          } else {
            this.toastr.error(res['msg']);
          }
          this.loading = false;
        }, err => {
          this.loading = false;
        }
      )
    }
  }

  printJobCard(form, data) {
    const modalRef = this.modalService.open(JobCardComponent);
    modalRef.componentInstance.isDirectPrintFlag = true;
    modalRef.componentInstance.stockBatchData = this.stockBatch;
    modalRef.componentInstance.stockId = Number(data);
    modalRef.result.then((result) => {
    });
  }

  getRandomColor(ob) {
    let color = '#';
    let letters = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    ob.backColor = color;
  }


}
