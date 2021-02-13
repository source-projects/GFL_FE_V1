import { Component, OnInit } from '@angular/core';
import {AddJet , AddCompany, AddDesignation, ApproveBy} from 'app/@theme/model/admin';
import { AdminService } from 'app/@theme/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from "app/@theme/json/error.json";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  addJet: AddJet = new AddJet();
  addCompany: AddCompany = new AddCompany();
  addDesignation: AddDesignation = new AddDesignation();
  approveBy: ApproveBy = new ApproveBy();

  addJetArray: AddJet[] = [];
  addCompanyArray :AddCompany[]=[];
  adddesignationArray : AddDesignation[]=[];
  approveByArray : ApproveBy[]=[];

  jetList=[];
  designationList=[];
  companyList=[];
  approveByList=[];


  formSubmitted: boolean = false;
  loading = false;
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private route: Router,

    

  ) {
    this.addJetArray.push(this.addJet);
    this.addCompanyArray.push(this.addCompany);
    this.adddesignationArray.push(this.addDesignation);
    this.approveByArray.push(this.approveBy);
   }

 


  ngOnInit(): void {
   this.getAllJetData();
   this.getAllApproveByData();
   this.getAllCompanyData();
   this.getAllDesignationData();
  }

  getAllJetData(){
    this.adminService.getAllJetData().subscribe(
      (data) => {
        if(data["success"]){
          this.jetList = data["data"];
          this.loading = false;
        }else{
          this.loading = false;
        }

      },(error) => {
        this.loading = false;

      }
    )
  }

  getAllCompanyData(){
    this.adminService.getAllCompanyData().subscribe(
      (data) => {
        if(data["success"]){
          this.companyList = data["data"];
          this.loading = false;
        }else{
          this.loading = false;
        }

      },(error) => {
        this.loading = false;

      }
    )
  }

  getAllDesignationData(){
    this.adminService.getAllDesignation().subscribe(
      (data) => {
        if(data["success"]){
          this.designationList = data["data"];
          this.loading = false;
        }else{
          this.loading = false;
        }

      },(error) => {
        this.loading = false;

      }
    )
  }

  getAllApproveByData(){
    this.adminService.getAllApproveByData().subscribe(
      (data) => {
        if(data["success"]){
          this.approveByList = data["data"];
          this.loading = false;
        }else{
          this.loading = false;
        }

      },(error) => {
        this.loading = false;

      }
    )
  }

  onCancel(){
    this.addJet = null;
    this.addDesignation = null;
    this.addCompany = null;
    this.approveBy = null;

  }

 saveJet(){
  this.formSubmitted = true;

    this.adminService.saveJetData(this.addJet).subscribe(
        (data) => {
          if (data["success"]) {
            // this.currentParty = data["data"];
            // this.route.navigate(["pages/party"]);
            this.toastr.success(errorData.Add_Success);
            this.getAllJetData();
            this.route.navigate(["/pages/admin"]);
            //this.addJet


          } else {
            this.toastr.error(errorData.Add_Error);
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
  }
  saveApproveBy(){
    this.formSubmitted = true;

    this.adminService.saveApproveByData(this.approveBy).subscribe(
        (data) => {
          if (data["success"]) {
            // this.currentParty = data["data"];
            // this.route.navigate(["pages/party"]);
            this.toastr.success(errorData.Add_Success);
            this.getAllApproveByData();

          } else {
            this.toastr.error(errorData.Add_Error);
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );

  }
saveDesignation(){
  this.formSubmitted = true;

    this.adminService.saveDesignationData(this.addDesignation).subscribe(
        (data) => {
          if (data["success"]) {
            // this.currentParty = data["data"];
            // this.route.navigate(["pages/party"]);
            this.toastr.success(errorData.Add_Success);
            this.getAllDesignationData();

          } else {
            this.toastr.error(errorData.Add_Error);
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );

}
saveCompany(){
  this.formSubmitted = true;

    this.adminService.saveCompanyData(this.addCompany).subscribe(
        (data) => {
          if (data["success"]) {
            // this.currentParty = data["data"];
            // this.route.navigate(["pages/party"]);
            this.toastr.success(errorData.Add_Success);
            this.getAllCompanyData();

          } else {
            this.toastr.error(errorData.Add_Error);
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
  
}
  removeJet(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.adminService.deleteJetById(id).subscribe(
          (data) => {
            //this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  removeDesignation(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.adminService.deleteDesignationById(id).subscribe(
          (data) => {
            //this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  removeCompany(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.adminService.deleteJetById(id).subscribe(
          (data) => {
            //this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  removeApproveBy(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.adminService.deleteJetById(id).subscribe(
          (data) => {
            //this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }



}
