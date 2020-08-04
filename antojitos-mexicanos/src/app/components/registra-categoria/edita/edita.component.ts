import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasModel } from '../../../models/categorias';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});



@Component({
  selector: 'app-edita',
  templateUrl: './edita.component.html',
  styleUrls: ['./edita.component.css']
})
export class EditaComponent implements OnInit {

  actualizarCategorias = true;
  registrarCategorias = false;
  idCategoria: string;
  @Input() set idCategorias( value){
    
    this.idCategoria = value;
    this.ngOnInit();
  }

  @Output() terminarActualizacion = new EventEmitter();

  categoria: CategoriasModel = new CategoriasModel();


  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    console.log(this.idCategoria);
    this.categoriaService.obtenerCategoriasid(this.idCategoria).then((resp: any) => {
  
        console.log(this.idCategoria);
        this.categoria = resp.cont[0];
        console.log(this.categoria);
  
      }).catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.error.msg
        });
      });

  }

  actualizar() {
    this.categoriaService.actualizarCategorias(this.idCategoria, this.categoria).then((resp: any) => {

      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: `¡La categoría "${this.categoria.strNombre}" fue actualizado correctamente!`
      });
      this.terminarActualizacion.emit();

    }).catch((err: any) => {
      console.log(err);
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
      this.terminarActualizacion.emit();
    });

  }
  cancelar() {
    this.terminarActualizacion.emit();

  }
  

}





