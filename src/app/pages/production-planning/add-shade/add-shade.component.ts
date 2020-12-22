import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ShadeService} from 'app/@theme/services/shade.service';
import {ProductionPlanningService} from 'app/@theme/services/production-planning.service';

@Component({
  selector: 'ngx-add-shade',
  templateUrl: './add-shade.component.html',
  styleUrls: ['./add-shade.component.scss']
})
export class AddShadeComponent implements OnInit {

  @Input('party') party:any;
  @Input('quality') quality:any;
  @Input('batch') batch:any;
  @Input('batchControl') batchControl:any;
  @Output() action = new EventEmitter();
  shadeList:any[];
  public loading = false;
  shadeId:Number;
  formSubmitted: boolean = false;

   productionData={
    batchId:null,
    partyId:null,
    qualityEntryId:null,
    shadeId:null,
    stockId:null,
    id:null
  }
  constructor(    private _NgbActiveModal: NgbActiveModal,   
    private shadeService: ShadeService ,
    private productionPlanningService: ProductionPlanningService,
    private modalService: NgbModal,

    ) { }

  ngOnInit(): void {
    this.getShadeList();
    // console.log(this.party);
    // console.log(this.quality);
    // console.log(this.batch);
    // console.log(this.batchControl);
    
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public getShadeList(){
    console.log("hg");
    this.loading = true;

    this.shadeService
    .getShadesByQualityAndPartyId(this.party,this.quality)
    .subscribe(
      (data) => {
        if (data["success"]) {
          this.shadeList = data["data"];
          console.log(this.shadeList);
          this.loading = false;
        } else {
          // this.toastr.error(data["msg"]);
          this.loading = false;
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }

  onOkClick(){
    this.productionData.batchId=this.batch;
    this.productionData.partyId=this.party;
    this.productionData.qualityEntryId=this.quality;
    this.productionData.shadeId=this.shadeId;
    this.productionData.stockId=this.batchControl;
    this.productionPlanningService
    .saveProductionPlan(this.productionData)
    .subscribe(
      (data) => {
        if (data["success"]) {
          this.action.emit(true);
          this.activeModal.close(true);

         // this.modalService.close(true);
          //this.route.navigate(["/pages/program"]);
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }

}
