import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acceso } from '../model/acceso';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private apiUrl="http://localhost:8080/api/v1/accesos"
  constructor(private http: HttpClient) { }

  getAccesos():Observable<Acceso[]>{
    return this.http.get<Acceso[]>(this.apiUrl);
  }
  getAccesoById(idAcceso:number):Observable<Acceso>{
    return this.http.get<Acceso>(`${this.apiUrl}/${idAcceso}`);
  }
  crearAcceso(acceso: Acceso):Observable<Acceso>{
    return this.http.post<Acceso>(this.apiUrl,acceso);
  }
  editarAcceso(acceso: Acceso):Observable<Acceso>{
    return this.http.post<Acceso>(this.apiUrl,acceso);
  }
  deleteAcceso(idAcceso: number){
    return this.http.delete(`${this.apiUrl}/${idAcceso}`);
  }
}
