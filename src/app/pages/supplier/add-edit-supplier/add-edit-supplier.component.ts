import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';
import {ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-edit-supplier',
  templateUrl: './add-edit-supplier.component.html',
  styleUrls: ['./add-edit-supplier.component.scss'],
  providers:[Location]
})
export class AddEditSupplierComponent implements OnInit {
   //toaster config
   config: NbToastrConfig;
   destroyByClick = true;
   duration = 2000;
   hasIcon = true;
   position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
   preventDuplicates = false;
   status: NbComponentStatus = 'primary';
   
  public createdBy:string 
  user:any
  currentSupplier
  public userId:number 
  addSupplier:FormGroup;
  mySupplierId
  formSubmitted:boolean=false;

  constructor(private location:Location, private commonService:CommonService, private supplierService:SupplierService, private router:Router, private _route:ActivatedRoute, private toastrService: NbToastrService) { }

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
     this.mySupplierId=this._route.snapshot.paramMap.get('id');
    if(this.mySupplierId!=null){
      this.supplierService.getAllSupplierById(this.mySupplierId).subscribe(
        data=>{
          this.currentSupplier=data['data']
          this.addSupplier.patchValue({
            "supplierName": this.currentSupplier.supplierName,
            "discountPercentage":this.currentSupplier.discountPercentage,             
            "gstPercentage": this.currentSupplier.gstPercentage,
            "paymentTerms": this.currentSupplier.paymentTerms,
            "remark": this.currentSupplier.remark,
            "userId": this.currentSupplier.userId,
            "createdBy": this.currentSupplier.user,
            "id":this.mySupplierId
           })
        },
        error=>{
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
            "Supplier",
            config);
        }
      )
     }
  }

  public addSupplierInfo():any{
    this.formSubmitted=true;
    if(this.addSupplier.valid){
      this.supplierService.addSupplierInSystem(this.addSupplier.value).subscribe(
        data =>{
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
            "Supplier Added Succesfully",
            "Supplier",
            config);
          this.router.navigate(['pages/supplier']);
          
        },
        error=>{
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
           "Supplier",
           config);
        }
      )
    }
    else{
      return;  
    }
  }

  public goBackToPreviousPage():any{
    this.router.navigate(['pages/supplier']);
  }

  updateSupplier(){
    this.formSubmitted=true;
    if(this.addSupplier.valid){
      let body = {
        ...this.addSupplier.value,
        id:this.mySupplierId
      }
      this.supplierService.updateSupplierById(body).subscribe(
        data=>{
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
            "Supplier Updated Succesfully",
            "Supplier",
            config);
          this.router.navigate(['pages/supplier']);
        },
        error=>{
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
           "Supplier",
           config);
        }
      )
    }
  }

}
