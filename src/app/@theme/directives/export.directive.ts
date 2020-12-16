import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from '../services/export.service';

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

  @Input('flag') flag: boolean;

  @Input() fileType: string;

  @Input() fileName: string;

  @HostListener('click', ['$event']) onClick() {

  console.log(this.fileType);
  console.log(this.fileName);
   
        this.exportService.exportExcel(this.list, this.fileName, this.headers);
    
}
}