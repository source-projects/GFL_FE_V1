import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-shade-parent",
  templateUrl: "./shade-parent.component.html",
  styleUrls: ["./shade-parent.component.scss"],
})
export class ShadeParentComponent implements OnInit {
  disableButton = false;
  constructor() {}

  ngOnInit(): void {}
  reset() {}
  addShade(addShade?) {}
}
