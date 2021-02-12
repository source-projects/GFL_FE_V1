import { Component, OnInit } from '@angular/core';
import {AddJet , AddCompany, AddDesignation, ApproveBy} from 'app/@theme/model/admin';
@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  addJet = new AddJet();
  addCompany = new AddCompany();
  adddesignation = new AddDesignation();
  approveBy = new ApproveBy();

  addJetArray: AddJet[] = [];
  addCompanyArray :AddCompany[]=[];
  adddesignationArray : AddDesignation[]=[];
  approveByArray : ApproveBy[]=[];

  constructor() {
    // this.addJetArray.push(this.addJet);
    // this.addCompanyArray.push(this.addCompany);
    // this.adddesignationArray.push(this.adddesignation);
    // this.approveByArray.push(this.approveBy);

   }

 


  ngOnInit(): void {
   // this.
  }

  onCancel(){

  }

 saveJet(){

  }
  saveApproveBy(){

  }
saveDesignation(){

}
saveCompany(){
  
}
  removeJet(id) {
    // const modalRef = this.modalService.open(ConfirmationDialogComponent, {
    //   size: "sm",
    // });
    // modalRef.result.then((result) => {
    //   if (result) {
    //     this.partyService.deletePartyDetailsById(id).subscribe(
    //       (data) => {
    //         this.onChange(this.radioSelect);
    //         this.toastr.success(errorData.Delete);
    //       },
    //       (error) => {
    //         this.toastr.error(errorData.Serever_Error);
    //       }
    //     );
    //   }
    // });
  }


}
