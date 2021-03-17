import { Component, Input, OnInit } from '@angular/core';
import * as wijmo from "@grapecity/wijmo"
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngx-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
  @Input () isDirectPrintFlag

  constructor(
    private activeModal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.isDirectPrintFlag)
    if(this.isDirectPrintFlag){
      this.printNow()
    }
  }

  printNow(){
    let doc = new wijmo.PrintDocument({
      title:""
    })
    doc.append(
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css">'
    );
    doc.append(
      '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
    );
    doc.append(
      '<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">'
    );
    doc.append(
      '<link href="./job-card.component.scss" rel="stylesheet">'
    );
    let tempFlag = false;
    let inter = setInterval(() => {
      let element = <HTMLElement>document.getElementById("print-slip");
      if (element) {
        doc.append(element);
        doc.print();
        // this.printFlag = true;
        tempFlag = true;
        clearInterval(inter);
        this.activeModal.close();
      }
    }, 10);
  }

}
