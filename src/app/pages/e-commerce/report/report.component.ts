import { Component, OnInit } from '@angular/core';
import { ReportService } from 'app/@theme/services/report.service';
import { ChartDataSets, ChartType } from 'chart.js';
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ReportComponent implements OnInit {

  fromdateformat: any = [];
  todateformat:any = [];
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  time = {hour: 13, minute: 30};

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
  flag1:boolean = false;
  flag2:boolean = false;
  flag3:boolean = false;
  flag4:boolean = false;

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

  constructor(private reportservice: ReportService,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
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
    // this.getMachineDataByMachineId(value.id)

  }

  onChange(value:any){
    this.flag3 = true;
  }

  getMachineCategory() {
    this.data = this.reportservice.getAllMachinesCategory().subscribe(
      (res) => {
        this.machineCategory = res;
        this.machineCategory = this.machineCategory.data;
        console.log("category", this.machineCategory)
      }
    )
  }

  getAllMachineByCategoryId(id: any) {
    this.reportservice.getMachineDataByCategoryId(id).subscribe(
      (res) => {
        this.machines = res['data'];
        console.log("Machines", this.machines)
      }
    );

  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      console.log("From Date",this.fromDate)
      console.log("To Date:",this.toDate)
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      console.log("For Date:",this.fromDate)
      console.log("To Date:",this.toDate)
    } else {
      this.toDate = null;
      this.fromDate = date;
      console.log("For Date:",this.fromDate)
      console.log("To Date:",this.toDate)
    }
    this.flag2 = true;
    this.fromdateformat = this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
    console.log("date-format",this.fromdateformat)
    this.todateformat = this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
    console.log("date-format",this.todateformat)
    this.obj.fromDate = this.fromdateformat;
    this.obj.toDate = this.todateformat;
    console.log("OBJECT",this.obj)

    this.collectData(this.obj)
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


  collectData(datedata:any){
      this.reportservice.getobjdata(datedata).subscribe(
        (res)=>{
          this.jsonData = res['data'];
        console.log("data1", this.jsonData)
        this.lineChartData = [
          { data: this.jsonData.getAllMachineRecords.map(a => a.speed), label: 'Speed' },
        ];
        this.lineChartLabels = this.jsonData.getAllMachineRecords.map(e => e.createdDate);
        this.flag4 = true;
        }
      )
  }
  
}
