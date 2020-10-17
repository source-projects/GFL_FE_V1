import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-add-edit-quality',
  templateUrl: './add-edit-quality.component.html',
  styleUrls: ['./add-edit-quality.component.scss']
})
export class AddEditQualityComponent implements OnInit {
  addQualityForm: FormsModule
  constructor() { }

  ngOnInit(): void {
    this.addQualityForm
  }

}
