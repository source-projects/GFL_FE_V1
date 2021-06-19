import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  TagCRUDObject,
  TagDyeingProcessData,
} from "../../../@theme/model/tagName";
import { CommonService } from "../../../@theme/services/common.service";
import { DyeingProcessService } from "../../../@theme/services/dyeing-process.service";
import { uniqBy as _uniqBy } from "lodash";
import { NgSelectComponent } from "@ng-select/ng-select";

@Component({
  selector: "ngx-add-edit-tag-name",
  templateUrl: "./add-edit-tag-name.component.html",
  styleUrls: ["./add-edit-tag-name.component.scss"],
})
export class AddEditTagNameComponent implements OnInit, OnDestroy {
  public updateFlag: boolean = false;
  public loading: boolean = false;
  public formSubmitted: boolean = false;
  public isTagUnique: boolean = true;
  public currentTagId: number;
  public tagFormObject: TagCRUDObject;
  public itemListArray: any = [];
  public byChemicalList = [
    { id: "L", value: "L" },
    { id: "W", value: "W" },
    { id: "F", value: "F" },
  ];
  public shadeTypeList = ["DEFAULT", "LIGHT", "MEDIUM", "DARK", "SPECIAL"];
  public index: string;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private tagService: DyeingProcessService,
    private toastr: ToastrService,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) {
    this.tagFormObject = new TagCRUDObject();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getItemData((onSuccess) => {
      this.currentTagId = Number(this.activeRoute.snapshot.paramMap.get("id"));
      if (this.currentTagId) {
        this.updateFlag = true;
        this.getTagById();
      }else{
        this.updateFlag = false;
      }
    });
  }

  getItemData(onSuccess) {
    this.loading = true;
    this.tagService
      .getAllItemWithSupplier()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.itemListArray = data["data"];
            onSuccess();
          } else {
          }
          this.loading = false;
        },
        (error) => {
          this.loading = true;
        }
      );
  }

  getTagById() {
    this.loading = true;
    this.tagService
      .getTagNameById(this.currentTagId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result) => {
          if (result["success"]) {
            this.tagFormObject = result["data"];
            this.tagFormObject.dyeingTagDataList.forEach((e, i) => {
              this.itemSelected(i);
            });
          } else {
            this.toastr.error(result["msg"]);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  checkUniqTagName() {
    let id = 0;
    if (this.currentTagId) {
      id = this.currentTagId;
    }
    if (this.tagFormObject.tagProcessName) {
      this.loading = true;
      this.tagService
        .checkUniqTag(id, this.tagFormObject.tagProcessName)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (result) => {
            if (result["success"]) {
              this.isTagUnique = result["data"];
            }
            this.loading = false;
          },
          (erroe) => {
            this.loading = false;
          }
        );
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

  itemSelected(rowIndex) {
    this.itemListArray.forEach((e) => {
      if (e.itemId == this.tagFormObject.dyeingTagDataList[rowIndex].itemId) {
        this.tagFormObject.dyeingTagDataList[rowIndex].supplierName =
          e.supplierName;
        this.tagFormObject.dyeingTagDataList[rowIndex].itemName = e.itemName;
      }
    });
    this.verify();
    if (this.tagFormObject.dyeingTagDataList[rowIndex].duplicateError) {
      this.toastr.error("Same Item and Shade Type present");
      this.tagFormObject.dyeingTagDataList.splice(rowIndex, 1);
    }
  }

  verify() {
    if (
      this.tagFormObject.dyeingTagDataList &&
      this.tagFormObject.dyeingTagDataList.length
    ) {
      let a = _uniqBy(this.tagFormObject.dyeingTagDataList, function (e) {
        return e.itemId && e.shadeType;
      });
      if (this.tagFormObject.dyeingTagDataList.length != a.length) {
        // duplicate date error.
        this.tagFormObject.dyeingTagDataList.forEach((e) => {
          let count = 0;
          for (let date of this.tagFormObject.dyeingTagDataList) {
            if (e.shadeType == date.shadeType && e.itemId == date.itemId) {
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
        this.tagFormObject.dyeingTagDataList.map(
          (m) => (m.duplicateError = false)
        );
      }
    } else {
      this.tagFormObject.dyeingTagDataList.map(
        (m) => (m.duplicateError = false)
      );
    }
  }

  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "supplierList" + (rowIndex + 1) + "-" + colName;
      if (rowIndex === this.tagFormObject.dyeingTagDataList.length - 1) {
        let item = this.tagFormObject.dyeingTagDataList[rowIndex];

        if (colName == "concentration") {
          if (!item.concentration) {
            return;
          }
        } else if (colName == "byChemical") {
          if (!item.byChemical) {
            return;
          }
        }
        let obj = new TagDyeingProcessData();
        
        this.tagFormObject.dyeingTagDataList.push(obj);
        this.tagFormObject.dyeingTagDataList = [...this.tagFormObject.dyeingTagDataList,]
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
        this.cdr.detectChanges();
      }
    }
  }

  removeItem(rowIndex) {
    if (this.tagFormObject.dyeingTagDataList.length == 1) {
      this.tagFormObject.dyeingTagDataList[0].byChemical = "L";
      this.tagFormObject.dyeingTagDataList[0].concentration = null;
      this.tagFormObject.dyeingTagDataList[0].controlId = null;
      this.tagFormObject.dyeingTagDataList[0].id = null;
      this.tagFormObject.dyeingTagDataList[0].itemId = null;
      this.tagFormObject.dyeingTagDataList[0].itemName = null;
      this.tagFormObject.dyeingTagDataList[0].supplierName = null;
    } else {
      let removed = this.tagFormObject.dyeingTagDataList.splice(rowIndex, 1);
    }
    this.tagFormObject.dyeingTagDataList = [...this.tagFormObject.dyeingTagDataList,]
  }

  cancelForm(form) {
    form.reset();
    this.tagFormObject = new TagCRUDObject();
    this.formSubmitted = false;
    this.isTagUnique = true;
  }

  submitForm(form) {
    this.formSubmitted = true;
    if (form.valid && this.isTagUnique) {
      //add ot edit...
      if (!this.updateFlag) {
        this.addNewTag(form);
      } else {
        this.editcurrentTag();
      }
    } else {
      this.tagFormObject.dyeingTagDataList.forEach((e) => {
        if (
          !e.byChemical ||
          !e.concentration ||
          !e.itemId ||
          !e.shadeType ||
          !e.supplierName
        ) {
          this.toastr.error("Please fill all chemical data");
        }
      });
    }
  }

  addNewTag(form) {
    this.tagFormObject.userHeadId =
      this.commonService.getUserHeadId().userHeadId;
    this.tagFormObject.createdBy = this.commonService.getUser().userId;
    this.loading = true;
    this.tagService
      .addTagName(this.tagFormObject)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result) => {
          if (result["success"]) {
            this.toastr.success(result["msg"]);
            this.cancelForm(form);
          } else {
            this.toastr.error(result["msg"]);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  editcurrentTag() {
    this.tagFormObject.updatedBy = this.commonService.getUser().userId;
    this.loading = true;
    this.tagService
      .updateTagName(this.tagFormObject)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result) => {
          if (result["success"]) {
            this.toastr.success(result["msg"]);
            this.route.navigate(['pages/dyeing-process/tag/view'])
          } else {
            this.toastr.error(result["msg"]);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  trackByFn(index: number, obj: any) {
    return obj ? obj["_id"] || obj : index;
  }

  tableChange(event) {
    switch (event) {
      case "view table":
        this.route.navigate(["/pages/dyeing-process/view"]);
        break;

      case "add process":
        this.route.navigate(["/pages/dyeing-process/"]);
        break;

      case "show tag":
        this.route.navigate(["/pages/dyeing-process/tag/view"]);
        break;

      default:
        break;
    }
  }
}
