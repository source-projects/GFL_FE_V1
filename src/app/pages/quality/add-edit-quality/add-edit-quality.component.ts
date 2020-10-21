import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from "app/@theme/services/party.service";
import { QualityService } from "app/@theme/services/quality.service";

@Component({
  selector: "ngx-add-edit-quality",
  templateUrl: "./add-edit-quality.component.html",
  styleUrls: ["./add-edit-quality.component.scss"],
})
export class AddEditQualityComponent implements OnInit {
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
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPartyList();
    this.user = this.commonService.getUser();
    this.addEditQualityForm = new FormGroup({
      qualityId: new FormControl(null, Validators.required),
      qualityName: new FormControl(null, Validators.required),
      qualityType: new FormControl(null, Validators.required),
      wtPer100m: new FormControl(null),
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
          console.log(error.message);
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
          console.log("NO PARTY YET ADDED>>>>>>>>");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.addEditQualityForm.valid) {
      this.qualityService.addQuality(this.addEditQualityForm.value).subscribe(
        (data) => {
          console.log("Quality Added!");
          alert("Quality added successfully!");
          //console.log(data);
          setTimeout(() => {
            this.route.navigate(["/pages/quality"]);
          }, 1000);
        },
        (error) => {
          console.log("Error occured");
          console.log(error.errorMessage);
        }
      );

      console.log("Success");
    } else return;
  }

  cancel() {
    console.log("called.");
    this.location.back();
  }

  updateQuality() {
    this.qualityService.updateQualityById(this.addEditQualityForm.value).subscribe(
      (data) => {
        console.log("Quality Updated!");
        alert("Quality updated successfully!");
        //console.log(data);
        setTimeout(() => {
          this.route.navigate(["/pages/quality"]);
        }, 1000);
      },
      (error) => {
        console.log("Error occured");
        console.log(error.message);
      }
    );
  }
}
