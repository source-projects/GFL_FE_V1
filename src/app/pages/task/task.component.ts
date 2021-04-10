import { Component, NgModule, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskService } from "../../@theme/services/task.service";
import { TaskGuard } from "../../@theme/guards/task.guard";
import { AddEditTaskComponent } from "./add-edit-task/add-edit-task.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { CommonService } from "../../@theme/services/common.service";
import { result } from "lodash";
import { CardComponent } from "@swimlane/ngx-charts";
import { ToastrService } from "ngx-toastr";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "ngx-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {

  assignFlagForDetails:boolean = false;

  hiddenAdd: boolean = true;
  hiddenEdit: boolean = true;
  hiddenDelete: boolean = true;

  //card Status Flag
  allFlag: boolean = true;
  assignFlag: boolean = false;
  completedFlag: boolean = false;
  approvedFlag: boolean = false;
  notApprovedFlag: boolean = false;
  blockerFlag: boolean = false;

  //task card detail according to status
  allCardDetail: any[] = [];
  assignCardDetail: any[] = [];
  completedCardDetail: any[] = [];
  approvedCardDetail: any[] = [];
  notApprovedCardDetail: any[] = [];
  blockerCardDetail: any[] = [];

  //Card Count
  allCardCount = 0;
  assignedCardCount = 0;
  completedCardCount = 0;
  approvedCardCount = 0;
  notApprovedCardCount = 0;
  blockerCardCount = 0;

  //filter Date
  filterDate;

  constructor(
    private modalService: NgbModal,
    private taskGuard: TaskGuard,
    private taskService: TaskService,
    private commonService: CommonService,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
    this.getAccess();
    this.recallAllCardDetail();
  }

  //to recall all card details
  recallAllCardDetail() {
    this.getAllCardDetail();
    this.getAssignCardDetail();
    this.getCompletetedList();
    this.getBlockerList();
    this.getApprovedList();
    this.getNotApprovedList();
  }

  getAccess() {
    if (this.taskGuard.accessRights("add")) {
      this.hiddenAdd = false;
    }
    if (this.taskGuard.accessRights("delete")) {
      this.hiddenDelete = false;
    }
    if (this.taskGuard.accessRights("edit")) {
      this.hiddenEdit = false;
    }
  }

  openAddTaskComponent() {
    const modalRef = this.modalService.open(AddEditTaskComponent, {
      size: "lg",
    });
    modalRef.result.then((result) => {
      if(result){
        this.recallAllCardDetail();
      }
    }).catch((err) => {});
  }
  openDetail(id,type) {
    this.assignFlagForDetails = false;
  if(type == "assign")
  {
    this.assignFlagForDetails = true
  }
    const modelref = this.modalService.open(TaskDetailComponent);
    modelref.componentInstance.taskId = id;
    modelref.componentInstance.assign = this.assignFlagForDetails;
  }

  showCardAccordingToStatus(value) {
    switch (value) {
      case "all":
        this.allFlag = true;
        this.assignFlag = false;
        this.completedFlag = false;
        this.approvedFlag = false;
        this.notApprovedFlag = false;
        this.blockerFlag = false;
        break;
      case "assign":
        this.allFlag = false;
        this.assignFlag = true;
        this.completedFlag = false;
        this.approvedFlag = false;
        this.notApprovedFlag = false;
        this.blockerFlag = false;
        break;
      case "complete":
        this.allFlag = false;
        this.assignFlag = false;
        this.completedFlag = true;
        this.approvedFlag = false;
        this.notApprovedFlag = false;
        this.blockerFlag = false;
        break;
      case "approved":
        this.allFlag = false;
        this.assignFlag = false;
        this.completedFlag = false;
        this.approvedFlag = true;
        this.notApprovedFlag = false;
        this.blockerFlag = false;
        break;
      case "notApproved":
        this.allFlag = false;
        this.assignFlag = false;
        this.completedFlag = false;
        this.approvedFlag = false;
        this.notApprovedFlag = true;
        this.blockerFlag = false;
        break;
      case "blocker":
        this.allFlag = false;
        this.assignFlag = false;
        this.completedFlag = false;
        this.approvedFlag = false;
        this.notApprovedFlag = false;
        this.blockerFlag = true;
        break;
    }
  }

  //clear Filter date
  clearDate(value) {
    this.filterDate = "";
    switch (value) {
      case "all":
        this.getAllCardDetail();
        break;

      case "assign":
        this.getAssignCardDetail();
        break;

      case "complete":
        this.getCompletetedList();
        break;

      case "blocker":
        this.getBlockerList();
        break;

      case "approve":
        this.getApprovedList();
        break;

      case "notApprove":
        this.getNotApprovedList();
        break;
    }
  }

  //filter Data according to date
  filteredCardDetailByDate(event, value) {
    switch (value) {
      //filter card for assign status
      case "assign":
        let assignCardDetailWithStatus: any[] = [];
        //not Started status task card
        let assignDateStatusObj = [
          {
            date: event.target.value,
            status: "NotStarted",
            id:null,

          },
          {
            date: event.target.value,
            status: "Running",
            id:null,

          },
          {
            date: event.target.value,
            status: "Hold",
            id:null,

          },
        ];
        assignDateStatusObj.forEach((element, index) => {
          this.taskService
            .getDataAccordingToStatus(element)
            .subscribe((data) => {
              if (assignCardDetailWithStatus) {
                assignCardDetailWithStatus = data["data"];
              } else {
                assignCardDetailWithStatus.concat(data["data"]);
              }
              console.log(element.status, data["data"]);
              console.log(index, assignCardDetailWithStatus);
              this.assignCardDetail = assignCardDetailWithStatus;
              console.log("filter assign", this.assignCardDetail);
            });
        });

        break;

      //filter task card for complete status
      case "complete":
        let completeDateStatusObj = {
          date: event.target.value,
          status: "Completed",
          id:null,

        };
        this.taskService
          .getDataAccordingToStatus(completeDateStatusObj)
          .subscribe((data) => {
            console.log("complete filter", data["data"]);
            this.completedCardDetail = data["data"];
          });
        break;

      //filter task card for blocker
      case "blocker":
        let blockerDaeStatusObj = {
          date: event.target.value,
          status: "Blocker",
          id:null,

        };
        this.taskService
          .getDataAccordingToStatus(blockerDaeStatusObj)
          .subscribe((data) => {
            console.log("blocker filter", data["data"]);
            this.blockerCardDetail = data["data"];
          });
        break;
      //filter task card for all
      case "all":
        let allDateStatusObj = {
          date: event.target.value,
          status: "",
          id:null,
        };
        this.taskService
          .getDataAccordingToStatus(allDateStatusObj)
          .subscribe((data) => {
            console.log("all filter", data["data"]);
            this.allCardDetail = data["data"];
          });
        break;

        case "approve":
          let approveDateStatusObj = {
            date: event.target.value,
            status: "Approved",
            id:null,
          };
          this.taskService
            .getDataAccordingToStatus(approveDateStatusObj)
            .subscribe((data) => {
              console.log("approve filter", data["data"]);
              this.approvedCardDetail = data["data"];
            });
          break;

          case "notApprove":
          let notApproveDateStatusObj = {
            date: event.target.value,
            status: "Not Approved",
            id:null,
          };
          this.taskService
            .getDataAccordingToStatus(notApproveDateStatusObj)
            .subscribe((data) => {
              console.log("Not approve filter", data["data"]);
              this.approvedCardDetail = data["data"];
            });
          break;
    }
  }

  getAllCardDetail() {
    this.allCardCount = 0;
    this.taskService
      .getAllTaskCard(this.commonService.getUser().userId)
      .subscribe(
        (data) => {
          this.allCardDetail = data["data"];
          if(this.allCardDetail){
          this.allCardCount = this.allCardDetail.length;
          }
        
        },
        (error) => {}
      );
  }

  getAssignCardDetail() {
    this.assignedCardCount = 0;
    this.taskService
      .getAssignCard(this.commonService.getUser().userId)
      .subscribe(
        (data) => {
          this.assignCardDetail = data["data"];
          if(this.assignCardDetail){
          this.assignedCardCount = this.assignCardDetail.length;
          }
         
        },
        (error) => {}
      );
  }
  getCompletetedList() {
    this.completedCardCount = 0;
    let completedateStatusObj = {
      date: "",
      status: "Completed",
    };
    this.taskService
      .getDataAccordingToStatus(completedateStatusObj)
      .subscribe((data) => {
        this.completedCardDetail = data["data"];
        if(this.completedCardDetail){
        this.completedCardCount = this.completedCardDetail.length;
        }
        
      });
  }

  getBlockerList() {
    this.blockerCardCount = 0;
    let blockerDateStatusObj = {
      date: "",
      status: "Blocker",
    };
    this.taskService
      .getDataAccordingToStatus(blockerDateStatusObj)
      .subscribe((data) => {
        this.blockerCardDetail = data["data"];
        if(this.blockerCardCount){
          this.blockerCardCount = this.blockerCardDetail.length;
        }
      
      });
  }

  getApprovedList() {
    this.approvedCardCount = 0;
    this.taskService
      .getApprovedAndNotApprovedList(this.commonService.getUser().userId, true)
      .subscribe((data) => {
        this.approvedCardDetail = data["data"];
        if(this.approvedCardDetail){
          this.approvedCardCount = this.approvedCardDetail.length;
        }
       
      });
  }

  getNotApprovedList() {
    this.notApprovedCardCount = 0;
    this.taskService
      .getApprovedAndNotApprovedList(this.commonService.getUser().userId, false)
      .subscribe((data) => {
        this.notApprovedCardDetail = data["data"];
        if(this.notApprovedCardDetail){
          this.notApprovedCardCount = this.notApprovedCardDetail.length;
        }
       
      });
  }

  onApprove(id){
    this.taskService
    .changeStatus(id, true)
    .subscribe((data) => {
      if(data["success"]){
        this.toastr.success("Task approved successfully");
        this.getApprovedList();
        this.getNotApprovedList();
      }
    });
  }

  deleteTask(id , type){
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
    this.taskService.deleteTask(id).subscribe(
    (data) => {
      if(data["success"]){
        this.toastr.success("Task deleted successfully");
        if(type == 'all'){
          this.getAllCardDetail();
        }else if(type == 'assign'){
          this.getAssignCardDetail();
          
        }else if(type == 'approve'){
          this.getApprovedList();
          
        }else if(type == 'notApprove'){
          this.getNotApprovedList();
          
        }
        else if(type == 'complete'){
          this.getCompletetedList();
          
        }else if(type == 'block'){
          this.getBlockerList();
          
        }
      }
    },
    (error) => {}
    )
  }
})
  }
}
