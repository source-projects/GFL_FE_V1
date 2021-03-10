import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoilerReportService } from 'app/@theme/services/boiler-report.service';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'ngx-boiler-report',
  templateUrl: './boiler-report.component.html',
  styleUrls: ['./boiler-report.component.scss']
})
export class BoilerReportComponent implements OnInit {

  public max;
  dateForPicker = new Date();
  datePipeString: string;
  parameters = [
    { id: 1, name: "streamPressusre" },
    { id: 2, name: "drumWaterLevel" },
    { id: 3, name: "feedPump" },
    { id: 4, name: "flueGasTemp" },
    { id: 5, name: "bedTemp" },
    { id: 6, name: "draftPressure" },
    { id: 7, name: "idFan" },
    { id: 8, name: "daOne" },
    { id: 9, name: "daTwo" },
    { id: 10, name: "daThree" },
    { id: 11, name: "screwFeeder" },
    { id: 12, name: "waterMeter" },
    { id: 13, name: "loadData" }
  ];

  obj = {
    "fromDate": "",
    "fromTime": null,
    "attribute": "streamPressusre",
    "toDate": "",
    "toTime": null,
    "controlId": 11626
  }


  lineChartData: ChartDataSets[];
  lineChartLabels: Label[] = [];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartColors: Color[] = [
    {
      borderColor: '#85c846',
      backgroundColor: '#e9eeff',
    },
  ];
  lineChartOptions = {
    responsive: true,
  };
  lineChartPlugins = [];
  NoDataFlag: boolean;
  BoilerChartFlag: boolean;
  data: any;
  jsonData: any;

  constructor(private datePipe: DatePipe, private boilerrep: BoilerReportService) { }

  ngOnInit(): void {
    this.max = new Date(this.dateForPicker.getFullYear(), this.dateForPicker.getMonth(), this.dateForPicker.getDate(), 23, 59);
  }

  parameter(value: any) {
    this.obj.attribute = value;
  }

  change(value: any) {

    this.datePipeString = this.datePipe.transform(value._selecteds[0], 'yyyy-MM-dd');
    this.obj.fromDate = this.datePipeString;
    this.datePipeString = this.datePipe.transform(value._selecteds[1], 'yyyy-MM-dd');
    this.obj.toDate = this.datePipeString;
    this.datePipeString = this.datePipe.transform(value._selecteds[0], 'HH');
    this.obj.fromTime = Number(this.datePipeString);
    this.datePipeString = this.datePipe.transform(value._selecteds[1], 'HH');
    this.obj.toTime = Number(this.datePipeString);
  }

  submit() {

    this.NoDataFlag = false;
    this.BoilerChartFlag = false;
    this.lineChartLabels = [];
    this.lineChartData = [];

    let count;
    this.data = this.boilerrep.getobjdata(this.obj).subscribe(
      (res) => {
        if (res["success"]) {

          this.jsonData = res;
          if (this.jsonData != null) {
            this.lineChartData = [
              { data: this.jsonData.data.map(a => a.value), label: 'Value' },
            ];
            let lab: Label = [] = this.jsonData.data.map(e => e.time);
            let labdate = [] = this.jsonData.data.map(e => e.date);
            for (let k = 0; k < labdate.length; k++) {
              labdate[k] = this.datePipe.transform(labdate[k], 'yyyy-MM-dd');
            }

            for (let a = 0; a < lab.length; a++) {
              labdate[a] = labdate[a] + " " + lab[a] + ":00:00";
            }
            if (lab.length > 10) {
              count = Math.round(lab.length / 10);
            }
            else {
              count = 1;
            }
            this.lineChartLabels[0] = String(labdate[0]);
            let j = 1;
            for (let i = count; i < labdate.length; i = count + i) {
              this.lineChartLabels[j] = String(labdate[i]);
              j++;
            }
            this.BoilerChartFlag = true;
          }
          else {
            this.NoDataFlag = true;
          }
        }
        else {
          this.NoDataFlag = true;
        }

      },
      (error) => {
        this.NoDataFlag = true;
      }
    )
  }

}
