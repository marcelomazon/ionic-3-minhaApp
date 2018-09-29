import { Injectable } from '@angular/core';

let config_name = "dadosConfig"

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    username: ""
  }

  constructor() {

  }

  //recuperar dados do locastorage
  getDadosConfig(): any {
    return localStorage.getItem(config_name);
  }

  //grava dados no localstorage
  setDadosConfig(
    showSlide: boolean,
    name: string,
    username: string) {
      let config = {
        showSlide: false,
        name: "",
        username: ""
      };
      
      if (showSlide){
        config.showSlide = showSlide;
      }

      if (name){
        config.name = name;
      }

      if (username){
        config.username = username;
      }

      localStorage.setItem(config_name, JSON.stringify(config));
  }

  clearDadosConfig(){
    localStorage.clear();
  }

}
