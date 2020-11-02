import { Component, OnInit } from '@angular/core';
import { ProcessService } from 'app/@theme/services/process.service';
import { QualityService } from 'app/@theme/services/quality.service';

@Component({
  selector: 'ngx-dynamic-process',
  templateUrl: './dynamic-process.component.html',
  styleUrls: ['./dynamic-process.component.scss']
})
export class DynamicProcessComponent implements OnInit {
 //form values..
 formValues= {
  processName: null,
  time: null,
}
qualityList;
formSubmitted = false;

constructor(private qualityService: QualityService, private processService: ProcessService) { }

ngOnInit(): void {
  this.getQualityList();
}

numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && ((charCode < 46 || charCode > 57) || charCode == 47)) {
    return false;
  }
  return true;
}

getQualityList(){
  this.qualityService.getallQuality().subscribe(
    data=>{
      if(data["success"])
        this.qualityList = data["data"];
    },error=>{
      //error
    }
  )
}

onAddStep() {
}

onSubmit(myForm){
  this.formSubmitted = true;
}
}
