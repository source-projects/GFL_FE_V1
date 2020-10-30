import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/@theme/services/common.service';
import { PartyService } from 'app/@theme/services/party.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-edit-party',
  templateUrl: './add-edit-party.component.html',
  styleUrls: ['./add-edit-party.component.scss'],
  providers: [Location]
})

export class AddEditPartyComponent implements OnInit {
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
  partyForm: FormGroup;
  currentParty;
  myPartyId;

  constructor(private location: Location, private partyService: PartyService, private toastrService: NbToastrService,
    private commonService: CommonService, private route: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.commonService.getUser()
    this.partyForm = new FormGroup({

      partyName: new FormControl(null, [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
      partyAddress1: new FormControl(null, Validators.required),
      partyAddress2: new FormControl(null),
      contactNo: new FormControl(null, [Validators.required, Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]),
      city: new FormControl(null, [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
      state: new FormControl(null, [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
      pincode: new FormControl(null, [Validators.pattern(/^[0-9]{6}$/), Validators.required]),
      gstin: new FormControl(null, Validators.required),
      mailId: new FormControl(null, [Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/), Validators.required]),
      creditor: new FormControl(null),
      debtor: new FormControl(null),
      createdBy: new FormControl(this.user.userId.toString()),

    });

 
    this.myPartyId = this._route.snapshot.paramMap.get('id');
    if (this.myPartyId != null) {

      this.partyService.getPartyDetailsById(this.myPartyId).subscribe(
        data => {
          this.currentParty = data['data']
          this.partyForm.patchValue({
            "partyName": this.currentParty.partyName,
            "partyAddress1": this.currentParty.partyAddress1,
            "partyAddress2": this.currentParty.partyAddress2,
            "contactNo": this.currentParty.contactNo,
            "city": this.currentParty.city,
            "state": this.currentParty.state,
            "pincode": this.currentParty.pincode,
            "mailId": this.currentParty.mailId,
            "gstin": this.currentParty.gstin,
            "creditor": this.currentParty.creditor,
            "debtor": this.currentParty.debtor,
            "createdBy": this.currentParty.user,
            "id": this.myPartyId
          })
        },
        error => {
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
      )
    }
    
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.partyForm.valid) {
      console.log(this.partyForm.value);
      this.partyService.saveParty(this.partyForm.value).subscribe(
        data => {
          console.log(data);
          this.currentParty = data["data"];
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
            "Party Added Succesfully",
            "Party",
            config);
            this.route.navigate(["/pages/party"]);
        },
        error => {
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
      )
    }
  }
  public goBackToPreviousPage(): any {
    this.location.back();
  }
  updateParty() {
    this.formSubmitted = true;
    if (this.partyForm.valid) {
      let body = {
        ...this.partyForm.value,
        id: this.myPartyId
      }
      this.partyService.updateParty(body).subscribe(
        data => {
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
            "Party Updated Succesfully",
            "Party",
            config);
            this.route.navigate(["/pages/party"]);
        },
        error => {
          
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
            "No internet access or Server failure",
            "Party",
            config);
        }
      )
    }
  }
 
}
