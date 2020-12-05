import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from "app/@theme/services/common.service";

@Component({
  selector: "ngx-add-edit-finished-meter",
  templateUrl: "./add-edit-finished-meter.component.html",
  styleUrls: ["./add-edit-finished-meter.component.scss"],
})
export class AddEditFinishedMeterComponent implements OnInit {
  currentFinishedMeter;
  user;
  userHead;
  constructor(
    private commonService: CommonService,
    private route: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getData();
    if(this.currentFinishedMeter != null)
      this.getUpdateData()
  }

  getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentFinishedMeter = this._route.snapshot.paramMap.get("id");
  }

  getUpdateData(){
    
  }

  addFinishedMeter() {}

  updateFinishedMeter() {}
}
