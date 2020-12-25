import { Component, OnInit } from '@angular/core';
import {DayBoilerValues, DayThermopackValues, NightBoilerValues, NightThermopackValues} from 'app/@theme/model/log-sheet';
import { LogSheetService } from 'app/@theme/services/log-sheet.service';

@Component({
  selector: 'ngx-log-sheet',
  templateUrl: './log-sheet.component.html',
  styleUrls: ['./log-sheet.component.scss']
})
export class LogSheetComponent implements OnInit {

  master:any;
  boiler:any;
  thermopack:any;

shift = [
  {id: 1, name: 'Day'},
  {id: 2, name: 'Night'}
];

dayFlag:boolean = true;
nightFlag:boolean = false;

selectedShift:any;
selectedMaster:any;
dateSelected:any;


dayArray = ["10:00","12:00","14:00","16:00","18:00","20:00"];
nightArray = ["22:00","00:00","02:00","04:00","06:00","08:00"];

boilerAttribute = ["Steam Pressure","Drum Water Level","Feed Pump (No.1/2)","Flue Gas Temp (TE5-1)","Bed Temperature (TE5-3)",
                  "Draft Pressure (DT5-4)","I.D.Fan (%)","F.D.Fan DA-1","F.D.Fan DA-2","F.D.Fan DA-3",
                  "Screw Feeder","Water Meter","Load (Final O/P)","Jet Running"];

thermopackAttribute = ["Forward Temperature","Return Temperature","Stack Temperature","Furnace",
                      "Pump (1/2)","I.D.Fan (Hz)","F.D.Fan (Hz)","Screw Feeder (1/2)"];

valueArray = [];
valueArray1 = [];

nightvalueArray = [];
nightvalueArray1 = [];
ss:any;
arr=[];
  data: any;


  constructor( private logsheet:LogSheetService ) { 
  }

  ngOnInit(): void {

    this.getMaster();
    this.getBoiler();
    this.getThermopack();
    for (let i = 0; i < this.boilerAttribute.length; i++) {
    this.valueArray.push(new DayBoilerValues());
    this.valueArray[i].Attribute = this.boilerAttribute[i];
      this.valueArray[i].time_10 = null;
      this.valueArray[i].time_12 = null;
      this.valueArray[i].time_12 = null;
      this.valueArray[i].time_14 = null;
      this.valueArray[i].time_16 = null;
      this.valueArray[i].time_18 = null;
      this.valueArray[i].time_20 = null;
    }

    for (let i = 0; i < this.thermopackAttribute.length; i++) {
      this.valueArray1.push(new DayThermopackValues())
      this.valueArray1[i].Attribute = this.thermopackAttribute[i];
      this.valueArray1[i].time_10 = null;
      this.valueArray1[i].time_12 = null;
      this.valueArray1[i].time_12 = null;
      this.valueArray1[i].time_14 = null;
      this.valueArray1[i].time_16 = null;
      this.valueArray1[i].time_18 = null;
      this.valueArray1[i].time_20 = null;
      }

      for (let i = 0; i < this.boilerAttribute.length; i++) {
        this.nightvalueArray.push(new NightBoilerValues());
        this.nightvalueArray[i].Attribute = this.boilerAttribute[i];
          this.nightvalueArray[i].time_22 = null;
          this.nightvalueArray[i].time_00 = null;
          this.nightvalueArray[i].time_02 = null;
          this.nightvalueArray[i].time_04 = null;
          this.nightvalueArray[i].time_06 = null;
          this.nightvalueArray[i].time_08 = null;
        }
     
      for (let i = 0; i < this.thermopackAttribute.length; i++) {
        this.nightvalueArray1.push(new NightThermopackValues())
        this.nightvalueArray1[i].Attribute = this.thermopackAttribute[i];
        this.nightvalueArray1[i].time_22 = null;
        this.nightvalueArray1[i].time_00 = null;
        this.nightvalueArray1[i].time_02 = null;
        this.nightvalueArray1[i].time_04 = null;
        this.nightvalueArray1[i].time_06 = null;
        this.nightvalueArray1[i].time_08 = null;
        }
  
  }

  submit(value:any){

    console.log(this.valueArray)
    console.log(this.valueArray1);
    console.log(this.nightvalueArray)
    console.log(this.nightvalueArray1)
  }

  shiftchange(value:any){

    console.log("value",value)
    if(value == 1)
    {
      this.nightFlag = false;
      this.dayFlag = true;
    }
    else if(value == 2)
    {
      this.dayFlag = false;
      this.nightFlag = true;
    }
  }

  masterchange(value:any){

    console.log("master",value)
  }

  getMaster(){
    this.data = this.logsheet.getAllMaster().subscribe(
      (res) => {
        this.master = res;
        this.master = this.master.data;
      }
    )
  }

  getBoiler(){
    this.data = this.logsheet.getBoilerMachines().subscribe(
      (res) => {
        console.log(res)
        this.boiler = res;
        this.boiler = this.boiler.data;
      }
    )
  }

  getThermopack(){
    this.data = this.logsheet.getThermopackMachines().subscribe(
      (res) => {
        this.thermopack = res;
        this.thermopack = this.thermopack.data;
      }
    )
  }

  boilerchange(value:any){

  }

  thermopackchange(value:any){

  }

}
