import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
    selector: 'btn-cell-renderer',
    template: `
      <!-- <button type="button" (click)="onClick($event)">{{label}}</button>
      <button type="button" (click)="onClick($event)">{{label}}</button> -->
      <nb-icon status="primary" [options]="{animation:{type:'zoom'}}" icon="edit" [routerLink]="['/pages/party/edit',this.rowId]"></nb-icon>&nbsp;&nbsp;
      <nb-icon status="danger" [options]="{animation:{type:'zoom'}}" icon="trash"  (click)="onClick($event)"></nb-icon>
    `
  })
  export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
   
    


    params: any;
    label: string;
    rowId:any;
    agInit(params: any): void {
      this.params = params;
      this.label = this.params.label || null;
      this.rowId = this.params.node.data.id;


    }

    // onEdit(event) {
    //   console.log(this.params.node.data);
      // if (this.params.onClick instanceof Function) {
      //   // put anything into params u want pass into parents component
      //   const params = {
      //     event: $event,
      //     rowData: this.params.node.data,
      //     // ...something
      //   }
      //   this.params.onClick(params);
  
      // }
   // }

    onClick($event) {
      if (this.params.onClick instanceof Function) {
        // put anything into params u want pass into parents component
        const params = {
          event: $event,
          rowData: this.params.node.data,
          label:this.label
          // ...something
        }
        this.params.onClick(params);
  
      }
    }
  
    // btnClickedHandler(event) {
    //   this.params.clicked(this.params.value);
    //   console.log(event);
    // }
  
    ngOnDestroy() {
      // no need to remove the button click handler 
      // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
    }
    refresh(params?: any): boolean {
      return false;
    }
  }