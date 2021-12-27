import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductionPlanningService } from '../../../@theme/services/production-planning.service';
import { DyeingChemicalData } from '../../../@theme/model/dyeing-process';
import { DyeingProcessService } from '../../../@theme/services/dyeing-process.service';
import { PlanningSlipService } from '../../../@theme/services/planning-slip.service';
import * as wijmo from "@grapecity/wijmo";
import { sortBy as _sortBy } from 'lodash';

@Component({
  selector: 'ngx-slip-from-jet',
  templateUrl: './slip-from-jet.component.html',
  styleUrls: ['./slip-from-jet.component.scss']
})
export class SlipFromJetComponent implements OnInit {

  @Input("arrayForBatchesForPrint") arrayForBatchesForPrint = [];
  @Input("directPrintFromJet") directPrintFromJet = false;
  @Input("objToPassInRequest") objToPassInRequest = {};
  myDate;
  allData = [];
  itemList = [];
  itemListArray = [];
  itemListArrayCopy = [];
  slipObj: any;
  loading = false;
  constructor(public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private productionPlanningService: ProductionPlanningService,
    private DyeingProcessService: DyeingProcessService,
    private planningSlipService: PlanningSlipService,
    private modalService: NgbModal) {
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, "dd/MM/yyyy");
    this.itemList.push(new DyeingChemicalData());
  }

  ngOnInit(): void {

    this.loading = true;
    this.getItemData();
    this.getSlipDataFromBatch();
  }

  getSlipDataFromBatch() {
    this.planningSlipService
      .getAllSlipDataByBatchStockId(this.objToPassInRequest).subscribe(
        (data) => {
          if (data["success"]) {
            this.allData = data["data"];
            if (this.allData && this.allData.length) {
              this.allData.forEach(ele => {
                ele.dyeingSlipDataList.forEach((element) => {
                  element.dyeingSlipItemData.forEach((element1) => {
                    element1.qty = element1.qty
                      ? element1.qty.toFixed(3)
                      : element1.qty;
                  });
                  console.log(ele)
                  ele.dyeingSlipDataList = _sortBy(ele.dyeingSlipDataList, 'sequence')
                  ele.totalWt = Number(ele.totalWt).toFixed(3);
                });
              })
              this.loading = false;
              if (this.directPrintFromJet) this.printNOW();
            }
          } else {
            //this.toastr.error(data["msg"]);
          }
        },
        (error) => { }
      );
  }

  getItemData() {
    this.DyeingProcessService.getAllItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
          this.itemListArray = data["data"];
          this.itemListArrayCopy = this.itemListArray;
        } else {
        }
      },
      (error) => { }
    );
  }

  printNOW() {
    let doc = new wijmo.PrintDocument({
      title: "",
    });
    doc.append(
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css">'
    );
    doc.append(
      '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
    );
    doc.append(
      '<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">'
    );

    doc.append('<link href="./planning-slip.component.scss" rel="stylesheet">');
    let tempFlag = false;

    for (let i = 0; i < this.allData.length; i++) {
      let inter1 = setInterval(() => {
        let element = <HTMLElement>document.getElementById("print-slip" + i);
        if (element) {
          doc.append(element);
          tempFlag = true;
          clearInterval(inter1);
        }
      }, 10);
    }

    setTimeout(() => {
      doc.print();
      this.activeModal.close();
    }, 1000);
  }
}
