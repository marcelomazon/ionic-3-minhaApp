import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
  public loading;

  data: any;
  users: string[];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private DeputadosProvider: DeputadosProvider,
    public loadingCtrl: LoadingController) {
  }

  abrirCarregando() {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Carregando...'
    });
    this.loading.present();
  }

  fecharCarregando() {
    this.loading.dismiss();
  }

  //ionViewDidLoad() { // executa apenas na 1a. vez q carrega o aplicativo
  ionViewDidEnter() {
    this.abrirCarregando();
    console.log('ionViewDidLoad contactPage');

    this.DeputadosProvider.getDeputados()
      .subscribe(
        data => {
          const response = (data as any);
          const obj_retorno = JSON.parse(response._body);
          this.lista_deputados = obj_retorno.dados;
          this.fecharCarregando();
          console.log(obj_retorno);
        },
        error => {
          this.fecharCarregando();
          this.errorMessage = <any>error;
          console.log(this.errorMessage);
        }
      )
  }

}
