import { Component, HostListener, OnInit } from '@angular/core';
import { WEBSERVICE, URL } from '../../config/webservices';
import { ServicesProvider } from '../../providers/services';
import * as moment from 'moment';
import Swiper from 'swiper';
import {ruling} from "./interfaces/ruling"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  rulings:ruling[]=[];
  swiper: any; //is necesary to use the destroy function
  dropDownGrid: boolean = true; //controls if dropown should be open/closed
  valueDropdownSelected: string = 'List';
  deviceScreenPhone: boolean; //check if resolution is phone
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getDeviceScreen();
  }
  
  constructor(private ServicesProvider: ServicesProvider) {}
  ngOnInit() {

    this.getDeviceScreen();
    this.getRulings();
  }
  actionDropdown() {
    this.dropDownGrid = !this.dropDownGrid;
  }
  setOptionDropdownGrid(type:string) {
    this.valueDropdownSelected = type;
    this.dropDownGrid = true;
  }

  getDeviceScreen() {
    if (window.innerWidth < 769) {
      if (!this.deviceScreenPhone) {
        //prevent multiple calls to start swipper
        this.startSwipper();
        this.deviceScreenPhone = true;
      }
    } else {
      if (this.deviceScreenPhone) {
        //prevent multiple calls to destroy swipper
        this.deviceScreenPhone = false;
        if (this.swiper) {
          this.swiper.destroy();
        }
      }
    }
  }
  
  startSwipper() {
    this.swiper = new Swiper('.swiper-container', {
      freeMode: false,
      initialSlide: 0,
      centerInsufficientSlides: true,
      loop: false,
    });
  }

  myfunction(){
    alert("tye")
  }

  getRulings(){
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider
      .get(WEBSERVICE.RULINGS_GET)
      .then((data) => {
        this.ServicesProvider.fn_GenerarToast('success', 'Thanks for your vote!');

        this.rulings=data.data;
      })
      .catch((err) => {
        this.ServicesProvider.fn_GenerarToast('error', 'Thanks for your vote!');

      })
      .finally(() => {
        this.ServicesProvider.preloaderOff();

      });


  }
}
