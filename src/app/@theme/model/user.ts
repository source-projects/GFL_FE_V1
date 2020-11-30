export class User{
 firstName:String;
 lastName:String;
 userName:String;
 email:String;
 contact:String;
 password:String;
 company:String;
 department:String;
 designationId:number;
 createdBy:Number;
 updatedBy:Number;
 id:Number;
 userHeadId:Number;
 isUserHead:boolean;
 userPermissionData:{}
}

export class Permissions{
    module:String = null;
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