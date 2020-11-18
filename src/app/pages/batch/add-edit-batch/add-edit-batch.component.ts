import { Component, OnInit } from "@angular/core";
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { QualityService } from 'app/@theme/services/quality.service';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { Batch, GrData } from 'app/@theme/model/batch';

@Component({
  selector: "ngx-add-edit-batch",
  templateUrl: "./add-edit-batch.component.html",
  styleUrls: ["./add-edit-batch.component.scss"],
})
export class AddEditBatchComponent implements OnInit {
   //toaster config
   config: NbToastrConfig;
   destroyByClick = true;
   duration = 2000;
   hasIcon = true;
   position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
   preventDuplicates = false;
   status

  public errorData: any = (errorData as any).default;
   
  index;

  //form Validation
  formSubmitted = false;

  //to store Quality data
  quality:any;
  
  //form Variables..
  formValues :Batch=new Batch();
  grData: GrData= new GrData();

  constructor(private qualityService:QualityService, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getAllQuality();
  }

  getAllQuality() {
    this.qualityService.getallQuality().subscribe(
      data=>{
        this.quality = data['data'];
      },
      error=>{
        this.toastr.error(errorData.Serever_Error)
      }
    )
  }

  getQualityDataOnSelect(){
    let id = this.formValues.qualityId
    this.formValues.qualityName = this.quality[id-1].qualityName;
    this.formValues.qualityType = this.quality[id-1].qualityType;
  }

  grDataSelected(rowIndex, colIndex){
    //get  meter and weight freom grdata and store in meter and weight field.
  }

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

      this.index = "grData" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.formValues.grData.length - 1) {
        let item = this.formValues.grData[rowIndex];
        if(colName == 'gr'){
          if (!item.gr) {
            this.toastr.error("Enter Gr",'Gr Field required');
            return;
          }
        }   
        let obj = {
          gr: null,
          meter: null,
          weight: null
        };
        let list = this.formValues.grData;
        list.push(obj);
        this.formValues.grData = [...list];
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

  addBatch(myForm) {
    this.formSubmitted = true;
    if(myForm.valid){
      
    }
  }

  removeItem(rowId){
    let idCount = this.formValues.grData.length
    let item = this.formValues.grData;
    if(idCount == 1){
      item[0].gr = null;
      item[0].meter = null;
      item[0].weight = null;
      let list = item;
      this.formValues.grData = [...list];
    }
    else{
      let removed = item.splice(rowId,1);
      let list = item;
      this.formValues.grData = [...list];
    }
  }
}
