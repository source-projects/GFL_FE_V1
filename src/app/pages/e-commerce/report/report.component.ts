import { Component, OnInit } from '@angular/core';
import { ReportService } from 'app/@theme/services/report.service';
import { ChartDataSets, ChartType } from 'chart.js';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class ReportComponent implements OnInit {

  fromdateformat: any = [];
  todateformat: any = [];
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  time = { hour: 13, minute: 30 };

  selectedMachineCategory: number;
  selectedMachine: number;

  machineCategory: any = [];
  machines: any = [];
  obj = {
    "fromDate": "",
    "fromTime": "",
    "id": null,
    "shift": "",
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

  constructor(private reportservice: ReportService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
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
    this.flag3 = true;
    this.obj.shift = value;
    console.log("Type",typeof(value))
    this.collectData(this.obj)
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

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.flag2 = true;
    this.fromdateformat = this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
    this.todateformat = this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
    this.obj.fromDate = this.fromdateformat;
    this.obj.toDate = this.todateformat;


  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


  collectData(datedata: any) {
    this.reportservice.getobjdata(datedata).subscribe(
      (res) => {
        this.jsonData = res['data'];
        this.lineChartData = [
          { data: this.jsonData.getAllMachineRecords.map(a => a.speed), label: 'Speed' },
        ];
        this.lineChartLabels = this.jsonData.getAllMachineRecords.map(e => e.createdDate);
        this.flag4 = true;
      }
    )
  }


}
