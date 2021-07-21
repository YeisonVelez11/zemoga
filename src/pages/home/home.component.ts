import { Component, OnInit } from '@angular/core';
import { WEBSERVICE, URL } from '../../config/webservices';
import { ServicesProvider } from '../../providers/services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  dropDownGrid: boolean = true; //controls if dropown should be open/closed
  valueDropdownSelected: string = 'List';

  constructor(private ServicesProvider: ServicesProvider) {}
  ngOnInit() {
    // this.ServicesProvider.preloaderOn();
  }
  actionDropdown() {
    this.dropDownGrid = !this.dropDownGrid;
  }
  setOptionDropdownGrid(type) {
    this.valueDropdownSelected = type;
    this.dropDownGrid = true;
  }
}
