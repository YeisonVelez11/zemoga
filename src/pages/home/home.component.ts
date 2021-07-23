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
  rulingData:ruling[] = [];
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

  getRulings(){
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider
      .get(WEBSERVICE.RULINGS_GET)
      .then((data) => {

        this.rulingData=data.data;
      })
      .catch((err:any) => {
        this.ServicesProvider.fn_GenerarToast('error', 'Not can receive the data');
      })
      .finally(() => {
        this.ServicesProvider.preloaderOff();
      });
  }

  formatDateRuling(date){
    console.log(date);
    return  moment(date).fromNow();
  }

  updateRuling(_id:string,thumb:object){
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider
      .put(WEBSERVICE.RULING_UPDATE,_id,thumb)
      .then((data) => {
        this.rulingData=data.data;
      })
      .catch((err:any) => {
        this.ServicesProvider.fn_GenerarToast('error', 'There is a problem! try again');
      })
      .finally(() => {
        this.ServicesProvider.preloaderOff();
      });
  }

}
