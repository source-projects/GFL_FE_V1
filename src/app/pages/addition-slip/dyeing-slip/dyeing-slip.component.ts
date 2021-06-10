import { CommonService } from './../../../@theme/services/common.service';
import { DyeingProcessService } from './../../../@theme/services/dyeing-process.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as errorData from "../../../@theme/json/error.json";
import { ExportPopupComponent } from '../../../@theme/components/export-popup/export-popup.component';
import { PlanningSlipComponent } from '../../jet-planning/planning-slip/planning-slip.component';

@Component({
  selector: 'ngx-dyeing-slip',
  templateUrl: './dyeing-slip.component.html',
  styleUrls: ['./dyeing-slip.component.scss']
})
export class DyeingSlipComponent implements OnInit {
  public loading = false;
  public errorData: any = (errorData as any).default;
  tablestyle = "bootstrap";
  dyeingSlip=[];
  copydyeingSlip=[];
  module = "dyeingSlip";
  headers = ["batch Id"];
  flag = false;
  public destroy$ : Subject<void> = new Subject<void>();
  rowData: any;
  dyeSlip: any=[];
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  } 

  constructor(private dyeingService:DyeingProcessService, private commonService:CommonService, private modalService: NgbModal,
    public changeRef: ChangeDetectorRef,
    private toastr: ToastrService) { }

  async ngOnInit() {
    
    this.getDyeingSlipData();
  }

  getDyeingSlipData(){
    this.dyeingService.getDyeingSlipData().subscribe(
      data=>{
        if(data["success"]){
          this.dyeingSlip=data["data"];
          this.rowData=this.dyeingSlip;
          this.copydyeingSlip=data["data"];
          this.dyeSlip=this.dyeingSlip.map((element)=>({
            totalWt:element.totalWt,
            qualityId:element.qualityId,
            partyShadeNo:element.partyShadeNo,
            batchCount:element.batchCount,
            colorTone:element.colorTone,
            colorName:element.colorName,
            jetName:element.jetName,
            batchId:element.batchId
          }));
          this.copydyeingSlip=this.dyeingSlip.map((element)=>({
            totalWt:element.totalWt,
            qualityId:element.qualityId,
            partyShadeNo:element.partyShadeNo,
            batchCount:element.batchCount,
            colorTone:element.colorTone,
            colorName:element.colorName,
            jetName:element.jetName,
            batchId:element.batchId
          }));
        }
      },
      error=>{}
    )
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.copydyeingSlip[0]);
    this.dyeingSlip = this.copydyeingSlip.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });
  }


  open() {
    this.flag = true;

    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = this.headers;
    modalRef.componentInstance.list = this.dyeSlip;
    modalRef.componentInstance.moduleName = this.module;
  }

  printDyeingSlip(event,row)
  {
    const modalRef = this.modalService.open(PlanningSlipComponent);
    modalRef.componentInstance.isPrintDirect = true;
    modalRef.componentInstance.batchId = row.batchId;
    modalRef.componentInstance.stockId = row.productionId;
    modalRef.componentInstance.additionSlipFlag = false;

    modalRef.result
      .then((result) => {
        if (result) {
        }
      })
      .catch((err) => {});
  }
}
