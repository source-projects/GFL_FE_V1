import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';
import {ActivatedRoute, Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-add-edit-supplier',
  templateUrl: './add-edit-supplier.component.html',
  styleUrls: ['./add-edit-supplier.component.scss'],
  providers:[Location]
})
export class AddEditSupplierComponent implements OnInit {
  public createdBy:string 
  user:any
  currentSupplier
  public userId:number 
  addSupplier:FormGroup;
  formSubmitted:boolean=false;

  constructor(private location:Location, private commonService:CommonService, private supplierService:SupplierService, private router:Router, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.user = this.commonService.getUser();
    this.addSupplier = new FormGroup({
      "supplierName": new FormControl(null,Validators.required),
      "discountPercentage": new FormControl(null,Validators.required),
      "gstPercentage": new FormControl(null,Validators.required),
      "paymentTerms": new FormControl(null,Validators.required),
      "remark": new FormControl(null),
      "userId": new FormControl(this.user.userId),
      "createdBy": new FormControl(this.user.userId)
      
    }) 
    let myResponse=this._route.snapshot.paramMap.get('id');
    if(myResponse!=null){
      console.log(myResponse)
      this.supplierService.getAllSupplierById(myResponse).subscribe(
        data=>{
          this.currentSupplier=data['data'][0]
          this.addSupplier.patchValue({
            "supplierName": this.currentSupplier.supplierName,
            "discountPercentage":this.currentSupplier.discountPercentage,             
            "gstPercentage": new FormControl(null,Validators.required),
            "paymentTerms": new FormControl(null,Validators.required),
            "remark": new FormControl(null),
            "userId": new FormControl(this.user.userId),
            "createdBy": new FormControl(this.user.userId)
           })
          console.log(data)
        },
        error=>{
          console.log(error.Message)
        }
      )
     }
    else{
      console.log("Error");
    }
  }

  public addSupplierInfo():any{
    this.formSubmitted=true;
    if(this.addSupplier.valid){
      this.supplierService.addSupplierInSystem(this.addSupplier.value).subscribe(
        data =>{
          alert("Supplier Added Successfully")
          setTimeout(()=>{
            this.router.navigate(['pages/supplier']);
          },1000)
        },
        error=>{
          console.log("Some Error Occure");
          console.log(error.errorMessage);
          alert("Some Error Occured");
        }
      )
    }
    else{
      return;  
    }
    console.log("submitted fdfsgsd");
  }

  public goBackToPreviousPage():any{
    this.location.back();
  }

}
