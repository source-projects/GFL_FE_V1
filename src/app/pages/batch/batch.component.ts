import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { BatchService } from 'app/@theme/services/batch.service';
import { QualityService } from "app/@theme/services/quality.service";
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { BatchGuard } from 'app/@theme/guards/batch.guard';

@Component({
  selector: "ngx-batch",
  templateUrl: "./batch.component.html",
  styleUrls: ["./batch.component.scss"],
})
export class BatchComponent implements OnInit {

  public errorData: any = (errorData as any).default;

  batchList:any;
  
  permissions: Number;
  access:Boolean = false;
  tableStyle = "bootstrap";
  constructor(
    private qualityService: QualityService,
    private modalService: NgbModal,
    private batchService: BatchService,

    public batchGuard: BatchGuard,
    private jwtToken: JwtTokenService,
    private toastr:ToastrService,
  ) {}

  ngOnInit(): void {
    this.access = this.batchGuard.accessRights('add');
  }

  getAllBatch() {
    this.batchService.getAllBatchList().subscribe(
      (data) => {
        if(data["success"]){
          this.batchList = data["data"];
        }
        // else{
        //   this.toastr.error(errorData.Internal_Error)
        // }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error)
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
            this.toastr.success(errorData.Delete)
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error)
          }
        );
      }
    });
  }
}
