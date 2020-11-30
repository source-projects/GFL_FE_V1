import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChemicalReq, Dosing, FunctionObj, OperatorMessage, PumpControl, TempratureControl, WaterControl } from 'app/@theme/model/process';


@Component({
  selector: 'ngx-add-function',
  templateUrl: './add-function.component.html',
  styleUrls: ['./add-function.component.scss']
})
export class AddFunctionComponent implements OnInit {

  @Input() position;
  @Input() functionList = [];
  @Input() editFunction: any;
  positionValues = [];
  tempFuncPosition = 1;
  funcObj = new FunctionObj();
  dosing = new Dosing();
  tempratureControl = new TempratureControl();
  pumpControl = new PumpControl();
  waterControl = new WaterControl();
  operatorMessage = new OperatorMessage();
  chemicalSubRecordArray: ChemicalReq[] = [];
  chemicalSubRecord: ChemicalReq;
  rowChemicalData: any;
  functionDropdown = [
    { 'id': 'dosing', 'name': 'Dosing' },
    { 'id': 'temperature', 'name': 'Temperature Control' },
    { 'id': 'pump', 'name': 'Pump Control' },
    { 'id': 'water', 'name': 'Water Control' },
    { 'id': 'operator', 'name': 'Operator Message' }];
  waterList = [
    { 'id': 'water1', 'name': 'water1' },
    { 'id': 'water2', 'name': 'water2' }];
  drainTypeList = [
    { 'id': 'Complete Drain (at 0 bar)', 'name': 'Complete Drain (at 0 bar)' },
    { 'id': 'Pressurize Drain (at 1 bar)', 'name': 'Pressurize Drain (at 1 bar)' }];
  fillList = [
    { 'id': 'Post Fill Fresh Water', 'name': 'Post Fill Fresh Water' },
    { 'id': 'Pre Fill Fresh Water', 'name': 'Pre Fill Fresh Water' },
    { 'id': 'Post Fill Machine Water', 'name': 'Post Fill Machine Water' },
    { 'id': 'Pre Fill Machine Water', 'name': 'Pre Fill Machine Water' }]
  fillLevelList = [
    { 'id': 'Level 1', 'name': 'Level 1' },
    { 'id': 'Level 2', 'name': 'Level 2' }];
  operatorMessageList = [
    { 'id': '1', 'name': 'Load Fabric' },
    { 'id': '2', 'name': 'UnLoad Fabric' },
    { 'id': '3', 'name': 'Close the Door' },
    { 'id': '4', 'name': 'Custom Message' }]
  modalSubmitted: boolean = false;
  submitButton = 'ADD';
  chemicalcolumnDefs = [
    { headerName: 'Actions', field: 'index', width: 70 },
    { headerName: 'Item Name', field: 'itemName', width: 90 },
    { headerName: 'Concentration', field: 'concentration', width: 90 },
    { headerName: 'LR/F_WT', field: 'lr_or_fabric_wt', width: 90 },
    { headerName: 'Supplier Name', field: 'supplierName', width: 90 },
  ];
  constructor(public activeModal: NgbActiveModal) {
    this.chemicalSubRecord = new ChemicalReq();
  }

  ngOnInit(): void {
    if (!this.editFunction) {
      console.log("in EditFunction")
      if (this.position > 0) {
        console.log("in Postion")
        this.funcObj.funcPosition = this.position;
        for (let i = 1; i <= this.position; i++) {
          this.positionValues.push(i);
        }
        console.log(this.positionValues);
      }
    } else {
      this.submitButton = "Update";
      if (this.position > 0) {
        this.funcObj.funcPosition = this.position;
        let index = this.functionList.findIndex(v => v.funcPosition == this.position);
        if (index > -1) {
          let ele = this.functionList[index];
          console.log('ele.dos', ele.dosingFunction)
          this.funcObj.funcName = ele.funcName;
          this.funcObj.funcPosition = ele.funcPosition;
          this.funcObj.funcValue = ele.funcValue;
          this.dosing = ele.dosingFunction;
          if (this.dosing.dosingChemical.length) {
            this.dosing.dosingChemical.forEach((ele, index) => {
              ele.index = index + 1;
            });
            this.chemicalSubRecordArray = this.dosing.dosingChemical;
            this.rowChemicalData = [...this.chemicalSubRecordArray];

          }
          this.waterControl = ele.waterDrainFunction;
          this.tempratureControl = ele.tempFunction;
          this.pumpControl = ele.pumpMotorFunction;
          this.operatorMessage = ele.operatorFunction;
        }
        for (let i = 1; i <= this.functionList.length; i++) {
          this.positionValues.push(i);
        }
      }
    }

  }

  toggle(checked: boolean) {
    this.tempratureControl.pressure = checked;
  }

  onWaterTypeChange() {
    if (this.waterControl.type == 'water') {
      this.waterControl.drainType = null;
    } else {
      this.waterControl.jetLevel = 0;
      this.waterControl.fabricRatio = null;
      this.waterControl.waterType = null;
    }
  }

  onDoseTypeChange() {
    if (this.dosing.doseType == 'color') {
      this.dosing.doseWhileHeating = false;
    }
  }

  onSubmit(myForm) {
    this.modalSubmitted = true;
    if (myForm.valid) {
      let i = this.functionDropdown.findIndex(v => v.id === this.funcObj.funcValue);
      console.log(i);
      console.log(this.funcObj.funcValue)
      if (i > -1) {
        this.funcObj.funcName = this.functionDropdown[i].name;
        console.log(this.funcObj.funcName)
      }
      else {
        this.funcObj.funcName = '';
      }
    }
    else {
      return;
    }
  }
}
