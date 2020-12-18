import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PrintInvoiceService {

  isPrinting = false;
  isExport = true;
  isPrint = false;
  pdfContent: BehaviorSubject<any> = new BehaviorSubject('');
  constructor(private router: Router) { }


  printDocument(documentName: string, documentData: string[], isPdf) {
    this.isPrinting = true;
    let url: any;
    if (isPdf) {
      this.router.navigate(['/export/invoice']);
      //window.open(url.toString(), '_blank');
    } else {
      this.isExport = false;
      this.isPrint = true;
      this.router.navigate(['/',
        {
          outlets: {
            'print': ['print', documentName, documentData.join()]
          }
        }]);
      //this.router.navigateByUrl('./export/invoice');
    }
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null } }]);
    });
  }
}
