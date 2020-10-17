import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ngx-add-edit-supplier',
  templateUrl: './add-edit-supplier.component.html',
  styleUrls: ['./add-edit-supplier.component.scss'],
  providers:[Location]
})
export class AddEditSupplierComponent implements OnInit {

  public discountPercentage:number
  public gstPercentage:number 
  public paymentTerms:number 
  public remark:string
  public supplierName:string
  public createdBy:string 
  public userId:number 
  addSupplier:FormGroup;
  formSubmitted:boolean=false;

  constructor(private location:Location) { }

  ngOnInit(): void {
    this.addSupplier = new FormGroup({
      "discountPercentage": new FormControl(null,Validators.required),
      "gstPercentage": new FormControl(null,Validators.required),
      "paymentTerms": new FormControl(null,Validators.required),
      "remark": new FormControl(null,),
      "supplierName": new FormControl(null,Validators.required),
    }) 
  }

  public addSupplierInfo():any{
    this.formSubmitted=true;
    if(this.addSupplier.valid){
      console.log("submitted");  
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
