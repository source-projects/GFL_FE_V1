import { Component, OnInit } from '@angular/core';
import { QualityService } from '../../@theme/services/quality.service';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { StoreTokenService } from 'app/@theme/services/store-token.service';
import { CommonService } from 'app/@theme/services/common.service';
import { ExportService } from 'app/@theme/services/export.service';
import { QualityGuard } from 'app/@theme/guards/quality.guard';

@Component({
  selector: 'ngx-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})

export class QualityComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  permissions: Number;
  radioArray = [
    {id:1, value:"View Own"},
    {id:2, value:"View Group"},
    {id:3, value:"View All"}
  ];
  qualityList=[];
  quality=[];
  headers=["Quality Id", "Quality Name", "Quality Type", "Party Name" ];

  radioSelect = 1;
  userId;
  userHeadId;
  tableStyle = 'bootstrap';
  constructor(private commonService: CommonService,public qualityGuard: QualityGuard, private qualityService: QualityService, private toastr: ToastrService, private jwtToken: JwtTokenService, private storeTokenService: StoreTokenService) { }

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getQualityList(this.userId, "own");
  }

  onChange(event){
    this.qualityList = [];
    switch(event){
      case 1: 
              this.getQualityList(this.userId,"own");
              break;

      case 2: 
              this.getQualityList(this.userHeadId,"group");
              break;

      case 3:
              this.getQualityList(0,"all");
              break;
    }
  }

  getQualityList(id,getBy) {
    this.qualityService.getallQuality(id,getBy).subscribe(
      data => {
        if (data['success']) {
          this.qualityList = data['data']
          this.quality=this.qualityList.map((element)=>({qualityId:element.qualityId, qualityName: element.qualityName,
             qualityType: element.qualityType,partyName:element.partyName }))
             console.log(this.quality);
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
