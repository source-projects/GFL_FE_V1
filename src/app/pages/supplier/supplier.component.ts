import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';

@Component({
  selector: 'ngx-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  tableStyle="bootstrap";
  supplierList
  
  constructor(private commonService:CommonService, private supplierService:SupplierService, private router:Router) { }
   
  ngOnInit(): void {
    console.log("OnInit")
    this.supplierService.getAllSupplier().subscribe(
      data=>{
        this.supplierList=data['data']
        console.log(data)
      },
      error=>{
        console.log("error")
        console.log(error.message)
      }
    )
  }

  

  

}
