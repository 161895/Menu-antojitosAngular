import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import  Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { CategoriasModel } from '../../../models/categorias';



const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-registra-p',
  templateUrl: './registra-p.component.html',
  styleUrls: ['./registra-p.component.css']
})
export class RegistraPComponent implements OnInit {

  @Input() componentes;
  @Input() idCategorias;
  @Output() salida = new EventEmitter();
  @Output() terminarActualizacion = new EventEmitter();

  categorias: CategoriasModel = new CategoriasModel();
  constructor( public categoriaService: CategoriaService ) { }

  ngOnInit(): void {
  }
registraCategoria(forma: NgForm){
  
    this.categoriaService.registrarCategorias(this.categorias).then((resp: any) => {
  
      this.terminarActualizacion.emit();
      Toast.fire({
        icon: 'success',
        title: `¡El sector "${this.categorias.strNombre}" fue agregado correctamente!`
      });
      forma.controls['strNombre'].reset();
  
    }).catch((err) => {
      console.log(err);
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  
}
}
