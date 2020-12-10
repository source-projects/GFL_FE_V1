import { Component, OnInit } from '@angular/core';
import { PartyGuard } from 'app/@theme/guards/party.guard';
import { MENU_ITEMS } from './pages-menu';
import { QualityGuard } from 'app/@theme/guards/quality.guard';
import { UserGuard } from 'app/@theme/guards/user.guard';
import { SupplierGuard } from 'app/@theme/guards/supplier.guard';
import { ColorGuard } from 'app/@theme/guards/color.guard';
import { ProgramGuard } from 'app/@theme/guards/program.guard';
import { ShadeGuard } from 'app/@theme/guards/shade.guard';
import { StockBatchGuard } from 'app/@theme/guards/stock-batch.guard';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{
  menu = MENU_ITEMS;
  view:Boolean=true;
  constructor(
    public partyGuard: PartyGuard , 
    public qualityGuard: QualityGuard,
    public userGuard: UserGuard,
    public supplierGuard: SupplierGuard , 
    public colorGuard: ColorGuard,
    public shadeGuard: ShadeGuard,
    public stockBatchGuard: StockBatchGuard,
    public programGuard: ProgramGuard,
    
    ){}
  ngOnInit(): void {


    this.menu.forEach(e=>{
      switch (e.title) {
        case 'Party':
        this.view=this.partyGuard.accessRights('view');
            if(this.view == false){
              e.hidden=true;
            }
            break;

        case 'Quality':
        this.view=this.qualityGuard.accessRights('view');
            if(this.view == false){
              e.hidden=true;
            }
            break;

        case 'User':
        this.view=this.userGuard.accessRights('view');
            if(this.view == false){
              e.hidden=true;
            }
            break;

        case 'Color':
        this.view=this.colorGuard.accessRights('view');
            if(this.view == false){
              e.hidden=true;
            }
            break;

        case 'Program':
        this.view=this.programGuard.accessRights('view');
            if(this.view == false){
              e.hidden=true;
            }
            break;

         case 'Stock-batch':
        this.view=this.stockBatchGuard.accessRights('view');
            if(this.view == false){
              e.hidden=true;
            }
            break;

            case 'Shade':
        this.view=this.shadeGuard.accessRights('view');
            if(this.view == false){
              e.hidden=true;
            }
            break;

            case 'Supplier':
        this.view=this.supplierGuard.accessRights('view');
            if(this.view == false){
              e.hidden=true;
            }
            break;   
    }
    })
  }
}
