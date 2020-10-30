import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';

@Component({
  selector: 'ngx-add-edit-supplier-rate',
  templateUrl: './add-edit-supplier-rate.component.html',
  styleUrls: ['./add-edit-supplier-rate.component.scss']
})
export class AddEditSupplierRateComponent implements OnInit {
  //Form 
  addSupplierRate: FormGroup;

  //data fatch supplier Name
  supplier:[]

  //For Toaster
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  
  //Form Validation flag
  formSubmitted:boolean=false;
  discount:number
  gst:number
 
  //form field values
  formValues={
  id:null,
  supplierName:null,
  gstPercentage:null,
  discountPercentage:null,
  remark: null,
  createdBy: null,
  createdDate: null,
  updatedDate: null,
  paymentTerms: null,
  updatedBy: null,
  userId: null,
  supplierRates:[
    {
      supplierId:null,
      userId:1,
      createdBy:null,
      itemName: null,
      rate: null,
      discountedRate:null,
      gstRate:null,
      id:null,
      createdDate: null,
      updatedBy: null,
      updatedDate: null
    }
  ]
}

  user: { userId: number; };

  //for fatching selected supplier id
  //supplierId
  
  supplierList
  index:any
  myForm: any;

  mySupplierRateId

  constructor( private commonService:CommonService, private supplierService:SupplierService, private router:Router, private _route:ActivatedRoute, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getSupplierName();
    this.user = this.commonService.getUser();
    //this.mySupplierId=this._route.snapshot.paramMap.get('id');
    this.mySupplierRateId=this._route.snapshot.paramMap.get('id');
    if(this.mySupplierRateId!=null){
      this.supplierService.getAllSupplierById(this.mySupplierRateId).subscribe(
        data=>{
          if(data["success"]){
            this.formValues=data["data"]
            console.log(this.formValues)
            this.discount=this.formValues.discountPercentage
            this.gst=this.formValues.gstPercentage
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
           "Supplier Rate",
           config);
        }
      )
    }
    
  }


  public getSupplierName(){
    this.user = this.commonService.getUser();
    this.formValues.supplierRates[0].createdBy=this.user.toString()
    this.supplierService.getAllSupplier().subscribe(
      data=>{
        console.log(data)
        if(data["success"]){
          if(data["data"] && data["data"].length>0){
            this.supplier=data["data"];
          }
          else{
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
             "NO SUPPLIER ADDED",
             config);
          }
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
         "Supplier",
         config);
      }
    )
  }

  public addSupplierRateInfo(myForm){
    this.formSubmitted=true
    this.formValues.id=this.formValues.supplierRates[0].supplierId
    this.formValues.supplierRates.forEach(element => {
      delete this.formValues.supplierRates[0].discountedRate
      delete this.formValues.supplierRates[0].gstRate
      delete this.formValues.discountPercentage
      delete this.formValues.gstPercentage
      delete this.formValues.supplierName
      delete this.formValues.gstPercentage
      delete this.formValues.discountPercentage
      delete this.formValues.remark
      delete this.formValues.createdBy
      delete this.formValues.createdDate
      delete this.formValues.updatedDate
      delete this.formValues.paymentTerms
      delete this.formValues.updatedBy
      delete this.formValues.userId
      delete this.formValues.supplierRates[0].createdDate
      delete this.formValues.supplierRates[0].updatedDate
      delete this.formValues.supplierRates[0].updatedBy
    });
    console.log(this.formValues.supplierRates)
    if(myForm.valid){
      this.supplierService.addSupplierRateInSystem(this.formValues).subscribe(
        data =>{
          if(data["success"]){
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
              "Supplier Rate Added Succesfully",
              "Supplier",
              config);
            this.router.navigate(['pages/supplier']);
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
           "Supplier",
           config);
        }
      )
    }
    else{
      return
    }
  }

  public updateSupplierRateInfo(myForm){
    this.formSubmitted=true
    this.user = this.commonService.getUser();
    this.formValues.id=this.formValues.supplierRates[0].supplierId
    this.formValues.supplierRates[0].createdBy=this.user.toString()
    this.formValues.supplierRates[0].updatedBy=this.user.toString()
    this.formValues.supplierRates.forEach(element => {
      delete this.formValues.supplierRates[0].discountedRate
      delete this.formValues.supplierRates[0].gstRate
      delete this.formValues.discountPercentage
      delete this.formValues.gstPercentage
      delete this.formValues.supplierName
      delete this.formValues.gstPercentage
      delete this.formValues.discountPercentage
      delete this.formValues.remark
      delete this.formValues.createdBy
      delete this.formValues.createdDate
      delete this.formValues.updatedDate
      delete this.formValues.paymentTerms
      delete this.formValues.updatedBy
      delete this.formValues.userId
      delete this.formValues.supplierRates[0].createdDate
      delete this.formValues.supplierRates[0].updatedDate
    });

    if(myForm.valid){
      this.supplierService.updateSupplierRateInSystem(this.formValues).subscribe(
        data =>{
          if(data["success"]){
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
              "Supplier Rate Updated Succesfully",
              "Supplier",
              config);
            this.router.navigate(['pages/supplier']);
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
           "Supplier",
           config);
        }
      )
    }
    else{
      return
    }
  }

  public goBackToPreviousPage():any{
    this.router.navigate(['pages/supplier']);
  }

  getDetail(value){
    this.formValues.supplierRates[0].supplierId=value
    for(let item of this.supplier){
      if(item['id']==value){
        this.discount=item['discountPercentage']
        this.gst=item['gstPercentage']
      }
    }
  }
  
  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    console.log(this.formValues.supplierRates)
    if (keyCode == 13){

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

      this.index = "supplierList" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.formValues.supplierRates.length - 1) {
        let item = this.formValues.supplierRates[rowIndex];
        if(colName == 'itemName'){
          if (!item.itemName) {
            this.toastrService.show(
              "Enter Item Name",
              'Item Name Field required',config);
            return;
          }
        }else if(colName == 'rate'){
          if (!item.rate) {
            this.toastrService.show(
              "Enter Item Rate",
              'Rate Field required',config);
            return;
          }
        }   
        let obj = {
          id:null,
          supplierName:null,
          gstPercentage:null,
          discountPercentage:null,
          remark: null,
          createdBy: null,
          createdDate: null,
          updatedDate: null,
          paymentTerms: null,
          updatedBy: null,
          userId: null,
          supplierId:null,
          itemName: null,
          rate: null,
          discountedRate:null,
          gstRate:null,
        };
        let list = this.formValues.supplierRates;
        list.push(obj);
        this.formValues.supplierRates = [...list];
        let interval = setInterval(()=>{
          let field = document.getElementById(this.index)
          if(field != null){
            field.focus()
            clearInterval(interval)
          }
        }, 500)
      } else {
        alert("go to any last row input to add new row");
      }
    }
  }
  
  calculateGstDiscountPercentage(rowIndex){
    console.log(this.discount)
    console.log(this.gst)
    let calculatedDiscount
    let calculatedGst
    let itemRate = Number(this.formValues.supplierRates[rowIndex].rate )
    let D = Number((itemRate * this.discount)/100)
    calculatedDiscount=Number(itemRate-D)
    let CGst =Number( (calculatedDiscount + this.gst)/100)
    calculatedGst = Number(calculatedDiscount+CGst)
    this.formValues.supplierRates[rowIndex].discountedRate = parseFloat(calculatedDiscount).toFixed(2);
    this.formValues.supplierRates[rowIndex].gstRate = parseFloat(calculatedGst).toFixed(2);
  }
  
  removeItem(id){
    let idCount = this.formValues.supplierRates.length
    let item = this.formValues.supplierRates;
    if(idCount == 1){
      item[0].itemName = null;
      item[0].rate = null;
      item[0].discountedRate = null;
      item[0].gstRate = null;
      let list = item;
      this.formValues.supplierRates = [...list];
    }
    else{
      let removed = item.splice(id,1);
      let list = item;
      this.formValues.supplierRates = [...list];
    }
 }

}

