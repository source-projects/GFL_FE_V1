import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as errorData from "../../../@theme/json/error.json";
import { CommonService } from "../../../@theme/services/common.service";
import { PartyService } from "../../../@theme/services/party.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../../@theme/services/user.service";

@Component({
  selector: "ngx-add-edit-party",
  templateUrl: "./add-edit-party.component.html",
  styleUrls: ["./add-edit-party.component.scss"],
  providers: [Location],
})
export class AddEditPartyComponent implements OnInit {
  public loading = false;
  public disableButton = false;
  public errorData: any = (errorData as any).default;

  partyForm: FormGroup;

  //form Validation
  formSubmitted: boolean = false;

  //to Store UserID
  user: any;

  //To store the data of selected Party
  currentParty: any;

  //to store the id of selected party
  currentPartyId: any;

  master: any[] = [];
  partyCodeArray: [];
  stateList = [
    { id: "37", name: "Andhra Pradesh" },
    { id: "35", name: "Andaman and Nicobar Islands" },
    { id: "12", name: "Arunachal Pradesh" },
    { id: "18", name: "Assam" },
    { id: "10", name: "Bihar" },
    { id: "04", name: "Chandigarh" },
    { id: "22", name: "Chattisgarh" },
    { id: "26", name: "Dadra & Nagar Haveli and Daman & Diu" },
    { id: "07", name: "Delhi" },
    { id: "30", name: "Goa" },
    { id: "24", name: "Gujarat" },
    { id: "06", name: "Haryana" },
    { id: "02", name: "Himachal Pradesh" },
    { id: "01", name: "Jammu and Kashmir" },
    { id: "20 ", name: "Jharkhand" },
    { id: "29", name: "Karnataka" },
    { id: "32", name: "Kerala" },
    { id: "38", name: "Ladakh" },
    { id: "31", name: "Lakshadweep Islands" },
    { id: "23", name: "Madhya Pradesh" },
    { id: "27", name: "Maharashtra" },
    { id: "14", name: "Manipur" },
    { id: "17", name: "Meghalaya" },
    { id: "15", name: "Mizoram" },
    { id: "13", name: "Nagaland" },
    { id: "21", name: "Odisha" },
    { id: "97", name: "Other Territory" },
    { id: "34", name: "Pondicherry" },
    { id: "03", name: "Punjab" },
    { id: "08", name: "Rajasthan" },
    { id: "11", name: "Sikkim" },
    { id: "33", name: "Tamil Nadu" },
    { id: "36", name: "Telangana" },
    { id: "16", name: "Tripura" },
    { id: "09", name: "Uttar Pradesh" },
    { id: "05", name: "Uttarakhand" },
    { id: "19", name: "West Bengal" },
  ];
  creditor: boolean = false;
  debtor: boolean = false;
  partyAdressSetFlag: boolean = false;
  partyAdressSetFlag1: boolean = false;
  partyCodeExist: boolean = true;
  partyNameExist: boolean = false;
  adminFlag = false;
  masterFlag = false;
  operatorFlag = false;
  userHead;
  masterList = [];
  logInUserDetail: any;

  constructor(
    private partyService: PartyService,
    private userService: UserService,
    private commonService: CommonService,
    private route: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    this.getData();
    await this.getMaster();
    this.currentPartyId = this._route.snapshot.paramMap.get("id");
    if (this.currentPartyId != null) this.getUpdateData();
  }
  
  public getData() {
    this.loading = true;
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.partyForm = new FormGroup({
      id: new FormControl(null),
      partyName: new FormControl(null, [Validators.required]),
      partyAddress1: new FormControl(""),
      partyAddress2: new FormControl(""),
      contactNo: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [
        Validators.pattern(/^[a-zA-Z ]*$/),
        Validators.required,
      ]),
      state: new FormControl(null, [
        Validators.pattern(/^[a-zA-Z ]*$/),
        Validators.required,
      ]),
      pincode: new FormControl(null, [
        Validators.pattern(/^[0-9]{6}$/),
        Validators.required,
      ]),
      gstin: new FormControl(
        null,
        Validators.pattern(
          /^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
        )
      ),
      mailId: new FormControl(null, [
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
        ),
      ]),
      partyCode: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{4}$/),
      ]),
      creditor: new FormControl(false),
      debtor: new FormControl(false),
      createdBy: new FormControl(null),
      updatedBy: new FormControl(null),
      userHeadId: new FormControl(null, Validators.required),
    });
    this.loading = false;
  }
  public getMaster() {
    this.loading = true;
    this.master = [];
    this.partyService.getAllMaster().subscribe(
      (data) => {
        if (data["success"]) {
          this.master = data["data"];
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

  public getUpdateData() {
    this.loading = true;
    this.partyService.getPartyDetailsById(this.currentPartyId).subscribe(
      (data) => {
        this.currentParty = data["data"];

        this.partyForm.patchValue({
          id: this.currentParty.id,
          userHeadId: this.currentParty.userHeadId,
          partyName: this.currentParty.partyName,
          partyAddress1: this.currentParty.partyAddress1,
          partyAddress2: this.currentParty.partyAddress2,
          contactNo: this.currentParty.contactNo,
          city: this.currentParty.city,
          state: this.currentParty.state,
          pincode: this.currentParty.pincode,
          mailId: this.currentParty.mailId,
          gstin: this.currentParty.gstin,
          creditor: this.currentParty.creditor,
          debtor: this.currentParty.debtor,
          createdBy: this.currentParty.createdBy,
          updatedBy: this.currentParty.updatedBy,
          partyCode: this.currentParty.partyCode,
        });
        this.creditor = this.partyForm.get("creditor").value;
        this.debtor = this.partyForm.get("debtor").value;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  resetFlag(event) {
    this.partyCodeExist = true;
    const charCode = event.which ? event.which : event.keyCode;
    return (
      (charCode >= 48 && charCode <= 57) ||
      (charCode >= 65 && charCode <= 90) ||
      charCode == 32 ||
      (charCode >= 97 && charCode <= 122)
    );
  }

  reset() {
    this.partyForm.reset();
    this.formSubmitted = false;
    this.partyCodeExist = true;
    this.partyNameExist = false;
  }

  async addParty() {
    this.disableButton = true;
    this.formSubmitted = true;

    if (this.partyForm.valid) {
      if (
        (this.creditor || this.debtor) &&
        !this.partyNameExist &&
        this.partyCodeExist
      ) {
        this.partyForm.value.createdBy = this.user.userId;

        if (this.partyForm.get("gstin") == null) {
          this.partyForm.patchValue({
            gstin: "",
          });
        }
        if (
          (this.debtor && this.partyForm.get("partyAddress1").value) ||
          !this.debtor
        ) {
          this.partyForm.patchValue({
            createdBy: this.user.userId,
          });
          this.partyService.saveParty(this.partyForm.value).subscribe(
            (data) => {
              if (data["success"]) {
                this.currentParty = data["data"];
                this.toastr.success(data["msg"]);
                this.reset();
                this.disableButton = false;
              } else {
                this.disableButton = false;
                this.toastr.error(data["msg"]);
              }
            },
            (error) => {
              this.toastr.error(errorData.Serever_Error);
              this.disableButton = false;
            }
          );
        } else {
          this.disableButton = false;
          return;
        }
      } else {
        this.disableButton = false;
        return;
      }
    } else {
      this.disableButton = false;
      return;
    }
  }

  async updateParty() {
    this.disableButton = true;
    this.loading = true;
    this.formSubmitted = true;

    if (this.partyForm.valid) {
      if (
        (this.creditor || this.debtor) &&
        !this.partyNameExist &&
        this.partyCodeExist
      ) {
        if (
          (this.debtor == true &&
            this.partyForm.get("partyAddress1").value != "") ||
          (this.creditor == true &&
            (this.partyForm.get("partyAddress1").value != "" ||
              this.partyForm.get("partyAddress1").value == ""))
        ) {
          if (this.debtor == true) {
            this.partyAdressSetFlag = true;
          }

          this.partyForm.value.updatedBy = this.user.userId;
          let body = {
            ...this.partyForm.value,
            id: this.currentPartyId,
          };
          // this.partyForm.patchValue({
          //   userHeadId: this.userHead.userHeadId,
          // });
          let obj = await this.partyService.updateParty(body).subscribe(
            (data) => {
              if (data["success"]) {
                this.toastr.success(data["msg"]);
                this.disableButton = false;
                this.route.navigate(["/pages/party"]);
              } else {
                this.disableButton = false;
                this.toastr.error(data["msg"]);
              }
              this.loading = false;
            },
            (error) => {
              this.toastr.error(errorData.Update_Error);
              this.loading = false;
              this.disableButton = false;
            }
          );
        } else {
          this.disableButton = false;
        }
      }
      this.disableButton = false;
    }
    this.disableButton = false;
    this.loading = false;
  }

  setCheckedStatusCreditor(checked) {
    this.creditor = checked;
    this.partyForm.patchValue({
      creditor: this.creditor,
    });
  }

  setCheckedStatusDebtor(checked) {
    this.debtor = checked;
    this.partyForm.patchValue({
      debtor: this.debtor,
    });
    this.partyAdressSetFlag = checked;
  }

  async checkPartyName() {
    this.partyNameExist = false;
    if (this.partyForm.get("partyName").value) {
      let id = 0;
      if (this.partyForm.get("id").value) id = this.partyForm.get("id").value;
      this.partyService
        .checkPartyNameExist(this.partyForm.get("partyName").value, id)
        .subscribe(
          (data) => {
            this.partyNameExist = data["data"];
          },
          (error) => {}
        );
    }
  }

  checkPartyCode() {
    this.partyCodeExist = true;
    if (this.partyForm.get("partyCode").value) {
      let id = 0;
      if (this.partyForm.get("id").value) id = this.partyForm.get("id").value;
      this.partyService
        .getPartyCode(this.partyForm.get("partyCode").value, id)
        .subscribe(
          (data) => {
            this.partyCodeExist = data["data"];
          },
          (error) => {}
        );
    }
  }

  checkAddress() {
    if (this.partyForm.get("partyAddress1").value != "") {
      this.partyAdressSetFlag1 = false;
    }
  }

  setState() {
    if (this.partyForm.get("gstin").value != "") {
      let tempGstNo = this.partyForm.get("gstin").value;
      let stateDigit = tempGstNo.slice(0, 2);
      this.stateList.forEach((element) => {
        if (element.id == stateDigit) {
          this.partyForm.patchValue({
            state: element.name,
          });
        }
      });
      this.partyForm.get("state").disable();
    } else {
      this.partyForm.get("state").enable();
    }
  }
}
