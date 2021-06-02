import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import * as errorData from '../../../@theme/json/error.json';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { PurchaseRequest } from '../../../@theme/model/purchaseRequest';
import { WaterJet } from '../../../@theme/model/water-jet';
import { PurchaseService } from '../../../@theme/services/purchase.service';
import { ReportService } from '../../../@theme/services/report.service';
import { WaterJetService } from '../../../@theme/services/water-jet.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})

export class ReportComponent implements OnInit, OnDestroy {

  datePipeString: string;
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
  dateForPicker = new Date();
  public max;
  public datetime: any;
  public startAt;
  public fromtime: any;
  public totime: any;
  tablestyle = "bootstrap";

  machineCategory: any = [];
  machines: any = [];
  machineName: any;
  machineData = [];
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
  boilerFlag: boolean = false;
  thermoFlag: boolean = false;
  ChartFlag: boolean = false;
  NoDataFlag: boolean = false;
  buttonFlag: boolean = false;
  inter: any;

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
  loading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private reportservice: ReportService, private toastr: ToastrService, private purchaseService: PurchaseService,
    private waterjetService: WaterJetService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.startAt = new Date(this.dateForPicker.getFullYear(), this.dateForPicker.getMonth(), this.dateForPicker.getDate(), 9, 0, 0)
    this.max = new Date(this.dateForPicker.getFullYear(), this.dateForPicker.getMonth(), this.dateForPicker.getDate(), 23, 59);
    this.getMachineCategory();
    // this.getPurchaseRequestList();
    //this.getWaterJetList();
  }

  ngOnDestroy() {
    clearInterval(this.inter);
    this.destroy$.next();
    this.destroy$.complete();

  }

  change(value: any) {

    this.datePipeString = this.datePipe.transform(value._selecteds[0], 'yyyy-MM-dd');
    this.obj.fromDate = this.datePipeString.toString();
    this.datePipeString = this.datePipe.transform(value._selecteds[1], 'yyyy-MM-dd');
    this.obj.toDate = this.datePipeString.toString();
    this.datePipeString = this.datePipe.transform(value._selecteds[0], 'HH:mm:ss');
    this.obj.fromTime = this.datePipeString;
    this.datePipeString = this.datePipe.transform(value._selecteds[1], 'HH:mm:ss');
    this.obj.toTime = this.datePipeString;
  }


  getMachineCategory() {
    this.data = this.reportservice.getAllMachinesCategory().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        this.machineCategory = res;
        this.machineCategory = this.machineCategory.data;
        this.machineCategory.forEach(element => {
          if (element.name === "Stenter") {
            let id = element.id;
            this.getAllMachineByCategoryId(id);
          }
        });
      }
    )
  }

  machineSelected(event) {
    if (event) {
      clearInterval(this.inter);
      let id = event;
      this.getMachineDetails(id);
      this.inter = setInterval(() => {
        this.getMachineDetails(id);
      }, 10000);
    }else{
      clearInterval(this.inter);
      this.machineData = [];
    }
  }
  
  getMachineDetails(id) {
    this.reportservice.getMachineDataById(id).pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        this.machineData = res["data"].getAllMachineRecords;
        this.machineData.forEach((ele) => {
          ele.mtr = ele.mtr.toFixed(3);
        })
      }
    )
  }

  getAllMachineByCategoryId(id: any) {
    this.loading = true;
    this.data = this.reportservice.getMachineDataByCategoryId(id).pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        this.machines = res['data'];
        this.MachineFlag = true;
        this.loading = false;
      }
    );
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
    this.machineReportFlag = false;

    if (value.name == 'Stenter Machine') {
      this.getAllMachineByCategoryId(value.id);
    }
    else if (value.name == 'Folding Machine') {
      this.getAllMachineByCategoryId(value.id);
    }
    else if (value.name == 'string') {
      this.waterJetMachineFlag = true;
    }
    else if (value.name == 'Boiler') {
      this.boilerFlag = true;
    }
    else if (value.name == 'Thermopack') {
      this.thermoFlag = true;
    }
  }

  day(value: any) {
    this.obj.shift = 1;
    this.obj.id = value.id;

    this.NoDataFlag = false;
    this.ChartFlag = false;

    let count;
    this.data = this.reportservice.getobjdata(this.obj).pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        if (res["success"]) {

          this.jsonData = res['data'];
          if (this.jsonData != null) {
            this.lineChartData = [
              { data: this.jsonData.getAllMachineRecords.map(a => a.speed), label: 'Speed' },
            ];
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

  night(value: any) {
    this.obj.shift = 2;
    this.obj.id = value.id;

    this.NoDataFlag = false;
    this.ChartFlag = false;
    let count;
    this.data = this.reportservice.getobjdata(this.obj).pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        if (res["success"]) {

          this.jsonData = res['data'];
          if (this.jsonData != null) {
            this.lineChartData = [
              { data: this.jsonData.getAllMachineRecords.map(a => a.speed), label: 'Speed' },
            ];
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

  back() {
    if (this.optionFlag == true) {
      this.buttonFlag = false;
      this.machineReportFlag = false;
    }
    else if (this.machineReportFlag == true) {
      this.buttonFlag = false;
      this.optionFlag = true;
      this.machineReportFlag = false;
    }
    else if (this.MachineFlag == true) {
      this.buttonFlag = true;
      this.machineReportFlag = true;
      this.MachineFlag = false;
    }
    else if (this.ChartFlag == true || this.NoDataFlag == true) {
      this.buttonFlag = true;
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
      this.waterJetMachineFlag = false;
      this.machineReportFlag = true;
    }
    else if (this.boilerFlag == true) {
      this.buttonFlag = true;
      this.machineReportFlag = true;
      this.boilerFlag = false;
    }
    else if (this.thermoFlag == true) {
      this.buttonFlag = true;
      this.machineReportFlag = true;
      this.thermoFlag = false;
    }
  }

  // getPurchaseRequestList() {
  //   this.purchaseService.getAllRequests().pipe(takeUntil(this.destroy$)).subscribe(
  //     (data) => {
  //       if (data["success"]) {
  //         this.purchaseRequestList = data["data"];
  //       }
  //     },
  //     (error) => { }
  //   );
  // }
  getWaterJetList() {
    this.loading = true;
    this.waterjetService.getWaterJetList().pipe(takeUntil(this.destroy$)).subscribe(
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
      .pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            if (status == 1) this.toastr.success("Request approved");
            else if (status == 2) this.toastr.success("Request declined");
            // this.getPurchaseRequestList();
          }
        },
        (error) => {
          this.toastr.error("Error serving request");
        }
      );
  }
}

