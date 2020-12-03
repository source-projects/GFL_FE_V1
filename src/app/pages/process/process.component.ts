import { Component, OnInit } from '@angular/core';
import { ProcessService } from 'app/@theme/services/process.service';

@Component({
  selector: 'ngx-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  processList;
  tablestyle : "bootstrap";
  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
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
