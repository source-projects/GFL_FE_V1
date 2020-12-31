import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThermopackReportService } from 'app/@theme/services/thermopack-report.service';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'ngx-thermopack-report',
  templateUrl: './thermopack-report.component.html',
  styleUrls: ['./thermopack-report.component.scss']
})
export class ThermopackReportComponent implements OnInit {

  public max;
  dateForPicker = new Date();
  datePipeString: string;
  obj = {
    "fromDate": "",
    "fromTime": null,
    "attribute": "forwardTemp",
    "toDate": "",
    "toTime": null,
    "controlId":11628
  }

  parameters = [
    { id: 1, name: "forwardTemp" },
    { id: 2, name: "returnTemp" },
    { id: 3, name: "stackTemp" },
    { id: 4, name: "furnaceTemp" },
    { id: 5, name: "pumpData" },
    { id: 6, name: "idFan" },
    { id: 7, name: "fdFan" },
    { id: 8, name: "screwFeeder" }
  ];


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
  ThermopackChartFlag: boolean;
  data: any;
  jsonData: any;


  constructor(private datePipe: DatePipe, private thermorep: ThermopackReportService) { }

  ngOnInit(): void {
    this.max = new Date(this.dateForPicker.getFullYear(), this.dateForPicker.getMonth(), this.dateForPicker.getDate(), 23, 59);
    // this.getAllParameter();
  }

  // getAllParameter(){
  //   this.data = this.thermorep.getAllParameter().subscribe(
  //     (res) => {
  //       this.parameters = res;
  //       this.parameters = this.parameters.data;
  //     }
  //   )
  // }

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
    this.obj.toTime = this.datePipeString;
  }

  submit() {

    console.log(this.obj)
    this.NoDataFlag = false;
    this.ThermopackChartFlag = false;

    let count;
    this.data = this.thermorep.getobjdata(this.obj).subscribe(
      (res) => {
        if (res["success"]) {

          this.jsonData = res;
          if (this.jsonData != null) {
            this.lineChartData = [
              { data: this.jsonData.data.map(a => a.value), label: 'Value' },
            ];
            console.log("DATA FOR CHART:", this.lineChartData);
            let lab: Label = [] = this.jsonData.data.map(e => e.time);
            let labdate = [] = this.jsonData.data.map(e => e.date);
            console.log("Lab:", lab)
            for (let k = 0; k < labdate.length; k++) {
              labdate[k] = this.datePipe.transform(labdate[k], 'yyyy-MM-dd');
            }
            console.log("LabDate:", labdate)

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
            console.log("length:", lab.length)
            for (let i = count; i < labdate.length; i = count + i) {
              this.lineChartLabels[j] = String(labdate[i]);
              j++;
            }
            console.log("LABEL FOR CHART:", this.lineChartLabels)
            this.ThermopackChartFlag = true;
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
