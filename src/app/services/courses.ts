import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Course from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class Courses {

  //LO PONDRE COMO BASE XQ CUNADO TOCA LLAMAR A LOS OTROS ENDPOINTS PARTE DESDE ESTA URL
  private urlBaseApi : string = 'http://localhost:5072/api/course';

  //INCIALIZAMOS EL OBJETO TIPO HTTP CLIENT PARA MANEJAR LAS SOLICITUDES
  constructor(private http: HttpClient){};


  //AQUI SOLO LLAMO AL URLBASE API XQ ES EL GET PARA OBTENER TODOS Y NO NECESITA UN PATH ADICIONAL EN LA BASE
  findAllCoures() : Observable<Course[]>{
    return this.http.get<Course[]>(this.urlBaseApi);
  }

  getCourseById(id : number) : Observable<Course>{
    return this.http.get<Course>(`${this.urlBaseApi}/${id}`)
  }

  createCourse(courObj : any) : Observable<Course>{
    return this.http.post<Course>(this.urlBaseApi,courObj);
  }

  
  updateCourse(id: number, courObj : any) : Observable<Course>{
    return this.http.put<Course>(`${this.urlBaseApi}/${id}`, courObj);
  }

}
