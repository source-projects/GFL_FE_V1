import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { PartyService } from 'app/@theme/services/party.service';

@Component({
  selector: 'ngx-add-edit-quality',
  templateUrl: './add-edit-quality.component.html',
  styleUrls: ['./add-edit-quality.component.scss']
})
export class AddEditQualityComponent implements OnInit {
  private qualityID: number
  private qualityName: string
  private qualityType: String
  private wtPer100m: number
  private qualitySubType: string
  private partyName: string
  private remark: string
  
  addQualityForm: FormGroup
  party: any[];
  constructor(private partyService: PartyService, private fbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addQualityForm = this.fbuilder.group({
      qualityId:[null, Validators.required],
      qualityName:[null, Validators.required],
      qualityType:['Select QualityType', Validators.required],
      wtPer100m:[null],
      qualitySubType:['Select Sub QualityType', Validators.required],
      partyName:['Select Party Name',Validators.required],
      remark:[null]
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
      if(this.addQualityForm.valid)
        console.log("Success")
      else
        return ;
  }
}
