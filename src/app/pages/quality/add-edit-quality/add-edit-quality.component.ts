import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/@theme/services/common.service';
import { PartyService } from 'app/@theme/services/party.service';
import { QualityService } from 'app/@theme/services/quality.service';

@Component({
  selector: 'ngx-add-edit-quality',
  templateUrl: './add-edit-quality.component.html',
  styleUrls: ['./add-edit-quality.component.scss']
})
export class AddEditQualityComponent implements OnInit {
  formSubmitted: boolean = false
  user: any
  addQualityForm: FormGroup
  party: any[];
  constructor(private partyService: PartyService, private commonService: CommonService, private qualityService: QualityService, private route:Router) { }

  ngOnInit(): void {
    this.user = this.commonService.getUser()
    this.addQualityForm = new FormGroup({
      'qualityId':new FormControl(null, Validators.required),
      'qualityName':new FormControl(null, Validators.required),
      'qualityType':new FormControl(null, Validators.required),
      'wtPer100m':new FormControl(null),
      'qualitySubType':new FormControl(null, Validators.required),
      'partyId':new FormControl(null,Validators.required),
      'remark':new FormControl(null),
      'createdBy':new FormControl(this.user.userId.toString()),
      //'createdDate': new FormControl(new Date())                                    
    })
    this.getPartyList();
  }

  getPartyList(){
    this.partyService.getAllPartyList().subscribe(
      data =>{
        if(data['data'] && data['data'].length > 0){
          this.party = data["data"]
        }
        else{
          console.log("NO PARTY YET ADDED>>>>>>>>")
        } 
      },error=>{
        console.log(error)
      }
    )
  }

  onSubmit(){
    this.formSubmitted = true
      if(this.addQualityForm.valid){
        //this.addQualityForm.get('partyId').setValue()
        console.log(this.addQualityForm.get('partyId').value)
        this.qualityService.addQuality(this.addQualityForm.value).subscribe(
          data =>{
            console.log('Quality Added!');
            alert('Quality added successfully!');
            //console.log(data);
            setTimeout(()=>{
              this.route.navigate(['/pages/quality'])
            },1000)
          },
          error=>{
            console.log('Error occured');
            console.log(error.errorMessage);           
          }
        )

        console.log("Success")
      }
      else
        return ;
  }
}
