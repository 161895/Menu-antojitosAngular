import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria/categoria.service';
// import { ExportDataService } from 'src/app/services/export-data/export-data.service';
// import { PdfServiceService } from '../../services/PDF/pdf.service';
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  actualizarCategorias: boolean = false;
  registrarCategorias: boolean = true;
  categorias: any;
  idCategorias: string;
  searchText: string;
  pageActual: number = 1;
  arraCategorias = [];
  arraNewCategorias = [];
  title: string;
  cargando: boolean;
  constructor(private categoriasService: CategoriaService) {
    // private categoriasService: CategoriaService, private _PdfService: PdfServiceService, private excelService: ExportDataService
    this.title = "Reporte de Sectores";
    this.cargando = false;
  }
  ngOnInit(): void {
    this.obtenerCategorias();
    this.arraCategorias = [];
  }
  eliminarCategoria(id: string) {
    this.categoriasService.eliminarCategorias(id).then((data: any) => {
      console.log(data);
      const nombre = data.cont.strNombre;
      console.log(nombre);
      Toast.fire({
        icon: 'success',
        title: `¡El sector:" ${nombre} " se desactivo correctamente!`
      });
      this.obtenerCategorias();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });

  }

  ActivarSector(id: string) {
    this.categoriasService.ActivarCategorias(id).then((data: any) => {
      console.log(data);
      const nombre = data.cont.strNombre;
      console.log(nombre);
      Toast.fire({
        icon: 'success',
        title: `¡El sector: " ${nombre} " se activo correctamente!`
      });
      this.obtenerCategorias();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });

  }
  obtenerCategorias() {
    this.cargando = true;
    this.categoriasService.obtenerCategorias().then((categorias: any) => {
      this.cargando = false;
      this.categorias = categorias.cont;

      for (const sector of this.categorias) {
        let element = [

          sector.strNombre.replace(/\:null/gi, ':""'),
          sector.blnActivo ? 'Si' : 'No',

        ];

        this.arraCategorias.push(element);
        this.arraNewCategorias = this.arraCategorias;
      }
    }).catch((err: any) => {
      this.cargando = false;
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
      this.categorias = [];
    });
  }
  mostrarActualizar(idCategorias: string) {
    this.idCategorias = idCategorias;
    this.actualizarCategorias = true;
    this.registrarCategorias = false;
  }

  terminarActualizacion(event) {
    this.ngOnInit();
    console.log(event);
    this.actualizarCategorias = false;
    this.registrarCategorias = true;
  }


  // exportPDF() {
  //   let header = [
  //     {
  //       text: "Nombre",
  //       alignment: "center",
  //       style: "tableHeader",
  //       bold: true,
  //       fillColor: "#2a3e52",
  //       color: "#ffffff",
  //       size: 13,

  //     },
  //     {
  //       text: "  Activo  ",
  //       alignment: "center",
  //       style: "tableHeader",
  //       bold: true,
  //       fillColor: "#2a3e52",
  //       color: "#ffffff",
  //       size: 13,
  //     }

  //   ];
  //   this._PdfService.generatePdf(
  //     "Reporte de Sectores",
  //     header,
  //     this.arraNewCategorias,
  //     "center"


  //   );
  // }
  // //exportar en excel
  // exportAsXLSX() {
  //   let jsnInfo = {};
  //   const jsnObject = [];

  //   if (this.categorias.length !== 0) {

  //     for (let datos of this.categorias) {
  //       jsnInfo = {};
  //       jsnInfo = {
  //         'Sectores': datos.strNombre,
  //         'Activo': datos.blnActivo ? 'Si' : 'No'
  //       };
  //       if (jsnInfo !== '') {
  //         jsnObject.push(jsnInfo);
  //       }
  //     }
  //     this.excelService.exportAsExcelFile(jsnObject, `${this.title}`);
  //   }
  // }

}
