import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from "app/@theme/services/party.service";
import { QualityService } from "app/@theme/services/quality.service";
import {SupplierService} from "app/@theme/services/supplier.service";
import{ShadeService} from "app/@theme/services/shade.service";
import {Shade} from "app/@theme/model/shade";
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-add-edit-shade',
  templateUrl: './add-edit-shade.component.html',
  styleUrls: ['./add-edit-shade.component.scss']
})
export class AddEditShadeComponent implements OnInit {

  //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status

  shades=new Shade('','','','','','','','0','','','shailaja',0,0,0,
    [{'itemName':null,'concentration':null,'supplierName':null,'rate':null,'amount':null,'supplierId':0,'supplierItemId':0}],0);
    
  index:any;
  formSubmitted: boolean = false;
  user: any;
  myShadeId;
  currentShade;
  supplierList;
  quality: any[];
  processList: any[];
  public color: string ='';updateColor(){this.shades.colorTone=this.color}
  iname:any;
 irow:any;
  
 qualityListEmpty: any = [
    {
      qualityName:null,
      qualityType:null,
      partyName:null
     
    },
  ];
  supplierList1: any;

  constructor( 
    private _route: ActivatedRoute,
    private partyService: PartyService,
    private commonService: CommonService,
    private qualityService: QualityService,
    private supplierService: SupplierService,
    private shadeService: ShadeService,
    private toastrService: NbToastrService,
    private route: Router,
    public vcRef: ViewContainerRef, 
    ) { }
  
  ngOnInit(): void {
    this.user = this.commonService.getUser();
    //console.log(this.shades);
    this.getQualityList();
    this.getProcessList();
    this.getSupplierList();
    this.getCurrentShade();
  //  console.log(this.shades.shadeDataList);
  }

  getSupplierList(){
  this.supplierService.getAllSupplierRates().subscribe(
    data =>{
      if (data["data"] && data["data"].length > 0) {
        this.supplierList = data['data'];
        this.getAllSupplier();
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
         "Shade",
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
       "Shade",
       config);
    }
  )
  }

  getAllSupplier(){
    this.supplierService.getAllSupplier().subscribe(
      data =>{
        this.supplierList1 = data['data'];
       
        console.log(this.supplierList1);
      },
      error=>{
        console.log(error)
      }
    ) 
  }

  getProcessList(){
    this.shadeService.getQualityProcessList().subscribe(
      data =>{
        this.processList = data['data'];
        
      },
      error=>{
        console.log(error)
      }
    )
  }
 
  getQualityList(){
    this.qualityService.getallQuality().subscribe(
      (data) => {
      
        if (data["data"] && data["data"].length > 0) {
          this.quality = data["data"];
        } else {
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
            "No quality added yet",
            "Shade",
            config);
        }
      
      },
      (error) => {
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
          "Shade",
          config);
      }
    );
  }
  
  
  getCurrentShade(){
    this.myShadeId = this._route.snapshot.paramMap.get('id');
      if (this.myShadeId != null) {
  
        this.partyService.getPartyDetailsById(this.myShadeId).subscribe(
          data => {
            this.currentShade = data['data']
           console.log(this.currentShade);
          },
          error => {
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
             "Shade",
             config);
          }
        )
      }
  }  


  qualityIdSelected(q1_id) {
  
    let q_id=this.quality.findIndex(v=> v.id == q1_id);
    this.shades.qualityName=this.quality[q_id].qualityName;
    this.shades.qualityType=this.quality[q_id].qualityType;
    this.shades.partyName=this.quality[q_id].partyName;
  }
  itemSelected(rowIndex) {  
    this.irow=rowIndex;
    let id=this.shades.shadeDataList[rowIndex].itemName;
   let supId ;
    for(let s of this.supplierList){
      if(id==s.id){
        this.shades.shadeDataList[rowIndex].rate=s.rate;
        supId=s.supplierId;
        this.iname=s.itemName;
       //this.shades.shadeDataList[rowIndex].itemName=s.itemName;
      }
    }
    for(let s1 of this.supplierList1){
      if(supId==s1.id){
        this.shades.shadeDataList[rowIndex].supplierName=s1.supplierName;
      }
    }
   // this.shades.shadeDataList[rowIndex].itemName=this.iname; 
  }
  calculateAmount(rowIndex){
 
   let con=this.shades.shadeDataList[rowIndex].concentration;
 // console.log(con);
   let rate1=this.shades.shadeDataList[rowIndex].rate;
 // console.log(rate1);
 let amount=Number(con)*Number(rate1);
  this.shades.shadeDataList[rowIndex].amount=amount;
 
  }

  onKeyUp(e,rowIndex, colIndex, colName) {
   // console.log("onkeyup");
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
    this.index = "supplierList" + (rowIndex + 1) + "-" + colIndex;
    if (rowIndex === this.shades.shadeDataList.length - 1) {
      let item = this.shades.shadeDataList[rowIndex];
      console.log(item);
      if(colName == 'itemName'){
        if (!item.itemName) {
          this.toastrService.show(
            "Enter item name",
            'item name required',config);
          return;
        }
      }
       else if(colName == 'concentration'){
        if (!item.concentration) {
          this.toastrService.show(
            "Enter concentration",
            'concentration required',config);
          return;
        }
      }
      else if(colName == 'supplierName'){
        if (!item.supplierName) {
          this.toastrService.show(
            "Enter supplier name",
            'supplier name required',config);
          return;
        }
      }
      else if(colName == 'rate'){
        if (!item.rate) {
          this.toastrService.show(
            "Enter rate",
            'rate is required',config);
          return;
        }
      }
      else if(colName == 'amount'){
        if (!item.amount) {
          this.toastrService.show(
            "Enter amount",
            'amount is required',config);
          return;
        }
      }
      let obj = {
        itemName: null,
        concentration: null,
        supplierName: null,
        rate: null,
        amount: null,
        //createdBy:null,
        supplierId:null,
        supplierItemId:null
        
      };
      let list = this.shades.shadeDataList;
      list.push(obj);
      this.shades.shadeDataList = [...list];
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

  removeItem(id){
    let idCount = this.shades.shadeDataList.length;
    let item = this.shades.shadeDataList;
    if(idCount == 1){
      item[0].itemName = null;
      item[0].concentration = null;
      item[0].supplierName = null;
      item[0].rate = null;
      item[0].amount = null;
     
      let list = item;
      this.shades.shadeDataList = [...list];
    }
    else{
      let removed = item.splice(id,1);
      let list = item;
      this.shades.shadeDataList = [...list];
    }
 }

  
  onSubmit(shadeForm) {
    this.formSubmitted = true;
    //console.log(this.shades);
    if(shadeForm.valid){
      this.shades.shadeDataList[this.irow].itemName=this.iname; 
      this.shadeService.addShadeData(this.shades).subscribe(
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
            "Shade Added Succesfully",
            "Shade",
            config);
          this.route.navigate(["/pages/shade"]);
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
           "Party",
           config);
        }
      )
    }}

    /*updateShade(shadeForm) {
      this.formSubmitted = true;
      if (this.shadeForm.valid) {
        let body = {
          ...this.shadeForm.value,
          id: this.myShadeId
        }
        this.shadeService.updateParty(body).subscribe(
          data => {
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
              "Party Updated Succesfully",
              "Party",
              config);
              this.route.navigate(["/pages/party"]);
          },
          error => {
            
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
              "No internet access or Server failure",
              "Party",
              config);
          }
        )
      }
    }*/
   
}
     
  
  


