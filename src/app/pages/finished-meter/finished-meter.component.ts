import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/@theme/services/common.service';

@Component({
  selector: 'ngx-finished-meter',
  templateUrl: './finished-meter.component.html',
  styleUrls: ['./finished-meter.component.scss']
})
export class FinishedMeterComponent implements OnInit {

  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
  }

}
