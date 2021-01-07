import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Boiler, DayBoilerValues, DayThermopackValues, NightBoilerValues, NightThermopackValues, Thermopack } from 'app/@theme/model/log-sheet';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { LogSheetService } from 'app/@theme/services/log-sheet.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from 'app/@theme/json/error.json';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.scss']
})
export class InputDataComponent implements OnInit {
  currentDate = new Date();
  checkCurrent:any;
  shiftselected:any = "day";
  fetchedData = [];
  public max;
  public errorData: any = (errorData as any).default;

  shiftid:any;
  boiler: any;
  thermopack: any;
  boilerId: any = 11626;
  thermoId: any = 11628;
  masterId:any;
  

  jetRunning:Number;
  Boilertime_00Array = [];
  Boilertime_02Array = [];
  Boilertime_04Array = [];
  Boilertime_06Array = [];
  Boilertime_08Array = [];
  Boilertime_10Array = [];
  Boilertime_12Array = [];
  Boilertime_14Array = [];
  Boilertime_16Array = [];
  Boilertime_18Array = [];
  Boilertime_20Array = [];
  Boilertime_22Array = [];

  Thermo_00Array = [];
  Thermo_02Array = [];
  Thermo_04Array = [];
  Thermo_06Array = [];
  Thermo_08Array = [];
  Thermo_10Array = [];
  Thermo_12Array = [];
  Thermo_14Array = [];
  Thermo_16Array = [];
  Thermo_18Array = [];
  Thermo_20Array = [];
  Thermo_22Array = [];

  shift = [
    { id: 1, name: 'Day' },
    { id: 2, name: 'Night' }
  ];

  BoilerdayFlag: boolean = true;
  ThermopackdayFlag:boolean = true;
  BoilernightFlag: boolean = false;
  ThermopacknightFlag:boolean = false;

  selectedShift: any;
  dateSelected: any;

  finalBoilerobj = [];
  finalThermoobj = [];

  dayArray = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
  nightArray = ["22:00", "00:00", "02:00", "04:00", "06:00", "08:00"];

  boilerAttribute = ["Steam Pressure", "Drum Water Level", "Feed Pump (No.1/2)", "Flue Gas Temp (TE5-1)", "Bed Temperature (TE5-3)",
    "Draft Pressure (DT5-4)", "I.D.Fan (%)", "F.D.Fan DA-1", "F.D.Fan DA-2", "F.D.Fan DA-3",
    "Screw Feeder", "Water Meter", "Load (Final O/P)"];

  thermopackAttribute = ["Forward Temperature", "Return Temperature", "Stack Temperature", "Furnace",
    "Pump (1/2)", "I.D.Fan (Hz)", "F.D.Fan (Hz)", "Screw Feeder (1/2)"];

  valueArray = [];
  valueArray1 = [];

  nightvalueArray = [];
  nightvalueArray1 = [];

  data: any;

  datePipeString: String;

  constructor(private jwt:JwtTokenService,private logsheet:LogSheetService, private datePipe: DatePipe,private toast:ToastrService,private router:Router) { }

  ngOnInit(): void {

    this.masterId =  this.jwt.getDecodeToken("userHeadId");
    this.max = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 23, 59);
    this.getBoiler();
    this.getThermopack();
    for (let i = 0; i < this.boilerAttribute.length; i++) {
      this.valueArray.push(new DayBoilerValues());
      this.valueArray[i].Attribute = this.boilerAttribute[i];
      this.valueArray[i].time_10 = null;
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

  submitBoilerday(value: any) {

    
    if(this.datePipeString == null){
      this.toast.error("Select Date")
    }
    else if(this.jetRunning == null){
      this.toast.error("Jet Running empty")
    }
    else 
    {
      this.valueArray.forEach(ele => {
        this.Boilertime_10Array.push(ele.time_10);
        this.Boilertime_12Array.push(ele.time_12);
        this.Boilertime_14Array.push(ele.time_14);
        this.Boilertime_16Array.push(ele.time_16);
        this.Boilertime_18Array.push(ele.time_18);
        this.Boilertime_20Array.push(ele.time_20);
  
      })

  
      this.boilerobjadd(this.Boilertime_10Array, "10");
      this.boilerobjadd(this.Boilertime_12Array, "12");
      this.boilerobjadd(this.Boilertime_14Array, "14");
      this.boilerobjadd(this.Boilertime_16Array, "16");
      this.boilerobjadd(this.Boilertime_18Array, "18");
      this.boilerobjadd(this.Boilertime_20Array, "20");
  
      this.saveBoilerData(this.shiftselected);

    }

  }

  submitThermopackday(value: any) {

    
    if(this.datePipeString == null){
      this.toast.error("Select Date")
    }
    else
    {
  
      this.valueArray1.forEach(ele => {
  
        this.Thermo_10Array.push(ele.time_10);
        this.Thermo_12Array.push(ele.time_12);
        this.Thermo_14Array.push(ele.time_14);
        this.Thermo_16Array.push(ele.time_16);
        this.Thermo_18Array.push(ele.time_18);
        this.Thermo_20Array.push(ele.time_20);
      })
  
      this.thermoobjadd(this.Thermo_10Array, 10);
      this.thermoobjadd(this.Thermo_12Array, 12);
      this.thermoobjadd(this.Thermo_14Array, 14);
      this.thermoobjadd(this.Thermo_16Array, 16);
      this.thermoobjadd(this.Thermo_18Array, 18);
      this.thermoobjadd(this.Thermo_20Array, 20);
  
      this.saveThermoData();
    }

  }

  saveBoilerData(value:any) {

    let obj = {
      boilerMachineRecord:this.finalBoilerobj,
      jetRunning:this.jetRunning
    }
    this.logsheet.saveBoilerData(obj).subscribe(
      (data) => {
        if(data["success"]){
          this.toast.success("Added");
          if(value=='day'){
          for (let i = 0; i < this.boilerAttribute.length; i++) {
            this.valueArray.push(new DayBoilerValues());
            this.valueArray[i].Attribute = this.boilerAttribute[i];
            this.valueArray[i].time_10 = null;
            this.valueArray[i].time_12 = null;
            this.valueArray[i].time_14 = null;
            this.valueArray[i].time_16 = null;
            this.valueArray[i].time_18 = null;
            this.valueArray[i].time_20 = null;
          }
        }else{

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
        }
        }
      },
      (error) =>{
        this.toast.error(errorData.Serever_Error)
      }
    )
  }

  submitBoilernight(value: any) {

    if(this.datePipeString == null){
      this.toast.error("Select Date")
    }
    else if(this.jetRunning == null){
      this.toast.error("Jet Running empty")
    }
    else
    {
      this.nightvalueArray.forEach(ele => {
        this.Boilertime_22Array.push(ele.time_22);
        this.Boilertime_00Array.push(ele.time_00);
        this.Boilertime_02Array.push(ele.time_02);
        this.Boilertime_04Array.push(ele.time_04);
        this.Boilertime_06Array.push(ele.time_06);
        this.Boilertime_08Array.push(ele.time_08);
      })
  

      this.boilerobjadd(this.Boilertime_22Array, "22");
      this.boilerobjadd(this.Boilertime_00Array, "00");
      this.boilerobjadd(this.Boilertime_02Array, "02");
      this.boilerobjadd(this.Boilertime_04Array, "04");
      this.boilerobjadd(this.Boilertime_06Array, "06");
      this.boilerobjadd(this.Boilertime_08Array, "08");
  
      this.saveBoilerData(this.shiftselected);

    }

  }

  submitThermopacknight(value: any) {


    
    if(this.datePipeString == null){
      this.toast.error("Select Date")
    }
    else
    {
      this.nightvalueArray1.forEach(ele => {
  
        this.Thermo_22Array.push(ele.time_22);
        this.Thermo_00Array.push(ele.time_00);
        this.Thermo_02Array.push(ele.time_02);
        this.Thermo_04Array.push(ele.time_04);
        this.Thermo_06Array.push(ele.time_06);
        this.Thermo_08Array.push(ele.time_08);
  
      })
  
      this.thermoobjadd(this.Thermo_22Array, 22);
      this.thermoobjadd(this.Thermo_00Array, 0);
      this.thermoobjadd(this.Thermo_02Array, 2);
      this.thermoobjadd(this.Thermo_04Array, 4);
      this.thermoobjadd(this.Thermo_06Array, 6);
      this.thermoobjadd(this.Thermo_08Array, 8);
  
      this.saveThermoData();

    }

  }

  saveThermoData() {
    this.logsheet.saveThermoData(this.finalThermoobj).subscribe(
      (data) => {
        if(data["success"]){
          this.toast.success("Added")
        }
      },
      (error) =>{
        this.toast.error(errorData.Serever_Error)
      }
    )
  }

  boilerobjadd(array, time) {
    let boilerdata: Boiler = new Boiler();

    boilerdata.streamPressusre = array[0];
    boilerdata.drumWaterLevel = array[1];
    boilerdata.feedPump = array[2];
    boilerdata.flueGasTemp = array[3];
    boilerdata.bedTemp = array[4];
    boilerdata.draftPressure = array[5];
    boilerdata.IDFan = array[6];
    boilerdata.FDFanDA1 = array[7];
    boilerdata.FDFanDA2 = array[8];
    boilerdata.FDFanDA3 = array[9];
    boilerdata.ScrewFeeder = array[10];
    boilerdata.WaterMeter = array[11];
    boilerdata.Load = array[12];
    boilerdata.userHeadId = this.masterId;
    boilerdata.controlId = this.boilerId;
    boilerdata.dateToEnter = this.datePipeString;
    boilerdata.timeOf = time;
    this.finalBoilerobj.push(boilerdata)
  }

  thermoobjadd(array, time) {
    let thermodata: Thermopack = new Thermopack();

    thermodata.forwardTemp = array[0];
    thermodata.returnTemp = array[1];
    thermodata.stackTemp = array[2];
    thermodata.furnaceTemp = array[3];
    thermodata.pumpData = array[4];
    thermodata.idFan = array[5];
    thermodata.fdFan = array[6];
    thermodata.screwFeeder = array[7];
    thermodata.dateToEnter = this.datePipeString;
    thermodata.userHeadId = this.masterId;
    thermodata.controlId = this.thermoId;
    thermodata.timeOf = time;
    this.finalThermoobj.push(thermodata)
  }

  shiftBoilerchange(value: any) {
    this.dateSelected = null;

    if (value == 1) {
      this.shiftselected = "day";
      this.BoilernightFlag = false;
      this.BoilerdayFlag = true;
    }
    else if (value == 2) {
      this.shiftselected = "night";
      this.BoilerdayFlag = false;
      this.BoilernightFlag = true;
    }
  }
  shiftThermopackchange(value: any) {

    if (value == 1) {
      this.shiftselected = "day";
      this.ThermopacknightFlag = false;
      this.ThermopackdayFlag = true;
    }
    else if (value == 2) {
      this.shiftselected = "night";
      this.ThermopackdayFlag = false;
      this.ThermopacknightFlag = true;
    }
  }
  changeBoiler(value: any) {

    this.datePipeString = this.datePipe.transform(value._selected, 'yyyy-MM-dd');
    this.checkCurrent = this.datePipe.transform(this.currentDate,'yyyy-MM-dd')
    if (this.datePipeString < this.checkCurrent){
      let obj = {
        boilerId:this.boilerId,
        date:this.datePipeString,
        shift:this.shiftselected
      }
     

      this.logsheet.fetchBoilerData(obj).subscribe(
        (data) => {
          if(data["success"]){
            this.fetchedData = data["data"]
            if(obj.shift=="night"){
              this.fetchBoilerNight(this.fetchedData);

            }
            else{
              this.fetchBoilerDay(this.fetchedData);

            }

          }
        },
        (error) =>{
          this.toast.error(errorData.Serever_Error)
        }
      )
    }

  }

  changeThermo(value: any) {

    this.datePipeString = this.datePipe.transform(value._selected, 'yyyy-MM-dd');
    this.checkCurrent = this.datePipe.transform(this.currentDate,'yyyy-MM-dd')
    if (this.datePipeString < this.checkCurrent){
      let obj = {
        thermoId:this.thermoId,
        date:this.datePipeString,
        shift:this.shiftselected
      }
     

      this.logsheet.fetchThermoData(obj).subscribe(
        (data) => {
          console.log(data);
          if(data["success"]){
            this.fetchedData = data["data"]
            if(obj.shift=="night"){
              this.fetchThermoNight(this.fetchedData);

            }
            else{
              this.fetchThermoDay(this.fetchedData);

            }

          }
        },
        (error) =>{
          this.toast.error(errorData.Serever_Error)
        }
      )
    }

  }

  fetchBoilerDay(fetchedData){
    this.jetRunning=fetchedData[0].jetRunning;
    this.valueArray1 = [];

    fetchedData.forEach(element => {

      let blr = new Boiler();

      switch(element.timeOf){
        case 10:
          
          blr.streamPressusre =element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.IDFan = element.idFan;
          blr.FDFanDA1 =element.daOne;
          blr.FDFanDA2 = element.daTwo;
          blr.FDFanDA3 = element.daThree;
          blr.ScrewFeeder = element.screwFeeder;
          blr.WaterMeter = element.WaterMeter;
          blr.Load = element.loadData;
          this.Boilertime_10Array=Object.values(blr);
        break;
      
      case 12:
          
        blr.streamPressusre =element.streamPressusre;
        blr.drumWaterLevel = element.drumWaterLevel;
        blr.feedPump = element.feedPump;
        blr.flueGasTemp = element.flueGasTemp;
        blr.bedTemp = element.bedTemp;
        blr.draftPressure = element.draftPressure;
        blr.IDFan = element.idFan;
        blr.FDFanDA1 =element.daOne;
        blr.FDFanDA2 = element.daTwo;
        blr.FDFanDA3 = element.daThree;
        blr.ScrewFeeder = element.screwFeeder;
        blr.WaterMeter = element.WaterMeter;
        blr.Load = element.loadData;
        this.Boilertime_12Array=Object.values(blr);     
      break;

      case 14:
          
          blr.streamPressusre =element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.IDFan = element.idFan;
          blr.FDFanDA1 =element.daOne;
          blr.FDFanDA2 = element.daTwo;
          blr.FDFanDA3 = element.daThree;
          blr.ScrewFeeder = element.screwFeeder;
          blr.WaterMeter = element.WaterMeter;
          blr.Load = element.loadData;
          this.Boilertime_14Array=Object.values(blr);     
        break;

        case 16:
          
            blr.streamPressusre =element.streamPressusre;
            blr.drumWaterLevel = element.drumWaterLevel;
            blr.feedPump = element.feedPump;
            blr.flueGasTemp = element.flueGasTemp;
            blr.bedTemp = element.bedTemp;
            blr.draftPressure = element.draftPressure;
            blr.IDFan = element.idFan;
            blr.FDFanDA1 =element.daOne;
            blr.FDFanDA2 = element.daTwo;
            blr.FDFanDA3 = element.daThree;
            blr.ScrewFeeder = element.screwFeeder;
            blr.WaterMeter = element.WaterMeter;
            blr.Load = element.loadData;
            this.Boilertime_16Array=Object.values(blr);     
          break;

          case 18:
          
              blr.streamPressusre =element.streamPressusre;
              blr.drumWaterLevel = element.drumWaterLevel;
              blr.feedPump = element.feedPump;
              blr.flueGasTemp = element.flueGasTemp;
              blr.bedTemp = element.bedTemp;
              blr.draftPressure = element.draftPressure;
              blr.IDFan = element.idFan;
              blr.FDFanDA1 =element.daOne;
              blr.FDFanDA2 = element.daTwo;
              blr.FDFanDA3 = element.daThree;
              blr.ScrewFeeder = element.screwFeeder;
              blr.WaterMeter = element.WaterMeter;
              blr.Load = element.loadData;
              this.Boilertime_18Array=Object.values(blr);     
            break;

            case 20:
          
                blr.streamPressusre =element.streamPressusre;
                blr.drumWaterLevel = element.drumWaterLevel;
                blr.feedPump = element.feedPump;
                blr.flueGasTemp = element.flueGasTemp;
                blr.bedTemp = element.bedTemp;
                blr.draftPressure = element.draftPressure;
                blr.IDFan = element.idFan;
                blr.FDFanDA1 =element.daOne;
                blr.FDFanDA2 = element.daTwo;
                blr.FDFanDA3 = element.daThree;
                blr.ScrewFeeder = element.screwFeeder;
                blr.WaterMeter = element.WaterMeter;
                blr.Load = element.loadData;
                this.Boilertime_20Array=Object.values(blr);     
              break;
    }
    });
  
    for (let i = 0; i < this.boilerAttribute.length; i++) {
      this.valueArray.push(new DayBoilerValues());
      this.valueArray[i].Attribute = this.boilerAttribute[i];
      this.valueArray[i].time_10 = this.Boilertime_10Array[i];
      this.valueArray[i].time_12 = this.Boilertime_12Array[i];
      this.valueArray[i].time_14 = this.Boilertime_14Array[i];
      this.valueArray[i].time_16 = this.Boilertime_16Array[i];
      this.valueArray[i].time_18 = this.Boilertime_18Array[i];
      this.valueArray[i].time_20 = this.Boilertime_20Array[i];
    }
  }
  
  fetchBoilerNight(fetchedData){
    this.jetRunning=fetchedData[0].jetRunning;
    this.nightvalueArray = [];

    fetchedData.forEach(element => {

      let blr = new Boiler();

      switch(element.timeOf){
        case 22:
          
          blr.streamPressusre =element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.IDFan = element.idFan;
          blr.FDFanDA1 =element.daOne;
          blr.FDFanDA2 = element.daTwo;
          blr.FDFanDA3 = element.daThree;
          blr.ScrewFeeder = element.screwFeeder;
          blr.WaterMeter = element.WaterMeter;
          blr.Load = element.loadData;
          this.Boilertime_22Array=Object.values(blr);
        break;
      
      case '00':
          
        blr.streamPressusre =element.streamPressusre;
        blr.drumWaterLevel = element.drumWaterLevel;
        blr.feedPump = element.feedPump;
        blr.flueGasTemp = element.flueGasTemp;
        blr.bedTemp = element.bedTemp;
        blr.draftPressure = element.draftPressure;
        blr.IDFan = element.idFan;
        blr.FDFanDA1 =element.daOne;
        blr.FDFanDA2 = element.daTwo;
        blr.FDFanDA3 = element.daThree;
        blr.ScrewFeeder = element.screwFeeder;
        blr.WaterMeter = element.WaterMeter;
        blr.Load = element.loadData;
        this.Boilertime_00Array=Object.values(blr);     
      break;

      case '02':
          
          blr.streamPressusre =element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.IDFan = element.idFan;
          blr.FDFanDA1 =element.daOne;
          blr.FDFanDA2 = element.daTwo;
          blr.FDFanDA3 = element.daThree;
          blr.ScrewFeeder = element.screwFeeder;
          blr.WaterMeter = element.WaterMeter;
          blr.Load = element.loadData;
          this.Boilertime_02Array=Object.values(blr);     
        break;

        case '04':
          
            blr.streamPressusre =element.streamPressusre;
            blr.drumWaterLevel = element.drumWaterLevel;
            blr.feedPump = element.feedPump;
            blr.flueGasTemp = element.flueGasTemp;
            blr.bedTemp = element.bedTemp;
            blr.draftPressure = element.draftPressure;
            blr.IDFan = element.idFan;
            blr.FDFanDA1 =element.daOne;
            blr.FDFanDA2 = element.daTwo;
            blr.FDFanDA3 = element.daThree;
            blr.ScrewFeeder = element.screwFeeder;
            blr.WaterMeter = element.WaterMeter;
            blr.Load = element.loadData;
            this.Boilertime_04Array=Object.values(blr);     
          break;

          case '06':
          
              blr.streamPressusre =element.streamPressusre;
              blr.drumWaterLevel = element.drumWaterLevel;
              blr.feedPump = element.feedPump;
              blr.flueGasTemp = element.flueGasTemp;
              blr.bedTemp = element.bedTemp;
              blr.draftPressure = element.draftPressure;
              blr.IDFan = element.idFan;
              blr.FDFanDA1 =element.daOne;
              blr.FDFanDA2 = element.daTwo;
              blr.FDFanDA3 = element.daThree;
              blr.ScrewFeeder = element.screwFeeder;
              blr.WaterMeter = element.WaterMeter;
              blr.Load = element.loadData;
              this.Boilertime_06Array=Object.values(blr);     
            break;

            case '08':
          
                blr.streamPressusre =element.streamPressusre;
                blr.drumWaterLevel = element.drumWaterLevel;
                blr.feedPump = element.feedPump;
                blr.flueGasTemp = element.flueGasTemp;
                blr.bedTemp = element.bedTemp;
                blr.draftPressure = element.draftPressure;
                blr.IDFan = element.idFan;
                blr.FDFanDA1 =element.daOne;
                blr.FDFanDA2 = element.daTwo;
                blr.FDFanDA3 = element.daThree;
                blr.ScrewFeeder = element.screwFeeder;
                blr.WaterMeter = element.WaterMeter;
                blr.Load = element.loadData;
                this.Boilertime_08Array=Object.values(blr);     
              break;
    }
    });
  
    for (let i = 0; i < this.boilerAttribute.length; i++) {
      this.valueArray.push(new NightBoilerValues());
      this.valueArray[i].Attribute = this.boilerAttribute[i];
      this.valueArray[i].time_10 = this.Boilertime_10Array[i];
      this.valueArray[i].time_12 = this.Boilertime_12Array[i];
      this.valueArray[i].time_14 = this.Boilertime_14Array[i];
      this.valueArray[i].time_16 = this.Boilertime_16Array[i];
      this.valueArray[i].time_18 = this.Boilertime_18Array[i];
      this.valueArray[i].time_20 = this.Boilertime_20Array[i];
    }
  }

  fetchThermoNight(fetchedData){
    this.jetRunning=fetchedData[0].jetRunning;
    this.nightvalueArray1 = [];

    fetchedData.forEach(element => {

      let blr = new Boiler();

      switch(element.timeOf){
        case 22:
          
          blr.streamPressusre =element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.IDFan = element.idFan;
          blr.FDFanDA1 =element.daOne;
          blr.FDFanDA2 = element.daTwo;
          blr.FDFanDA3 = element.daThree;
          blr.ScrewFeeder = element.screwFeeder;
          blr.WaterMeter = element.WaterMeter;
          blr.Load = element.loadData;
          this.Thermo_22Array=Object.values(blr);
        break;
      
      case '00':
          
        blr.streamPressusre =element.streamPressusre;
        blr.drumWaterLevel = element.drumWaterLevel;
        blr.feedPump = element.feedPump;
        blr.flueGasTemp = element.flueGasTemp;
        blr.bedTemp = element.bedTemp;
        blr.draftPressure = element.draftPressure;
        blr.IDFan = element.idFan;
        blr.FDFanDA1 =element.daOne;
        blr.FDFanDA2 = element.daTwo;
        blr.FDFanDA3 = element.daThree;
        blr.ScrewFeeder = element.screwFeeder;
        blr.WaterMeter = element.WaterMeter;
        blr.Load = element.loadData;
        this.Thermo_00Array=Object.values(blr);     
      break;

      case '02':
          
          blr.streamPressusre =element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.IDFan = element.idFan;
          blr.FDFanDA1 =element.daOne;
          blr.FDFanDA2 = element.daTwo;
          blr.FDFanDA3 = element.daThree;
          blr.ScrewFeeder = element.screwFeeder;
          blr.WaterMeter = element.WaterMeter;
          blr.Load = element.loadData;
          this.Thermo_02Array=Object.values(blr);     
        break;

        case '04':
          
            blr.streamPressusre =element.streamPressusre;
            blr.drumWaterLevel = element.drumWaterLevel;
            blr.feedPump = element.feedPump;
            blr.flueGasTemp = element.flueGasTemp;
            blr.bedTemp = element.bedTemp;
            blr.draftPressure = element.draftPressure;
            blr.IDFan = element.idFan;
            blr.FDFanDA1 =element.daOne;
            blr.FDFanDA2 = element.daTwo;
            blr.FDFanDA3 = element.daThree;
            blr.ScrewFeeder = element.screwFeeder;
            blr.WaterMeter = element.WaterMeter;
            blr.Load = element.loadData;
            this.Thermo_04Array=Object.values(blr);     
          break;

          case '06':
          
              blr.streamPressusre =element.streamPressusre;
              blr.drumWaterLevel = element.drumWaterLevel;
              blr.feedPump = element.feedPump;
              blr.flueGasTemp = element.flueGasTemp;
              blr.bedTemp = element.bedTemp;
              blr.draftPressure = element.draftPressure;
              blr.IDFan = element.idFan;
              blr.FDFanDA1 =element.daOne;
              blr.FDFanDA2 = element.daTwo;
              blr.FDFanDA3 = element.daThree;
              blr.ScrewFeeder = element.screwFeeder;
              blr.WaterMeter = element.WaterMeter;
              blr.Load = element.loadData;
              this.Thermo_06Array=Object.values(blr);     
            break;

            case '08':
          
                blr.streamPressusre =element.streamPressusre;
                blr.drumWaterLevel = element.drumWaterLevel;
                blr.feedPump = element.feedPump;
                blr.flueGasTemp = element.flueGasTemp;
                blr.bedTemp = element.bedTemp;
                blr.draftPressure = element.draftPressure;
                blr.IDFan = element.idFan;
                blr.FDFanDA1 =element.daOne;
                blr.FDFanDA2 = element.daTwo;
                blr.FDFanDA3 = element.daThree;
                blr.ScrewFeeder = element.screwFeeder;
                blr.WaterMeter = element.WaterMeter;
                blr.Load = element.loadData;
                this.Thermo_08Array=Object.values(blr);     
              break;
    }
    });
  
    for (let i = 0; i < this.thermopackAttribute.length; i++) {
      this.valueArray.push(new NightThermopackValues());
      this.nightvalueArray1[i].Attribute = this.thermopackAttribute[i];
      this.nightvalueArray1[i].time_10 = this.Thermo_10Array[i];
      this.nightvalueArray1[i].time_12 = this.Thermo_12Array[i];
      this.nightvalueArray1[i].time_14 = this.Thermo_14Array[i];
      this.nightvalueArray1[i].time_16 = this.Thermo_16Array[i];
      this.nightvalueArray1[i].time_18 = this.Thermo_18Array[i];
      this.nightvalueArray1[i].time_20 = this.Thermo_20Array[i];
    }
  }
  fetchThermoDay(fetchedData){
    this.jetRunning=fetchedData[0].jetRunning;
    this.valueArray = [];

    fetchedData.forEach(element => {

      let blr = new Thermopack();

      switch(element.timeOf){
        case 10:
         
          blr.forwardTemp =element.forwardTemp;
          blr.returnTemp = element.returnTemp;
          blr.stackTemp = element.stackTemp;
          blr.furnaceTemp = element.furnaceTemp;
          blr.pumpData = element.pumpData;
          blr.idFan = element.idFan;
          blr.fdFan = element.fdFan;
          blr.screwFeeder =element.screwFeeder;
         
          this.Thermo_10Array=Object.values(blr);
        break;
      
      case 12:
          
        blr.forwardTemp =element.forwardTemp;
          blr.returnTemp = element.returnTemp;
          blr.stackTemp = element.stackTemp;
          blr.furnaceTemp = element.furnaceTemp;
          blr.pumpData = element.pumpData;
          blr.idFan = element.idFan;
          blr.fdFan = element.fdFan;
          blr.screwFeeder =element.screwFeeder;
        this.Thermo_12Array=Object.values(blr);     
      break;

      case 14:
          
        blr.forwardTemp =element.forwardTemp;
        blr.returnTemp = element.returnTemp;
        blr.stackTemp = element.stackTemp;
        blr.furnaceTemp = element.furnaceTemp;
        blr.pumpData = element.pumpData;
        blr.idFan = element.idFan;
        blr.fdFan = element.fdFan;
        blr.screwFeeder =element.screwFeeder;
          this.Thermo_14Array=Object.values(blr);     
        break;

        case 16:
          
          blr.forwardTemp =element.forwardTemp;
          blr.returnTemp = element.returnTemp;
          blr.stackTemp = element.stackTemp;
          blr.furnaceTemp = element.furnaceTemp;
          blr.pumpData = element.pumpData;
          blr.idFan = element.idFan;
          blr.fdFan = element.fdFan;
          blr.screwFeeder =element.screwFeeder;
            this.Thermo_16Array=Object.values(blr);     
          break;

          case 18:
          
            blr.forwardTemp =element.forwardTemp;
            blr.returnTemp = element.returnTemp;
            blr.stackTemp = element.stackTemp;
            blr.furnaceTemp = element.furnaceTemp;
            blr.pumpData = element.pumpData;
            blr.idFan = element.idFan;
            blr.fdFan = element.fdFan;
            blr.screwFeeder =element.screwFeeder;
              this.Thermo_18Array=Object.values(blr);     
            break;

            case 20:
          
              blr.forwardTemp =element.forwardTemp;
              blr.returnTemp = element.returnTemp;
              blr.stackTemp = element.stackTemp;
              blr.furnaceTemp = element.furnaceTemp;
              blr.pumpData = element.pumpData;
              blr.idFan = element.idFan;
              blr.fdFan = element.fdFan;
              blr.screwFeeder =element.screwFeeder;
                this.Thermo_20Array=Object.values(blr);     
              break;
    }
    });
  
    for (let i = 0; i < this.thermopackAttribute.length; i++) {
      this.valueArray1.push(new DayThermopackValues());
      this.valueArray1[i].Attribute = this.thermopackAttribute[i];
      this.valueArray1[i].time_10 = this.Thermo_10Array[i];
      this.valueArray1[i].time_12 = this.Thermo_12Array[i];
      this.valueArray1[i].time_14 = this.Thermo_14Array[i];
      this.valueArray1[i].time_16 = this.Thermo_16Array[i];
      this.valueArray1[i].time_18 = this.Thermo_18Array[i];
      this.valueArray1[i].time_20 = this.Thermo_20Array[i];
    }
  }
  getBoiler() {
    this.data = this.logsheet.getBoilerMachines().subscribe(
      (res) => {
        this.boiler = res;
        this.boiler = this.boiler.data;
      },
      (error) =>{
        this.toast.error(errorData.Serever_Error)
      }
    )
  }

  getThermopack() {
    this.data = this.logsheet.getThermopackMachines().subscribe(
      (res) => {
        this.thermopack = res;
        this.thermopack = this.thermopack.data;
      },
      (error) =>{
        this.toast.error(errorData.Serever_Error)
      }
    )
  }

  boilerchange(value: any) {

    this.boilerId = value;
  }

  thermopackchange(value: any) {

    this.thermoId = value;

  }

}
