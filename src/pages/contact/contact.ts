import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DeputadosProvider } from '../../providers/deputados/deputados';

/**
 * Generated class for the contactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [
    DeputadosProvider
  ]
})

export class ContactPage {

  public lista_deputados = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private DeputadosProvider: DeputadosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad contactPage');

    this.DeputadosProvider.getDeputados().subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.lista_deputados = obj_retorno.dados;
        console.log(obj_retorno);
      }
    )
  }

}
