export class User{
 firstName:string;
 lastName:string;
 userName:string;
 email:string;
 contact:string;
 password:string;
 companyId:number;
 departmentId:number;
 designationId:number;
 createdBy:Number;
 updatedBy:Number;
 id:Number;
 userHeadId:Number =0;
 isUserHead:boolean;
 userPermissionData:{}
}

export class Permissions{
    module:string;
   view:boolean;
   add:boolean;
   edit:boolean;
   delete:boolean;
   viewGroup:boolean;
   viewAll:boolean;
   editGroup:boolean;
   editAll:boolean;
   deleteGroup:boolean;
   deleteAll:boolean;
   selectAll:boolean;

   constructor(){
    this.module = null;
    this.view = false;
    this.add = false;
    this.edit = false;
    this.delete = false;
    this.viewGroup = false;
    this.viewAll = false;
   this.editGroup = false;
    this.editAll = false;
    this.deleteGroup = false;
    this.deleteAll = false;
    this.selectAll = false;
   }
}