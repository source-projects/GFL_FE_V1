import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from 'app/@theme/json/error.json';

@Component({
  selector: 'ngx-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  tableStyle="bootstrap";

  public errorData: any = (errorData as any).default;

  //to get SupplierList
  supplierList=[];
  
  constructor(private commonService:CommonService, private supplierService:SupplierService, private router:Router, private toastr: ToastrService) { }
   
  ngOnInit(): void {
    this.getSupplierList()
  }

  public getSupplierList(){
    this.supplierService.getAllSupplier().subscribe(
      data=>{
        this.supplierList=data['data']
        this.router.navigate(['pages/supplier']);
      },
      error=>{
        //toaster
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }
}
