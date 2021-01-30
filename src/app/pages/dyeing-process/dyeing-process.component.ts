import { Component, OnInit } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'ngx-dyeing-process',
  templateUrl: './dyeing-process.component.html',
  styleUrls: ['./dyeing-process.component.scss']
})
export class DyeingProcessComponent implements OnInit {

  public dyeingProcessList;
  constructor(private toasrt: ToastrModule) { }

  ngOnInit(): void {
  }

  deleteDyeingProcess(id){

  }

}
