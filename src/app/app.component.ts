/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { PrintInvoiceService } from './@theme/services/print-invoice.service';

@Component({
  selector: 'ngx-app',
  template: '<div [class.isPrinting]="printService.isPrinting">  <router-outlet></router-outlet><router-outlet id="print1" name="print"></router-outlet></div>',
})
export class AppComponent implements OnInit{

  constructor(private analytics: AnalyticsService, private seoService: SeoService,public printService: PrintInvoiceService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
