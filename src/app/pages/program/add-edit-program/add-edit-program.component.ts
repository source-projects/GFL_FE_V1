import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from 'app/@theme/services/party.service';
import { QualityService } from 'app/@theme/services/quality.service';
import{Program, ProgramRecord} from 'app/@theme/model/program';
import { ToastrService } from 'ngx-toastr';
import * as errorData from 'app/@theme/json/error.json';

@Component({
  selector: 'ngx-add-edit-program',
  templateUrl: './add-edit-program.component.html',
  styleUrls: ['./add-edit-program.component.scss']
})
export class AddEditProgramComponent implements OnInit {

  constructor( private partyService: PartyService,
    private qualityService: QualityService,
    private route: Router,
    private toastr: ToastrService) { 
   }

  //programValues
  programValues: Program = new Program();
  programRecord:ProgramRecord= new ProgramRecord();

  public errorData: any = (errorData as any).default;

  //form Validation
  formSubmitted:boolean=false;

  //for fatching dropdown list data
  party:any[];
  qualityList:any[];
  partyShade:any;
  
  //for knowing the row index
  index:any;

  ngOnInit(): void {
    this.getPartyList();
    this.getQualityList();
  }


  getPartyList() {
    this.partyService.getAllPartyList().subscribe(
      (data) => {
        if(data['successs']){
          if (data["data"] && data["data"].length > 0) {
            this.party = data["data"];
          } 
          else {
            this.toastr.error(errorData.Internal_Error)
          }
        }
        else{
          this.toastr.error(errorData.Internal_Error)
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  public getQualityList() {
    this.qualityService.getallQuality().subscribe(
      (data) => {
        if(data["success"]){
          if (data["data"] && data["data"].length > 0) {
            this.qualityList = data["data"];
          } else {
            this.toastr.error(errorData.Internal_Error);
          }
        }
        else{
          this.toastr.error(errorData.Internal_Error);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  //put quality name and quality type
  public getQualityInfo(value){
    let id = value
    this.programValues.qualityName = this.qualityList[id-1].qualityName;
    this.programValues.qualityType = this.qualityList[id-1].qualityType;
  }

  //On enter pressed -> check empty field, add new row
  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if (keyCode == 13){
      this.index = "qualityList" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.programValues.programRecord.length - 1) {
        let item = this.programValues.programRecord[rowIndex];
        if(colName == 'partyShadeNo'){
          if (!item.partyShadeNo) {
            this.toastr.error("Enter Party Shade No","Party shade No Field required");
            return;
          }
        }else if(colName == 'shade_no'){
          if (!item.shade_no) {
            this.toastr.error("Select Shade No","Shade No Field required");
            return;
          }
        }else if(colName == 'colour_tone'){
          if (!item.colour_tone) {
            this.toastr.error("Enter Colour Tone","Colour Tone Field required");
            return;
          }
        }else if(colName == 'quantity'){
          if (!item.quantity) {
            this.toastr.error("Enter quantity","quantity Field required");
            return;
          }
        }else if(colName == 'batch'){
          if (!item.batch) {
            this.toastr.error("Enter No. of Batch","Batch Field required");
            return;
          }
        }else if(colName == 'lot_no'){
          if (!item.lot_no) {
            this.toastr.error("Enter Lot No","Lot No Field required");
            return;
          }
        }   
        let obj = {
          id: null,
          partyId: null,
          priority: null,
          programGivenBy: null,
          batch: null,
          colour_tone: null,
          lot_no: null,
          partyShadeNo: null,
          programControlId:null,
          quantity: null,
          remark: null,
          shade_no: null,
          qualityId: null,
          qualityName: null,
          qualityType: null,
        };
        let list = this.programValues.programRecord;
        list.push(obj);
        this.programValues.programRecord = [...list];
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

  removeItem(id){
    let idCount = this.programValues.programRecord.length
    let item = this.programValues.programRecord;
    if(idCount == 1){
      item[0].partyShadeNo = null;
      item[0].shade_no = null;
      item[0].colour_tone = null;
      item[0].quantity = null;
      item[0].batch = null;
      item[0].lot_no = null;
      item[0].remark = null;
      let list = item;
      this.programValues.programRecord = [...list];
    }
    else{
      let removed = item.splice(id,1);
      let list = item;
      this.programValues.programRecord = [...list];
    }
 }

 public addProgram(myForm){
  this.formSubmitted=true
  if(myForm.valid){
  }
  else{
    return
  }
 }
}



