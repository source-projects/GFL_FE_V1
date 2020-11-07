import { Component, OnInit } from '@angular/core';
import { QualityService } from '../../@theme/services/quality.service';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})

export class QualityComponent implements OnInit {

  public errorData: any = (errorData as any).default;
    
  qualityList:[];
  tableStyle = 'bootstrap';
  constructor(private qualityService: QualityService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getQualityList();
  }

  getQualityList(){
    this.qualityService.getallQuality().subscribe(
      data =>{
        if(data['success']){
          this.qualityList = data['data']
          console.log(data['data'])
          console.log(this.qualityList)
        }
        else{
          this.toastr.error(errorData.Internal_Error)
        }
      },
      error=>{
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }
}
