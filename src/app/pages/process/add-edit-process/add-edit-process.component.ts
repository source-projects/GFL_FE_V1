import { Component, OnInit } from '@angular/core';
import { ProcessService } from 'app/@theme/services/process.service';

@Component({
  selector: 'ngx-add-edit-process',
  templateUrl: './add-edit-process.component.html',
  styleUrls: ['./add-edit-process.component.scss']
})
export class AddEditProcessComponent implements OnInit {

  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
  }

  onCreate() {

  }
}
