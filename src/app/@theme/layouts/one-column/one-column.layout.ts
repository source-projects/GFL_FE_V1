import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NbMenuService, NbSidebarService } from "@nebular/theme";
import { LayoutService } from "../../../@core/utils";
import { Subject } from "rxjs";
import { CommonService } from '../../../@theme/services/common.service';
import { event } from 'jquery';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "ngx-one-column-layout",
  styleUrls: ["./one-column.layout.scss"],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnDestroy{
  expandPanel: boolean;
  isTablet: boolean;
  isMobile: boolean;
  unSubscribe$:any;
  destory$ = new Subject<void>();
  constructor(
    private menu: NbMenuService,
    private layoutService: LayoutService,
    private sidebarService: NbSidebarService,
    private router: Router
  ) {
    this.formatDevice();
    if (this.isMobile == true) {
      this.unSubscribe$ = this.menu.onItemClick().subscribe(() => {
        this.sidebarService.compact('menu-sidebar');
      });
    }else{
      this.menu.onItemClick().pipe(takeUntil(this.destory$)).subscribe(() => {
        this.sidebarService.compact('menu-sidebar');
    });
    }
  }
  ngOnDestroy() {
    if(this.unSubscribe$)
      this.unSubscribe$.unsubscribe();
    this.destory$.next();
    this.destory$.complete();
   }

  formatDevice() {
    this.expandPanel = this.isTablet = this.isMobile = false;
    if (window.innerWidth >= 1024) {
      this.expandPanel = true;
    } else if (window.innerWidth >= 767 && window.innerWidth < 1024) {
      this.isTablet = true;
    } else {
      this.isMobile = true;
    }
    if (
      window.innerWidth > window.innerHeight &&
      window.innerWidth >= 640 &&
      (this.isMobile || this.isTablet)
    ) {
      this.isMobile = this.isTablet = false;
      this.expandPanel = true;
    }
  }
}
