import { takeUntil } from 'rxjs/operators';
import { uniqBy as _uniqBy} from 'lodash';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectComponent } from "@ng-select/ng-select";
import {
  DyeingChemicalData,
  DyeingProcessData,
} from "../../../@theme/model/dyeing-process";
import { DyeingProcessService } from "../../../@theme/services/dyeing-process.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from 'rxjs';
import { uniq } from 'lodash';

@Component({
  selector: "ngx-add-dyeing-process-step",
  templateUrl: "./add-dyeing-process-step.component.html",
  styleUrls: ["./add-dyeing-process-step.component.scss"],
})
export class AddDyeingProcessStepComponent implements OnInit, OnDestroy {
  @ViewChildren("data") data: QueryList<NgSelectComponent>;

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
  public byChemicalList=[{id:"L",value:"L"},{id:"W",value:"W"},{id:"F",value:"F"}]
  public processTypes = ["Scouring","Acid Wash", "Dyeing", "RC", "Cold Wash"];
  public shadeTypeList = ["DEFAULT","LIGHT","MEDIUM","DARK","SPECIAL"];
  private destroy$ = new Subject<void>();

  constructor(
    public activeModal: NgbActiveModal,
    private DyeingProcessService: DyeingProcessService,
    private toastr: ToastrService
  ) {
    this.dyeingProcessStep = new DyeingProcessData();
    this.positionValues = [];
    this.dyeingChemicalData.push(new DyeingChemicalData());
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
        this.dyeingChemicalData = this.stepList[
          this.position - 1
        ].dyeingChemicalData;
        this.dyeingProcessStep.dyeingChemicalData = this.stepList[
          this.position - 1
        ].dyeingChemicalData;
        this.dyeingProcessStep.sequence = this.position;
        this.dyeingProcessStep.temp = this.stepList[this.position - 1].temp;
        this.dyeingProcessStep.holdTime = this.stepList[
          this.position - 1
        ].holdTime;
        this.dyeingProcessStep.liquerRation = this.stepList[
          this.position - 1
        ].liquerRation;
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
    } else {
      this.toastr.error("Fill empty fields");
    }
  }

  getItemData() {
    this.DyeingProcessService.getAllItemWithSupplier().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.itemListArray = data["data"];
        } else {
        }
      },
      (error) => {}
    );
  }

  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "supplierList" + (rowIndex + 1) + "-" + colName;
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

        this.data.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.data.last.focus();
        });
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
  }

  numberOnly(evt) {
    // Only ASCII charactar in that range allowed
    var ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (
      (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) ||
      ASCIICode == 69
    ) {
      if (ASCIICode == 46) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  removeItem(rowIndex) {
    let idCount = this.dyeingChemicalData.length;
    if (idCount == 1) {
      this.dyeingChemicalData[0].byChemical = "L";
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


  verify() {
    if (
      this.dyeingChemicalData && this.dyeingChemicalData.length
    ) {
      let a = _uniqBy(this.dyeingChemicalData, function (e) {
        return e.itemId && e.shadeType;
      });
      if (this.dyeingChemicalData.length != a.length) {
        // duplicate date error.
        this.dyeingChemicalData.forEach((e) => {
          let count = 0;
          for (let date of this.dyeingChemicalData) {
            if (
              e.shadeType == date.shadeType &&
              e.itemId == date.itemId
            ) {
              count++;
              if (count > 1 && date.shadeType && date.itemId) {
                date.duplicateError = true;
              } else {
                date.duplicateError = false;
              }
            }
          }
        });
      } else {
        this.dyeingChemicalData.map((m) => (m.duplicateError = false));
      }
    } else {
      this.dyeingChemicalData.map((m) => (m.duplicateError = false));
    }
  }
  itemSelected(event, rowIndex) {

    this.itemListArray.forEach((e) => {
      if (e.itemId == this.dyeingChemicalData[rowIndex].itemId) {
        this.dyeingChemicalData[rowIndex].supplierName = e.supplierName;
        this.dyeingChemicalData[rowIndex].itemName = e.itemName;
      }
    });

    this.verify();
    if(this.dyeingChemicalData[rowIndex].duplicateError){
      this.toastr.error("Same Item");
      this.dyeingChemicalData.splice(rowIndex,1);
    }


  }

  trackByFn(index: number, obj: any) {
    return obj ? obj["_id"] || obj : index;
  }
}
