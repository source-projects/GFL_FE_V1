import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/@theme/services/common.service';
import { PartyService } from 'app/@theme/services/party.service';

@Component({
  selector: 'ngx-add-edit-party',
  templateUrl: './add-edit-party.component.html',
  styleUrls: ['./add-edit-party.component.scss'],
  providers: [Location]
})

export class AddEditPartyComponent implements OnInit {

  formSubmitted: boolean = false;
  user: any;
  partyForm: FormGroup;
  currentParty;
  myPartyId;

  constructor(private location: Location, private partyService: PartyService,
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
          console.log(data)
        },
        error => {
          console.log(error.Message)
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
          //alert('party added successfully!');
          setTimeout(() => {
            this.route.navigate(['/pages/party'])
          }, 1000)
        },
        error => {
          console.log('Error occured');
          console.log(error.errorMessage);
        }
      )
      console.log("Success")
    }
    else {
      console.log("error");
    }
  }
  public goBackToPreviousPage(): any {
    this.location.back();
  }
  updateParty() {
    let body = {
      ...this.partyForm.value,
      id: this.myPartyId
    }
    this.partyService.updateParty(body).subscribe(
      data => {
        
        //alert("Party Updated Successfully");
        setTimeout(() => {
          this.route.navigate(["pages/party"])
        }, 1000)
      },
      error => {
        console.log("Error Occured");
        console.log(error.Message)
      }
    )
  }
 
}
