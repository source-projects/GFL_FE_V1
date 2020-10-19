import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-edit-supplier',
  templateUrl: './add-edit-supplier.component.html',
  styleUrls: ['./add-edit-supplier.component.scss'],
  providers:[Location]
})
export class AddEditSupplierComponent implements OnInit {
  public createdBy:string 
  user:any
  public userId:number 
  addSupplier:FormGroup;
  formSubmitted:boolean=false;

  constructor(private location:Location, private commonService:CommonService, private supplierService:SupplierService, private router:Router) { }

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
  }

  public addSupplierInfo():any{
    this.formSubmitted=true;
    if(this.addSupplier.valid){
      console.log("submitted");  
      console.log(this.addSupplier.value)
      console.log(this.addSupplier.get('userId'))
      this.supplierService.addSupplierInSystem(this.addSupplier.value).subscribe(
        data =>{
          alert("Supplier Added Successfully")
          console.log(data)
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
