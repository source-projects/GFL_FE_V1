import { Component, OnInit } from "@angular/core";
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { FabricInService } from "app/@theme/services/fabric-in.service";

@Component({
  selector: "ngx-fabric-in",
  templateUrl: "./fabric-in.component.html",
  styleUrls: ["./fabric-in.component.scss"],
})
export class FabricInComponent implements OnInit {
  //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status;

  fabricList;
  tablestyle = "bootstrap";
  constructor(
    private toastrService: NbToastrService,
    private modalService: NgbModal,
    private fabricService: FabricInService
  ) {}

  ngOnInit(): void {
    this.getFabricList();
  }

  getFabricList() {
    this.fabricService.getallFabric().subscribe(
      (data) => {
        this.fabricList = data["data"];
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
