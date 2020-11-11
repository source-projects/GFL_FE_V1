import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-stock-batch',
  templateUrl: './stock-batch.component.html',
  styleUrls: ['./stock-batch.component.scss']
})
export class StockBatchComponent implements OnInit {
  public errorData: any = (errorData as any).default;

  stockList;

  tablestyle = "bootstrap";

  constructor(
    private modalService: NgbModal,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }

}
