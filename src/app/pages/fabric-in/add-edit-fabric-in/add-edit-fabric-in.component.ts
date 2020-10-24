import { Component, OnInit } from "@angular/core";
import { PartyService } from "app/@theme/services/party.service";
import { QualityService } from "app/@theme/services/quality.service";
import { sample } from 'rxjs/operators';
import { setInterval } from 'timers';

@Component({
  selector: "ngx-add-edit-fabric-in",
  templateUrl: "./add-edit-fabric-in.component.html",
  styleUrls: ["./add-edit-fabric-in.component.scss"],
})
export class AddEditFabricInComponent implements OnInit {
  //form valiables...
  stockInType = "Fabric";
  partyId:Number;
  batch:boolean;
  billNo:Number;
  billDate:Date;
  chlNo:Number;
  chlDate:Date;
  lot:String;
  remark:String;
  dataTable = [{
    tableGr: Number,
    tableQualityId: Number,
    tableQualityName: String,
    tableQualityType: String,
    tableMeter: Number
  }];

  qualityList;
  party: any[];
  index: any;
  formSubmitted: boolean = false;
  qualityListEmpty: any = [
    {
      id: null,
      gr: null,
      qualityId: null,
      qualityName: null,
      qualityType: null,
      meter: null,
    },
  ];

  constructor(
    private partyService: PartyService,
    private qualityService: QualityService
  ) {}

  ngOnInit(): void {
    this.getPartyList();
    this.getQualityList();
  }

  qualityIdSelected(rowIndex) {
    let id = this.qualityListEmpty[rowIndex].qualityId;
    let item = this.qualityListEmpty[rowIndex];
    item.qualityName = this.qualityList[id - 1].qualityName;
    item.qualityType = this.qualityList[id - 1].qualityType;
  }

  onKeyUp(rowIndex, colIndex, colName) {
    this.index = "qualityList" + (rowIndex + 1) + "-" + colIndex;
    if (rowIndex === this.qualityListEmpty.length - 1) {
      let item = this.qualityListEmpty[rowIndex];
      if(colName == 'gr'){
        if (!item.gr) {
          //alert("Please enter Gr");
          return;
        }
      }else if(colName == 'qualityId'){
        if (!item.qualityId) {
          //alert("Please enter qualityId");
          return;
        }
      }else if(colName == 'meter'){
        if (!item.meter) {
          //alert("Please enter meter");
          return;
        }
      }      
      let obj = {
        id: null,
        gr: null,
        qualityId: null,
        qualityName: null,
        qualityType: null,
        meter: null,
      };
      let list = this.qualityListEmpty;
      list.push(obj);
      this.qualityListEmpty = [...list];
    } else {
      alert("go to any last row input to add new row");
    }
    //console.log(this.addEditFabricInForm);
  }

  onSubmit() {
    this.formSubmitted = true;
    console.log('form...........',this.qualityListEmpty);
  }

  getPartyList() {
    this.partyService.getAllPartyList().subscribe(
      (data) => {
        if (data["data"] && data["data"].length > 0) {
          this.party = data["data"];
        } else {
          console.log("NO PARTY YET ADDED>>>>>>>>");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getQualityList() {
    this.qualityService.getallQuality().subscribe(
      (data) => {
        if (data["data"] && data["data"].length > 0) {
          this.qualityList = data["data"];
        } else {
          console.log("NO Quality yet ADDED>>>>>>>>");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
