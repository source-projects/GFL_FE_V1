import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { QualityService } from '../../@theme/services/quality.service';

@Component({
  selector: 'ngx-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {
  //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  
  qualityList
  tableStyle = 'bootstrap'
  constructor(private qualityService: QualityService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getQualityList();
  }

  getQualityList(){
    this.qualityService.getallQuality().subscribe(
      data =>{
        this.qualityList = data['data']
      },
      error=>{
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
         "Quality",
         config);
      }
    )
  }
}
