import * as errorData from "../../@theme/json/error.json";
import {
  AddJet,
  AddCompany,
  AddDesignation,
  ApproveBy,
  AddDepartment,
} from "../../@theme/model/admin";
import { AdminService } from "../../@theme/services/admin.service";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  addJet: AddJet = new AddJet();
  addCompany: AddCompany = new AddCompany();
  addDepartment: AddDepartment = new AddDepartment();
  addDesignation: AddDesignation = new AddDesignation();
  approveBy: ApproveBy = new ApproveBy();

  addJetArray: AddJet[] = [];
  addCompanyArray: AddCompany[] = [];
  adddesignationArray: AddDesignation[] = [];
  approveByArray: ApproveBy[] = [];

  jetList = [];
  designationList = [];
  companyList = [];
  departmentList = [];
  approveByList = [];

  formSubmitted: boolean = false;
  loading = false;
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private modalService: NgbModal
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
    this.getAllDepartment();
    this.getAllDesignationData();
  }

  getAllJetData() {
    this.adminService.getAllJetData().subscribe(
      (data) => {
        if (data["success"]) {
          this.jetList = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getAllCompanyData() {
    this.adminService.getAllCompanyData().subscribe(
      (data) => {
        if (data["success"]) {
          this.companyList = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getAllDesignationData() {
    this.adminService.getAllDesignation().subscribe(
      (data) => {
        if (data["success"]) {
          this.designationList = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getAllApproveByData() {
    this.adminService.getAllApproveByData().subscribe(
      (data) => {
        if (data["success"]) {
          this.approveByList = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onCancel() {
    this.addJet = null;
    this.addDesignation = null;
    this.addDepartment = null;
    this.addCompany = null;
    this.approveBy = null;
  }

  saveJet() {
    this.formSubmitted = true;

    this.adminService.saveJetData(this.addJet).subscribe(
      (data) => {
        if (data["success"]) {
          this.toastr.success(errorData.Add_Success);
          this.getAllJetData();
          this.addJet.name = null;
          this.addJet.capacity = null;
          this.addJet.liquorRatio = null;
          // this.route.navigate(["/pages/admin"]);
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
  saveApproveBy() {
    this.formSubmitted = true;

    this.adminService.saveApproveByData(this.approveBy).subscribe(
      (data) => {
        if (data["success"]) {
          // this.currentParty = data["data"];
          // this.route.navigate(["pages/party"]);
          this.toastr.success(errorData.Add_Success);
          this.getAllApproveByData();
          this.approveBy.name = null;
          this.approveBy.email = null;
          this.approveBy.contact = null;
        } else {
          this.toastr.error(errorData.Add_Error);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }
  saveDesignation() {
    this.formSubmitted = true;

    this.adminService.saveDesignationData(this.addDesignation).subscribe(
      (data) => {
        if (data["success"]) {
          // this.currentParty = data["data"];
          // this.route.navigate(["pages/party"]);
          this.toastr.success(errorData.Add_Success);
          this.getAllDesignationData();
          this.addDesignation.designation = null;
        } else {
          this.toastr.error(errorData.Add_Error);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }
  saveCompany() {
    this.formSubmitted = true;

    this.adminService.saveCompanyData(this.addCompany).subscribe(
      (data) => {
        if (data["success"]) {
          // this.currentParty = data["data"];
          // this.route.navigate(["pages/party"]);
          this.toastr.success(errorData.Add_Success);
          this.getAllCompanyData();
          this.addCompany.name = null;
        } else {
          this.toastr.error(errorData.Add_Error);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  saveDepartment() {
    this.formSubmitted = true;
    this.adminService.addDepartment(this.addDepartment).subscribe(
      (data) => {
        if (data["success"]) {
          this.toastr.success(errorData.Add_Success);
          this.getAllDepartment();
          this.addDepartment.name = null;
        }
      },
      (error) => {}
    );
  }

  getAllDepartment() {
    this.adminService.getAllDepartmentData().subscribe(
      (data) => {
        if (data["success"]) {
          this.departmentList = data["data"];
        }
      },
      (error) => {}
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
            this.toastr.success(errorData.Delete);
            this.getAllJetData();
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
            this.getAllDesignationData();
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
        this.adminService.deleteCompanyById(id).subscribe(
          (data) => {
            //this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
            this.getAllCompanyData();
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  removeDepartment(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.adminService.deleteDepartmentById(id).subscribe(
          (data) => {
            //this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
            this.getAllDepartment();
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
        this.adminService.deleteApproveById(id).subscribe(
          (data) => {
            //this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
            this.getAllApproveByData();
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }
}
