import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-addition-slip',
  templateUrl: './addition-slip.component.html',
  styleUrls: ['./addition-slip.component.scss']
})
export class AdditionSlipComponent implements OnInit {

  lotNo:any;
  formSubmitted = false;
  constructor() { }

  ngOnInit(): void {
  }

}
