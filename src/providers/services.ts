import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { catchError, retry } from 'rxjs/operators';
import { URL, WEBSERVICE } from '../config/webservices';


@Injectable()
export class ServicesProvider {
  constructor(
    private http: HttpClient,
    private toastsService: AngularBootstrapToastsService
  ) {}
  /*
  @name handleError
  @param error  contains the httpErrorResponse data
  @description handle exceptions error of http request 
  @return throw
  */
  public handleError(error: HttpErrorResponse) {
    this.fn_GenerarToast(
      'error',
      'There are a problem'
    );
    throw 'Unable to handle';
  }
  /*
  @name get
  @param inUrl  contains the endpoint of webservice
  @param params  url query params of petition
  @description get data by get method
  @return promise
  */

  public get(inUrl: string, params?: any) {
    const httpOptions = {
      params,
    };
    return this.http
      .get(inUrl, httpOptions)
      .pipe(catchError(this.handleError.bind(this)))
      .toPromise();
  }
  /*
  @name post
  @param inUrl  contains the endpoint of webservice
  @param params  data body of requests
  @description send and get data by post method
  @return promise
  */
  public post(inUrl: string, params?: object) {
    let httpOptions = {
      headers: new HttpHeaders(),
    };

    return this.http
      .post(inUrl, params, httpOptions)
      .pipe(catchError(this.handleError.bind(this)))
      .toPromise();
  }
  /*
  @name put
  @param inUrl  contains the endpoint of webservice
  @param params  data body of requests
  @param urlParam  path url of request
  @description update data in db
  @return promise
  */
  public put(inUrl: string, urlParam:string, params?: object) {
    let httpOptions = {
      headers: new HttpHeaders(),
    };
    return this.http
      .put(inUrl+`/${urlParam}`, params, httpOptions)
      .pipe(catchError(this.handleError.bind(this)))
      .toPromise();
  }
  /*
  @name preloaderOff
  @param params 
  @description hide preload while data fetching
  @return void
  */
  public preloaderOff() {
    if (document.querySelector('#preloader')) {
      document.querySelector('#preloader')!.classList.remove('d-block');
      document.querySelector('#preloader')!.classList.add('d-none');
    }
  }
  /*
  @name preloaderOn
  @param params 
  @description shows preload while data fetching
  @return void
  */
  public preloaderOn() {
    if (document.querySelector('#preloader')) {
      document.querySelector('#preloader')!.classList.remove('d-none');
      document.querySelector('#preloader')!.classList.add('d-block');
    } else {
      const d1 = document.querySelector('body');
      d1!.insertAdjacentHTML(
        'beforeend',
        `
        <div id="preloader" class="position-fixed" style="top:0px; z-index:9;">
          <div class="position-fixed backdrop_preload w-100 h-100vh d-flex justify-content-center align-items-center">
            <div  class="avatar_loading shadow_loading animate__animated animate__heartBeat animate__infinite">
              <img class="logo_circle" src="./assets/img/zemoga-logo.png">
            </div>
            <div class="text-white loading_text animate__animated animate__flash animate__slower animate__infinite">Loading...</div>
          </div>
        </div>`
      );
    }
  }
  /*
  @name fn_GenerarToast
  @param tipo set the type style of the toast  |success | warning | error
  @param message message that toast contains
  @param duration time in ms while toast will be showed*/

  fn_GenerarToast(tipo: any, message: any, duration?: number) {
    let json_toast: any = {};
    if (tipo.toLowerCase() == 'success' ) {
      json_toast.title = 'Success';
      json_toast.titleClass = 'modal_success_bg';
    } else if (tipo.toLowerCase() == 'error') {
      json_toast.title = 'Error';
      json_toast.titleClass = 'modal_danger_bg';
    } else {
      json_toast.title = 'Oops!';
      json_toast.titleClass = 'modal_warning_bg';
    }
    json_toast.text = message;
    json_toast.duration = duration || 3000;

    this.toastsService.showSimpleToast(json_toast);
  }

}
