import { Component, OnInit } from '@angular/core';
import { QualityService } from '../../@theme/services/quality.service';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { StoreTokenService } from 'app/@theme/services/store-token.service';
import { CommonService } from 'app/@theme/services/common.service';

@Component({
  selector: 'ngx-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})

export class QualityComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  permissions: Number;
  qualityList: [];
  tableStyle = 'bootstrap';
  constructor(private commonService: CommonService, private qualityService: QualityService, private toastr: ToastrService, private jwtToken: JwtTokenService, private storeTokenService: StoreTokenService) { }

  ngOnInit(): void {
    this.getQualityList();
  }


  getQualityList() {
    this.qualityService.getallQuality().subscribe(
      data => {
        if (data['success']) {
          this.qualityList = data['data']
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      error => {
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }
}
