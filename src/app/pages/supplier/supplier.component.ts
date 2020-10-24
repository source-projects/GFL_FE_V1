import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';

@Component({
  selector: 'ngx-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
   //toaster config
   config: NbToastrConfig;
   destroyByClick = true;
   duration = 2000;
   hasIcon = true;
   position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
   preventDuplicates = false;
   status: NbComponentStatus = 'primary';
   
  tableStyle="bootstrap";
  supplierList
  
  constructor(private commonService:CommonService, private supplierService:SupplierService, private router:Router, private toastrService: NbToastrService) { }
   
  ngOnInit(): void {
    console.log("OnInit")
    this.supplierService.getAllSupplier().subscribe(
      data=>{
        this.supplierList=data['data']
        console.log(data)
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
