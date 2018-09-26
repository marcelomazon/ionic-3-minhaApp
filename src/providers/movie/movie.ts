import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private url_base = "https://api.themoviedb.org/3/";

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLastMovies(){
    return this.http.get(this.url_base+"movie/popular?api_key="+this.getApiKey());
  }

  getApiKey(): String{
    return '92dcb904fce8b1194f508d102d8d8063';
  }

}
