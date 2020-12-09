import { Component, OnInit } from '@angular/core';
import { ProcessGuard } from 'app/@theme/guards/process.guard';
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

  permissions: Number;
  access:Boolean = false;
  constructor(private processService: ProcessService,
    
    public processGuard: ProcessGuard,
    private jwtToken: JwtTokenService,) { }

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

}
