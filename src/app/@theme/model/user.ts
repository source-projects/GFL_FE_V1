export class User{
 firstName:string;
 lastName:string;
 userName:string;
 email:string;
 contact:string;
 password:string;
 company:string;
 department:string;
 designationId:number;
 createdBy:Number;
 updatedBy:Number;
 id:Number;
 userHeadId:Number =0;
 isUserHead:boolean;
 userPermissionData:{}
}

export class Permissions{
    module:string = null;
   view:boolean = false;
   add:boolean = false;
   edit:boolean = false;
   delete:boolean = false;
   viewGroup:boolean = false;
   viewAll:boolean = false;
   editGroup:boolean = false;
   editAll:boolean = false;
   deleteGroup:boolean = false;
   deleteAll:boolean = false;
   selectAll:boolean = false;
}