import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartolaProvider } from '../../providers/cartola/cartola';

/**
 * Generated class for the AtletasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atletas',
  templateUrl: 'atletas.html',
})
export class AtletasPage {

  public lista_atletas;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartolaProvider: CartolaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtletasPage');
    this.carregarAtletas();
  }

  carregarAtletas() {
    this.cartolaProvider.getAtletas().subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body).atletas;
        this.lista_atletas = obj_retorno;
        console.log(this.lista_atletas);
      },
      error => {
        console.log(error);
      }
    )

  }

}
