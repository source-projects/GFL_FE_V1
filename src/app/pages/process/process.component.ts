import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';
import { ProcessGuard } from 'app/@theme/guards/process.guard';
import { ExportService } from 'app/@theme/services/export.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { ProcessService } from 'app/@theme/services/process.service';
import { ToastrService } from 'ngx-toastr';

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
 

  constructor(private processService: ProcessService,
    private toastr: ToastrService,
    public processGuard: ProcessGuard,
    private jwtToken: JwtTokenService,
    private modalService: NgbModal,
    private exportService: ExportService) { }

  ngOnInit(): void {
    this.getProcessList();
  }

  getProcessList(){
    this.processService.getAllProcessList('all',0).subscribe(
      data=>{
        if(data['success'])
          this.processList = data["data"];
          // else
          // this.toastr.error(data['msg'])
      },
      error=>{
        // this.toastr.error('Internal server error')
        //error... internal server.
      }
    )
  }

  deleteProcess(id){
    this.processService.deleteProcess(id).subscribe(
      data=>{
        if(data['success']){
          this.toastr.success(data['msg'])
          this.processList = null;
          this.getProcessList();
        }
          else
          this.toastr.success(data['msg'])
      },
      error=>{
        this.toastr.success('Internal server error')
      }
    )
  }

  open(){
    this.flag=true;
   
    const modalRef = this.modalService.open(ExportPopupComponent);
     modalRef.componentInstance.headers = this.headers;
     modalRef.componentInstance.list = this.process;
  }

}
