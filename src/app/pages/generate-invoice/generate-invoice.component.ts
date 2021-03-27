import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../@theme/services/common.service";
import { GenerateInvoiceService } from "../../@theme/services/generate-invoice.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NavigationExtras, Router } from "@angular/router";

// import { Invoice } from "app/@theme/model/invoice";

@Component({
  selector: "ngx-generate-invoice",
  templateUrl: "./generate-invoice.component.html",
  styleUrls: ["./generate-invoice.component.scss"],
})
export class GenerateInvoiceComponent implements OnInit {
  checked = false;
  in: number = 2;
  public loading = false;
  InvoiceList = [];
  copyInvoiceList = [];
  Invoice = [];
  finalcheckedrows = [];
  // invoiceValues: Invoice = new Invoice();

  hidden: boolean = true;
  hiddenEdit: boolean = true;
  hiddenView: boolean = true;

  constructor(
    private commonService: CommonService,
    private generateInvoiceService: GenerateInvoiceService,
    private _NgbModal: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllInvoice();
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.copyInvoiceList[0]);
    this.InvoiceList = this.copyInvoiceList.filter((item) => {
        for (let i = 0; i < keys.length; i++) {
          if(keys[i] == "batchList"){
            for (let j =0; j < item[keys[i]].length; j++){
              if((item[keys[i]][j].batchId &&
                item[keys[i]][j].batchId.toString().toLowerCase().indexOf(val) !== -1) ||
                !val)
                {
                  return true;
                }

            }
            
          }else{
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

    this.generateInvoiceService.getAllDipatch().subscribe(
      (data) => {
        if (data["success"]) {
          this.InvoiceList = data["data"];
          this.copyInvoiceList = data["data"];
          this.Invoice = this.InvoiceList.map((element) => ({
            date: element.date,
            id: element.id,
            invoiceNo: element.invoiceNo,
            isSendToParty: element.isSendToParty,
          }));
          this.copyInvoiceList = this.InvoiceList.map((element) => ({
            is:element.id,
            date: element.date,
            invoiceNo: element.invoiceNo,
            partyName: element.partyName,
            batchList: element.batchList,
          }));
        } else {
          // this.toastr.error(data['msg'])
        }
        this.loading = false;
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error)
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
    // this.finalcheckedrows = arr;
  }
}
