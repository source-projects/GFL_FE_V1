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

  public tableHeaders = ["qualityId","partyShadeNo", "colorName", "jetName","batchId"];
  searchStr = "";
  searchANDCondition = false;
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
          // this.dyeSlip=this.dyeingSlip.map((element)=>({
          //   totalWt:element.totalWt,
          //   qualityId:element.qualityId,
          //   partyShadeNo:element.partyShadeNo,
          //   batchCount:element.batchCount,
          //   colorTone:element.colorTone,
          //   colorName:element.colorName,
          //   jetName:element.jetName,
          //   batchId:element.batchId,
          //   productionId: element.productionId
          // }));
          // this.copydyeingSlip=this.dyeingSlip.map((element)=>({
          //   totalWt:element.totalWt,
          //   qualityId:element.qualityId,
          //   partyShadeNo:element.partyShadeNo,
          //   batchCount:element.batchCount,
          //   colorTone:element.colorTone,
          //   colorName:element.colorName,
          //   jetName:element.jetName,
          //   batchId:element.batchId,
          // }));
        }
      },
      error=>{}
    )
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    if(val){
      this.dyeingSlip = this.copydyeingSlip.filter((item) => 
      this.matchString(item, "qualityId", val) ||
      this.matchString(item, "partyShadeNo", val) ||
      this.matchString(item, "colorName", val) ||
      this.matchString(item, "jetName", val) ||
      this.matchString(item, "batchId", val)
    );
    }else{
      this.dyeSlip = [...this.copydyeingSlip]
    }
    
  }

  matchString(item, key, string){
    if(item[key])
      return item[key].toLowerCase().includes(string)
    else
      return false
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
