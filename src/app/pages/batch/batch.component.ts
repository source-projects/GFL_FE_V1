import { Component, OnInit } from "@angular/core";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { BatchService } from 'app/@theme/services/batch.service';
import { QualityService } from "app/@theme/services/quality.service";

@Component({
  selector: "ngx-batch",
  templateUrl: "./batch.component.html",
  styleUrls: ["./batch.component.scss"],
})
export class BatchComponent implements OnInit {
  //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = "primary";

  batchList;
  tableStyle = "bootstrap";
  constructor(
    private qualityService: QualityService,
    private toastrService: NbToastrService,
    private modalService: NgbModal,
    private batchService: BatchService
  ) {}

  ngOnInit(): void {}

  getAllBatch() {
    this.batchService.getAllBatchList().subscribe(
      (data) => {
        this.batchList = data["data"];
      },
      (error) => {
        //toaster
        this.status = "danger";
        const config = {
          status: this.status,
          destroyByClick: this.destroyByClick,
          duration: this.duration,
          hasIcon: this.hasIcon,
          position: this.position,
          preventDuplicates: this.preventDuplicates,
        };
        this.toastrService.show(
          "No internet access or Server failuer",
          "Batch",
          config
        );
      }
    );
  }

  deleteBatch(id){
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.batchService.deletePartyDetailsById(id).subscribe(
          (data) => {
            //success
          },
          (error) => {
            //toaster
          this.status = "danger"
          const config = {
           status: this.status,
           destroyByClick: this.destroyByClick,
           duration: this.duration,
           hasIcon: this.hasIcon,
           position: this.position,
           preventDuplicates: this.preventDuplicates,
         };
         this.toastrService.show(
           "No internet access or Server failuer",
           "Batch",
           config);
          }
        );
      }
    });
  }
}
