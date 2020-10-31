import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "app/@theme/services/common.service";
import {SupplierService} from "app/@theme/services/supplier.service";
import{ColorService} from "app/@theme/services/color.service";
import {Color} from "app/@theme/model/color";
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
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

   color=new Color(null,'','','','',
    [{'id':null,'itemId':null,'noOfBox':null,'purchaseId':null,'quantity':null,'quantityPerBox':0,'quantityUnit':'',
    'rate':null}],'',null,null,'',null,'',null);

    formSubmitted: boolean = false;
    myColorId;
    index:any;
    user: any;
    supplierList:any[];
    supplierList1:any[];
    fabric: any[];
  constructor(
    private _route: ActivatedRoute,
   // private partyService: PartyService,
    private commonService: CommonService,
    private supplierService: SupplierService,
    private colorService: ColorService,
    private toastrService: NbToastrService,
    private route: Router,
 //   public vcRef: ViewContainerRef, 
  ) { }

  ngOnInit(): void {
    this.getSupplierList();
    this.getAllSupplier();
  }
  getSupplierList(){
    this.supplierService.getAllSupplier().subscribe(
      data =>{
        if (data["data"] && data["data"].length > 0) {
          this.supplierList = data['data'];
         // this.getAllSupplier();
          console.log(this.supplierList);
        }
        else {
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
           "No supplier added yet",
           "Color",
           config);
       }
     },
      
      error=>{
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
         "Color",
         config);
      }
    )
  }
getAllSupplier(){
  this.supplierService.getAllSupplierRates().subscribe(
    data =>{
      if (data["data"] && data["data"].length > 0) {
        this.supplierList1 = data['data'];
        //this.getAllSupplier();
        console.log(this.supplierList1);
      }
      else {
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
         "No supplier added yet",
         "Color",
         config);
     }
   },
    
    error=>{
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
       "Color",
       config);
    }
  )
}
  itemSelected(rowIndex){
    console.log(rowIndex);
    let id=this.color.colorDataList[rowIndex].itemId;
    console.log(id);
    /*for(let s of this.supplierList){
      if(id==s.itemName){
        this.color.colorDataList[rowIndex].rate=s.rate;
      }
    }*/
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

   onSubmit(colorForm){
    this.formSubmitted = true;
    
    if(colorForm.valid){
      //console.log(this.iname);
      console.log(this.color.colorDataList);
    /*  for(let i=0;i<this.shades.shadeDataList.length;i++)
      {
        this.shades.shadeDataList[i].itemName=this.iname[i];
      } */
      console.log(this.color.colorDataList);
      this.colorService.addColor(this.color).subscribe(
        data => {
          console.log(data);
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
            "Color Added Succesfully",
            "Color",
            config);
          this.route.navigate(["/pages/color"]);
        },
        error => {
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
           "Color",
           config);
        }
      )
    }}
   }


