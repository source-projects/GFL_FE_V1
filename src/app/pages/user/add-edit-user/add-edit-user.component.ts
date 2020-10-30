import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

 firstName:null;
 lastName:null;
 userName:null;
 email:null;
 mobile:null;
 password:null;
 company:null;
 department:null;
 designation:null;






  formSubmitted: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
