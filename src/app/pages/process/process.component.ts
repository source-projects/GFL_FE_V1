import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';
import { ProcessGuard } from 'app/@theme/guards/process.guard';
import { ExportService } from 'app/@theme/services/export.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { ProcessService } from 'app/@theme/services/process.service';

@Component({
  selector: 'ngx-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  processList;
  tablestyle : "bootstrap";
  process=[];
  headers=["Stock In", "Party Name", "Bill No", "Bill Date", "Chl No", "Chl Date", "Batch", "Record Count" ];
  flag = false;

  permissions: Number;
  access:Boolean = false;
  constructor(
    private processService: ProcessService,
    public processGuard: ProcessGuard,
    private jwtToken: JwtTokenService,
    private modalService: NgbModal,
    private exportService: ExportService) { }

  ngOnInit(): void {
    this.access = this.processGuard.accessRights('add');
    this.access = this.processGuard.accessRights('edit');
    this.access = this.processGuard.accessRights('delete');
    this.getProcessList();
  }

  getProcessList(){
    /*this.processService.getAllProcessList().subscribe(
      data=>{
        this.processList = data["data"];
      },
      error=>{
        //error... internal server.
      }
    )*/
  }

  open(){
    this.flag=true;
   
    const modalRef = this.modalService.open(ExportPopupComponent);
     modalRef.componentInstance.headers = this.headers;
     modalRef.componentInstance.list = this.process;
  }

}
