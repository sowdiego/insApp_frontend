import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/observable/throw';

import { Inscription } from "./inscription.model";


@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  selectedInscription:Inscription;
  inscriptions:Inscription[];
  readonly urlApi = 'http://insappsow.herokuapp.com/inscriptions';
  constructor(private http:HttpClient) { }

  postInscription(ins:Inscription){
    return this.http.post(this.urlApi,ins);
  }

  listInscription(){
    return this.http.get(this.urlApi);
  }
  putInscription(ins: Inscription){
    return this.http.put(this.urlApi + `/${ins._id}`,ins);
  }
  deleteInscription(_id :string){
    return this.http.delete(this.urlApi + `/${_id}`)
  }
} 
