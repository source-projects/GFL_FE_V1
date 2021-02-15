import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/@theme/services/common.service';
import { ShadeService } from 'app/@theme/services/shade.service';

@Component({
  selector: 'ngx-pending-apc',
  templateUrl: './pending-apc.component.html',
  styleUrls: ['./pending-apc.component.scss']
})
export class PendingApcComponent implements OnInit {
  apcList = [];
  tableStyle = "bootstrap";
  loading = false;
  userId:any;
  userHeadId:any;
  constructor(
    private shadeService: ShadeService,
    private commonService: CommonService,

  ) { }

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId["userId"];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId["userHeadId"];
    this.getallShades(this.userId , 'all')
   
  }

  getallShades(id, getBy) {
    let shadeList1 = [];
    this.loading = true;
    this.shadeService.getShadeMastList(id, getBy).subscribe(
      data => {
        if (data['success']) {
          if (data['data'].length > 0) {
            this.apcList = data['data'];
            this.apcList.forEach(element => {
              if(element.pending){
                shadeList1.push(element);
              }
            })
            this.apcList = shadeList1;
        
       
          }
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }

  deletePendingAPC(id){

  }

}
