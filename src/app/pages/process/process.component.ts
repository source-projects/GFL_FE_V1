import { Component, OnInit } from '@angular/core';
import { ProcessGuard } from 'app/@theme/guards/process.guard';
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

  permissions: Number;

  constructor(private processService: ProcessService,
    private toastr: ToastrService,
    public processGuard: ProcessGuard,
    private jwtToken: JwtTokenService,) { }

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

}
