import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FabricInService } from "app/@theme/services/fabric-in.service";
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: "ngx-fabric-in",
  templateUrl: "./fabric-in.component.html",
  styleUrls: ["./fabric-in.component.scss"],
})
export class FabricInComponent implements OnInit {

  public errorData: any = (errorData as any).default;

  fabricList;

  tablestyle = "bootstrap";
  constructor(
    private modalService: NgbModal,
    private fabricService: FabricInService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.getFabricList();
  }

  getFabricList() {
    this.fabricService.getallFabric().subscribe(
      (data) => {
        if(data["success"]){
          this.fabricList = data["data"];
        }
        else{
          this.toastr.error(errorData.Internal_Error)
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error)
      }
    );
  }

  deleteFabric(rowId) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm"
    });
    modalRef.result.then((result) => {
      if (result) {
        this.fabricService.deleteById(rowId).subscribe(
          (data) => {
            this.getFabricList();
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
