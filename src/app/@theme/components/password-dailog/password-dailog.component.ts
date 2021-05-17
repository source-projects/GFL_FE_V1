import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GenerateInvoiceService } from '../../services/generate-invoice.service';

@Component({
  selector: 'ngx-password-dailog',
  templateUrl: './password-dailog.component.html',
  styleUrls: ['./password-dailog.component.scss']
})
export class PasswordDailogComponent implements OnInit {

  passwordForInvoice = new Password();
  constructor( private _NgbActiveModal: NgbActiveModal,
    private invoiceService:GenerateInvoiceService,
    private toaster:ToastrService    
    ) { }

  ngOnInit(): void {
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  generate(){

    this.invoiceService.checkPassword(this.passwordForInvoice.password).subscribe(
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