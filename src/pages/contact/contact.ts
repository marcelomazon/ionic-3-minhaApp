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
  public refresher;
  public isRefreshing = false;
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad contactPage');
    this.showLoading();
    this.carregarDeputados();
  }

  carregarDeputados() {
    this.DeputadosProvider.getDeputados()
      .subscribe(
        data => {
          const response = (data as any);
          const obj_retorno = JSON.parse(response._body);
          this.lista_deputados = obj_retorno.dados;
          this.fecharRefresh();
          this.loading.dismiss();
          console.log(obj_retorno);
        },
        error => {
          this.fecharRefresh();
          this.loading.dismiss();
          this.errorMessage = <any>error;
          console.log(this.errorMessage);
        }
      )
  }

}
