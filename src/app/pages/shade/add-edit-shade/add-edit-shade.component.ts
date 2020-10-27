import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from "app/@theme/services/party.service";
import { QualityService } from "app/@theme/services/quality.service";
import {SupplierService} from "app/@theme/services/supplier.service";
import{ShadeService} from "app/@theme/services/shade.service";
import { Location } from '@angular/common';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
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

  shades=new Shade();
    
  index:any;
  formSubmitted: boolean = false;
  user: any;
  myShadeId;
  currentShade;
  supplierList;
  quality: any[];
  processList: any[];
  public color: string ="";
  q_name:any;
  q_type:any;
  p_name:any;
  supplierListEmpty: any = [
    {
      itemName: null,
      concentration: null,
      supplierName: null,
      rate: null,
      amount: null,
     
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
    private location:Location,
    private cpService: ColorPickerService,
    public vcRef: ViewContainerRef, 
    ) { }

  ngOnInit(): void {
    this.user = this.commonService.getUser();
    this.getQualityList();
    this.getProcessList();
    this.getSupplierList();
    this.getCurrentShade();
   
    
  }


  getSupplierList(){
  this.supplierService.getAllSupplierRates().subscribe(
    data =>{
      this.supplierList = data['data'];
     this.getAllSupplier();
      console.log(this.supplierList);
    },
    error=>{
      console.log(error)
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
          console.log("NO QUALITY YET ADDED>>>>>>>>");
        }
      },
      (error) => {
        console.log(error);
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
   this.q_name=this.quality[q_id].qualityName;
  this.q_type=this.quality[q_id].qualityType;
   this.p_name=this.quality[q_id].partyName;
  
  }

  itemSelected(rowIndex) {
    let iname=this.supplierListEmpty[rowIndex].itemName;
    let item=this.supplierListEmpty[rowIndex];
    item.rate=this.supplierList[iname].rate;
  }

calculateAmount(rowIndex){
  let item=this.supplierListEmpty[rowIndex];
  let con=this.supplierListEmpty[rowIndex].concentration;
  let rate1=this.supplierListEmpty[rowIndex].rate;
item.amount=con*rate1;
}
  onKeyUp(e,rowIndex, colIndex, colName) {
    console.log("onkeyup");
    var keyCode = (e.keyCode ? e.keyCode : e.which);
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
    if (rowIndex === this.supplierListEmpty.length - 1) {
      let item = this.supplierListEmpty[rowIndex];
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
        
      };
      let list = this.supplierListEmpty;
      list.push(obj);
      this.supplierListEmpty = [...list];
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

  
  onSubmit() {
    this.formSubmitted = true;
    
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
    }
 }
     
  
  


