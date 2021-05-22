import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as errorData from "../../../@theme/json/error.json";
import { CommonService } from "../../../@theme/services/common.service";
import { SupplierService } from "../../../@theme/services/supplier.service";
import { ToastrService } from "ngx-toastr";
import { PartyService } from "../../../@theme/services/party.service";

@Component({
  selector: "ngx-add-edit-supplier",
  templateUrl: "./add-edit-supplier.component.html",
  styleUrls: ["./add-edit-supplier.component.scss"],
  providers: [Location],
})
export class AddEditSupplierComponent implements OnInit, OnDestroy {
  public errorData: any = (errorData as any).default;

  //formName
  addSupplier: FormGroup;
  public createdBy: string;

  //to Store UserId
  user: any;
  userHead;
  //to store the data of selected supplier
  currentSupplier: any;

  //to Get store selected supplier Id
  selectedSupplierId: any;

  //to varify form
  formSubmitted: boolean = false;
  public loading = false;
  public disableButton = false;
  public isSupplierNameExists: boolean = false;
  master: any[];

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private commonService: CommonService,
    private supplierService: SupplierService,
    private router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private partyService: PartyService
  ) {}

  ngOnInit(): void {
    this.getdata();
    this.getUpdateData();
    this.getMaster();
  }
  public getMaster() {
    this.loading = true;
    this.master = [];
    this.partyService.getAllMaster().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.master = data["data"];
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
  public getdata() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.addSupplier = new FormGroup({
      supplierName: new FormControl(null, Validators.required),
      discountPercentage: new FormControl(null, [
        Validators.required,
        Validators.max(100),
        Validators.min(0),
      ]),
      gstPercentage: new FormControl(null, [
        Validators.required,
        Validators.max(100),
        Validators.min(0),
      ]),
      paymentTerms: new FormControl(null, Validators.required),
      remark: new FormControl(null),
      userHeadId: new FormControl(null),
      createdBy: new FormControl(null),
      updatedBy: new FormControl(null),
    });
    this.selectedSupplierId = this._route.snapshot.paramMap.get("id");
  }

  public getUpdateData() {
    if (this.selectedSupplierId != null) {
      this.supplierService
        .getAllSupplierById(this.selectedSupplierId)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.currentSupplier = data["data"];
            this.addSupplier.patchValue({
              supplierName: this.currentSupplier.supplierName,
              discountPercentage: this.currentSupplier.discountPercentage,
              gstPercentage: this.currentSupplier.gstPercentage,
              paymentTerms: this.currentSupplier.paymentTerms,
              remark: this.currentSupplier.remark,
              createdBy: this.currentSupplier.user,
              id: this.selectedSupplierId,
              userHeadId: this.currentSupplier.userHeadId,
            });
          },
          (error) => {
            
          }
        );
    }
  }
  reset() {
    this.addSupplier.reset();
    this.formSubmitted = false;
  }

  public addSupplierInfo(): any {
    this.disableButton = true;

    this.formSubmitted = true;
    if (this.addSupplier.valid && !this.isSupplierNameExists) {
      this.addSupplier.value.createdBy = this.user.userId;
      this.supplierService
        .addSupplierInSystem(this.addSupplier.value)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(data["msg"]);
              this.addSupplier.reset();
              this.formSubmitted = false;
            } else {
              this.toastr.error(data["msg"]);
            }
            this.disableButton = false;
          },
          (error) => {
            this.disableButton = false;

            this.toastr.error(errorData.Serever_Error);
          }
        );
    } else {
      this.disableButton = false;

      return;
    }
  }

  updateSupplier() {
    this.disableButton = true;

    this.formSubmitted = true;
    if (this.addSupplier.valid && !this.isSupplierNameExists) {
      this.addSupplier.value.updatedBy = this.user.userId;
      let body = {
        ...this.addSupplier.value,
        id: this.selectedSupplierId,
      };
      this.supplierService.updateSupplierById(body).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(data["msg"]);
            this.router.navigate(["pages/supplier"]);
          } else {
            this.toastr.error(data["msg"]);
          }
          this.disableButton = false;
          this.loading = false;
        },
        (error) => {
          this.disableButton = false;
          this.toastr.error(errorData.Serever_Error);
          this.loading = false;
        }
      );
    }
    this.disableButton = false;
  }

  isUniqueSupplierName() {
    this.isSupplierNameExists = false;
    if (this.addSupplier.value.supplierName) {
      let id = 0;
      if (this.addSupplier.value.id) id = this.addSupplier.value.id;
      this.supplierService
        .isSupplierExists(this.addSupplier.value.supplierName, id)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.isSupplierNameExists = data["data"];
            }
          },
          (error) => {}
        );
    }
  }

  tableChange(event){
    if (event === "view table") {
      this.router.navigate(['/pages/supplier/view']);
    }
  }
}
