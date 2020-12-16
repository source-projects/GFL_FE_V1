import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import * as errorData from 'app/@theme/json/error.json';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequest } from '../../../@theme/model/purchaseRequest';
import { WaterJet } from '../../../@theme/model/water-jet';
import { PurchaseService } from '../../../@theme/services/purchase.service';
import { ReportService } from '../../../@theme/services/report.service';
import { WaterJetService } from '../../../@theme/services/water-jet.service';

@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
// changeDetection: ChangeDetectionStrategy.OnPush

export class ReportComponent implements OnInit {
  
  purchaseRequestList: PurchaseRequest[] = [];
  waterJetList: WaterJet[] = [];
  infor: any = [
    {
      id: 1323,
      machineName: "SM1"
    },
    {
      id: 1324,
      machineName: "SM2"
    }
  ];
  public errorData: any = (errorData as any).default;
  
  public datetime: any;
  public fromtime: any;
  public totime: any;

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

  optionFlag: boolean = true;
  machineReportFlag: boolean = false;
  staffReportFlag: boolean = false;
  salesReportFlag: boolean = false;
  POApprovalFlag: boolean = false;
  stanterMachineFlag: boolean = false;
  waterJetMachineFlag: boolean = false;
  foldingMachineFlag: boolean = false;
  MachineFlag: boolean = false;
  ChartFlag:boolean = false;
  NoDataFlag:boolean = false;
  buttonFlag:boolean = false;


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
  loading: boolean = false;
  
  constructor(private reportservice: ReportService, private toastr: ToastrService,private purchaseService:PurchaseService,
    private waterjetService: WaterJetService) {
  }

  ngOnInit(): void {
    this.getMachineCategory();
    this.getPurchaseRequestList();
    this.getWaterJetList();
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

    let ft11 = String(this.datetime[0]).slice(16, 23);
    let hour11 = ft11.slice(0, 2);
    let t11 = String(this.datetime[1]).slice(16, 23);
    let h11 = t.slice(0, 2);
    if ((Number(hour11) >= 21 || Number(hour11) < 9) && (Number(h11) >= 21 || Number(h11) < 9)) {
      let ft111 = ft11.slice(6,);
      let ft311 = ft11.slice(0, 5);
      if (Number(ft111) < 10 && Number(ft111) >= 0) {
        ft111 = ft111.padStart(2, '0');
      }
      ft311 = ft311.concat(":");
      ft311 = ft311.concat(ft111);
      this.obj.fromTime = ft311;

      let t111 = t11.slice(6,);
      let t311 = t11.slice(0, 5);
      if (Number(t111) < 10 && Number(t111) >= 0) {
        t111 = t111.padStart(2, '0');
      }
      t311 = t311.concat(":");
      t311 = t311.concat(t111);
      this.obj.toTime = t311;

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
    this.loading = true;
    this.data = this.reportservice.getMachineDataByCategoryId(id).subscribe(
      (res) => {
        this.machines = res['data'];
        this.MachineFlag = true;
        this.loading = false;
      }
    );
  }

  collectData(datedata: any) {
  }

  machineReport() {
    this.optionFlag = false;
    this.machineReportFlag = true;
    this.buttonFlag = true;
  }

  POApproval() {
    this.optionFlag = false;
    this.POApprovalFlag = true;
    this.buttonFlag = true;
  }

  categorySelected(value: any) {
    console.log("Selected Category :", value)
    this.machineReportFlag = false;

    if (value.name == 'Stenter Machine') {
      this.getAllMachineByCategoryId(value.id);
    }
    // else if (value.name == 'Folding Machine') {
    //   this.getAllMachineByCategoryId(value.id);
    // }
    else if (value.name == 'string') {
      this.waterJetMachineFlag = true;
    }
  }

  day(value: any) {
    this.obj.shift = 1;
    this.obj.id = value.id;

    let count;
    this.data = this.reportservice.getobjdata(this.obj).subscribe(
      (res) => {
        if (res["success"]) {

          this.jsonData = res['data'];
          if (this.jsonData != null) {
            this.lineChartData = [
                { data: this.jsonData.getAllMachineRecords.map(a => a.speed), label: 'Speed' },
            ];
            console.log("DATA:",this.lineChartData)
            let lab: Label = [] = this.jsonData.getAllMachineRecords.map(e => e.createdDate);
            if (lab.length > 10) {
              count = Math.round(lab.length / 10);
            }
            else {
              count = 1;
            }
            this.lineChartLabels[0] = String(lab[0]).slice(11, 19);
            let j = 1;
            for (let i = count; i <= lab.length; i = count + i) {
              this.lineChartLabels[j] = String(lab[i]).slice(11, 19);
              j++;
            }
            console.log("LABEL:",this.lineChartLabels)
            this.ChartFlag = true;
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

    // this.collectData(this.obj)
  }

  night(value: any) {
    this.obj.shift = 2;
    this.obj.id = value.id;

    let count;
    this.data = this.reportservice.getobjdata(this.obj).subscribe(
      (res) => {
        if (res["success"]) {

          this.jsonData = res['data'];
          if (this.jsonData != null) {
            this.lineChartData = [
                { data: this.jsonData.getAllMachineRecords.map(a => a.speed), label: 'Speed' },
            ];
            console.log("DATA:",this.lineChartData)
            let lab: Label = [] = this.jsonData.getAllMachineRecords.map(e => e.createdDate);
            if (lab.length > 10) {
              count = Math.round(lab.length / 10);
            }
            else {
              count = 1;
            }
            this.lineChartLabels[0] = String(lab[0]).slice(11, 19);
            let j = 1;
            for (let i = count; i <= lab.length; i = count + i) {
              this.lineChartLabels[j] = String(lab[i]).slice(11, 19);
              j++;
            }
            console.log("LABEL:",this.lineChartLabels)
            this.ChartFlag = true;
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

  back(){
    if (this.optionFlag == true) {
      this.buttonFlag = false;
      this.optionFlag = true;
      this.MachineFlag = false;
      this.ChartFlag = false;
      this.NoDataFlag = false;
      this.machineReportFlag = false;
    }
    else if (this.machineReportFlag == true) {
      this.buttonFlag = true;
      this.optionFlag = true;
      this.MachineFlag = false;
      this.ChartFlag = false;
      this.NoDataFlag = false;
      this.machineReportFlag = false;
    }
    else if (this.MachineFlag == true) {
      this.buttonFlag = true;
      this.optionFlag = false;
      this.machineReportFlag = true;
      this.ChartFlag = false;
      this.NoDataFlag = false;
      this.MachineFlag = false;
    }
    else if (this.ChartFlag == true || this.NoDataFlag == true) {
      this.buttonFlag = true;
      this.optionFlag = false;
      this.machineReportFlag = false;
      this.ChartFlag = false;
      this.NoDataFlag = false;
      this.MachineFlag = true;
    }
    else if (this.POApprovalFlag == true) {
      this.buttonFlag = false;
      this.optionFlag = true;
      this.POApprovalFlag = false;
    }
    else if (this.waterJetMachineFlag == true) {
      this.buttonFlag = true;
      this.optionFlag = false;
      this.waterJetMachineFlag = false;
      this.machineReportFlag = true;
    }
  }

  getPurchaseRequestList() {
    this.purchaseService.getAllRequests().subscribe(
      (data) => {
        if (data["success"]) {
          this.purchaseRequestList = data["data"];
        }
      },
      (error) => {}
    );
  }
  getWaterJetList(){
    this.loading = true;
    this.waterjetService.getWaterJetList().subscribe(
      (data) => {
        if (data["success"]) {
          this.waterJetList = data["data"];
          this.loading = false;
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  updateRequest(status, index) {
    this.purchaseRequestList[index].status = status;
    this.purchaseService
      .updateRequestStatus(this.purchaseRequestList[index])
      .subscribe(
        (data) => {
          if (data["success"]) {
            if (status == 1) this.toastr.success("Request approved");
            else if (status == 2) this.toastr.success("Request declined");
            this.getPurchaseRequestList();
            //window.location.reload();
          }
        },
        (error) => {
          this.toastr.error("Error serving request");
        }
      );
  }
}
