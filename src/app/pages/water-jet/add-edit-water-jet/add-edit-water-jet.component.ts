import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as errorData from "../../../@theme/json/error.json";
import { WaterJet } from '../../../@theme/model/water-jet';
import { WaterJetService } from '../../../@theme/services/water-jet.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-add-edit-water-jet',
  templateUrl: './add-edit-water-jet.component.html',
  styleUrls: ['./add-edit-water-jet.component.scss']
})
export class AddEditWaterJetComponent implements OnInit, OnDestroy {

  public errorData: any = (errorData as any).default;
  waterjet: WaterJet = new WaterJet();
  formSubmitted: boolean = false;
  public disableButton = false;
  private destroy$ = new Subject<void>();

  constructor(
    private waterjetService: WaterJetService,
    private toastr: ToastrService,) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
  }

  addWaterJet(myForm){
    this.formSubmitted=true;
    if(myForm.valid){
      this.waterjetService.addWaterJet(this.waterjet).pipe(takeUntil(this.destroy$)).subscribe(
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
