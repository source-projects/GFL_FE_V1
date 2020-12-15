import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReportService } from 'app/@theme/services/report.service';
import { ChartDataSets, ChartType } from 'chart.js';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Color, Label } from 'ng2-charts';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  datetime: any;
  fromdateformat: any = [];
  todateformat: any = [];
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  public fromtime: any;
  public totime: any;

  selectedMachineCategory: number;
  selectedMachine: number;

  machineCategory: any = [];
  machines: any = [];
  obj = {
    "fromDate": "",
    "fromTime": "",
    "id": null,
    "shift": null,
    "toDate": "",
    "toTime": ""
  }

  data: any = [];
  jsonData: any = [];
  flag: boolean = false;
  flag1: boolean = false;
  flag2: boolean = false;
  flag3: boolean = false;
  flag4: boolean = false;
  flag5:boolean = false;

  
  optionFlag:boolean = true;
  machineReportFlag:boolean = false;
  staffReportFlag:boolean = false;
  salesReportFlag:boolean = false;
  POApprovalFlag:boolean = false;
  stanterMachineFlag:boolean = false;
  waterJetMachineFlag:boolean = false;
  foldingMachineFlag:boolean = false;
  
  
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[] = [];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'cyan',
    },
  ];
  lineChartOptions = {
    responsive: true,
  };
  lineChartPlugins = [];
  day1: any;
  day2: string;
  night2: string;
  night1: string;

  constructor(private reportservice: ReportService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private toastr: ToastrService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.getMachineCategory();
  }
  category(value: any) {
    this.flag = true;
    this.getAllMachineByCategoryId(value.id)
  }

  machine(value: any) {
    this.flag1 = true;
    this.obj.id = value.id;


  }

  onChange(value: any) {
    this.obj.shift = value;
    this.flag3 = true;
  }

  change() {


    let dt = String(this.datetime[0]).slice(4, 15);
    let dt1 = dt.slice(0, 3);
    let dt2 = dt.slice(4, 6)
    let dt3 = dt.slice(7, 11)
    if (dt1 == "Jan")
      dt1 = "01";
    else if (dt1 == "Feb")
      dt1 = "02"
    else if (dt1 == "Mar")
      dt1 = "03"
    else if (dt1 == "Apr")
      dt1 = "04"
    else if (dt1 == "May")
      dt1 = "05"
    else if (dt1 == "Jun")
      dt1 = "06"
    else if (dt1 == "Jul")
      dt1 = "07"
    else if (dt1 == "Aug")
      dt1 = "08"
    else if (dt1 == "Sep")
      dt1 = "09"
    else if (dt1 == "Oct")
      dt1 = "10"
    else if (dt1 == "Nov")
      dt1 = "11"
    else
      dt1 = "12"

    let dt4 = dt3 + "-" + dt1 + "-" + dt2;
    this.obj.fromDate = dt4;


    let dtt = String(this.datetime[1]).slice(4, 15);
    let dtt1 = dtt.slice(0, 3);
    let dtt2 = dtt.slice(4, 6)
    let dtt3 = dtt.slice(7, 11)
    if (dtt1 == "Jan")
      dtt1 = "01";
    else if (dtt1 == "Feb")
      dtt1 = "02"
    else if (dtt1 == "Mar")
      dtt1 = "03"
    else if (dtt1 == "Apr")
      dtt1 = "04"
    else if (dtt1 == "May")
      dtt1 = "05"
    else if (dtt1 == "Jun")
      dtt1 = "06"
    else if (dtt1 == "Jul")
      dtt1 = "07"
    else if (dtt1 == "Aug")
      dtt1 = "08"
    else if (dtt1 == "Sep")
      dtt1 = "09"
    else if (dtt1 == "Oct")
      dtt1 = "10"
    else if (dtt1 == "Nov")
      dtt1 = "11"
    else
      dtt1 = "12"

    let dtt4 = dtt3 + "-" + dtt1 + "-" + dtt2;
    this.obj.toDate = dtt4;

    if (Number(this.obj.shift) == 1) {
      let ft = String(this.datetime[0]).slice(16, 23);
      let hour = ft.slice(0, 2);
      let t = String(this.datetime[1]).slice(16, 23);
      let h = t.slice(0, 2);

      if ((Number(hour) >= 9 && Number(hour) < 21) && (Number(h) >= 9 && Number(h) < 21)) {
        let ft1 = ft.slice(6,);
        let ft3 = ft.slice(0, 5);
        if (Number(ft1) < 10 && Number(ft1) >= 0) {
          ft1 = ft1.padStart(2, '0');
        }
        ft3 = ft3.concat(":");
        ft3 = ft3.concat(ft1);
        this.obj.fromTime = ft3;

        let t1 = t.slice(6,);
        let t3 = t.slice(0, 5);
        if (Number(t1) < 10 && Number(t1) >= 0) {
          t1 = t1.padStart(2, '0');
        }
        t3 = t3.concat(":");
        t3 = t3.concat(t1);
        this.obj.toTime = t3;

        
      }
      else {
      }
    }
    else if (Number(this.obj.shift) == 2) {

      let ft = String(this.datetime[0]).slice(16, 23);
      let hour = ft.slice(0, 2);
      let t = String(this.datetime[1]).slice(16, 23);
      let h = t.slice(0, 2);
      if ((Number(hour) >= 21 || Number(hour) < 9) && (Number(h) >= 21 || Number(h) < 9)) {
        let ft1 = ft.slice(6,);
        let ft3 = ft.slice(0, 5);
        if (Number(ft1) < 10 && Number(ft1) >= 0) {
          ft1 = ft1.padStart(2, '0');
        }
        ft3 = ft3.concat(":");
        ft3 = ft3.concat(ft1);
        this.obj.fromTime = ft3;

        let t1 = t.slice(6,);
        let t3 = t.slice(0, 5);
        if (Number(t1) < 10 && Number(t1) >= 0) {
          t1 = t1.padStart(2, '0');
        }
        t3 = t3.concat(":");
        t3 = t3.concat(t1);
        this.obj.toTime = t3;
        
      }
    }
  }

  getMachineCategory() {
    this.data = this.reportservice.getAllMachinesCategory().subscribe(
      (res) => {
        this.machineCategory = res;
        this.machineCategory = this.machineCategory.data;
      }
    )
  }

  getAllMachineByCategoryId(id: any) {
    this.reportservice.getMachineDataByCategoryId(id).subscribe(
      (res) => {
        this.machines = res['data'];
      }
    );

  }

  collectData(datedata: any) {
    this.flag4 = false;
    this.flag5 = false;
    let count;
    this.reportservice.getobjdata(datedata).subscribe(
      (res) => {
        if (res["success"]) {

          this.jsonData = res['data'];
          if (this.jsonData!=null) {
            this.lineChartData = [
              { data: this.jsonData.getAllMachineRecords.map(a => a.speed), label: 'Speed' },
            ];
            let lab: Label = [] = this.jsonData.getAllMachineRecords.map(e => e.createdDate);
            if(lab.length > 10){
              count = Math.round(lab.length / 10);
            }
            else{
              count = 1;
            }
            this.lineChartLabels[0] = String(lab[0]).slice(11, 19);
            let j = 1;
            for (let i = count; i <= lab.length; i = count + i) {
              this.lineChartLabels[j] = String(lab[i]).slice(11, 19);
              j++;
            }
            this.flag4 = true;  
          }
          else
          {
            this.flag5 = true;
          }
        }
        else {
          this.flag5 = true;
        }

      },
      (error) => {
        this.flag5 = true;
      }
    )
  }

  machineReport(){
    this.optionFlag = false;
    this.machineReportFlag = true;
    this.getMachineCategory();
  }

  staffReport(){
    this.optionFlag = false;
    this.staffReportFlag = true;
  }

  salesReport(){
    this.optionFlag = false;
    this.salesReportFlag = true;
  }

  POApproval(){
    this.optionFlag = false;
    this.POApprovalFlag = true;
  }

  categorySelected(value:any){
    if (value.name == 'stanter') {
      this.machineReportFlag = false;
      this.stanterMachineFlag = true;
      this.getAllMachineByCategoryId(value.id);
    }
    else if (value.name == 'folding') {
      this.machineReportFlag = false;
      this.foldingMachineFlag = true;
      this.getAllMachineByCategoryId(value.id);
    }
    else if (value.name == 'waterJet') {
      this.machineReportFlag = false;
      this.waterJetMachineFlag = true;
      this.getAllMachineByCategoryId(value.id);
    }
  }

  day(){
    this.obj.shift = 1;
    this.collectData(this.obj)
  }

  night(){
    this.obj.shift = 2;
    this.collectData(this.obj)
  }

}
