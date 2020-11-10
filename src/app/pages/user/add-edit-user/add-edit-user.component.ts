import { Component, OnInit } from '@angular/core';
import { CommonService } from "app/@theme/services/common.service";
@Component({
  selector: 'ngx-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
user={
 firstName:null,
 lastName:null,
 userName:null,
 email:null,
 mobile:null,
 password:null,
 company:null,
 department:null,
 designation:null,
 userPermissionData:[]=[]
}
designation = ['Manager', 'Master', 'Accountant', 'Staff', 'Helper'];

 formSubmitted: boolean = false;

 checkAll: boolean = false;

forms=['Party', 'Quality', 'User','Fabric In','Batch','Program','Shade','Supplier','Supplier Rate',
       'Color Stock','Process','Process Planning','Jet Planning' ];

permissions=['Select All','View','Add','Edit','Delete','View Group','View All','Edit Group','Edit All','Delete Group','Delete All'];



  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
this.selectAll();
  }
 
  selectAll(){
    for(let i=0; i<this.forms.length; i++)
    {
      for(let j=0; j<this.permissions.length; j++){
       console.log( document.getElementById('forms[i]+j'));
      }
    }
  }

  onSubmit(myForm) {
    this.formSubmitted = true;
    if(myForm.valid){
      alert("valid");
    }
  }
}
