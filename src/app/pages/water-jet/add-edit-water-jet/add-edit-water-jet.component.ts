import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as errorData from "app/@theme/json/error.json";
import { WaterJet } from 'app/@theme/model/water-jet';
import { CommonService } from 'app/@theme/services/common.service';
import { WaterJetService } from 'app/@theme/services/water-jet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-add-edit-water-jet',
  templateUrl: './add-edit-water-jet.component.html',
  styleUrls: ['./add-edit-water-jet.component.scss']
})
export class AddEditWaterJetComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  waterjet: WaterJet = new WaterJet();
  formSubmitted: boolean = false;
  public disableButton = false;

  constructor( private commonService: CommonService,
    private waterjetService: WaterJetService,
    private toastr: ToastrService,
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addWaterJet(myForm){
    this.formSubmitted=true;
    if(myForm.valid){
      this.waterjetService.addWaterJet(this.waterjet).subscribe(
        data=>{
          if(data['success']){
            this.toastr.success(errorData.Add_Success);
            this.formSubmitted=false;
            myForm.reset();
            this.waterjet = new WaterJet();
          }
        },
        error=>{
          this.disableButton = false;

          // this.toastr.error(errorData.Add_Success);
        }
      )
    }
    else{
      this.disableButton = false;

      return;
    }
  }
}
