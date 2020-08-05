import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlatillosModels } from '../../../models/platillo';
import { PlatillosService } from '../../../services/platillos/platillos.service';
import  Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';





const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-inserta-p',
  templateUrl: './inserta-p.component.html',
  styleUrls: ['./inserta-p.component.css']
})
export class InsertaPComponent implements OnInit {
  @Input() componentes;
  @Input() idPlatillos;
  @Output() salida = new EventEmitter();
  @Output() terminarActualizacion = new EventEmitter();

  platillos: PlatillosModels = new PlatillosModels();

  constructor( public platillosService: PlatillosService, public activateRoute: ActivatedRoute ) { 
    this.platillos.idCategoria = activateRoute.snapshot.params.idCategoria;
  }

  ngOnInit(): void {
  }


  registrarPlatillos(forma: NgForm){
  
    this.platillosService.registrarPlatillos(this.platillos).then((resp: any) => {
  
      this.terminarActualizacion.emit();
      Toast.fire({
        icon: 'success',
        title: `¡El platillo "${this.platillos.strNombre}" fue agregado correctamente!`
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


