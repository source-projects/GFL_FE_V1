import * as errorData from "../../@theme/json/error.json";
import {
  AddJet,
  AddCompany,
  AddDesignation,
  ApproveBy,
  AddDepartment,
  AddMachine,
  AddMachineCategory,
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
  addMachine: AddMachine = new AddMachine();
  addMachineCategory: AddMachineCategory = new AddMachineCategory();
  addJetArray: AddJet[] = [];
  addCompanyArray: AddCompany[] = [];
  adddesignationArray: AddDesignation[] = [];
  approveByArray: ApproveBy[] = [];
  addMachineArray: AddMachine[] = [];
  addMachineCategoryArray: AddMachineCategory[] = [];
  jetList = [];
  designationList = [];
  companyList = [];
  departmentList = [];
  approveByList = [];
  machineList = [];
  machineCategoryList = [];

  formSubmitted: boolean = false;
  loading = false;
  jetEditFlag = false;
  companyEditFlag = false;
  departmentEditFlag = false;
  designationEditFlag = false;
  approveByEditFlag = false;
  machineEditFlag = false;
  machineCategoryEditFlag = false;
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.addJetArray.push(this.addJet);
    this.addCompanyArray.push(this.addCompany);
    this.adddesignationArray.push(this.addDesignation);
    this.approveByArray.push(this.approveBy);
    this.addMachineArray.push(this.addMachine);
    this.addMachineCategoryArray.push(this.addMachineCategory);
  }

  ngOnInit(): void {
    this.getAllJetData();
    this.getAllApproveByData();
    this.getAllCompanyData();
    this.getAllDepartment();
    this.getAllDesignationData();
    this.getAllMachineData();
    this.getAllMachineCategoryData();
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

  getAllMachineData() {
    this.adminService.getAllMachine().subscribe(
      (data) => {
        if (data["success"]) {
          this.machineList = data["data"];
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

  getAllMachineCategoryData() {
    this.adminService.getAllMachineCategory().subscribe(
      (data) => {
        if (data["success"]) {
          this.machineCategoryList = data["data"];
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

  saveJet(addJetData) {
    this.formSubmitted = true;
    if (addJetData.valid) {
      if (this.jetEditFlag == true) {
        this.adminService.updateJetData(this.addJet).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Update_Success);
              this.getAllJetData();
              this.onCancelJet();
              this.formSubmitted = false;

            } else {
              this.toastr.error(errorData.Update_Error);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      } else {
        this.adminService.saveJetData(this.addJet).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Add_Success);
              this.getAllJetData();
              this.onCancelJet();
              this.formSubmitted = false;
              Object.keys(addJetData.controls).forEach((field) => {
                addJetData.controls[field].reset();
              });
            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    } else {
      // this.formSubmitted = false;
      return;
    }
  }

  saveMachine(addMachineData) {
    this.formSubmitted = true;
    if (addMachineData.valid) {
      if (this.machineEditFlag == true) {
      } else {
        this.adminService.saveMachine(this.addMachine).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Add_Success);
              this.getAllMachineData();
              this.resetValue(addMachineData);
              this.formSubmitted = false;

            } else {
              this.toastr.error(errorData.Add_Error);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    } else {
      // this.formSubmitted = false;
      return;
    }
  }

  saveMachineCategory(addMachineCategoryData) {
    this.formSubmitted = true;
    if (addMachineCategoryData.valid) {
      if (this.machineCategoryEditFlag == true) {
      } else {
        this.adminService
          .saveMachineCategory(this.addMachineCategory)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.toastr.success(errorData.Add_Success);
                this.getAllMachineCategoryData();
                this.resetValue(addMachineCategoryData);
                this.formSubmitted = false;
              } else {
                this.toastr.error(errorData.Add_Error);
              }
            },
            (error) => {
              this.toastr.error(errorData.Serever_Error);
            }
          );
      }
    } else {
      return;
    }
  }

  saveApproveBy(addApproveByData) {
    this.formSubmitted = true;
    if (addApproveByData.valid) {
      if (this.approveByEditFlag == true) {
        this.adminService.updateApproveByData(this.approveBy).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Update_Success);
              this.getAllApproveByData();
              this.onCancelApproveBy();
              this.resetValue(addApproveByData);
                    this.formSubmitted = false;

            } else {
              this.toastr.error(errorData.Update_Error);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
        this.approveByEditFlag = false;
      } else {
        this.adminService.saveApproveByData(this.approveBy).subscribe(
          (data) => {
            if (data["success"]) {
              // this.currentParty = data["data"];
              // this.route.navigate(["pages/party"]);
              this.toastr.success(errorData.Add_Success);
              this.getAllApproveByData();
              this.resetValue(addApproveByData);
                    this.formSubmitted = false;

            } else {
              this.toastr.error(errorData.Add_Error);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    } else {
      // this.formSubmitted = false;
      return;
    }
  }
  saveDesignation(addDesignationData) {
    this.formSubmitted = true;
    if (addDesignationData.valid) {
      if (this.designationEditFlag == true) {
        this.adminService.updateDesigntationData(this.addDesignation).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Update_Success);
              this.getAllDesignationData();
              this.onCancelDesignation();
              this.resetValue(addDesignationData);
              this.formSubmitted = false;

            } else {
              this.toastr.error(errorData.Update_Error);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      } else {
        this.adminService.saveDesignationData(this.addDesignation).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Add_Success);
              this.getAllDesignationData();
              this.resetValue(addDesignationData);
            } else {
              this.toastr.error(errorData.Add_Error);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    } else {
      // this.formSubmitted = false;
      return;
    }
  }
  saveCompany(addCompanyData) {
    this.formSubmitted = true;
    if (addCompanyData.valid) {
      if (this.companyEditFlag == true) {
        this.adminService.updateCompanyData(this.addCompany).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Update_Success);
              this.getAllCompanyData();
              this.onCancelCompany();
              this.formSubmitted = false;
              Object.keys(addCompanyData.controls).forEach((field) => {
                addCompanyData.controls[field].reset();
              });
            } else {
              this.toastr.error(errorData.Update_Error);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      } else {
        this.adminService.saveCompanyData(this.addCompany).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Add_Success);
              this.getAllCompanyData();
              this.formSubmitted = false;
              Object.keys(addCompanyData.controls).forEach((field) => {
                addCompanyData.controls[field].reset();
              });
            } else {
              this.toastr.error(errorData.Add_Error);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    } else {
      // this.formSubmitted = false;
      return;
    }
  }

  saveDepartment(addDepartmentData) {
    this.formSubmitted = true;
    if (addDepartmentData.valid) {
      if (this.departmentEditFlag == true) {
        this.adminService.updateDepartmentData(this.addDepartment).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Update_Success);
              this.getAllDepartment();
              this.onCancelDepartment();
              this.resetValue(addDepartmentData);
              this.formSubmitted = false;

            }
          },
          (error) => {}
        );
      } else {
        this.adminService.addDepartment(this.addDepartment).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Add_Success);
              this.getAllDepartment();
              this.resetValue(addDepartmentData);
            }
          },
          (error) => {}
        );
      }
    } else {
      // this.formSubmitted = false;
      return;
    }
  }

  resetValue(FormName) {
    this.formSubmitted = false;
    Object.keys(FormName.controls).forEach((field) => {
      FormName.controls[field].reset();
    });
  }
  onCancelJet() {
    this.addJet.id = null;
    this.addJet.name = null;
    this.addJet.capacity = null;
    this.addJet.liquorRatio = null;
    this.jetEditFlag = false;
  }
  onCancelCompany() {
    this.addCompany.id = null;
    this.addCompany.name = null;
    this.companyEditFlag = false;
  }
  onCancelDepartment() {
    this.addDepartment.id = null;
    this.addDepartment.name = null;
    this.departmentEditFlag = false;
  }
  onCancelDesignation() {
    this.addDesignation.id = null;
    this.addDesignation.designation = null;
    this.designationEditFlag = false;
  }
  onCancelMachine() {
    this.addMachine.machineName = null;
    this.addMachine.controlId = null;
    this.machineEditFlag = false;
  }
  onCancelMachineCategory() {
    this.addMachineCategory.id = null;
    this.addMachineCategory.name = null;
    this.machineCategoryEditFlag = false;
  }
  onCancelApproveBy() {
    this.approveBy.id = null;
    this.approveBy.name = null;
    this.approveBy.email = null;
    this.approveBy.contact = null;
    this.approveByEditFlag = false;
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

  removeMachine(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.adminService.deleteMachine(id).subscribe(
          (data) => {
            //this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
            this.getAllMachineData();
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }
  removeMachineCategory(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.adminService.deleteMachineCategory(id).subscribe(
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
  getjetEdit(id1) {
    this.jetEditFlag = true;
    this.jetList.forEach((element) => {
      if (element.id == id1) {
        this.addJet.id = element.id;
        this.addJet.name = element.name;
        this.addJet.capacity = element.capacity;
        this.addJet.liquorRatio = element.liquorRatio;
      }
    });
  }
  getcompanyEdit(id) {
    this.companyEditFlag = true;
    this.companyList.forEach((element) => {
      if (element.id == id) {
        this.addCompany.id = element.id;
        this.addCompany.name = element.name;
      }
    });
  }
  getMachineEdit(id) {
    this.machineEditFlag = true;
    this.machineList.forEach((element) => {
      if (element.controlId == id) {
        this.addMachine.controlId = element.controlId;
        this.addMachine.machineName = element.machineName;
      }
    });
  }
  getMachineCategoryEdit(id) {
    this.machineCategoryEditFlag = true;
    this.machineCategoryList.forEach((element) => {
      if (element.id == id) {
        this.addMachineCategory.id = element.id;
        this.addMachineCategory.name = element.name;
      }
    });
  }
  getdepartmentEdit(id) {
    this.departmentEditFlag = true;
    this.departmentList.forEach((element) => {
      if (element.id == id) {
        this.addDepartment.id = element.id;
        this.addDepartment.name = element.name;
      }
    });
  }
  getdesignationEdit(id) {
    this.designationEditFlag = true;
    this.designationList.forEach((element) => {
      if (element.id == id) {
        this.addDesignation.id = element.id;
        this.addDesignation.designation = element.designation;
      }
    });
  }
  getapproveByEdit(id) {
    this.approveByEditFlag = true;
    this.approveByList.forEach((element) => {
      if (element.id == id) {
        this.approveBy.id = element.id;
        this.approveBy.name = element.name;
        this.approveBy.email = element.email;
        this.approveBy.contact = element.contact;
      }
    });
  }
}
