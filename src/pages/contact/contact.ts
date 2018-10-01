import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { DeputadosProvider } from '../../providers/deputados/deputados';
import { ContatoDetalhePage } from '../contato-detalhe/contato-detalhe';

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
  public refresher;
  public isRefreshing = false;
  public loading;
  public errorMessage;
  public infiniteScroll;
  public url_next = "";
  public modalDetalhe;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private DeputadosProvider: DeputadosProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      //content: 'Carregando...',
      spinner: 'dots'
    });
    this.loading.present();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarDeputados();
  }

  fecharRefresh() {
    if (this.isRefreshing) {
      this.isRefreshing = false;
      this.refresher.complete();
    }
    if (this.infiniteScroll)
      this.infiniteScroll.complete();

    this.loading.dismiss();
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.carregarDeputados();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad contactPage');
    this.showLoading();
    this.carregarDeputados();
  }

  showModalDetalhe(id: number = 0) {
    this.modalDetalhe = this.modalCtrl.create(ContatoDetalhePage, { deputadoId: id });
    this.modalDetalhe.present();

    this.modalDetalhe.onDidDismiss(data => {  
      console.log(data);
    });

  }

  fecharModalDetalhe() {
    this.modalDetalhe.dismiss();
  }
  
  carregarDeputados() {
    this.DeputadosProvider.getDeputados(this.url_next)
      .subscribe(
        data => {
          const response = (data as any);
          const obj_retorno = JSON.parse(response._body);
          this.lista_deputados = this.lista_deputados.concat(obj_retorno.dados);
          this.url_next = obj_retorno.links[1].href;
          this.fecharRefresh();
          console.log(obj_retorno, this.url_next);
        },
        error => {
          this.fecharRefresh();
          this.errorMessage = <any>error;
          console.log(this.errorMessage);
        }
      )
  }

}
