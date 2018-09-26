import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DeputadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeputadosProvider {

  private url_base = "https://dadosabertos.camara.leg.br/api/v2";

  constructor(public http: Http) {
    console.log('Hello DeputadosProvider Provider');
  }

  getDeputados(){
    return this.http.get(this.url_base+"/deputados");
  }

}
