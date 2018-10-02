import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';

/*
  Generated class for the CartolaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartolaProvider {

  public urlBase = "/cartolaapi";

  constructor(public http: Http, public platform: Platform) {
    console.log('Hello CartolaProvider Provider');

    if (this.platform.is("cordova")) {
      this.urlBase = "https://api.cartolafc.globo.com";
    }
  }

  getAtletas() {
    return this.http.get(this.urlBase + "/atletas/mercado")
  }

}
