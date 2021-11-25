import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JetPlanningService } from '../../../@theme/services/jet-planning.service';
import { ProductionPlanningService } from '../../../@theme/services/production-planning.service';

@Component({
  selector: 'ngx-change-jet',
  templateUrl: './change-jet.component.html',
  styleUrls: ['./change-jet.component.scss']
})
export class ChangeJetComponent implements AfterViewInit {

  @Input() batchId: any;
  @Input() batchControlId: any;
  @Input() jetId: number;
  @Input() currentSequence;
  @Input() prodId;
  public loading = false;
  jetList: any[] = [];
  public weight: number = 0;
  public jetCapacity: boolean = false;
  public jetSelectedFlag: boolean = false;
  public selectedJetSequence:number;
  public destroy$: Subject<void> = new Subject<void>();
  newJetId: number = null;
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private productionPlanningService: ProductionPlanningService,
    private toastr: ToastrService,
    private jetPlanningService: JetPlanningService,
  ) { }

  ngAfterViewInit(): void {
    this.getAllJets();
    this.getWeightByStockAndBatch();
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  onOkClick() {
    if (this.newJetId) {
      let fromObject = {
        jetId: this.jetId,
        sequence: this.currentSequence + 1,
        productionId: this.prodId
      }
      let toObject = {
        jetId: this.newJetId,
        sequence: this.selectedJetSequence + 1,
        productionId: this.prodId
      }
      let finalObject = {
        from: fromObject,
        to: toObject
      }
      this.activeModal.close(finalObject);
    } else {
      this.toastr.error("Select Jet");
    }
  }

  getAllJets() {
    this.jetList = [];
    this.jetPlanningService.getAllJetDataV1().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.jetList = data["data"];
        }
      },
      (error) => { }
    );
  }

  getWeightByStockAndBatch() {
    if (this.batchId && this.batchControlId) {
      this.productionPlanningService
        .getWeightByStockIdAndBatchId(this.batchId, this.batchControlId)
        .pipe(takeUntil(this.destroy$)).subscribe((data) => {
          if (data["success"]) {
            this.weight = data["data"].totalwt;
          }
        });
    }
  }

  jetSelected(event) {
    this.jetCapacity = false;
    const jet = this.jetList.filter((f) => f.id == event) || [];
    if (jet && jet.length) {
      if (jet[0].capacity > this.weight) {

        if(jet[0].jetDataList && jet[0].jetDataList.length)
        this.selectedJetSequence = jet[0].jetDataList.length;
        else
        this.selectedJetSequence = 0;
    
        if (!this.selectedJetSequence) {
          this.jetSelectedFlag = false;
        } else {
          this.jetSelectedFlag = true;
        }
      } else {
        this.jetCapacity = true;
        this.jetSelectedFlag = false;
        this.newJetId = null;
      }
    }
  }

}
