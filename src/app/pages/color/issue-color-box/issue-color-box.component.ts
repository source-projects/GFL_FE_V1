import { Component, OnInit } from "@angular/core";
import { ColorService } from "../../../@theme/services/color.service";
import { SupplierService } from "../../../@theme/services/supplier.service";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../../@theme/json/error.json";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-issue-color-box",
  templateUrl: "./issue-color-box.component.html",
  styleUrls: ["./issue-color-box.component.scss"]
})
export class IssueColorBoxComponent implements OnInit {
  itemList: any[] = [];
  colorBoxList: any[] = [];
  allBoxList = [];
  allBoxListCopy = [];

  loading = false;
  formSubmitted: boolean = false;
  box: any;
  item: any;
  notIssued = false;
  consolidated = false;
  list = [];
  constructor(
    private supplierService: SupplierService,
    private colorService: ColorService,
    private toastr: ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getSupplierItemWithAvailableStock();
    this.getAllBox();
  }

  getSupplierItemWithAvailableStock() {
    this.supplierService.getItemWithSupplier().subscribe(
      data => {
        if (data["success"]) {
          this.itemList = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
      }
    );
  }
  getAllBox() {
    this.colorService.getAllBoxes().subscribe(
      data => {
        if (data["success"]) {
          this.allBoxList = data["data"];
          this.allBoxListCopy = data["data"];

          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
      }
    );
  }
  itemSelected(event) {
    if (event) {
      this.box = null;
      this.allBoxList = this.allBoxListCopy.filter(v => v.itemId == event);
      this.colorService.getColorBox(event, false).subscribe(
        data => {
          if (data["success"]) {
            this.colorBoxList = data["data"];
            this.loading = false;
          } else {
            this.colorBoxList = [];
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
        }
      );

    } else {
      this.allBoxList = [...this.allBoxListCopy];
    }
  }

  issuedSelected(event) {
    if (event) {
      this.allBoxList = this.allBoxListCopy.filter(v => !v.issued);
    } else {
      this.allBoxList = [...this.allBoxListCopy];
    }
  }

  consoSelected(event) {

    if (event) {
      this.consolidated = true;
    } else {
      this.consolidated = false;
    }
  }

  issueBox(form) {
    this.formSubmitted = true;
    if (form.valid) {
      this.colorService.issueBox(form.value.boxNo).subscribe(data => {
        if (data["success"]) {
          this.formSubmitted = false;
          this.toastr.success(data['msg']);
          this.route
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
              this.route.navigate(["/pages/issue-color-box"]);
            });
        } else {
          this.toastr.error(data["msg"]);
        }
      });
    }
  }

  onCancel() {
    this.box = null;
    this.item = null;
  }
}
