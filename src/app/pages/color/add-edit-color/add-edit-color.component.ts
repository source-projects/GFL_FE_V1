import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "app/@theme/services/common.service";
import {SupplierService} from "app/@theme/services/supplier.service";
import{ColorService} from "app/@theme/services/color.service";
import {Color, ColorDataList} from "app/@theme/model/color";
import * as errorData from 'app/@theme/json/error.json';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ngx-add-edit-color',
  templateUrl: './add-edit-color.component.html',
  styleUrls: ['./add-edit-color.component.scss']
})
export class AddEditColorComponent implements OnInit {

   //toaster config
   config: NbToastrConfig;
   destroyByClick = true;
   duration = 2000;
   hasIcon = true;
   position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
   preventDuplicates = false;
   status

   public errorData: any = (errorData as any).default;

    colorDataListArray:ColorDataList[]=[];

   color:Color=new Color();
   colorDataList:ColorDataList=new ColorDataList();

    //Form Validation
    formSubmitted: boolean = false;
    
    //to store current color Id
    currentColorId;

    index:any;

    //To store usreID
    user: any;

    //To Store Supplier Data
    supplierList:any[];

    //To store Supplier Rate Data
    supplierListRate:any[];

    //To Store fabric Data
    fabric: any[];

  constructor(
    private _route: ActivatedRoute,
    private commonService: CommonService,
    private supplierService: SupplierService,
    private colorService: ColorService,
    private toastrService: NbToastrService,
    private route: Router,
    private toastr:ToastrService
  ) {
      this.colorDataListArray.push(this.colorDataList);
      this.color.colorDataList=this.colorDataListArray;
    }

  ngOnInit(): void {
    this.getSupplierList();
    this.getAllSupplier();
  }
  getSupplierList(){
    this.supplierService.getAllSupplier().subscribe(
      data =>{
        if(data['success']){
          if (data["data"] && data["data"].length > 0) {
            this.supplierList = data['data'];
          }
          else {
            this.toastr.error(errorData.Not_added)
         }
        }
        else{
          this.toastr.error(errorData.Internal_Error)
        }
     },
      error=>{
        this.toastr.error(errorData.Serever_Error)
      }
    )
  }

getAllSupplier(){
  this.supplierService.getAllSupplierRates().subscribe(
    data =>{
      if(data['success']){
        if (data["data"] && data["data"].length > 0) {
          this.supplierListRate = data['data'];
        }
        else {
          this.toastr.error(errorData.Not_added)
       }
      }
      else{
        this.toastr.error(errorData.Internal_Error)
      }
    },
    error=>{
      this.toastr.error(errorData.Serever_Error)
    }
  )
}

  itemSelected(rowIndex){
    let id=this.color.colorDataList[rowIndex].itemId;
  }

  onKeyUp(e,rowIndex, colIndex, colName) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
     if (keyCode == 13){
       console.log("key 13");
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
     this.index = "colorList" + (rowIndex + 1) + "-" + colIndex;
     if (rowIndex === this.color.colorDataList.length - 1) {
       let item = this.color.colorDataList[rowIndex];
       console.log(item);
      if(colName == 'quantityPerBox'){
         if (!item.quantityPerBox) {
           this.toastrService.show(
             "Enter quantity per box",
             'quantity per box required',config);
           return;
         }
       }
       else if(colName == 'noOfBox'){
         if (!item.noOfBox) {
           this.toastrService.show(
             "Enter no of box",
             ' No of box required',config);
           return;
         }
       }
       else if(colName == 'quantity'){
         if (!item.quantity) {
           this.toastrService.show(
             "Enter total quantity",
             'total quantity is required',config);
           return;
         }
       }
      
       let obj = {
        // itemName: null,
         quantityPerBox: null,
         noOfBox: null,
         quantity: null,
         id:null,
         purchaseId:null,
         quantityUnit:null,
          itemId:null,
          rate:null
         
       };
       let list = this.color.colorDataList;
       list.push(obj);
       this.color.colorDataList = [...list];
       let interval = setInterval(()=>{
         let field = document.getElementById(this.index)
         if(field != null){
           field.focus()
           clearInterval(interval)
         }
       }, 500)
     } 
     else {
       alert("go to any last row input to add new row");
     }
   }
   }

   addColor(colorForm){
    this.formSubmitted = true;  
    if(colorForm.valid){
      this.colorService.addColor(this.color).subscribe(
        data => {
          if(data['sucess']){
            this.route.navigate(["/pages/color"]);
            this.toastr.success(errorData.Add_Success)
          }
          else{
            this.toastr.error(errorData.Internal_Error)
          }
        },
        error => {
          this.toastr.error(errorData.Serever_Error)
        }
      )
    }
  }
}