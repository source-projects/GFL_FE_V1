import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { PartyService } from 'app/@theme/services/party.service';
import { QualityService } from 'app/@theme/services/quality.service';
import{Program} from 'app/@theme/model/program';

@Component({
  selector: 'ngx-add-edit-program',
  templateUrl: './add-edit-program.component.html',
  styleUrls: ['./add-edit-program.component.scss']
})
export class AddEditProgramComponent implements OnInit {

  constructor( private partyService: PartyService,
    private qualityService: QualityService,
    private toastrService: NbToastrService,
    private route: Router) { 
   }

   //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: any

  //FormValues
  formValues= new Program(null,null,null,null,null,null,null,null,null,
    [{batch: "string",
      colour_tone: "string",
      id: "string",
      lot_no: "string",
      partyShadeNo: "string",
      programControlId:"string",
      quantity: "string",
      remark: "string",
      shade_no: "string",}]);

  

  //form Validation
  formSubmitted:boolean=false

  //for fatching dropdown list data
  party:any[]
  qualityList:any[]
  partyShade
  
  //for knowing the row index
  index

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
              "No party added yet",
              "Fabric-in",
              config);
          }
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
         "Fabric-in",
         config);
      }
    );
  }

  public getQualityList() {
    this.qualityService.getallQuality().subscribe(
      (data) => {
        if (data["data"] && data["data"].length > 0) {
          this.qualityList = data["data"];
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
            "Fabric-in",
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
            "Fabric-in",
            config);
      }
    );
  }

  //put quality name and quality type
  public getQualityInfo(value){
    let id = value
    this.formValues.qualityName = this.qualityList[id-1].qualityName;
    this.formValues.qualityType = this.qualityList[id-1].qualityType;
  }

  //On enter pressed -> check empty field, add new row
  onKeyUp(e, rowIndex, colIndex, colName) {
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

      this.index = "qualityList" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.formValues.programRecord.length - 1) {
        let item = this.formValues.programRecord[rowIndex];
        if(colName == 'partyShadeNo'){
          if (!item.partyShadeNo) {
            this.toastrService.show(
              "Enter Party Shade No",
              'Party shade No Field required',config);
            return;
          }
        }else if(colName == 'shade_no'){
          if (!item.shade_no) {
            this.toastrService.show(
              "Select Shade No",
              'Shade No Field required',config);
            return;
          }
        }else if(colName == 'colour_tone'){
          if (!item.colour_tone) {
            this.toastrService.show(
              "Enter Colour Tone",
              'Colour Tone Field required',config);
            return;
          }
        }else if(colName == 'quantity'){
          if (!item.quantity) {
            this.toastrService.show(
                "Enter quantity",
                'quantity Field required',config);
            return;
          }
        }else if(colName == 'batch'){
          if (!item.batch) {
            this.toastrService.show(
                "Enter No. of Batch",
                'Batch Field required',config);
            return;
          }
        }else if(colName == 'lot_no'){
          if (!item.lot_no) {
            this.toastrService.show(
                "Enter Lot No",
                'Lot No Field required',config);
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
        let list = this.formValues.programRecord;
        list.push(obj);
        this.formValues.programRecord = [...list];
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
    let idCount = this.formValues.programRecord.length
    let item = this.formValues.programRecord;
    if(idCount == 1){
      item[0].partyShadeNo = null;
      item[0].shade_no = null;
      item[0].colour_tone = null;
      item[0].quantity = null;
      item[0].batch = null;
      item[0].lot_no = null;
      item[0].remark = null;
      let list = item;
      this.formValues.programRecord = [...list];
    }
    else{
      let removed = item.splice(id,1);
      let list = item;
      this.formValues.programRecord = [...list];
    }
 }

 public addProgram(myForm){
  this.formSubmitted=true
  if(myForm.valid){
    console.log("Success")
    console.log(this.formValues)
  }
  else{
    return
  }
}

}



