import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-add-edit-supplier',
  templateUrl: './add-edit-supplier.component.html',
  styleUrls: ['./add-edit-supplier.component.scss'],
  providers:[Location]
})
export class AddEditSupplierComponent implements OnInit {  

  public errorData: any = (errorData as any).default;

   //formName
  addSupplier:FormGroup;
  public createdBy:string 
  
  //to Store UserId
  user:any
  userHead;
  //to store the data of selected supplier 
  currentSupplier:any;

  //to Get store selected supplier Id
  selectedSupplierId:any;

  //to varify form
  formSubmitted:boolean=false;
  public loading = false;
  public disableButton = false;


  constructor(private location:Location, private commonService:CommonService, private supplierService:SupplierService, private router:Router, private _route:ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getdata()
    this.getUpdateData()
  }

  public  getdata(){
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.addSupplier = new FormGroup({
      "supplierName": new FormControl(null,Validators.required),
      "discountPercentage": new FormControl(null,Validators.required),
      "gstPercentage": new FormControl(null,Validators.required),
      "paymentTerms": new FormControl(null,Validators.required),
      "remark": new FormControl(null),
      "userHeadId": new FormControl(null),
      "createdBy": new FormControl(null),
      "updatedBy": new FormControl(null),
    }) 
    this.selectedSupplierId=this._route.snapshot.paramMap.get('id');
  }

  public getUpdateData(){
    if(this.selectedSupplierId!=null){
      this.supplierService.getAllSupplierById(this.selectedSupplierId).subscribe(
        data=>{
          this.currentSupplier=data['data']
          this.addSupplier.patchValue({
            "supplierName": this.currentSupplier.supplierName,
            "discountPercentage":this.currentSupplier.discountPercentage,             
            "gstPercentage": this.currentSupplier.gstPercentage,
            "paymentTerms": this.currentSupplier.paymentTerms,
            "remark": this.currentSupplier.remark,
            "createdBy": this.currentSupplier.user,
            "id":this.selectedSupplierId
           })
        },
        error=>{
          //toaster
          // this.toastr.error(errorData.Serever_Error)
        }
      )
    }
  }

  public addSupplierInfo():any{
    this.disableButton=true;

    this.formSubmitted=true;
    if(this.addSupplier.valid){
      this.addSupplier.value.createdBy = this.user.userId;
      this.addSupplier.value.userHeadId = this.userHead.userHeadId;
      this.supplierService.addSupplierInSystem(this.addSupplier.value).subscribe(
        data =>{
          if(data["success"]){
            this.toastr.success(errorData.Add_Success);
            this.router.navigate(['pages/supplier']);

          }
          else{
            this.toastr.error(errorData.Add_Error);
          }
        },
        error=>{
          //toaster
          this.toastr.error(errorData.Serever_Error)
        }
      )
    }
    else{
      return;  
    }
  }

  updateSupplier(){
    this.disableButton=true;

    this.formSubmitted=true;
    if(this.addSupplier.valid){
      this.addSupplier.value.updatedBy = this.user.userId;
      let body = {
        ...this.addSupplier.value,
        id:this.selectedSupplierId
      }
      this.supplierService.updateSupplierById(body).subscribe(
        data=>{
          if(data["success"]){
            this.toastr.success(errorData.Update_Success);
            this.router.navigate(['pages/supplier']);

          }
          else{
            this.toastr.error(errorData.Update_Error);
          }
          this.loading = false;
        },
        error=>{
          //toaster
          this.toastr.error(errorData.Serever_Error);
          this.loading = false;
        }
      )
    }
  }

  public goBackToPreviousPage():any{
    this.router.navigate(['pages/supplier']);
  }

}
