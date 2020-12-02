import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from 'app/@theme/json/error.json';
import { ExportService } from 'app/@theme/services/export.service';

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
  supplier=[];
  headers=["Supplier Name", "Discount%", "GST%", "Payment Terms", "Remark" ];
  radioSelect = 1;
  radioArray = [
    {id:1, value:"View Own"},
    {id:2, value:"View Group"},
    {id:3, value:"View All"}
  ];
  userHeadId;
  userId;

  constructor(
    private commonService:CommonService, 
    private supplierService:SupplierService, 
    private router:Router, 
    private toastr: ToastrService,
    private exportService: ExportService
    ) { }
   
  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getSupplierList(this.userId,"own")
  }

  onChange(event){
    this.supplierList=[];
    switch(event){
      case 1: 
              this.getSupplierList(this.userId,"own");
              break;

      case 2: 
              this.getSupplierList(this.userHeadId,"group");
              break;

      case 3:
              this.getSupplierList(0,"all");
              break;
    }
  }

  public getSupplierList(id,getBy){
    this.supplierService.getAllSupplier(id,getBy).subscribe(
      data=>{
        this.supplierList=data['data']
        this.supplier=this.supplierList.map((element)=>({supplierName:element.supplierName, discountPercentage: element.discountPercentage,
          gstPercentage: element.gstPercentage, paymentTerms:element.paymentTerms, remark:element.remark }))
          console.log(this.supplier);
        //this.router.navigate(['pages/supplier']);
      },
      error=>{
        //toaster
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }
}
