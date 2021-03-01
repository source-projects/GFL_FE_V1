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
  // name:any=14.2;
  // maxlength=3;
  constructor( private commonService: CommonService,
    private waterjetService: WaterJetService,
    private toastr: ToastrService,
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // getVal(item){
  //   console.log(item.target.value);
  //   let v=parseFloat(item.target.value);
  //   console.log("float",v);
  // }
  addWaterJet(myForm){
    this.formSubmitted=true;
    if(myForm.valid){
      this.waterjetService.addWaterJet(this.waterjet).subscribe(
        data=>{
          if(data['success']){
            this.toastr.success(data['msg']);
            this.formSubmitted=false;
            myForm.reset();
            this.waterjet = new WaterJet();
          }
        },
        error=>{
          this.disableButton = false;
        }
      )
    }
    else{
      this.disableButton = false;

      return;
    }
  }
}
