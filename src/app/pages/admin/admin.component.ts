import * as errorData from "../../@theme/json/error.json";
import {
  AddJet,
  AddCompany,
  AddDesignation,
  ApproveBy,
  AddDepartment,
  AddMachine,
  AddMachineCategory,
  AddQuality,
  AddInvoiceSequence,
  AddBatchSequence,
  ReceiveBy,
  AddApproveReceive,
} from "../../@theme/model/admin";
import { AdminService } from "../../@theme/services/admin.service";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AdminGuard } from "../../@theme/guards/admin.guard";
import { PurchaseNewService } from "../../@theme/services/purchase-new.service";
import { PreviewComponent } from "./preview/preview.component";

@Component({
  selector: "ngx-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  addJet: AddJet = new AddJet();
  addCompany: AddCompany = new AddCompany();
  addDepartment: AddDepartment = new AddDepartment();
  addQuality: AddQuality = new AddQuality();
  addDesignation: AddDesignation = new AddDesignation();
  approveBy: ApproveBy = new ApproveBy();
  receiveBy: ReceiveBy = new ReceiveBy();
  addApproveReceive: AddApproveReceive = new AddApproveReceive();
  addMachine: AddMachine = new AddMachine();
  addMachineCategory: AddMachineCategory = new AddMachineCategory();
  addInvoiceSequence: AddInvoiceSequence = new AddInvoiceSequence();
  addBatchSequence: AddBatchSequence = new AddBatchSequence();
  addJetArray: AddJet[] = [];
  addCompanyArray: AddCompany[] = [];
  adddesignationArray: AddDesignation[] = [];
  approveByArray: ApproveBy[] = [];
  receiveByArray: ReceiveBy[] = [];
  addApproveRecieveArray: AddApproveReceive[] = [];
  addMachineArray: AddMachine[] = [];
  addMachineCategoryArray: AddMachineCategory[] = [];
  addQualityArray: AddQuality[] = [];
  addInvoiceSequenceArray: AddInvoiceSequence[] = [];
  addBatchSequenceArray: AddBatchSequence[] = [];

  jetList = [];
  designationList = [];
  companyList = [];
  departmentList = [];
  approveByList = [];
  receiveByList = [];
  approveReceiveByList = [];
  machineList = [];
  purchaseList = [];
  machineCategoryList = [];
  qualityList = [];
  invoiceSequenceList = [];
  batchSequenceList = [];
  billList = [];
  materialList = [];
  billImages = [];
  materialImages = [];
  formSubmitted: boolean = false;
  loading = false;
  jetEditFlag = false;
  companyEditFlag = false;
  departmentEditFlag = false;
  designationEditFlag = false;
  approveByEditFlag = false;
  receiveByEditFlag = false;
  approveReceiveByEditFlag = false;
  sequenceByEditFlag = false;
  batchsequenceByEditFlag = false;
  machineEditFlag = false;
  qualityEditFlag = false;
  machineCategoryEditFlag = false;
  saveHidden = true;
  batchSaveHidden = true;
  disabled = false;
  hiddenEdit = false;
  batchHiddenEdit = false;
  hiddenDelete = false;
  approved = false;

  ApprovedFlag: boolean = false;
  RecieveFlag: boolean = false;

  items = [
    {
      id: "approve",
      name: "Approved By",
    },
    {
      id: "receive",
      name: "Recieved By",
    },
  ];
  selectedBy;
  constructor(
    private adminService: AdminService,
    private purchseService: PurchaseNewService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private adminGuard: AdminGuard
  ) {
    this.addJetArray.push(this.addJet);
    this.addCompanyArray.push(this.addCompany);
    this.adddesignationArray.push(this.addDesignation);
    this.approveByArray.push(this.approveBy);
    this.receiveByArray.push(this.receiveBy);
    this.addMachineArray.push(this.addMachine);
    this.addMachineCategoryArray.push(this.addMachineCategory);
    this.addQualityArray.push(this.addQuality);
  }

  ngOnInit(): void {
    // this.getAllJetData();
    //  this.getAllApproveByData();
    // this.getAllCompanyData();
    //  this.getAllDepartment();
    // this.getAllQuality();
    // this.getAllDesignationData();
    // this.getAllMachineData();
    // this.getAllMachineCategoryData();
    // this.getAddAcess();
    // this.getDeleteAccess();
    // this.getEditAccess();
    // this.getAllInvoiceSequenceData();
    // this.getAllBatchSequenceData();
    // this.getAllReceiveByData();
    // this.getAllPurchaseData();
    // this.getAllApproveReceiveByData();
  }

  onTabClick(tabTitle) {
    switch (tabTitle) {
      case "Jet":
        this.getAllJetData();
        break;

      case "Company":
        this.getAllCompanyData();
        break;

      case "Department":
        this.getAllDepartment();
        break;

      case "Quality":
        this.getAllQuality();
        break;

      case "Machine":
        this.getAllMachineData();
        break;

      case "Machine Category":
        this.getAllMachineCategoryData();
        break;

      case "Designation":
        this.getAllDesignationData();
        break;

      case "Authorized":
        this.getAllApproveReceiveByData();
        break;

      case "Sequence":
        this.getAllInvoiceSequenceData();
        this.getAllBatchSequenceData();
        break;

      case "Purchase":
        this.getAllPurchaseData();
        break;
    }
  }

  getAddAcess() {
    if (this.adminGuard.accessRights("add")) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  getDeleteAccess() {
    if (this.adminGuard.accessRights("delete")) {
      this.hiddenDelete = false;
    } else {
      this.hiddenDelete = true;
    }
  }

  getEditAccess() {
    if (this.adminGuard.accessRights("edit")) {
      this.hiddenEdit = false;
    } else {
      this.hiddenEdit = true;
    }
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

  getAllPurchaseData() {
    this.purchaseList = [];
    this.purchseService.updateStatus(this.approved).subscribe(
      (data) => {
        if (data["success"]) {
          this.purchaseList = data["data"];
          this.purchaseList.forEach((element, i) => {
            let tempBill = [];
            let tempMaterial = [];
            element.materialPhotosList.forEach((ele) => {
              if (ele.type == "bill") {
                tempBill.push(ele);
              } else {
                tempMaterial.push(ele);
              }
            });
            this.billImages[i] = tempBill;
            this.materialImages[i] = tempMaterial;
          });

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

  getAllApproveReceiveByData() {
    this.adminService.getAllApproveReceiveData().subscribe(
      (data) => {
        if (data["success"]) {
          this.approveReceiveByList = data["data"];
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

  // getAllApproveByData() {
  //   this.adminService.getAllApproveByData().subscribe(
  //     (data) => {
  //       if (data["success"]) {
  //         this.approveByList = data["data"];
  //         this.loading = false;
  //       } else {
  //         this.loading = false;
  //       }
  //     },
  //     (error) => {
  //       this.loading = false;
  //     }
  //   );
  // }

  // getAllReceiveByData() {
  //   this.adminService.getAllReceiveByData().subscribe(
  //     (data) => {
  //       if (data["success"]) {
  //         this.receiveByList = data["data"];
  //         this.loading = false;
  //       } else {
  //         this.loading = false;
  //       }
  //     },
  //     (error) => {
  //       this.loading = false;
  //     }
  //   );
  // }

  getAllInvoiceSequenceData() {
    this.adminService.getAllInvoiceSequence().subscribe(
      (data) => {
        if (data["success"]) {
          this.addInvoiceSequence.sequence = data["data"]["sequence"];
          this.addInvoiceSequence.id = data["data"]["id"];
          this.loading = false;
        } else {
          this.saveHidden = false;
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getAllBatchSequenceData() {
    this.adminService.getAllBatchSequence(false).subscribe(
      (data) => {
        if (data["success"]) {
          this.addBatchSequence.sequence = data["data"]["sequence"];
          this.addBatchSequence.id = data["data"]["id"];
          this.loading = false;
        } else {
          this.batchSaveHidden = false;
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

  getAllQuality() {
    this.adminService.getAllQualityData().subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"];
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
      return;
    }
  }

  saveMachine(addMachineData) {
    this.formSubmitted = true;
    if (addMachineData.valid) {
      if (this.machineEditFlag == true) {
        this.adminService.updateMachine(this.addMachine).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Update_Success);
              this.getAllMachineData();
              this.resetValue(addMachineData);
              this.formSubmitted = false;
            } else {
              this.toastr.error(errorData.Update_Error);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
        this.machineEditFlag = false;
      } else {
        this.adminService.saveMachine(this.addMachine).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Add_Success);
              this.getAllMachineData();
              this.resetValue(addMachineData);
              this.formSubmitted = false;
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
      return;
    }
  }

  saveMachineCategory(addMachineCategoryData) {
    this.formSubmitted = true;
    if (addMachineCategoryData.valid) {
      if (this.machineCategoryEditFlag == true) {
        this.adminService
          .updateMachineCategory(this.addMachineCategory)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.toastr.success(errorData.Update_Success);
                this.getAllMachineCategoryData();
                this.resetValue(addMachineCategoryData);
                this.formSubmitted = false;
              } else {
                this.toastr.error(errorData.Update_Error);
              }
            },
            (error) => {
              this.toastr.error(errorData.Serever_Error);
            }
          );
        this.machineCategoryEditFlag = false;
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
                this.toastr.error(data["msg"]);
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

  saveApproveReceiveBy(addApproveReceivebyData) {
    this.formSubmitted = true;
    if (addApproveReceivebyData.valid) {
      if (this.approveReceiveByEditFlag == true) {
        this.adminService
          .updateApproveReceiveByData(this.addApproveReceive)
          .subscribe((data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Update_Success);
              this.getAllApproveReceiveByData();
              this.onCancelApproveReceiveBy();
              this.resetValue(addApproveReceivebyData);
              this.formSubmitted = false;
            } else {
              this.toastr.error(data["msg"]);
            }
          });
      } else {
        this.adminService
          .saveApproveReceiveByData(this.addApproveReceive)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.toastr.success(errorData.Add_Success);
                this.getAllApproveReceiveByData();
                this.resetValue(addApproveReceivebyData);
                this.formSubmitted = false;
              } else {
                this.toastr.error(data["msg"]);
              }
            },
            (error) => {
              this.toastr.error(errorData.Serever_Error);
            }
          );
      }
    }
  }

  // saveApproveBy(addApproveByData) {
  //   this.formSubmitted = true;
  //   if (addApproveByData.valid) {
  //     if (this.approveByEditFlag == true) {
  //       this.adminService.updateApproveByData(this.approveBy).subscribe(
  //         (data) => {
  //           if (data["success"]) {
  //             this.toastr.success(errorData.Update_Success);
  //             this.getAllApproveByData();
  //             this.onCancelApproveBy();
  //             this.resetValue(addApproveByData);
  //             this.formSubmitted = false;
  //           } else {
  //             this.toastr.error(data["msg"]);
  //           }
  //         },
  //         (error) => {
  //           this.toastr.error(errorData.Serever_Error);
  //         }
  //       );
  //       this.approveByEditFlag = false;
  //     } else {
  //       this.adminService.saveApproveByData(this.approveBy).subscribe(
  //         (data) => {
  //           if (data["success"]) {
  //             this.toastr.success(errorData.Add_Success);
  //             this.getAllApproveByData();
  //             this.resetValue(addApproveByData);
  //             this.formSubmitted = false;
  //           } else {
  //             this.toastr.error(data["msg"]);
  //           }
  //         },
  //         (error) => {
  //           this.toastr.error(errorData.Serever_Error);
  //         }
  //       );
  //     }
  //   } else {
  //     return;
  //   }
  // }

  // saveReceiveBy(addReceiveByData) {
  //   this.formSubmitted = true;
  //   if (addReceiveByData.valid) {
  //     if (this.receiveByEditFlag == true) {
  //       this.adminService.updateReceiveByData(this.receiveBy).subscribe(
  //         (data) => {
  //           if (data["success"]) {
  //             this.toastr.success(errorData.Update_Success);
  //             this.getAllReceiveByData();
  //             this.onCancelReceiveBy();
  //             this.resetValue(addReceiveByData);
  //             this.formSubmitted = false;
  //           } else {
  //             this.toastr.error(data["msg"]);
  //           }
  //         },
  //         (error) => {
  //           this.toastr.error(errorData.Serever_Error);
  //         }
  //       );
  //       this.receiveByEditFlag = false;
  //     } else {
  //       this.adminService.saveReceiveByData(this.receiveBy).subscribe(
  //         (data) => {
  //           if (data["success"]) {
  //             this.toastr.success(errorData.Add_Success);
  //             this.getAllReceiveByData();
  //             this.resetValue(addReceiveByData);
  //             this.formSubmitted = false;
  //           } else {
  //             this.toastr.error(data["msg"]);
  //           }
  //         },
  //         (error) => {
  //           this.toastr.error(errorData.Serever_Error);
  //         }
  //       );
  //     }
  //   } else {
  //     return;
  //   }
  // }
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
              this.toastr.error(data["msg"]);
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
              this.toastr.error(data["msg"]);
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
              this.toastr.error(data["msg"]);
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
              this.toastr.error(data["msg"]);
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
            } else {
              this.toastr.error(data["msg"]);
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
            } else {
              this.toastr.error(data["msg"]);
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

  saveQuality(addQualityData) {
    this.formSubmitted = true;
    if (addQualityData.valid) {
      if (this.departmentEditFlag == true) {
        this.adminService.updateQuality(this.addQuality).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Update_Success);
              this.getAllQuality();
              this.onCancelQuality();
              this.resetValue(addQualityData);
              this.formSubmitted = false;
            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {}
        );
      } else {
        this.adminService.saveQuality(this.addQuality).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Add_Success);
              this.getAllQuality();
              this.resetValue(addQualityData);
            } else {
              this.toastr.error(data["msg"]);
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

  saveInvoiceSequence(addSequenceData) {
    this.formSubmitted = true;
    if (addSequenceData.valid) {
      if (this.sequenceByEditFlag) {
        this.adminService
          .updateInvoiceSequence(this.addInvoiceSequence)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.toastr.success(errorData.Update_Success);
                this.getAllInvoiceSequenceData();
                this.resetValue(addSequenceData);
                this.saveHidden = true;
              } else {
                this.toastr.error(data["msg"]);
              }
            },
            (error) => {}
          );
      } else {
        this.adminService
          .saveInvoiceSequence(this.addInvoiceSequence)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.toastr.success(errorData.Add_Success);
                this.getAllInvoiceSequenceData();
                this.saveHidden = true;
                // this.resetValue(addSequenceData);
              } else {
                this.toastr.error(data["msg"]);
              }
            },
            (error) => {}
          );
      }
      // }
    } else {
      // this.formSubmitted = false;
      return;
    }
  }

  saveBatchSequence(addSequenceData) {
    this.formSubmitted = true;
    if (addSequenceData.valid) {
      if (this.batchsequenceByEditFlag) {
        this.adminService.updateBatchSequence(this.addBatchSequence).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Update_Success);
              this.getAllBatchSequenceData();
              this.resetValue(addSequenceData);
              this.batchSaveHidden = true;
            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {}
        );
      } else {
        this.adminService.saveBatchSequence(this.addBatchSequence).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Add_Success);
              this.getAllBatchSequenceData();
              this.batchSaveHidden = true;
              // this.resetValue(addSequenceData);
            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {}
        );
      }
      // }
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
  onCancelQuality() {
    this.addQuality.id = null;
    this.addQuality.qualityName = null;
    this.qualityEditFlag = false;
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

  onCancelApproveReceiveBy() {
    this.addApproveReceive.id = null;
    this.addApproveReceive.name = null;
    this.addApproveReceive.contact = null;
    this.addApproveReceive.email = null;
    this.addApproveReceive.type = null;
    this.approveReceiveByEditFlag = false;
  }

  // onCancelApproveBy() {
  //   this.approveBy.id = null;
  //   this.approveBy.name = null;
  //   this.approveBy.email = null;
  //   this.approveBy.contact = null;
  //   this.approveByEditFlag = false;
  // }

  // onCancelReceiveBy() {
  //   this.receiveBy.id = null;
  //   this.receiveBy.name = null;
  //   this.receiveBy.email = null;
  //   this.receiveBy.contact = null;
  //   this.receiveByEditFlag = false;
  // }

  onCancelSequence() {
    this.saveHidden = true;
    this.getAllInvoiceSequenceData();
  }

  onBatchCancelSequence() {
    this.batchSaveHidden = true;
    this.getAllBatchSequenceData();
  }

  removeJet(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.adminService.deleteJetById(id).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.getAllJetData();
            } else {
              this.toastr.error("Can't delete this record");
            }
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
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.getAllMachineData();
            } else {
              this.toastr.error("Can't delete this record");
            }
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
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.getAllMachineCategoryData();
            } else {
              this.toastr.error("Can't delete this record");
            }
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
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.getAllDesignationData();
            } else {
              this.toastr.error("Can't delete this record");
            }
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
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.getAllCompanyData();
            } else {
              this.toastr.error("Can't delete this record");
            }
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
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.getAllDepartment();
            } else {
              this.toastr.error("Can't delete this record");
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  removeQuality(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.adminService.deleteQualityById(id).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.getAllQuality();
            } else {
              this.toastr.error("Can't delete this record");
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  removeApproveReceiveBy(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.adminService.deleteApproveReceiveById(id).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.getAllApproveReceiveByData();
            } else {
              this.toastr.error("Can't delete this record");
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }
  // removeApproveBy(id) {
  //   const modalRef = this.modalService.open(ConfirmationDialogComponent, {
  //     size: "sm",
  //   });
  //   modalRef.result.then((result) => {
  //     if (result) {
  //       this.adminService.deleteApproveById(id).subscribe(
  //         (data) => {
  //           if (data["success"]) {
  //             this.toastr.success(errorData.Delete);
  //             this.getAllApproveByData();
  //           } else {
  //             this.toastr.error("Can't delete this record");
  //           }
  //         },
  //         (error) => {
  //           this.toastr.error(errorData.Serever_Error);
  //         }
  //       );
  //     }
  //   });
  // }

  // removeReceiveBy(id) {
  //   const modalRef = this.modalService.open(ConfirmationDialogComponent, {
  //     size: "sm",
  //   });
  //   modalRef.result.then((result) => {
  //     if (result) {
  //       this.adminService.deleteReceiveById(id).subscribe(
  //         (data) => {
  //           if (data["success"]) {
  //             this.toastr.success(errorData.Delete);
  //             this.getAllReceiveByData();
  //           } else {
  //             this.toastr.error("Can't delete this record");
  //           }
  //         },
  //         (error) => {
  //           this.toastr.error(errorData.Serever_Error);
  //         }
  //       );
  //     }
  //   });
  // }
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
    debugger;
    this.machineEditFlag = true;
    this.machineList.forEach((element) => {
      if (element.id == id) {
        this.addMachine.controlId = element.controlId;
        this.addMachine.machineName = element.machineName;
        this.addMachine.id = element.id;
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
        this.addDepartment.isMaster = element.isMaster;
      }
    });
  }
  getQualityEdit(id) {
    this.qualityEditFlag = true;
    this.qualityList.forEach((element) => {
      if (element.id == id) {
        this.addQuality.id = element.id;
        this.addQuality.qualityName = element.qualityName;
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

  getApproveReceiveByEdit(id) {
    this.approveReceiveByEditFlag = true;
    this.approveReceiveByList.forEach((element) => {
      if (element.id == id) {
        this.addApproveReceive.id = element.id;
        this.addApproveReceive.name = element.name;
        this.addApproveReceive.email = element.email;
        this.addApproveReceive.contact = element.contact;
        this.addApproveReceive.type = element.type;
      }
    });
  }
  // getapproveByEdit(id) {
  //   this.approveByEditFlag = true;
  //   this.approveByList.forEach((element) => {
  //     if (element.id == id) {
  //       this.approveBy.id = element.id;
  //       this.approveBy.name = element.name;
  //       this.approveBy.email = element.email;
  //       this.approveBy.contact = element.contact;
  //     }
  //   });
  // }

  // getReceiveByEdit(id) {
  //   this.receiveByEditFlag = true;
  //   this.receiveByList.forEach((element) => {
  //     if (element.id == id) {
  //       this.receiveBy.id = element.id;
  //       this.receiveBy.name = element.name;
  //       this.receiveBy.email = element.email;
  //       this.receiveBy.contact = element.contact;
  //     }
  //   });
  // }

  onEdit() {
    this.saveHidden = false;
    this.sequenceByEditFlag = true;
  }

  onBatchEdit() {
    this.batchSaveHidden = false;
    this.batchsequenceByEditFlag = true;
  }

  onBillClick(row) {
    this.billList = [];
    row.forEach((element) => {
      if (element.type == "bill") {
        this.billList.push(element);
      }
    });

    const modalRef = this.modalService.open(PreviewComponent, { size: "lg" });

    modalRef.componentInstance.billList = this.billList;
    modalRef.componentInstance.materialList = null;

    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }

  onMaterialClick(row) {
    this.materialList = [];
    row.forEach((element) => {
      if (element.type == "material") {
        this.materialList.push(element);
      }
    });

    const modalRef = this.modalService.open(PreviewComponent, { size: "lg" });

    modalRef.componentInstance.billList = null;
    modalRef.componentInstance.materialList = this.materialList;
    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }

  updatePurchaseStatus(row, event) {
    this.purchseService.updatePurchaseStatus(row.id, event).subscribe(
      (data) => {
        if (data["success"]) {
          this.toastr.success(errorData.Update_Success);
          this.getAllPurchaseData();
        }
      },
      (error) => {}
    );
  }

  getApproved() {
    this.getAllPurchaseData();
  }

  deletePurchase(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.purchseService.deletePurchase(id).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.getAllPurchaseData();
            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {
            //this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  getApprovedOrRecieved(value) {
    if (value == 1) {
      this.ApprovedFlag = true;
      this.RecieveFlag = false;
    } else if (value == 2) {
      this.ApprovedFlag = false;
      this.RecieveFlag = true;
    } else {
      this.ApprovedFlag = false;
      this.RecieveFlag = false;
    }
  }
}
