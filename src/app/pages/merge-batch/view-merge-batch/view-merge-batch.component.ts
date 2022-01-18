import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataFilter } from '../../../@theme/model/datafilter.model';
import { FilterParameter } from '../../../@theme/model/filterparameter.model';
import { RequestData } from '../../../@theme/model/request-data.model';
import { ConfirmationDialogComponent } from '../../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { MergeBatchGuard } from '../../../@theme/guards/merge-batch.guard';
import { MergeBatchService } from '../../../@theme/services/merge-batch.service';
import { ResponseData } from '../../../@theme/model/response-data.model';
import { PageData } from '../../../@theme/model/page-data.model';

@Component({
  selector: 'ngx-view-merge-batch',
  templateUrl: './view-merge-batch.component.html',
  styleUrls: ['./view-merge-batch.component.scss']
})
export class ViewMergeBatchComponent implements OnInit, OnDestroy {

  mergeList = [];
  tableStyle = "bootstrap";
  loading = false;
  mergeListCopy = [];
  hiddenAdd: boolean = true;
  hiddenEdit: boolean = true;
  hiddenDelete: boolean = true;

  public destroy$: Subject<void> = new Subject<void>();

  numberFlag: boolean = false;
  stringFlag: boolean = false;
  pageSizes: number[] = [10, 20, 50, 100];
  selectedPageSize: number = 20;
  requestData: RequestData = new RequestData();
  filterWord: string = '';
  selectedColumnForFilter: string = '';
  operatorSelected = null;
  public tableHeaders = ["invoiceNo", "partyName", "batchList", "totalMtr", "finishMtr", "netAmt", "date"];
  searchStr = "";
  searchANDCondition = false;
  @ViewChild('searchfilter', { static: true }) filterTextBox!: ElementRef;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private toastr: ToastrService,
    private mergeBatchService: MergeBatchService,
    private modalService: NgbModal,
    private mergeBatchGuard: MergeBatchGuard,


  ) { }

  ngOnInit(): void {
    this.getAccess();
    this.requestData.data = new DataFilter();
    this.requestData.getBy = "all";
    this.getAllMergeBatch();

  }

  getAccess() {
    if (this.mergeBatchGuard.accessRights("add")) {
      this.hiddenAdd = false;
    }
    if (this.mergeBatchGuard.accessRights("delete")) {
      this.hiddenDelete = false;
    }
    if (this.mergeBatchGuard.accessRights("edit")) {
      this.hiddenEdit = false;
    }
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.mergeListCopy[0]);
    this.mergeList = this.mergeListCopy.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });
  }

  getAllMergeBatch() {
    this.loading = true;

    this.mergeBatchService.getAllMergeBatchV1(this.requestData).pipe(takeUntil(this.destroy$)).subscribe(
      (data: ResponseData) => {
        if (data["success"]) {
          const pageData = data.data as PageData;
          this.mergeList = pageData.data;
          this.requestData.data.total = pageData.total;
          this.mergeListCopy = this.mergeList.map((element) => ({
            batchId: element.batchId,
            mergeBatchId: element.mergeBatchId,
            partyName: element.partyName,
            qualityName: element.qualityName,
            totalMtr: element.totalMtr,
            totalWt: element.totalWt
          }));
          this.loading = false;

        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    )
  }



  deleteMergeBatch(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {

        this.mergeBatchService.deleteMergeBatch(id).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(data["msg"]);
              this.getAllMergeBatch();

            } else {
              this.toastr.error(data["msg"]);

            }
          },
          (error) => {

          }
        )
      }

    })

  }

  setPage(pageInfo) {
    this.requestData.data.pageIndex = pageInfo.offset;
    this.getAllMergeBatch();
  }

  pageSizeChanged() {
    this.requestData.data.pageSize = Number(this.selectedPageSize);
    this.getAllMergeBatch()
  }

  onOpenFilter(column) {

    if (column == "invoiceNo" || column == "partyName" || column == "createdAt") {
      this.stringFlag = true;
      this.numberFlag = false;
    } else {
      this.numberFlag = true;
      this.stringFlag = false;
    }

    const indexForOpen = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == column));
    if (indexForOpen > -1) {
      this.filterWord = this.requestData.data.parameters[indexForOpen].value;
      this.operatorSelected = this.requestData.data.parameters[indexForOpen].operator;
    }
    else {
      this.filterWord = '';
      this.operatorSelected = null;
    }
    this.selectedColumnForFilter = column;
    this.popover.show();
  }

  onApplyFilter() {
    this.popover.hide();
    const index = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == this.selectedColumnForFilter));
    if (index > -1) {
      this.requestData.data.parameters[index].operator = this.operatorSelected;
      this.requestData.data.parameters[index].value = this.filterWord;
    } else {
      let parameter = new FilterParameter();
      parameter.field = [this.selectedColumnForFilter];
      parameter.value = this.filterWord;
      parameter.operator = this.operatorSelected;
      this.requestData.data.parameters.push(parameter);
    }
    this.requestData.data.pageIndex = 0;
    this.getAllMergeBatch();
  }

  onClear(column?) {

    let index;
    if (column) {
      index = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == column));
    } else {
      index = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == this.selectedColumnForFilter));
    }

    if (index > -1) {
      this.filterWord = '';
      this.operatorSelected = null;
      this.requestData.data.parameters.splice(index, 1);
      this.requestData.data.pageIndex = 0;
      this.getAllMergeBatch();
    }

  }

  closeFilterPopover() {
    this.popover.hide();
  }

  onClearFilter() {
    this.popover.hide();
    if (this.requestData.data.parameters.length > 0) {
      this.requestData.data.parameters = [];
      this.getAllMergeBatch();
    }
  }

}
