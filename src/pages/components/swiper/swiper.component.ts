import { Component, OnInit,Inject} from '@angular/core';
import Swiper from "swiper";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {
  swiper: any;
  bShowModalNuevosCambios: boolean = false; // permite mostrar o no el modal que muestra nuevos cambios

  constructor(public dialogRef: MatDialogRef<SwiperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ) 
 { }


  ngOnInit(): void {
    this.swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      initialSlide: 0,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    //si la fecha es diferente a la guardada del localstorage se mostrarán de nuevo el modal con los nuevos cambios
    let cadena = "wizzard_";
    if (
      localStorage.getItem("fecha_nuevos_cambios") !=
        cadena + this.oNuevoModal.fecha_actualizacion
    ) {
      localStorage.removeItem("fecha_nuevos_cambios");
    }
    if (localStorage.getItem("fecha_nuevos_cambios")) {
      this.bShowModalNuevosCambios = false;
    } else {
      localStorage.setItem(
        "fecha_nuevos_cambios",
        cadena + this.formatDate(new Date())
      );
      this.bShowModalNuevosCambios = true;
    }
  }

  next() {
    this.swiper.slideNext();
  }
  fn_abrirModalInicial() {
    this.bShowModalNuevosCambios = true;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("/");
  }

  oNuevoModal: any = {
    nuevos_cambios: [
      {
        nuevo_cambio:
          "<span class='badge badge-secondary mr-2'>Nuevo</span> Adición de campos de suscriptor y clase de servicio",
        icono: "",
      },
      {
        nuevo_cambio:
          "Rediseño de interfaz con colores coorporativos <strong>CHEC</strong>",
        icono: "",
      },
      {
        nuevo_cambio:
          "Diseño pensado en la optimización del espacio de elementos",
        icono: "",
      },
      {
        nuevo_cambio: "Refinamiento del algoritmo",
        icono: "",
      },
      {
        nuevo_cambio: "Correcciones de problemas con ciertas cuentas",
        icono: "",
      },
      {
        nuevo_cambio: "Validaciones de datos de entrada y de proceso",
        icono: "",
      },
      {
        nuevo_cambio:
          "<span class='badge badge-secondary mr-2'>Nuevo</span> Implementación de Tour de interfaz de usuario",
        icono: "fas fa-info-circle",
      },
    ],
    version: "1.2",
    fecha_actualizacion: "2020/09/17",
  };

  
}
