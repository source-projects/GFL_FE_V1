export class Purchase{
     material : String;
     amt : number;
     departmentId : number;
     approvedById : number;
     remark :String;
     receiverById : number;
     checked : Boolean=false;
     createdBy : number;
     createdDate : Date;
     updatedBy : number;
     updatedDate :Date;
     materialPhotosList : MaterialPhotos[];
}

export class MaterialPhotos{
     id : number;
     picUrl : String;
     controlId : number;
     type : String;
}
