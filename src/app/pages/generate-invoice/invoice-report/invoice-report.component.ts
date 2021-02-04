import { Component, OnInit } from '@angular/core';
import { InvoiceReportRequest } from 'app/@theme/model/invoice';
import { GenerateInvoiceService } from 'app/@theme/services/generate-invoice.service';
import { PartyService } from 'app/@theme/services/party.service';

@Component({
  selector: 'ngx-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.scss']
})
export class InvoiceReportComponent implements OnInit {

  public invoiceReportRequest: InvoiceReportRequest;
  public masterList = [];
  public partyList = [];

  constructor(private invoiceService: GenerateInvoiceService, private partyService: PartyService) { 
    this.invoiceReportRequest = new InvoiceReportRequest();
  }

  ngOnInit(): void {
    this.getAllMasters();
    this.getAllParties();
  }

  getAllMasters(){
    this.partyService.getAllMaster().subscribe(
      data=>{
        if(data['success']){
          this.masterList = data['data'];
        }
      }, error=>{

      }
    )
  }

  getAllParties(){
    this.partyService.getAllPartyList(0, 'all').subscribe(
      data=>{
        if(data['success']){
          this.partyList = data['data'];
        }
      }, error=>{

      }
    )
  }

}
