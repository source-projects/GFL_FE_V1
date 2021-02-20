import { Component, Input, OnInit, QueryList, ViewChildren } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectComponent } from "@ng-select/ng-select";
import {
  DyeingChemicalData,
  DyeingProcessData,
} from "app/@theme/model/dyeing-process";
import { DyeingProcessService } from "app/@theme/services/dyeing-process.service";

@Component({
  selector: "ngx-add-dyeing-process-step",
  templateUrl: "./add-dyeing-process-step.component.html",
  styleUrls: ["./add-dyeing-process-step.component.scss"],
})
export class AddDyeingProcessStepComponent implements OnInit {

  @ViewChildren('data') data: QueryList<NgSelectComponent>;

  public dyeingProcessStep: DyeingProcessData;
  public dyeingChemicalData: DyeingChemicalData[] = [];
  public index: string;
  itemListArray: any = [];
  public modalSubmitted: boolean = false;
  public positionValues: number[];
  public submitButton: string = "Add";
  @Input() position;
  @Input() editStep;
  @Input() stepList: DyeingProcessData[] = [];

  public processTypes = [
    "Scouring",
    "Dyeing",
    "RC",
    "Cold Wash"
  ];
  constructor(
    public activeModal: NgbActiveModal,
    private DyeingProcessService: DyeingProcessService
  ) {
    this.dyeingProcessStep = new DyeingProcessData();
    this.positionValues = [];
    this.dyeingChemicalData.push(new DyeingChemicalData());
  }

  ngOnInit(): void {
    this.getItemData();
    if (!this.editStep) {
      if (this.position > 0) {
        this.dyeingProcessStep.sequence = this.position;
        for (let i = 1; i <= this.position; i++) {
          this.positionValues.push(i);
        }
      }
    } else {
      this.submitButton = "Update";
      if (this.position > 0) {
        this.dyeingChemicalData = this.stepList[this.position - 1].dyeingChemicalData;
        this.dyeingProcessStep.sequence = this.position;
        this.dyeingProcessStep.temp = this.stepList[this.position - 1].temp;
        this.dyeingProcessStep.holdTime = this.stepList[this.position - 1].holdTime;
        this.dyeingProcessStep.liquerRation = this.stepList[this.position - 1].liquerRation;
        this.dyeingProcessStep.processType = this.stepList[
          this.position - 1
        ].processType;
        for (let i = 1; i <= this.stepList.length; i++) {
          this.positionValues.push(i);
        }
      }
    }
  }

  onCreate(myForm) {
    this.modalSubmitted = true;
    if (myForm.valid) {
      let obj = {
        processType: this.dyeingProcessStep.processType,
        position: this.dyeingProcessStep.sequence,
        temp: this.dyeingProcessStep.temp,
        holdTime: this.dyeingProcessStep.holdTime,
        liquerRation: this.dyeingProcessStep.liquerRation,
        chemicalList: this.dyeingChemicalData,
      };
      this.activeModal.close(obj);
    }
  }

  getItemData() {
    this.DyeingProcessService.getAllItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
          this.itemListArray = data["data"];
        } else {
        }
      },
      (error) => { }
    );
  }

  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "supplierList" + (rowIndex + 1) + "-" + 0;
      if (rowIndex === this.dyeingChemicalData.length - 1) {
        let item = this.dyeingChemicalData[rowIndex];

        if (colName == "concentration") {
          if (!item.concentration) {
            // this.toastr.error("Enter concentration");
            return;
          }
        } else if (colName == "byChemical") {
          if (!item.byChemical) {
            // this.toastr.error("Enter concentration");
            return;
          }
        }
        let obj = new DyeingChemicalData();
        //let list = this.dyeingChemicalData;
        this.dyeingChemicalData.push(obj);
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 10);
      } else {
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 10);
      }
    }
    this.data.changes.subscribe(() => {
      this.data.last.focus();
    })

  }

  removeItem(rowIndex) {
    let idCount = this.dyeingChemicalData.length;
    if (idCount == 1) {
      this.dyeingChemicalData[0].byChemical = null;
      this.dyeingChemicalData[0].concentration = null;
      this.dyeingChemicalData[0].controlId = null;
      this.dyeingChemicalData[0].id = null;
      this.dyeingChemicalData[0].itemId = null;
      this.dyeingChemicalData[0].itemName = null;
      this.dyeingChemicalData[0].supplierName = null;
    } else {
      let removed = this.dyeingChemicalData.splice(rowIndex, 1);
    }
  }

  itemSelected(event, rowIndex) {
    this.itemListArray.forEach((e) => {
      if (e.itemId == this.dyeingChemicalData[rowIndex].itemId) {
        this.dyeingChemicalData[rowIndex].supplierName = e.supplierName;
        this.dyeingChemicalData[rowIndex].itemName = e.itemName;
      }
    });
  }
}
