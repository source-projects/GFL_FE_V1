import { Component, OnInit } from '@angular/core';
import { JetPlanningService } from '../../../@theme/services/jet-planning.service';

@Component({
  selector: 'ngx-direct-prod',
  templateUrl: './direct-prod.component.html',
  styleUrls: ['./direct-prod.component.scss']
})
export class DirectProdComponent implements OnInit {

  jet = [];
  jetSelected = null;
  loading = false;
  constructor(
    private jetService: JetPlanningService,
  ) { }

  ngOnInit(): void {

    this.getJetData();
  }

  getJetData() {
    this.jet = [];
    this.loading = true;
    this.jetService.getAllJetDataV1().subscribe(
      (data) => {
        if (data["success"]) {
          this.jet = data["data"];
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

}
