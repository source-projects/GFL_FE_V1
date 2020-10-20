import { Component, OnInit } from '@angular/core';
import { QualityService } from '../../@theme/services/quality.service';

@Component({
  selector: 'ngx-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {
  qualityList
  tableStyle = 'bootstrap'
  constructor(private qualityService: QualityService) { }

  ngOnInit(): void {
    
    this.qualityService.getallQuality().subscribe(
      data =>{
        this.qualityList = data['data']
      },
      error=>{
        console.log(error)
      }
    )
  }
}
