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

}
designation = ['Manager', 'Master', 'Accountant', 'Staff', 'Helper'];
 formSubmitted: boolean = false;
  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
  }
  onSubmit(myForm) {
    this.formSubmitted = true;
    if(myForm.valid){
      alert("valid");
    }
  }
}
