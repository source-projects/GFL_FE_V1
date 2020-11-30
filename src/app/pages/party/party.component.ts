import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PartyService } from "app/@theme/services/party.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "app/@theme/components/confirmation-dialog/confirmation-dialog.component";
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/@theme/services/common.service';

@Component({
  selector: "ngx-party",
  templateUrl: "./party.component.html",
  styleUrls: ["./party.component.scss"],
})
export class PartyComponent implements OnInit {

  public errorData: any = (errorData as any).default;

  tablestyle = "bootstrap";

  partyList = [];
  radioSelect = 1;
  radioArray = [
    {id:1, value:"View Own"},
    {id:2, value:"View Group"},
    {id:3, value:"View All"}
  ];
  userHeadId;
  userId;
  constructor(
    private partyService: PartyService,
    private route: Router,
    private modalService: NgbModal,
    public changeRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getAllParty(this.userId,"own");
  }

  getAllParty(id,getBy) {
    this.partyService.getAllPartyList(id,getBy).subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error)
      }
    );
  }

  onChange(event){
    this.partyList = [];
    switch(event){
      case 1: 
              this.getAllParty(this.userId,"own");
              break;

      case 2: 
              this.getAllParty(this.userHeadId,"group");
              break;

      case 3:
              this.getAllParty(0,"all");
              break;
    }
  }

  deleteParty(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.partyService.deletePartyDetailsById(id).subscribe(
          (data) => {
            this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }
}
