import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DeputadosProvider } from '../../providers/deputados/deputados';

/**
 * Generated class for the ContatoDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contato-detalhe',
  templateUrl: 'contato-detalhe.html',
})
export class ContatoDetalhePage {

  public deputado;
  public deputadoId;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public deputadoProvider: DeputadosProvider) {
  }

  ionViewDidEnter() {
    this.deputadoId = this.navParams.get("deputadoId");
    console.log(this.deputadoId);

    this.deputadoProvider.getDetalheDeputado(this.deputadoId)
      .subscribe(
        data => {
          let retorno = (data as any)._body;
          this.deputado = JSON.parse(retorno);
          console.log(this.deputado);
        },
        error => {
          console.log(error);
        }
      );
  }

  fecharModal() {
    this.viewCtrl.dismiss();
  }

}
