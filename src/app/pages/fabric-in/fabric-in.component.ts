import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FabricInService } from "app/@theme/services/fabric-in.service";
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';

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
    /*const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm"
    });
    modalRef.result.then((result) => {
      if (result) {
        this.fabricService.deleteById(this.fabricList[rowId].id).subscribe(
          (data) => {
            //toaster
            this.status = "primary";
            const config = {
              status: this.status,
              destroyByClick: this.destroyByClick,
              duration: this.duration,
              hasIcon: this.hasIcon,
              position: this.position,
              preventDuplicates: this.preventDuplicates,
            };
            this.toastrService.show(
              "Fabric data deleted.",
              "Fabric-in",
              config
            );
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
              "No internet access or server failure",
              "Fabric-in",
              config
            );
          }
        );
      }
    });*/
  }
}
