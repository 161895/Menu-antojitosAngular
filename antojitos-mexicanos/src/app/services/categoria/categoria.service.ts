import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { CategoriasModel } from '../../models/categorias';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = `http://localhost:3000/api/categoria`;

  //servicio de Sectores
  constructor(private http: HttpClient) { }
  //funcion para obtener Sectores
  obtenerCategorias() {
    return this.http.get(`${this.url}/obtener`).toPromise();
  }
  //funcion para obtener Sectores por id
  obtenerCategoriasid(idCategorias: String) {
    return this.http.get(`${this.url}/obtener/${idCategorias}`).toPromise();
  }
  //funcion para registrar Sectores 
  registrarCategorias(categoria: CategoriasModel) {
    return this.http.post(`${this.url}/registrar`, categoria).toPromise();
  }
  //funcion para actualizar Sectores
  actualizarCategorias(idCategorias: String, categoria: CategoriasModel) {
    return this.http.put(`${this.url}/modificar/${idCategorias}`, categoria ).toPromise();
  }
  eliminarCategorias(idCategoria: string) {
    return this.http.delete(`${this.url}/eliminar/${idCategoria}`, {}).toPromise();
  }
  ActivarCategorias(idCategorias: String) {
    return this.http.delete(`${this.url}/activar/${idCategorias}`).toPromise();

}
}





