import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import {ExportService} from '../services/export.service';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[ngxExport]'
})
export class ExportDirective {

  constructor(
    private exportService: ExportService, 
    private el: ElementRef,
    private modalService: NgbModal,
    ) {  }

  @Input('ngxExport') list: any[];

  @Input('headers') headers: any[];

  @Input() fileName: string;

  @HostListener('click', ['$event']) onClick() {

    const modalRef = this.modalService.open(ExportPopupComponent, {
      size: "sm",
    });
    console.log(this.list);

    this.exportService.exportExcel(this.list, this.fileName, this.headers);
  }

 

}
