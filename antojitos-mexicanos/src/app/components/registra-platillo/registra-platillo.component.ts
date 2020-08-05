import { Component, OnInit } from '@angular/core';
import { ExportDataService } from 'src/app/services/export-data/export-data.service';
import { PdfServiceService } from '../../services/PDF/pdf.service';
import Swal from 'sweetalert2';
import { PlatillosService } from '../../services/platillos/platillos.service';
import { ActivatedRoute } from '@angular/router';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-registra-platillo',
  templateUrl: './registra-platillo.component.html',
  styleUrls: ['./registra-platillo.component.css']
})
export class RegistraPlatilloComponent implements OnInit {
  actualizarPlatillos: boolean = false;
  registrarPlatillos: boolean = true;
  platillos: any;
  idPlatillos: string;
  searchText: string;
  pageActual: number = 1;
  arraPlatillos = [];
  arraNewPlatillos = [];
  title: string;
  cargando: boolean;
  categoria: any;

  constructor(private platillosService: PlatillosService, private _PdfService: PdfServiceService, private excelService: ExportDataService, public activateRoute: ActivatedRoute ) { 
    this.title = "Reporte de platillos";
    this.categoria = activateRoute.snapshot.params.idCategoria;
  }

  ngOnInit(): void {
    this.obtenerPlatillos();
    this.arraPlatillos = [];
  }
  
  eliminarPlatillo(id: string) {
    this.platillosService.eliminarPlatillo(id).then((data: any) => {
      console.log(data);
      const nombre = data.cont.strNombre;
      console.log(nombre);
      Toast.fire({
        icon: 'success',
        title: `¡El platillo:" ${nombre} " se desactivo correctamente!`
      });
      this.obtenerPlatillos();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });

  }

  ActivarPlatillo(id: string) {
    this.platillosService.ActivarPlatillos(id).then((data: any) => {
      console.log(data);
      const nombre = data.cont.strNombre;
      console.log(nombre);
      Toast.fire({
        icon: 'success',
        title: `¡El platillo: " ${nombre} " se activo correctamente!`
      });
      this.obtenerPlatillos();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });

  }



  
  obtenerPlatillos() {
    this.cargando = true;
    this.platillosService.obtenerPlatillos(this.categoria).then((platillos: any) => {
      this.cargando = false;
      this.platillos = platillos.cont;

      for (const platillo of this.platillos) {
        let element = [

          platillo.strNombre.replace(/\:null/gi, ':""'),
          platillo.strDescripcion.replace(/\:null/gi, ':""'),
          platillo.strIngredientes,
          platillo.nmbPiezas,
          platillo.nmbPrecio,
          platillo.blnActivo ? 'Si' : 'No',

        ];

        this.arraPlatillos.push(element);
        this.arraNewPlatillos = this.arraPlatillos;
      }
    }).catch((err: any) => {
      this.cargando = false;
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
      this.platillos = [];
    });
  }
  mostrarActualizar(idPlatillos: string) {
    this.idPlatillos = idPlatillos;
    this.actualizarPlatillos = true;
    this.registrarPlatillos = false;
  }

  terminarActualizacion(event) {
    this.ngOnInit();
    console.log(event);
    this.actualizarPlatillos = false;
    this.registrarPlatillos = true;
  }


  exportPDF() {
    let header = [
      {
        text: "Nombre",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Descripción",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Ingredientes",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Piezas",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "Precio",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,

      },
      {
        text: "  Estatus  ",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      }

    ];
    this._PdfService.generatePdf(
      "Reporte de categorias",
      header,
      this.arraNewPlatillos,
      "center"


    );
  }
  //exportar en excel
  exportAsXLSX() {
    let jsnInfo = {};
    const jsnObject = [];

    if (this.platillos.length !== 0) {

      for (let datos of this.platillos) {
        jsnInfo = {};
        jsnInfo = {
          'Nombre': datos.strNombre,
          'Descripcion': datos.strDescripcion,
          'Ingredientes': datos.strIngredientes,
          'Piezas': datos.nmbPiezas,
          'Precio': datos.nmbPrecio,
          'Estatus': datos.blnEstatus ? 'Si' : 'No'
        };
        if (jsnInfo !== '') {
          jsnObject.push(jsnInfo);
        }
      }
      this.excelService.exportAsExcelFile(jsnObject, `${this.title}`);
    }
  }

}















