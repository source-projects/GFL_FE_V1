import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PartyService } from "app/@theme/services/party.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "app/@theme/components/confirmation-dialog/confirmation-dialog.component";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

@Component({
  selector: "ngx-party",
  templateUrl: "./party.component.html",
  styleUrls: ["./party.component.scss"],
})
export class PartyComponent implements OnInit {
   //toaster config
   config: NbToastrConfig;
   destroyByClick = true;
   duration = 2000;
   hasIcon = true;
   position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
   preventDuplicates = false;
   status: NbComponentStatus = 'primary';

  tablestyle = "bootstrap";
  partyList = [];
  constructor(
    private partyService: PartyService,
    private route: Router,
    private modalService: NgbModal,
    public changeRef: ChangeDetectorRef,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getAllParty();
  }

  getAllParty() {
    this.partyService.getAllPartyList().subscribe(
      (data) => {
        this.partyList = data["data"];
        console.log(data);
      },
      (error) => {
        console.log("Error occured");
        console.log(error.errorMessage);
      }
    );
  }
  deleteParty(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      console.log(result);
      if (result) {
        this.partyService.deletePartyDetailsById(id).subscribe(
          (data) => {
            this.getAllParty();
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
           "Party",
           config);
          }
        );
      }
    });
  }
}
