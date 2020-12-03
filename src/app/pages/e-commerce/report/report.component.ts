import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReportService } from 'app/@theme/services/report.service';
import { ChartDataSets, ChartType } from 'chart.js';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { Color, Label } from 'ng2-charts';
import { Time } from '@angular/common';
@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements OnInit {

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
  day1: any;
  day2: string;
  night2: string;
  night1: string;

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
    this.obj.shift = value;
    if (value==1) {
      this.day1 = '9:01';
      this.day2 = '21:00';
    }
    else{
      this.day1 = '21:01';
      this.day2 = '9:00';
    }
    this.flag3 = true;
    
   
  }

  getfromtime(value:any){
    let ft = String(value.value).slice(16,23);
    let ft1 = ft.slice(6,);
    let ft3 = ft.slice(0,5);
    if(Number(ft1) < 10 && Number(ft1) >= 0 )
    {
      ft1=ft1.padStart(2,'0');
    }
    ft3 = ft3.concat(":");
    ft3 = ft3.concat(ft1);
    this.obj.fromTime = ft3;
    
  }
  gettotime(value:any){
    let ft = String(value.value).slice(16,23);
    let ft1 = ft.slice(6,);
    let ft3 = ft.slice(0,5);
    if(Number(ft1) < 10 && Number(ft1) >= 0 )
    {
      ft1=ft1.padStart(2,'0');
    }
    ft3 = ft3.concat(":");
    ft3 = ft3.concat(ft1);
    this.obj.toTime = ft3;
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
        let lab:Label = [] = this.jsonData.getAllMachineRecords.map(e => e.createdDate);
        let count = Math.round(lab.length/10); 
        console.log('count',count)
        this.lineChartLabels[0] = String(lab[0]).slice(11,19);
        console.log("1st:",this.lineChartLabels[0])
        let j=1;
        for(let i=count;i<=lab.length;i=count + i)
        {
          this.lineChartLabels[j] = String(lab[i]).slice(11,19);
          j++;
        }
        console.log("label:",this.lineChartLabels)
        this.flag4 = true;
      }
    )
  }


}
