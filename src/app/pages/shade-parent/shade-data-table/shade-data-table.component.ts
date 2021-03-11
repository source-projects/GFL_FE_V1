import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ShadeDataList } from "../../../@theme/model/shade";
import { SupplierService } from "../../../@theme/services/supplier.service";

@Component({
  selector: "ngx-shade-data-table",
  templateUrl: "./shade-data-table.component.html",
  styleUrls: ["./shade-data-table.component.scss"],
})
export class ShadeDataTableComponent implements OnInit {
  @Input() shadeData: any;
  @Input() formSubmitted: boolean;
  @Input() selectedQualityId: any;
  @Input() addedBy: any;
  @Input() createdBy: any;
  index: any;
  loading: boolean = false;
  supplierList: any[];
  supplierListRate: any[];
  refreshFlag: any = 0;
  totalAmount: number;
  costKg: number;
  costMtr: number;
  disableFlag: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSupplierList();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.disableFlag = true;
    // this.disableFlag = false;
    // if (
    //   changes.addedBy.currentValue === "admin" ||
    //   changes.addedBy.currentValue === "Admin"
    // ) {
    //   this.disableFlag = true;
    // }
  }
  getSupplierList() {
    this.loading = true;
    this.supplierService.getAllSupplierRates().subscribe(
      (data) => {
        if (data["success"]) {
          if (data["data"] && data["data"].length > 0) {
            this.supplierList = data["data"];
            this.supplierList = this.supplierList.filter((item) => {
              if (item.itemType == "Color") {
                return true;
              }
            });
            this.getAllSupplier();
            this.loading = false;
          } else {
            this.loading = false;
          }
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getAllSupplier() {
    this.loading = true;
    this.supplierService.getAllSupplier(0, "all").subscribe(
      (data) => {
        if (data["success"]) {
          this.supplierListRate = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  itemSelected(rowIndex, row, event) {
    if (this.selectedQualityId) {
      if (event) {
        if (this.refreshFlag > 10) {
          this.refreshFlag = 0;
        }
        this.refreshFlag++;
        let newSupplierId;
        for (let s of this.supplierList) {
          if (row.supplierItemId == s.id) {
            newSupplierId = s.supplierId;
            row.itemName = s.itemName;
            row.rate = s.gstRate.toFixed(2);
            break;
          }
        }
        for (let s1 of this.supplierListRate) {
          if (newSupplierId == s1.id) {
            this.shadeData.shadeDataList[rowIndex].supplierName =
              s1.supplierName;
            this.shadeData.shadeDataList[rowIndex].supplierId = s1.id;
            break;
          }
        }
        this.calculateAmount(rowIndex);
      } else {
        this.shadeData.shadeDataList[rowIndex].supplierName = null;
        this.shadeData.shadeDataList[rowIndex].supplierId = null;
        this.shadeData.shadeDataList[rowIndex].rate = null;
        this.shadeData.shadeDataList[rowIndex].amount = null;
        this.shadeData.shadeDataList[rowIndex].concentration = null;
      }
      this.calculateTotalAmount(false);
    } else {
      this.toastr.warning("Select Quality");
      this.shadeData.shadeDataList[rowIndex].supplierName = null;
      this.shadeData.shadeDataList[rowIndex].supplierId = null;
      this.shadeData.shadeDataList[rowIndex].rate = null;
      this.shadeData.shadeDataList[rowIndex].amount = null;
      this.shadeData.shadeDataList[rowIndex].concentration = null;
      return;
    }
  }

  calculateAmount(rowIndex) {
    if (this.shadeData.qualityId) {
      if (this.shadeData.shadeDataList[rowIndex].concentration) {
        let con = Number(this.shadeData.shadeDataList[rowIndex].concentration);
        let newRate = Number(this.shadeData.shadeDataList[rowIndex].rate);
        let amount = Number((Number(con) * Number(newRate)).toFixed(2));
        this.shadeData.shadeDataList[rowIndex].amount = Number(
          amount.toFixed(2)
        );
        this.calculateTotalAmount(false);
      } else {
        this.shadeData.shadeDataList[rowIndex].amount = 0;
        this.calculateTotalAmount(false);
      }
    } else {
      this.toastr.warning("Select Quality");
      return;
    }
  }

  calculateTotalAmount(isQualityChanged) {
    if (isQualityChanged) {
      this.shadeData.shadeDataList.forEach((element, i) => {
        this.calculateAmount(i);
      });
    }
    this.totalAmount = 0;
    this.shadeData.shadeDataList.forEach((e) => {
      if (e.amount) this.totalAmount += e.amount;
    });
    this.totalAmount = Number(this.totalAmount.toFixed(2));
  }

  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "supplierList" + (rowIndex + 1) + "-" + colName;
      if (rowIndex === this.shadeData.shadeDataList.length - 1) {
        let item = this.shadeData.shadeDataList[rowIndex];
        if (colName == "itemName") {
          if (!item.itemName) {
            this.toastr.error("Enter item name", "item name required");
            return;
          }
        } else if (colName == "concentration") {
          if (!item.concentration) {
            this.toastr.error("Enter concentration", "concentration required");
            return;
          }
        } else if (colName == "supplierName") {
          if (!item.supplierName) {
            this.toastr.error("Enter supplier name", "supplier name required");
            return;
          }
        } else if (colName == "rate") {
          if (!item.rate) {
            this.toastr.error("Enter rate", "rate is required");
            return;
          }
        } else if (colName == "amount") {
          if (!item.amount) {
            this.toastr.error("Enter amount", "amount is required");
            return;
          }
        }
        let obj = {
          itemName: null,
          concentration: null,
          supplierName: null,
          rate: null,
          amount: null,
          supplierId: null,
          supplierItemId: null,
        };
        let list = this.shadeData.shadeDataList;
        list.push(obj);
        this.shadeData.shadeDataList = [...list];
      } else {
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 50);
      }
    }
  }
}
