import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GenerateInvoiceService } from '../../services/generate-invoice.service';

@Component({
  selector: 'ngx-password-dailog',
  templateUrl: './password-dailog.component.html',
  styleUrls: ['./password-dailog.component.scss']
})
export class PasswordDailogComponent implements OnInit, OnDestroy {

  @Input() title;
  passwordForInvoice = new Password();
  private destroy$ = new Subject<void>();
  constructor( private _NgbActiveModal: NgbActiveModal,
    private invoiceService:GenerateInvoiceService,
    private toaster:ToastrService    
    ) { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  generate(){

    this.invoiceService.checkPassword(this.passwordForInvoice.password).pipe(takeUntil(this.destroy$)).subscribe(
      (res)=>{
        if(res){
          if(res["data"]){
            this.activeModal.close(this.passwordForInvoice.password);
          }
          else{
            this.toaster.error("Password is incorrect");
          }
        }
        else{
        }
      },
    )
  }



}

export class Password{
  password:string
}