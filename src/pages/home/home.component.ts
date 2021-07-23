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
  /*
  @name actionDropdown
  @param 
  @description open or close dropdown 
  @return void
  */
  actionDropdown() {
    this.dropDownGrid = !this.dropDownGrid;
  }
  /*
  @name setOptionDropdownGrid
  @param type:string  'List' | 'Grid'
  @description set an option of drodown
  @return void
  */
  setOptionDropdownGrid(type:string) {
    this.valueDropdownSelected = type;
    this.dropDownGrid = true;
  }
  /*
  @name getDeviceScreen
  @param 
  @description check the screen resolution, if resolution is minor to 769, swiper will start otherwise stops
  @return void
  */

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
  /*
  @name startSwipper
  @param 
  @description Start functionality of swipe (sliding)
  @return void
  */
  startSwipper() {
    this.swiper = new Swiper('.swiper-container', {
      initialSlide: 0,
      freeMode:true,
      observer: true, 
      observeParents: true,
      loop: false,
      slidesPerView: 'auto'
    });
  }
  /*
  @name getRulings
  @param 
  @description getting ruling data by get method
  @return void
  */
  getRulings(){
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider
      .get(WEBSERVICE.RULINGS_GET)
      .then((data) => {

        this.rulingData=data;
      })
      .catch((err:any) => {
        this.ServicesProvider.fn_GenerarToast('error', 'Not can receive the data');
      })
      .finally(() => {
        this.ServicesProvider.preloaderOff();
      });
  }
  /*
  @name formatDateRuling
  @param date:string  date of lastUpdated
  @description format a date to moment library format
  @return string
  */
  formatDateRuling(date:string){
    return  moment(date).fromNow();
  }
  /*
  @name updateRuling
  @param _id:string  identificar of ruling
  @param type:string  type of status of vote:  'positive' | 'negative' | 'reset'
  @param index:number  index of item ruling selected
  @description update the ruling vote in bd
  @return void
  */
  updateRuling(_id:string,type:string,index:string){
    this.ServicesProvider.preloaderOn();
    this.ServicesProvider
      .put(WEBSERVICE.RULING_UPDATE,_id, {thumb:type})
      .then((data) => {
        this.rulingData[index]=data;

      })
      .catch((err:any) => {
        this.ServicesProvider.fn_GenerarToast('error', 'There is a problem! try again');
      })
      .finally(() => {
        this.ServicesProvider.preloaderOff();
      });
  }

}
