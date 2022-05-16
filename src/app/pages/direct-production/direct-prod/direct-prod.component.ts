import { ToastrService } from 'ngx-toastr';
import { ProductionPlanningService } from './../../../@theme/services/production-planning.service';
import { Component, OnInit } from '@angular/core';
import { JetPlanningService } from '../../../@theme/services/jet-planning.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewSlipComponent } from '../../jet-planning/new-slip/new-slip.component';

@Component({
  selector: 'ngx-direct-prod',
  templateUrl: './direct-prod.component.html',
  styleUrls: ['./direct-prod.component.scss']
})
export class DirectProdComponent implements OnInit {

  jet = [];
  jetSelected = null;
  batchId = null;
  loading = false;
  constructor(
    private jetService: JetPlanningService,
    private productionPlanningService: ProductionPlanningService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {

    this.getJetData();
  }

  getJetData() {
    this.jet = [];
    this.loading = true;
    this.jetService.getAllJetDataV1().subscribe(
      (data) => {
        if (data["success"]) {
          this.jet = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  lotNoEntered(event) {

    if (event.key == "Enter") {

      this.loading = true;
      let obj = {};
      obj['productionId'] = null;
      obj['batchId'] = this.batchId;
      obj['shadeId'] = null;
      obj['jetId'] = this.jetSelected;
      this.productionPlanningService
        .saveProductionPlan(obj).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(data["msg"]);
            
              const modalRef = this.modalService.open(NewSlipComponent, { size: 'xl' });
              modalRef.componentInstance.isPrintDirect = false;
              modalRef.componentInstance.batchId = this.batchId;
              modalRef.componentInstance.stockId = data["data"];
              modalRef.componentInstance.productionBatchDetail = null;
              modalRef.componentInstance.additionSlipFlag = false;

              modalRef.result
                .then((result) => {
                  if (result) {
                  }
                })
                .catch((err) => { });
            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {
            this.loading = false;
          }
        );
    }

  }

}
