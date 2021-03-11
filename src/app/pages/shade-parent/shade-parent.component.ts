import { Component, OnInit } from "@angular/core";
import { Shade, ShadeDataList } from "../../@theme/model/shade";

@Component({
  selector: "ngx-shade-parent",
  templateUrl: "./shade-parent.component.html",
  styleUrls: ["./shade-parent.component.scss"],
})
export class ShadeParentComponent implements OnInit {
  shadeDataListArray: ShadeDataList[] = [];
  shadeData: Shade = new Shade();
  shadeDataList: ShadeDataList = new ShadeDataList();
  formSubmitted: boolean = false;
  qualityId: any;
  addedBy: any;
  createdBy: any;
  constructor() {
    this.shadeDataListArray.push(this.shadeDataList);
    this.shadeData.shadeDataList = this.shadeDataListArray;
  }

  ngOnInit() {}

  reset(shadeForm) {
    shadeForm.reset();
    this.formSubmitted = false;
    this.shadeData.colorTone = null;
    this.shadeDataListArray = [];
    this.ngOnInit();
  }
  addShade(shadeForm) {
    console.log(this.shadeData);
  }
}
