import { Component, Input, OnInit } from '@angular/core';
import { PrintInvoiceService } from '../../../@theme/services/print-invoice.service';
import { PrintInvoiceData, QualityList, BatchWithGrList } from "../../../@theme/model/printInvoice";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-generate-modal',
  templateUrl: './generate-modal.component.html',
  styleUrls: ['./generate-modal.component.scss']
})
export class GenerateModalComponent implements OnInit {

  @Input() finalInvoice: any;
  public printInvoiceData: PrintInvoiceData[];
  flag:any;


  constructor(
    private printService: PrintInvoiceService,
    public activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {

    if(this.finalInvoice){
      this.printService.getInvoiceByBatchAndStock(this.finalInvoice).subscribe(
        (data) => {
          if(data["success"]){
            this.printInvoiceData = data["data"];
            this.start();
          }
        },
        (error) => {

        }
      )
    }
  }

  start() {
      let arr = [];  
      arr.push(this.printInvoiceData);
      this.printInvoiceData = arr;
      let index = 0;
      
      this.printInvoiceData[index].batchWithGrList.forEach(element => {
        element.batchDataList.sort(function(obj1 , obj2){
          return obj1.sequenceId - obj2.sequenceId;
        })
      }); 

      this.printInvoiceData[index].totalMtr = 0;
      this.printInvoiceData[index].totalAmt = 0;
      this.printInvoiceData[index].totalPcs = 0;
      this.printInvoiceData[index].totalFinishMtr = 0;

      this.printInvoiceData[index].qualityList.forEach((quality) => {
        if(quality.totalMtr){
        this.printInvoiceData[index].totalMtr += quality.totalMtr;
        this.printInvoiceData[index].totalAmt += quality.amt;
        this.printInvoiceData[index].totalPcs += quality.pcs;
        this.printInvoiceData[index].totalFinishMtr += quality.finishMtr;
        }
      });

      //calculating shrinkage, total mtr, total finish mtr...
      this.printInvoiceData[index].batchWithGrList.forEach(element => {
        element.totalMtr = 0;
        element.totalFMtr = 0;
        element.shrinkage = 0;
        element.lotDataLength = element.batchDataList.length;
        element.batchDataList.forEach(lot => {
          element.totalMtr += lot.mtr
          element.totalFMtr += lot.finishMtr
        });
        element.totalMtr = (element.totalMtr).toFixed(2);
        element.totalFMtr = (element.totalFMtr).toFixed(2);
        element.shrinkage = ( ( (element.totalMtr-element.totalFMtr) /element.totalMtr) * 100).toFixed(2);
      });

      //for making 4 blocks
      let lengthOfLots = this.printInvoiceData[index].batchWithGrList.length;
      for(let lotIndex = 0; lotIndex < 4-lengthOfLots; lotIndex++){
        this.printInvoiceData[index].batchWithGrList.push(new BatchWithGrList());
      }            

      this.printInvoiceData[index].discount = this.printInvoiceData[index].totalAmt * 0.03;
      this.printInvoiceData[index].sgst = this.printInvoiceData[index].cgst = this.printInvoiceData[index].totalAmt * 0.025;
      this.printInvoiceData[index].taxAmt = this.printInvoiceData[index].totalAmt - this.printInvoiceData[index].discount;
      this.printInvoiceData[index].netAmt = 
      this.printInvoiceData[index].sgst + this.printInvoiceData[index].cgst + this.printInvoiceData[index].taxAmt; 

    }

    onCancel(){
      this.activeModal.close(false);
    }

    onPrint(){
      this.activeModal.close(true);
    }
}
