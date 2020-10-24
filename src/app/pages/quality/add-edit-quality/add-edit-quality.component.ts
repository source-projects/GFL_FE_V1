import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from "app/@theme/services/party.service";
import { QualityService } from "app/@theme/services/quality.service";

@Component({
  selector: "ngx-add-edit-quality",
  templateUrl: "./add-edit-quality.component.html",
  styleUrls: ["./add-edit-quality.component.scss"],
})
export class AddEditQualityComponent implements OnInit {
  //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';

  formSubmitted: boolean = false;
  user: any;
  qualityList;
  addEditQualityForm: FormGroup;
  party: any[];
  myQualityId;
  constructor(
    private _route: ActivatedRoute,
    private partyService: PartyService,
    private commonService: CommonService,
    private qualityService: QualityService,
    private route: Router,
    private location: Location,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getPartyList();
    this.user = this.commonService.getUser();
    this.addEditQualityForm = new FormGroup({
      qualityId: new FormControl(null, Validators.required),
      qualityName: new FormControl(null, Validators.required),
      qualityType: new FormControl(null, Validators.required),
      wtPer100m: new FormControl(null, Validators.required),
      qualitySubType: new FormControl(null, Validators.required),
      partyId: new FormControl(null, Validators.required),
      remark: new FormControl(null),
      createdBy: new FormControl(this.user.userId.toString()),
      id: new FormControl(null)
    });

    this.myQualityId = this._route.snapshot.paramMap.get("id");
    if (this.myQualityId != null) {
      this.qualityService.getQualityById(this.myQualityId).subscribe(
        (data) => {
          this.qualityList = data["data"];
          this.addEditQualityForm.patchValue({
            qualityId: this.qualityList.qualityId,
            qualityName: this.qualityList.qualityName,
            qualityType: this.qualityList.qualityType,
            wtPer100m: this.qualityList.wtPer100m,
            qualitySubType: this.qualityList.qualitySubType,
            partyId: this.qualityList.partyId,
            remark: this.qualityList.remark,
            createdBy: this.qualityList.createdBy,
            id: this.qualityList.id
          });
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
           "Quality",
           config);
        }
      );
    }
  }

  getPartyList() {
    this.partyService.getAllPartyList().subscribe(
      (data) => {
        if (data["data"] && data["data"].length > 0) {
          this.party = data["data"];
        } else {
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
           "No party added yet",
           "Quality",
           config);
        }
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
         "Quality",
         config);
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.addEditQualityForm.valid) {
      this.qualityService.addQuality(this.addEditQualityForm.value).subscribe(
        (data) => {
          //toaster
          this.status = "primary"
          const config = {
            status: this.status,
            destroyByClick: this.destroyByClick,
            duration: this.duration,
            hasIcon: this.hasIcon,
            position: this.position,
            preventDuplicates: this.preventDuplicates,
          };
          this.toastrService.show(
            "Quality Added Succesfully",
            "Quality",
            config);
            this.route.navigate(["/pages/quality"]);
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
           "Quality",
           config);
        }
      );
    } else return;
  }

  updateQuality() {
    this.formSubmitted = true;
    if (this.addEditQualityForm.valid) {
      this.qualityService.updateQualityById(this.addEditQualityForm.value).subscribe(
        (data) => {
          //Toaster config
          this.status = "primary"
          const config = {
            status: this.status,
            destroyByClick: this.destroyByClick,
            duration: this.duration,
            hasIcon: this.hasIcon,
            position: this.position,
            preventDuplicates: this.preventDuplicates,
          };
          this.toastrService.show(
            "Quality Updated Succesfully",
            "Quality",
            config);
          this.route.navigate(["/pages/quality"]);
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
           "Quality",
           config);
        }
      );
    }
  }
}
