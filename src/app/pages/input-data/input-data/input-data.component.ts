import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Boiler, DayBoilerValues, DayThermopackValues, NightBoilerValues, NightThermopackValues, Thermopack } from '../../../@theme/model/log-sheet';
import { JwtTokenService } from '../../../@theme/services/jwt-token.service';
import { LogSheetService } from '../../../@theme/services/log-sheet.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from '../../../@theme/json/error.json';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-input-data',
  // selector: 'valu-pass',

  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.scss']
})
export class InputDataComponent implements OnInit, OnDestroy {
  currentDate = new Date();
  checkCurrent: any;
  shiftselected: any = "day";
  fetchedData = [];
  public max;
  public errorData: any = (errorData as any).default;
  shiftid: any;
  boiler: any;
  thermopack: any;
  boilerId: any = 11626;
  thermoId: any = 11628;
  masterId: any;


  jetRunning: Number;
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

  timeList = [

    { id: 10, name: '10am or 10:00' },
    { id: 12, name: '12pm or 12:00' },
    { id: 14, name: '2pm or 14:00' },
    { id: 16, name: '4pm or 16:00' },
    { id: 18, name: '6pm or 18:00' },
    { id: 20, name: '8pm or 20:00' },
    { id: 999, name: 'All' }
  ];


  BoilerdayFlag: boolean = true;
  ThermopackdayFlag: boolean = true;
  BoilernightFlag: boolean = false;
  ThermopacknightFlag: boolean = false;
  submitBoilerFlag: boolean = true;
  updateBoilerFlag: boolean = false;
  submitThermopackFlag:boolean = true;
  updateThermopackFlag:boolean = false;
  readonlyBoilerDayFlag: boolean = false;
  readonlyBoilerNightFlag: boolean = false;
  readonlyThermopackDayFlag: boolean = false;
  readonlyThermopackNightFlag: boolean = false;

  BoilerNight00Flag: boolean = true;
  BoilerNight02Flag: boolean = true;
  BoilerNight04Flag: boolean = true;
  BoilerNight06Flag: boolean = true;
  BoilerNight08Flag: boolean = true;
  BoilerDay10Flag: boolean = true;
  BoilerDay12Flag: boolean = true;
  BoilerDay14Flag: boolean = true;
  BoilerDay16Flag: boolean = true;
  BoilerDay18Flag: boolean = true;
  BoilerDay20Flag: boolean = true;
  BoilerNight22Flag: boolean = true;
  BoilerheaderFlag: boolean = false;

  ThermopackNight00Flag: boolean = true;
  ThermopackNight02Flag: boolean = true;
  ThermopackNight04Flag: boolean = true;
  ThermopackNight06Flag: boolean = true;
  ThermopackNight08Flag: boolean = true;
  ThermopackDay10Flag: boolean = true;
  ThermopackDay12Flag: boolean = true;
  ThermopackDay14Flag: boolean = true;
  ThermopackDay16Flag: boolean = true;
  ThermopackDay18Flag: boolean = true;
  ThermopackDay20Flag: boolean = true;
  ThermopackNight22Flag: boolean = true;
  ThermopackheaderFlag:boolean = false;

  selectedShift: any;
  dateSelected: any = null;

  finalBoilerobj = [];
  finalThermoobj = [];

  dayArray = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
  nightArray = ["22:00", "00:00", "02:00", "04:00", "06:00", "08:00"];

  boilerAttribute = ["Steam Pressure", "Drum Water Level", "Feed Pump (No.1/2)", "Flue Gas Temp (TE5-1)", "Bed Temperature (TE5-3)",
    "Draft Pressure (DT5-4)", "I.D.Fan (%)", "F.D.Fan DA-1", "F.D.Fan DA-2", "F.D.Fan DA-3",
    "Screw Feeder", "Water Meter", "loadData (Final O/P)"];

  thermopackAttribute = ["Forward Temperature", "Return Temperature", "Stack Temperature", "Furnace",
    "Pump (1/2)", "I.D.Fan (Hz)", "F.D.Fan (Hz)", "Screw Feeder (1/2)"];

  valueArray = [];
  valueArray1 = [];

  nightvalueArray = [];
  nightvalueArray1 = [];

  data: any;

  datePipeString: String;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(private jwt: JwtTokenService, private logsheet: LogSheetService, private datePipe: DatePipe, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.readonlyBoilerDayFlag = false;
    this.readonlyBoilerNightFlag = false;
    this.readonlyThermopackDayFlag = false;
    this.readonlyThermopackNightFlag = false;

    this.masterId = this.jwt.getDecodeToken("userHeadId");
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


    if (this.datePipeString == null) {
      this.toast.error("Select Date")
    }
    else if (this.jetRunning == null) {
      this.toast.error("Jet Running empty")
    }
    else {
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


    if (this.datePipeString == null) {
      this.toast.error("Select Date")
    }
    else {

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

      this.saveThermoData(this.shiftselected);
    }

  }

  saveBoilerData(value: any) {

    let obj = {
      boilerMachineRecord: this.finalBoilerobj,
      jetRunning: this.jetRunning
    }
    this.logsheet.saveBoilerData(obj).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.toast.success("Added");
          if (value == 'day') {
            for (let i = 0; i < this.boilerAttribute.length; i++) {
              this.valueArray[i].Attribute = this.boilerAttribute[i];
              this.valueArray[i].time_10 = null;
              this.valueArray[i].time_12 = null;
              this.valueArray[i].time_14 = null;
              this.valueArray[i].time_16 = null;
              this.valueArray[i].time_18 = null;
              this.valueArray[i].time_20 = null;
              this.jetRunning = null;
            }
          } else {

            for (let i = 0; i < this.boilerAttribute.length; i++) {
              this.nightvalueArray[i].Attribute = this.boilerAttribute[i];
              this.nightvalueArray[i].time_22 = null;
              this.nightvalueArray[i].time_00 = null;
              this.nightvalueArray[i].time_02 = null;
              this.nightvalueArray[i].time_04 = null;
              this.nightvalueArray[i].time_06 = null;
              this.nightvalueArray[i].time_08 = null;
              this.jetRunning = null;
            }
          }
        }
      },
      (error) => {
        this.toast.error(errorData.Serever_Error)
      }
    )
  }

  submitBoilernight(value: any) {

    if (this.datePipeString == null) {
      this.toast.error("Select Date")
    }
    else if (this.jetRunning == null) {
      this.toast.error("Jet Running empty")
    }
    else {
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



    if (this.datePipeString == null) {
      this.toast.error("Select Date")
    }
    else {
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

      this.saveThermoData(this.shiftselected);

    }

  }

  saveThermoData(value:any) {
    this.logsheet.saveThermoData(this.finalThermoobj).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.toast.success("Added");
          if (value == 'day') {
            for (let i = 0; i < this.thermopackAttribute.length; i++) {
              this.valueArray1[i].Attribute = this.thermopackAttribute[i];
              this.valueArray1[i].time_10 = null;
              this.valueArray1[i].time_12 = null;
              this.valueArray1[i].time_14 = null;
              this.valueArray1[i].time_16 = null;
              this.valueArray1[i].time_18 = null;
              this.valueArray1[i].time_20 = null;
            }
          } else {

            for (let i = 0; i < this.thermopackAttribute.length; i++) {
              this.nightvalueArray1[i].Attribute = this.thermopackAttribute[i];
              this.nightvalueArray1[i].time_22 = null;
              this.nightvalueArray1[i].time_00 = null;
              this.nightvalueArray1[i].time_02 = null;
              this.nightvalueArray1[i].time_04 = null;
              this.nightvalueArray1[i].time_06 = null;
              this.nightvalueArray1[i].time_08 = null;
            }
          }
        }
      },
      (error) => {
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
    boilerdata.idFan = array[6];
    boilerdata.daOne = array[7];
    boilerdata.daTwo = array[8];
    boilerdata.daThree = array[9];
    boilerdata.screwFeeder = array[10];
    boilerdata.waterMeter = array[11];
    boilerdata.loadData = array[12];
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

    

    if (value == 1) {
      this.timeList = [
        { id: 10, name: '10am or 10:00' },
        { id: 12, name: '12pm or 12:00' },
        { id: 14, name: '2pm or 14:00' },
        { id: 16, name: '4pm or 16:00' },
        { id: 18, name: '6pm or 18:00' },
        { id: 20, name: '8pm or 20:00' },
        { id: 999, name: 'All' },
      ]
      if ((this.dateSelected < this.currentDate) && this.dateSelected != null) {
        this.readonlyBoilerDayFlag = true;
        this.readonlyBoilerNightFlag = false
      }
      this.shiftselected = "day";
      this.BoilernightFlag = false;
      this.BoilerdayFlag = true;
    }
    else if (value == 2) {
      this.timeList = [
        { id: 22, name: '10pm or 22:00' },
        { id: 0, name: '12am or 00:00' },
        { id: 2, name: '2am or 02:00' },
        { id: 4, name: '4am or 04:00' },
        { id: 6, name: '6am or 06:00' },
        { id: 8, name: '8am or 08:00' },
        { id: 999, name: 'All' },
      ]
      if ((this.dateSelected < this.currentDate) && this.dateSelected != null) {
        this.readonlyBoilerDayFlag = false;
        this.readonlyBoilerNightFlag = true
      }
      this.shiftselected = "night";
      this.BoilerdayFlag = false;
      this.BoilernightFlag = true;
    }
  }
  shiftThermopackchange(value: any) {

    
    if (value == 1) {
      this.timeList = [
        { id: 10, name: '10am or 10:00' },
        { id: 12, name: '12pm or 12:00' },
        { id: 14, name: '2pm or 14:00' },
        { id: 16, name: '4pm or 16:00' },
        { id: 18, name: '6pm or 18:00' },
        { id: 20, name: '8pm or 20:00' },
        { id: 999, name: 'All' },
      ]
      if ((this.dateSelected < this.currentDate) && this.dateSelected != null) {
        this.readonlyThermopackDayFlag = true;
        this.readonlyThermopackNightFlag = false;
      }
      this.shiftselected = "day";
      this.ThermopacknightFlag = false;
      this.ThermopackdayFlag = true;
    }
    else if (value == 2) {
      this.timeList = [
        { id: 22, name: '10pm or 22:00' },
        { id: 0, name: '12am or 00:00' },
        { id: 2, name: '2am or 02:00' },
        { id: 4, name: '4am or 04:00' },
        { id: 6, name: '6am or 06:00' },
        { id: 8, name: '8am or 08:00' },
        { id: 999, name: 'All' },
      ]
      if ((this.dateSelected < this.currentDate) && this.dateSelected != null) {
        this.readonlyThermopackNightFlag = true;
        this.readonlyThermopackDayFlag = false;
      }
      this.shiftselected = "night";
      this.ThermopackdayFlag = false;
      this.ThermopacknightFlag = true;
    }
  }
  changeBoiler(value: any) {

    for (let i = 0; i < this.boilerAttribute.length; i++) {
      this.valueArray[i].Attribute = this.boilerAttribute[i];
      this.valueArray[i].time_10 = null;
      this.valueArray[i].time_12 = null;
      this.valueArray[i].time_12 = null;
      this.valueArray[i].time_14 = null;
      this.valueArray[i].time_16 = null;
      this.valueArray[i].time_18 = null;
      this.valueArray[i].time_20 = null;
    }
    for (let i = 0; i < this.boilerAttribute.length; i++) {
      this.nightvalueArray[i].Attribute = this.boilerAttribute[i];
      this.nightvalueArray[i].time_22 = null;
      this.nightvalueArray[i].time_00 = null;
      this.nightvalueArray[i].time_02 = null;
      this.nightvalueArray[i].time_04 = null;
      this.nightvalueArray[i].time_06 = null;
      this.nightvalueArray[i].time_08 = null;
    }

    this.jetRunning = null;
    this.datePipeString = this.datePipe.transform(value._selected, 'yyyy-MM-dd');
    this.checkCurrent = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')
    if (this.datePipeString == this.checkCurrent) {
      this.updateBoilerFlag = false;
      this.submitBoilerFlag = true;
      this.readonlyBoilerDayFlag = false;
      this.readonlyBoilerNightFlag = false;
    }
    if (this.datePipeString < this.checkCurrent) {
      this.readonlyBoilerDayFlag = false;
      this.readonlyBoilerNightFlag = false;

      let obj = {
        boilerId: this.boilerId,
        date: this.datePipeString,
        shift: this.shiftselected
      }


      this.logsheet.fetchBoilerData(obj).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.fetchedData = data["data"]
            if (obj.shift == "night") {
              this.fetchBoilerNight(this.fetchedData);

            }
            else {
              this.fetchBoilerDay(this.fetchedData);

            }

          }
          else {
            this.toast.error("Data not found");
          }
        },
        (error) => {
          this.toast.error(errorData.Serever_Error)
        }
      )
    }

  }

  changeThermo(value: any) {

    for (let i = 0; i < this.thermopackAttribute.length; i++) {
      this.valueArray1[i].Attribute = this.thermopackAttribute[i];
      this.valueArray1[i].time_10 = null;
      this.valueArray1[i].time_12 = null;
      this.valueArray1[i].time_12 = null;
      this.valueArray1[i].time_14 = null;
      this.valueArray1[i].time_16 = null;
      this.valueArray1[i].time_18 = null;
      this.valueArray1[i].time_20 = null;
    }
    for (let i = 0; i < this.thermopackAttribute.length; i++) {
      this.nightvalueArray1[i].Attribute = this.thermopackAttribute[i];
      this.nightvalueArray1[i].time_22 = null;
      this.nightvalueArray1[i].time_00 = null;
      this.nightvalueArray1[i].time_02 = null;
      this.nightvalueArray1[i].time_04 = null;
      this.nightvalueArray1[i].time_06 = null;
      this.nightvalueArray1[i].time_08 = null;
    }
    this.jetRunning = null;
    this.datePipeString = this.datePipe.transform(value._selected, 'yyyy-MM-dd');
    this.checkCurrent = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')

    if (this.datePipeString == this.checkCurrent) {
      this.updateBoilerFlag = false;
      this.submitBoilerFlag = true;
      this.readonlyThermopackDayFlag = false;
      this.readonlyThermopackNightFlag = false;
    }
    if (this.datePipeString < this.checkCurrent) {

      this.readonlyThermopackDayFlag = false;
      this.readonlyThermopackNightFlag = false;
      let obj = {
        thermopackId: this.thermoId,
        date: this.datePipeString,
        shift: this.shiftselected
      }

      this.logsheet.fetchThermoData(obj).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.fetchedData = data["data"]
            if (obj.shift == "night") {
              this.fetchThermoNight(this.fetchedData);

            }
            else {
              this.fetchThermoDay(this.fetchedData);

            }

          }
          else{
            this.toast.error("No data found");
          }
        },
        (error) => {
          this.toast.error(errorData.Serever_Error)
        }
      )
    }

  }

  fetchBoilerDay(fetchedData) {
    this.jetRunning = fetchedData[0].jetRunning;
    this.valueArray = [];
    this.submitBoilerFlag = false;
    this.updateBoilerFlag = true;
    this.readonlyBoilerDayFlag = true;
    this.readonlyBoilerNightFlag = false;
    fetchedData.forEach(element => {

      let blr = new Boiler();

      switch (element.timeOf) {
        case 10:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_10Array = Object.values(blr);
          break;

        case 12:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_12Array = Object.values(blr);
          break;

        case 14:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_14Array = Object.values(blr);
          break;

        case 16:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_16Array = Object.values(blr);
          break;

        case 18:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_18Array = Object.values(blr);
          break;

        case 20:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_20Array = Object.values(blr);
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

  fetchBoilerNight(fetchedData) {
    this.jetRunning = fetchedData[0].jetRunning;
    this.nightvalueArray = [];
    this.submitBoilerFlag = false;
    this.updateBoilerFlag = true;
    this.readonlyBoilerNightFlag = true;
    this.readonlyBoilerDayFlag = false;

    fetchedData.forEach(element => {

      let blr = new Boiler();

      switch (element.timeOf) {
        case 22:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_22Array = Object.values(blr);
          break;

        case 0:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_00Array = Object.values(blr);
          break;

        case 2:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_02Array = Object.values(blr);
          break;

        case 4:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_04Array = Object.values(blr);
          break;

        case 6:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_06Array = Object.values(blr);
          break;

        case 8:

          blr.streamPressusre = element.streamPressusre;
          blr.drumWaterLevel = element.drumWaterLevel;
          blr.feedPump = element.feedPump;
          blr.flueGasTemp = element.flueGasTemp;
          blr.bedTemp = element.bedTemp;
          blr.draftPressure = element.draftPressure;
          blr.idFan = element.idFan;
          blr.daOne = element.daOne;
          blr.daTwo = element.daTwo;
          blr.daThree = element.daThree;
          blr.screwFeeder = element.screwFeeder;
          blr.waterMeter = element.waterMeter;
          blr.loadData = element.loadData;
          this.Boilertime_08Array = Object.values(blr);
          break;
      }
    });

    for (let i = 0; i < this.boilerAttribute.length; i++) {
      this.nightvalueArray.push(new NightBoilerValues());
      this.nightvalueArray[i].Attribute = this.boilerAttribute[i];
      this.nightvalueArray[i].time_22 = this.Boilertime_22Array[i];
      this.nightvalueArray[i].time_00 = this.Boilertime_00Array[i];
      this.nightvalueArray[i].time_02 = this.Boilertime_02Array[i];
      this.nightvalueArray[i].time_04 = this.Boilertime_04Array[i];
      this.nightvalueArray[i].time_06 = this.Boilertime_06Array[i];
      this.nightvalueArray[i].time_08 = this.Boilertime_08Array[i];
    }
  }

  fetchThermoNight(fetchedData) {
    this.jetRunning = fetchedData[0].jetRunning;
    this.nightvalueArray1 = [];
    this.submitThermopackFlag = false;
    this.updateThermopackFlag = true;
    this.readonlyThermopackNightFlag = true;
    this.readonlyThermopackDayFlag = false;

    fetchedData.forEach(element => {

      let thr = new Thermopack();

      switch (element.timeOf) {
        case 22:

          thr.forwardTemp = element.forwardTemp;
          thr.returnTemp = element.returnTemp;
          thr.stackTemp = element.stackTemp;
          thr.furnaceTemp = element.furnaceTemp;
          thr.pumpData = element.pumpData;
          thr.idFan = element.idFan;
          thr.fdFan = element.fdFan;
          thr.screwFeeder = element.screwFeeder;
          this.Thermo_22Array = Object.values(thr);
          break;

        case 0:

          thr.forwardTemp = element.forwardTemp;
          thr.returnTemp = element.returnTemp;
          thr.stackTemp = element.stackTemp;
          thr.furnaceTemp = element.furnaceTemp;
          thr.pumpData = element.pumpData;
          thr.idFan = element.idFan;
          thr.fdFan = element.fdFan;
          thr.screwFeeder = element.screwFeeder;

          this.Thermo_00Array = Object.values(thr);
          break;

        case 2:

          thr.forwardTemp = element.forwardTemp;
          thr.returnTemp = element.returnTemp;
          thr.stackTemp = element.stackTemp;
          thr.furnaceTemp = element.furnaceTemp;
          thr.pumpData = element.pumpData;
          thr.idFan = element.idFan;
          thr.fdFan = element.fdFan;
          thr.screwFeeder = element.screwFeeder;

          this.Thermo_02Array = Object.values(thr);
          break;

        case 4:

          thr.forwardTemp = element.forwardTemp;
          thr.returnTemp = element.returnTemp;
          thr.stackTemp = element.stackTemp;
          thr.furnaceTemp = element.furnaceTemp;
          thr.pumpData = element.pumpData;
          thr.idFan = element.idFan;
          thr.fdFan = element.fdFan;
          thr.screwFeeder = element.screwFeeder;

          this.Thermo_04Array = Object.values(thr);
          break;

        case 6:

          thr.forwardTemp = element.forwardTemp;
          thr.returnTemp = element.returnTemp;
          thr.stackTemp = element.stackTemp;
          thr.furnaceTemp = element.furnaceTemp;
          thr.pumpData = element.pumpData;
          thr.idFan = element.idFan;
          thr.fdFan = element.fdFan;
          thr.screwFeeder = element.screwFeeder;

          this.Thermo_06Array = Object.values(thr);
          break;

        case 8:

          thr.forwardTemp = element.forwardTemp;
          thr.returnTemp = element.returnTemp;
          thr.stackTemp = element.stackTemp;
          thr.furnaceTemp = element.furnaceTemp;
          thr.pumpData = element.pumpData;
          thr.idFan = element.idFan;
          thr.fdFan = element.fdFan;
          thr.screwFeeder = element.screwFeeder;

          this.Thermo_08Array = Object.values(thr);
          break;
      }
    });

    for (let i = 0; i < this.thermopackAttribute.length; i++) {
      this.nightvalueArray1.push(new NightThermopackValues());
      this.nightvalueArray1[i].Attribute = this.thermopackAttribute[i];
      this.nightvalueArray1[i].time_22 = this.Thermo_22Array[i];
      this.nightvalueArray1[i].time_00 = this.Thermo_00Array[i];
      this.nightvalueArray1[i].time_02 = this.Thermo_02Array[i];
      this.nightvalueArray1[i].time_04 = this.Thermo_04Array[i];
      this.nightvalueArray1[i].time_06 = this.Thermo_06Array[i];
      this.nightvalueArray1[i].time_08 = this.Thermo_08Array[i];
    }
  }
  fetchThermoDay(fetchedData) {
    this.jetRunning = fetchedData[0].jetRunning;
    this.valueArray1 = [];
    this.submitThermopackFlag = false;
    this.updateThermopackFlag = true;
    this.readonlyThermopackNightFlag = false;
    this.readonlyThermopackDayFlag = true;

    fetchedData.forEach(element => {

      let blr = new Thermopack();

      switch (element.timeOf) {
        case 10:

          blr.forwardTemp = element.forwardTemp;
          blr.returnTemp = element.returnTemp;
          blr.stackTemp = element.stackTemp;
          blr.furnaceTemp = element.furnaceTemp;
          blr.pumpData = element.pumpData;
          blr.idFan = element.idFan;
          blr.fdFan = element.fdFan;
          blr.screwFeeder = element.screwFeeder;

          this.Thermo_10Array = Object.values(blr);
          break;

        case 12:

          blr.forwardTemp = element.forwardTemp;
          blr.returnTemp = element.returnTemp;
          blr.stackTemp = element.stackTemp;
          blr.furnaceTemp = element.furnaceTemp;
          blr.pumpData = element.pumpData;
          blr.idFan = element.idFan;
          blr.fdFan = element.fdFan;
          blr.screwFeeder = element.screwFeeder;
          this.Thermo_12Array = Object.values(blr);
          break;

        case 14:

          blr.forwardTemp = element.forwardTemp;
          blr.returnTemp = element.returnTemp;
          blr.stackTemp = element.stackTemp;
          blr.furnaceTemp = element.furnaceTemp;
          blr.pumpData = element.pumpData;
          blr.idFan = element.idFan;
          blr.fdFan = element.fdFan;
          blr.screwFeeder = element.screwFeeder;
          this.Thermo_14Array = Object.values(blr);
          break;

        case 16:

          blr.forwardTemp = element.forwardTemp;
          blr.returnTemp = element.returnTemp;
          blr.stackTemp = element.stackTemp;
          blr.furnaceTemp = element.furnaceTemp;
          blr.pumpData = element.pumpData;
          blr.idFan = element.idFan;
          blr.fdFan = element.fdFan;
          blr.screwFeeder = element.screwFeeder;
          this.Thermo_16Array = Object.values(blr);
          break;

        case 18:

          blr.forwardTemp = element.forwardTemp;
          blr.returnTemp = element.returnTemp;
          blr.stackTemp = element.stackTemp;
          blr.furnaceTemp = element.furnaceTemp;
          blr.pumpData = element.pumpData;
          blr.idFan = element.idFan;
          blr.fdFan = element.fdFan;
          blr.screwFeeder = element.screwFeeder;
          this.Thermo_18Array = Object.values(blr);
          break;

        case 20:

          blr.forwardTemp = element.forwardTemp;
          blr.returnTemp = element.returnTemp;
          blr.stackTemp = element.stackTemp;
          blr.furnaceTemp = element.furnaceTemp;
          blr.pumpData = element.pumpData;
          blr.idFan = element.idFan;
          blr.fdFan = element.fdFan;
          blr.screwFeeder = element.screwFeeder;
          this.Thermo_20Array = Object.values(blr);
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
    this.data = this.logsheet.getBoilerMachines().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        this.boiler = res;
        this.boiler = this.boiler.data;
      },
      (error) => {
        this.toast.error(errorData.Serever_Error)
      }
    )
  }

  getThermopack() {
    this.data = this.logsheet.getThermopackMachines().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        this.thermopack = res;
        this.thermopack = this.thermopack.data;
      },
      (error) => {
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

  selectedThermopackTime(value: any) {

    this.ThermopackheaderFlag = true;

    if (value == 999 || value == 9999) {
      this.ThermopackNight00Flag = true;
      this.ThermopackNight02Flag = true;
      this.ThermopackNight04Flag = true;
      this.ThermopackNight06Flag = true;
      this.ThermopackNight08Flag = true;
      this.ThermopackDay10Flag = true;
      this.ThermopackDay12Flag = true;
      this.ThermopackDay14Flag = true;
      this.ThermopackDay16Flag = true;
      this.ThermopackDay18Flag = true;
      this.ThermopackDay20Flag = true;
      this.ThermopackNight22Flag = true;
      this.ThermopackheaderFlag = false;
    }
    else if (value == 0) {
      this.ThermopackNight00Flag = true;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 2) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = true;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 4) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = true;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 6) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = true;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 8) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = true;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 10) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = true;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 12) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = true;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 14) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = true;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 16) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = true;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 18) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = true;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 20) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = true;
      this.ThermopackNight22Flag = false;
    }
    else if (value == 22) {
      this.ThermopackNight00Flag = false;
      this.ThermopackNight02Flag = false;
      this.ThermopackNight04Flag = false;
      this.ThermopackNight06Flag = false;
      this.ThermopackNight08Flag = false;
      this.ThermopackDay10Flag = false;
      this.ThermopackDay12Flag = false;
      this.ThermopackDay14Flag = false;
      this.ThermopackDay16Flag = false;
      this.ThermopackDay18Flag = false;
      this.ThermopackDay20Flag = false;
      this.ThermopackNight22Flag = true;
    }

  }

  selectedBoilerTime(value: any) {

    this.BoilerheaderFlag = true;

    if (value == 999 || value == 9999) {
      this.BoilerNight00Flag = true;
      this.BoilerNight02Flag = true;
      this.BoilerNight04Flag = true;
      this.BoilerNight06Flag = true;
      this.BoilerNight08Flag = true;
      this.BoilerDay10Flag = true;
      this.BoilerDay12Flag = true;
      this.BoilerDay14Flag = true;
      this.BoilerDay16Flag = true;
      this.BoilerDay18Flag = true;
      this.BoilerDay20Flag = true;
      this.BoilerNight22Flag = true;
      this.BoilerheaderFlag = false;
    }
    else if (value == 0) {
      this.BoilerNight00Flag = true;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = false;
    }
    else if (value == 2) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = true;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = false;
    }
    else if (value == 4) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = true;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = false;
    }
    else if (value == 6) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = true;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = false;
    }
    else if (value == 8) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = true;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = false;
    }
    else if (value == 10) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = true;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = false;
    }
    else if (value == 12) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = true;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = false;
    }
    else if (value == 14) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = true;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = false;
    }
    else if (value == 16) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = true;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = false;
    }
    else if (value == 18) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = true;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = false;
    }
    else if (value == 20) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = true;
      this.BoilerNight22Flag = false;
    }
    else if (value == 22) {
      this.BoilerNight00Flag = false;
      this.BoilerNight02Flag = false;
      this.BoilerNight04Flag = false;
      this.BoilerNight06Flag = false;
      this.BoilerNight08Flag = false;
      this.BoilerDay10Flag = false;
      this.BoilerDay12Flag = false;
      this.BoilerDay14Flag = false;
      this.BoilerDay16Flag = false;
      this.BoilerDay18Flag = false;
      this.BoilerDay20Flag = false;
      this.BoilerNight22Flag = true;
    }

  }


}
