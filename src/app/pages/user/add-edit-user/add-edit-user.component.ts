import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User, Permissions ,DesignationData } from 'app/@theme/model/user';
import { CommonService } from "app/@theme/services/common.service";
import { UserService } from "app/@theme/services/user.service";
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  public errorData: any = (errorData as any).default;

  //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status



user: User=new User();

permissions: Permissions = new Permissions();
permissionArray: any[]= [];

desiList:DesignationData[]=[];
designation:DesignationData=new DesignationData();

//designation = ['Manager', 'Master', 'Accountant', 'Staff', 'Helper'];

 formSubmitted: boolean = false;


forms=['Party', 'Quality', 'User','Stock-Batch','Program','Shade','Supplier','Supplier Rate',
       'Color Stock','Process','Process Planning','Jet Planning' ];

perName=['View','Add','Edit','Delete','View Group','View All','Edit Group','Edit All','Delete Group','Delete All'];

  checkArray:any[]=[];

  data: any[]=[];

  decimal :any[]=[];

  userData: any;
  userId:any;
  currentUserId:any;

  constructor(
    private route: Router,
    private _route: ActivatedRoute,
    private userService: UserService,
    public vcRef: ViewContainerRef, 
    private toastr:ToastrService,
    private commonService: CommonService,
  ) { 
  
  
    
  }

  ngOnInit(): void {

  this.getUserId();
  this.getCurrentUser();

 this.createPermission();
 
 this.getDesignation();
  }

  desiSelected(data){
    console.log(data);
    }

  public getUserId(){
    this.userId = this.commonService.getUser();
    this.currentUserId= this._route.snapshot.paramMap.get('id');
  }

  
 createPermission(){
   for(let i=0; i<this.forms.length; i++){
    this.permissionArray.push(new Permissions());
    this.permissionArray[i].module=this.forms[i];
      this.permissionArray[i].add=false;
      this.permissionArray[i].edit=false;
      this.permissionArray[i].delete=false;
      this.permissionArray[i].view=false;
      this.permissionArray[i].editAll=false;
      this.permissionArray[i].editGroup=false;
      this.permissionArray[i].deleteAll=false;
      this.permissionArray[i].deleteGroup=false;
      this.permissionArray[i].viewAll=false;
      this.permissionArray[i].viewGroup=false;
   }
 }

 setPermissionTrue(i){
    this.permissionArray[i].add=true;
    this.permissionArray[i].edit=true;
    this.permissionArray[i].delete=true;
    this.permissionArray[i].view=true;
    this.permissionArray[i].editAll=true;
    this.permissionArray[i].editGroup=true;
    this.permissionArray[i].deleteAll=true;
    this.permissionArray[i].deleteGroup=true;
    this.permissionArray[i].viewAll=true;
    this.permissionArray[i].viewGroup=true;
 }

 setPermissionFalse(i){
  this.permissionArray[i].add=false;
  this.permissionArray[i].edit=false;
  this.permissionArray[i].delete=false;
  this.permissionArray[i].view=false;
  this.permissionArray[i].editAll=false;
  this.permissionArray[i].editGroup=false;
  this.permissionArray[i].deleteAll=false;
  this.permissionArray[i].deleteGroup=false;
  this.permissionArray[i].viewAll=false;
  this.permissionArray[i].viewGroup=false;
}

checkUncheckAll(module,e){
switch(module){
  case 'Party': {
      let index=this.permissionArray.findIndex(v => v.module=='Party');
      if(e.target.checked==true)
        this.setPermissionTrue(index);
      else
        this.setPermissionFalse(index);
    break;
  }
  case 'Quality': {
    let index=this.permissionArray.findIndex(v => v.module=='Quality');
    if(e.target.checked==true)
      this.setPermissionTrue(index);
    else
      this.setPermissionFalse(index);
  break;
}
case 'User': {
  let index=this.permissionArray.findIndex(v => v.module=='User');
  if(e.target.checked==true)
      this.setPermissionTrue(index);
    else
      this.setPermissionFalse(index);

break;
}
case 'Stock-Batch': {
  let index=this.permissionArray.findIndex(v => v.module=='Stock-Batch');
  if(e.target.checked==true)
  this.setPermissionTrue(index);
else
  this.setPermissionFalse(index);
break;
}
case 'Program': {
  let index=this.permissionArray.findIndex(v => v.module=='Program');
  if(e.target.checked==true)
  this.setPermissionTrue(index);
else
  this.setPermissionFalse(index);
break;
}
case 'Shade': {
  let index=this.permissionArray.findIndex(v => v.module=='Shade');
  if(e.target.checked==true)
  this.setPermissionTrue(index);
else
  this.setPermissionFalse(index);
break;
}
case 'Supplier': {
  let index=this.permissionArray.findIndex(v => v.module=='Supplier');
  if(e.target.checked==true)
  this.setPermissionTrue(index);
else
  this.setPermissionFalse(index);
break;
}
case 'Supplier Rate': {
  let index=this.permissionArray.findIndex(v => v.module=='Supplier Rate');
  if(e.target.checked==true)
  this.setPermissionTrue(index);
else
  this.setPermissionFalse(index);
break;
}

case 'Color Stock': {
  let index=this.permissionArray.findIndex(v => v.module=='Color Stock');
  if(e.target.checked==true)
  this.setPermissionTrue(index);
else
  this.setPermissionFalse(index);
break;
}
case 'Process': {
  let index=this.permissionArray.findIndex(v => v.module=='Process');
  if(e.target.checked==true)
  this.setPermissionTrue(index);
else
  this.setPermissionFalse(index);
break;
}
case 'Process Planning': {
  let index=this.permissionArray.findIndex(v => v.module=='Process Planning');
  if(e.target.checked==true)
  this.setPermissionTrue(index);
else
  this.setPermissionFalse(index);
break;
}
case 'Jet Planning': {
  let index=this.permissionArray.findIndex(v => v.module=='Jet Planning');
  if(e.target.checked==true)
  this.setPermissionTrue(index);
else
  this.setPermissionFalse(index);
break;
}

}

}

getCheckedItem(){
  
let binArray1={
  pa: "",
  qu:"",
  u:"",
  sb:"",
  sh:"",
  pr:"",
  prg:"",
  su:"",
  sr:"",
  cs:"",
  pp:"",
  jp:""
}
Object.keys(binArray1).map((key, i) => {
  
  
    if(this.permissionArray[i].view==true){
      binArray1[key]+= '1';
    }else binArray1[key]+= '0';
    if(this.permissionArray[i].add==true){
      binArray1[key]+= '1';
    }else binArray1[key]+= '0';
    if(this.permissionArray[i].edit==true){
      binArray1[key]+= '1';
    }else binArray1[key]+= '0';
    if(this.permissionArray[i].delete==true){
      binArray1[key]+= '1';
    }else binArray1[key]+= '0';
    if(this.permissionArray[i].viewGroup==true){
      binArray1[key]+= '1';
    }else binArray1[key]+= '0';
    if(this.permissionArray[i].viewAll==true){
      binArray1[key]+= '1';
    }else binArray1[key]+= '0';
    if(this.permissionArray[i].editGroup==true){
      binArray1[key]+= '1';
    }else binArray1[key]+= '0';
    if(this.permissionArray[i].editAll==true){
      binArray1[key]+= '1';
    }else binArray1[key]+= '0';
    if(this.permissionArray[i].deleteGroup==true){
      binArray1[key]+= '1';
    }else binArray1[key]+= '0';
    if(this.permissionArray[i].deleteAll==true){
      binArray1[key]+= '1';
    }else binArray1[key]+= '0';
    
});

 console.log(binArray1) ;


 // get decimal
 let val;
 
 let temp = Object.keys(binArray1).map((key)=>{
   val = binArray1[key];
  
   return {[key]: parseInt(this.bin2dec(val))};
});

  let t2 =  temp.reduce(((r, c) => Object.assign(r, c)), {})
  
// this.userPermissionData
Object.keys(t2).forEach((key,i) => {
  this.user.userPermissionData = t2
})


}


bin2dec(val){
  return parseInt(val, 2).toString(10);
}

  getCurrentCheckValue(user) {
    let i = 0;
    let val;
    let arr = [];
    let array1 = [];
    let sliceArray=[];
    let temp = Object.keys(user.userPermissionData).map((key) => {
      val = user.userPermissionData[key];
      console.log(val);
      arr[i] = val;
      i++;
    });
   // console.log(arr);
    sliceArray=arr.slice(1,arr.length);
    console.log(sliceArray);
    for (let i = 0; i < sliceArray.length; i++) {
      array1[i] = this.dec2bin(sliceArray[i]);
      array1[i] = this.pad(array1[i], this.perName.length)
    }

    console.log("Binary", array1)
    let index = [];
    let len=array1.length;
    console.log(len);
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < this.perName.length; j++) {
        if (array1[i][j] == 1) {
          index[i] = j;
        }
        else{
          index[i] =0 ;
        }
         
      }
    }
    console.log(index);
   

  }  



dec2bin(val:any){
  return (val >>> 0).toString(2);
}
pad(num:number, size:number): string {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

getCurrentUser(){
  if (this.currentUserId != null) {
    this.userService.getUserById(this.currentUserId).subscribe(
      data => {
        if(data["success"]){
          this.user = data['data']
          console.log(this.user);
          this.getCurrentCheckValue(this.user);
        }
        else{
          this.toastr.error(errorData.Internal_Error)
        }
      },
      error => {
        this.toastr.error(errorData.Serever_Error)
      }
    )
  }
} 

updateUser(userForm) {
    this.formSubmitted = true;
    if(userForm.valid){
      this.userService.updateUser(this.user).subscribe(
        data => {
          if(data['success']){
            this.route.navigate(["/pages/user"]);
            this.toastr.success(errorData.Update_Success);
          }
          else{
            this.toastr.error(errorData.Update_Error);
          }
        },
        error => {
          this.toastr.error(errorData.Serever_Error)
        }
      )
    }
    }      

addUser(myForm){
  
  this.getCheckedItem();
  //this.user.userPermissionData=this.userPermissionData;
  
 
    this.formSubmitted = true;
    if(myForm.valid){
       //this.userPermissionData=this.decimal;
      this.userService.createUser(this.user).subscribe(
  
        data => {
          if(data["success"]){
            this.route.navigate(["/pages/user"]);
            this.toastr.success(errorData.Add_Success);
          }
          else{
            this.toastr.error(errorData.Add_Error);
          }
        },
        error => {
          this.toastr.error(errorData.Serever_Error);
        }
      )
    }
}


getDesignation(){
  this.userService.getDesignation().subscribe(
    data =>{
      if(data["success"]){
        this.desiList = data['data'];
       // console.log(this.desiList);
      }
      else{
        this.toastr.error(errorData.Internal_Error)
      }
    },
    error=>{
      this.toastr.error(errorData.Serever_Error)
    }
  )
}


}

