import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PasswordDailogComponent } from '../../@theme/components';
import { GenerateInvoiceService } from "../../@theme/services/generate-invoice.service";
import { DatePipe } from "@angular/common";
// import { Invoice } from "app/@theme/model/invoice";

@Component({
  selector: "ngx-generate-invoice",
  templateUrl: "./generate-invoice.component.html",
  styleUrls: ["./generate-invoice.component.scss"],
})
export class GenerateInvoiceComponent implements OnInit, OnDestroy {
  checked = false;
  in: number = 2;
  public loading = false;
  InvoiceList = [];
  copyInvoiceList = [];
  Invoice = [];
  finalcheckedrows = [];

  hidden: boolean = true;
  hiddenEdit: boolean = true;
  hiddenView: boolean = true;

  public tableHeaders = ["invoiceNo", "partyName", "batchList", "totalMtr", "finishMtr","netAmt","date"];
  searchStr = "";
  searchANDCondition = false;
  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private generateInvoiceService: GenerateInvoiceService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.getAllInvoice();
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.copyInvoiceList[0]);
    this.InvoiceList = this.copyInvoiceList.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] == "batchList") {
          for (let j = 0; j < item[keys[i]].length; j++) {
            if ((item[keys[i]][j].batchId &&
              item[keys[i]][j].batchId.toString().toLowerCase().indexOf(val) !== -1) ||
              !val) {
              return true;
            }

          }

        } else {
          if (
            (item[keys[i]] &&
              item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
            !val
          ) {
            return true;
          }
        }

      }


    });
  }

  getAllInvoice() {
    this.loading = true;

    this.generateInvoiceService.getAllDipatch().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.InvoiceList = data["data"];
          this.InvoiceList.forEach(ele => {
            ele.netAmt = ele.netAmt.toFixed(2);
            ele.date = this.datePipe.transform(ele.date,"dd/MM/yyyy");
          })
          this.copyInvoiceList = data["data"];
          this.copyInvoiceList.forEach(ele => {
            ele.netAmt = Number(ele.netAmt).toFixed(2);
          })
          this.Invoice = this.InvoiceList.map((element) => ({
            date: element.date,
            id: element.id,
            invoiceNo: element.invoiceNo,
            partyName: element.partyName,
            isSendToParty: element.isSendToParty,
            netAmt: element.netAmt,
            totalMtr: element.totalMtr,
            finishMtr: element.finishMtr
          }));
          this.copyInvoiceList = this.InvoiceList.map((element) => ({
            id: element.id,
            date: element.date,
            invoiceNo: element.invoiceNo,
            partyName: element.partyName,
            isSendToParty: element.isSendToParty,
            netAmt: element.netAmt,
            totalMtr: element.totalMtr,
            finishMtr: element.finishMtr

          }));
        } else {
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  print() {
    const queryParams: any = {};
    const arrayOfValues = this.finalcheckedrows;
    if (arrayOfValues.length != 0) {
      queryParams.myArray = JSON.stringify(arrayOfValues);
      const navigationExtras: NavigationExtras = {
        queryParams,
      };

      this.router.navigate(
        ["/pages/generate_invoice/print/"],
        navigationExtras
      );
    }
  }

  goToReport() {
    this.router.navigate(["/pages/generate_invoice/report"]);
  }

  onSelect(value: any) {
    this.finalcheckedrows = [];
    let arr: any[] = value.selected;
    arr.forEach((ele) => {
      this.finalcheckedrows.push(ele.invoiceNo);
    });
  }

  printCurrentInvoice($event, row) {
    this.finalcheckedrows = [];
    this.finalcheckedrows.push(row.invoiceNo);
    this.print();
  }

  deleteInvoice(invoiceNo){
    const modalRef = this.modalService.open(PasswordDailogComponent, {
      size: "sm",
    });
    modalRef.componentInstance.title = "Delete Invoice"
    modalRef.result.then((result) => {
      if (result) {
        this.loading = true;
        this.generateInvoiceService.deleteByInvoiceNo(invoiceNo).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success("Deleted Successfully.");
              this.getAllInvoice();
              this.loading = false;
            }
            else{
              this.loading = false;
            }
          },
        );
      }
    });
  }
}
