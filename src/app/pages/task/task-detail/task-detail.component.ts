import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxImageCompressService } from "ngx-image-compress";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "../../../@theme/services/common.service";
import { TaskImageList } from "../../../@theme/model/task";
import { RegistrationService } from "../../../@theme/services/registration.service";
import { TaskService } from "../../../@theme/services/task.service";
// import { stat } from "node:fs";
import { update } from "lodash";
@Component({
  selector: "ngx-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent implements OnInit {
  files: File[] = [];
  fileToUpload: File = null;
  imageUrl = "";
  imageFile: File = null;
  taskImageListArray: TaskImageList[] = [];
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  statusSelected;
  taskDetail;
  taskDetailData;

  @Input("taskId") taskId: number;
  @Input("assign") assign:boolean;

  status = [
    {id:1,statusName:"Completed"},
    {id:2,statusName:"Hold"},
    {id:3,statusName:"Running"},
    {id:4,statusName:"NotStarted"},
    {id:5,statusName:"Blocker"}
  ]
  constructor(private activeModel: NgbActiveModal, private taskService: TaskService,
    private registrationService: RegistrationService,private imageCompress: NgxImageCompressService,
    private commonService:CommonService,  private toastrService: ToastrService

    ) {}

  ngOnInit(): void {
    this.getTaskMasterDetailById();
    this.getTaskDataDetailById();

  }

  getTaskMasterDetailById(){
    console.log(this.taskId)
    this.taskService
    .getTaskMasterDatabyId(this.taskId)
    .subscribe(
      (data) => {
        console.log(data["data"]);
        this.taskDetail = data["data"];
      },
      (error) => {}
    );

  }

  getTaskDataDetailById(){
    this.taskService
    .getTaskDataDatabyId(this.taskId)
    .subscribe(
      (data) => {
        console.log(data["data"]);
        this.taskDetailData = data["data"];
        this.statusSelected = this.taskDetailData.taskStatus;
      },
      (error) => {}
    );

  }


  getStatus(value:any){
    this.statusSelected = value;
  }

  closeTaskDetail() {
    this.activeModel.close();
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadFileOnServer();
  }

  uploadFileOnServer() {
    this.files.forEach((element) => {
      this.fileToUpload = element;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.compressFile();
      };
      reader.readAsDataURL(this.fileToUpload);
    });
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  compressFile(): any {
    this.imageCompress
      .compressFile(this.imageUrl, -1, 50, 50)
      .then((result) => {
        this.imgResultAfterCompress = result;
        //console.log('Size in bytes is now:', this.imageCompress.byteCount(result)/(1024*1024));

        const imageBlob = this.dataURItoBlob(
          this.imgResultAfterCompress.split(",")[1]
        );

        this.imageFile = new File([result], this.fileToUpload.name, {
          type: "image/jpeg",
        });
        //console.log(this.imageFile);
        //return imageFile;
        this.fileUpload();
      });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "image/jpeg" });
    return blob;
  }

  fileUpload() {
    // this.loading = true;
    // this.imageFile =  this.compressFile();
    if (this.imageFile) {
      this.fileToUpload = this.imageFile;
      const data = new FormData();
      data.append("file", this.fileToUpload);
      data.append("upload_preset", "gfl_upload");
      data.append("cloud_name", "dpemsdha5");
      this.registrationService.uploadImage(data).subscribe((response) => {
        if (response) {
          let obj = {
            id: null,
            type: null, //this.fileToUpload.name,
            // type: this.docType,
            url: response.secure_url,
            controlId: null,
          };
          this.taskImageListArray.push(obj);
          //this.imgLoading = false;
        }
      });
    }

    // this.loading = false;
  }

  updateDetail(){

    if(this.statusSelected != null){
      let updateObj = {
        id:null,
        controlId:null,
        assignUserId:null,
        remark:"",
        taskStatus:"",
        approved:null,
        taskDate:null,
        taskCompletedDate:null,
        reportUrl:null,
        taskDataImageList:null
      }
  
      updateObj.id = this.taskDetailData.id;
      updateObj.controlId = this.taskDetailData.controlId;
      updateObj.assignUserId = this.taskDetail.assignUserId;
      updateObj.remark = this.taskDetail.remark;
      updateObj.taskStatus = this.statusSelected;
      updateObj.approved = this.taskDetailData.approved
      updateObj.taskDate = this.taskDetail.startDate;
      updateObj.taskCompletedDate = this.taskDetail.endDate;
      updateObj.reportUrl = this.taskDetail.urlName;
      updateObj.taskDataImageList = this.taskImageListArray;
      this.taskService.updateTask(updateObj).subscribe(
        (data) => {
          this.toastrService.success("Updated successfully");
          this.activeModel.close(true);
        },
        (error) => {}
  
      );
  
    }
    else{
      this.toastrService.warning("Select Status");
    }
  }
}
