import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
//importación de toast
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { catchError, retry } from 'rxjs/operators';
import { URL, WEBSERVICE } from '../config/webservices';
declare var Odometer: any;

@Injectable()
export class ServicesProvider {
  constructor(
    private http: HttpClient,
    private toastsService: AngularBootstrapToastsService
  ) {}

  public handleError(error: HttpErrorResponse) {
    this.fn_GenerarToast(
      'error',
      'Ha ocurrido un problema al obtener los datos'
    );
    throw 'Unable to handle';
  }
  public get(inUrl: string, params?: any) {
    const httpOptions = {
      params,
    };

    return this.http
      .get(inUrl, httpOptions)
      .pipe(catchError(this.handleError.bind(this)))
      .toPromise();
  }

  public post(inUrl: string, params?: object) {
    let httpOptions = {
      headers: new HttpHeaders(),
    };

    return this.http
      .post(inUrl, params, httpOptions)
      .pipe(catchError(this.handleError.bind(this)))
      .toPromise();
  }

  public put(inUrl: string, urlParam:string, params?: object) {
    let httpOptions = {
      headers: new HttpHeaders(),
    };
    return this.http
      .put(inUrl+`/${urlParam}`, params, httpOptions)
      .pipe(catchError(this.handleError.bind(this)))
      .toPromise();
  }

  public preloaderOff() {
    if (document.querySelector('#preloader')) {
      document.querySelector('#preloader')!.classList.remove('d-block');
      document.querySelector('#preloader')!.classList.add('d-none');
    }
  }

  public preloaderOn() {
    if (document.querySelector('#preloader')) {
      document.querySelector('#preloader')!.classList.remove('d-none');
      document.querySelector('#preloader')!.classList.add('d-block');
    } else {
      const d1 = document.querySelector('body');
      d1!.insertAdjacentHTML(
        'beforeend',
        `
        <div id="preloader" class="position-fixed" style="top:0px; z-index:99999999999999999999999;">
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

  //muestra un toast
  //tipo: exito | advertencia | error
  //message:  puede ser cualquier cosa
  //duration: duration en milisegundos
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

  fn_Odometer(element, value) {
    var el = document.querySelector('.' + element);
    let od = new Odometer({
      el: el,
      format: '(,ddd).dd',
      duration: 3000,
      theme: 'default',
    });

    od.update(value);
  }
}
