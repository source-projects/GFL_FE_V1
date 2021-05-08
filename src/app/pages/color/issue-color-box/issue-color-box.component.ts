import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ColorService } from "../../../@theme/services/color.service";
import { SupplierService } from "../../../@theme/services/supplier.service";

@Component({
  selector: "ngx-issue-color-box",
  templateUrl: "./issue-color-box.component.html",
  styleUrls: ["./issue-color-box.component.scss"],
})
export class IssueColorBoxComponent implements OnInit {
  itemList: any[] = [];
  colorBoxList: any[] = [];
  allBoxList = [];
  allBoxListCopy = [];
  filterAllBoxList = []
  showSelectedBoxList = [];
  listOfSelectedBoxId = []
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

  addToIssueBoxList(row, status: boolean) {
    let boxAlreadyExist: boolean = false
    console.log(row)
    if (status) {
      if (this.showSelectedBoxList && this.showSelectedBoxList.length) {
        this.showSelectedBoxList.forEach(element => {
          if (element.boxNo == row.boxNo) {
            boxAlreadyExist = true
          }
        });
      }
      if (!boxAlreadyExist) {
        this.showSelectedBoxList.push(row)
        this.listOfSelectedBoxId.push({ boxId: row.boxNo })
        console.log(this.showSelectedBoxList)
        console.log(this.listOfSelectedBoxId)
        this.showSelectedBoxList = [...this.showSelectedBoxList]
      }
    } else {
      this.showSelectedBoxList.forEach((element, index) => {
        if (element.boxNo == row.boxNo) {
          this.showSelectedBoxList.splice(index, 1)
          this.listOfSelectedBoxId.splice(index, 1)
        }
      });
      this.showSelectedBoxList = [...this.showSelectedBoxList]
    }
    console.log(" status " + status);
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.filterAllBoxList[0]);
    this.allBoxList = this.filterAllBoxList.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });
  }

  getSupplierItemWithAvailableStock() {
    this.supplierService.getItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
          this.itemList = data["data"];
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
  getAllBox() {
    this.colorService.getAllBoxes().subscribe(
      (data) => {
        if (data["success"]) {
          this.allBoxList = data["data"];
          this.allBoxListCopy = data["data"];
          this.allBoxList = this.allBoxList.map((element) => ({
            boxNo: element.boxNo,
            name: element.name,
            itemname: element.itemname,
            issued: element.issued,
            quantityLeft: element.quantityLeft,
          }));
          this.filterAllBoxList = this.allBoxList.map((element) => ({
            boxNo: element.boxNo,
            name: element.name,
            itemname: element.itemname,
            issued: element.issued,
            quantityLeft: element.quantityLeft,
          }));
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
  itemSelected(event) {
    if (event) {
      this.box = null;
      this.allBoxList = this.allBoxListCopy.filter((v) => v.itemId == event);
      this.colorService.getColorBox(event, false).subscribe(
        (data) => {
          if (data["success"]) {
            this.colorBoxList = data["data"];
            this.loading = false;
          } else {
            this.colorBoxList = [];
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
    } else {
      this.allBoxList = [...this.allBoxListCopy];
    }
  }

  issuedSelected(event) {
    if (event) {
      this.allBoxList = this.allBoxListCopy.filter((v) => !v.issued);
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
    console.log(this.listOfSelectedBoxId)
    this.colorService.issueColorBoxWithList(this.listOfSelectedBoxId).subscribe(
      data => {
        if (data["success"]) {
          this.showSelectedBoxList = []
          this.listOfSelectedBoxId = []
          this.toastr.success(data["msg"])
          this.getAllBox()
          this.route
            .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
            .then(() => {
              this.route.navigate(["/pages/issue-color-box"]);
            });

        } else {
          this.toastr.error(data["msg"])
        }
      }
    )
    // if (form.valid) {
    //   this.colorService.issueBox(form.value.boxNo).subscribe((data) => {
    //     if (data["success"]) {
    //       this.formSubmitted = false;
    //       this.toastr.success(data["msg"]);
    //       this.route
    //         .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
    //         .then(() => {
    //           this.route.navigate(["/pages/issue-color-box"]);
    //         });
    //     } else {
    //       this.toastr.error(data["msg"]);
    //     }
    //   });
    // }
  }

  onCancel() {
    this.box = null;
    this.item = null;
  }
}
