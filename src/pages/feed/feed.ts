import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public nome_usuario = "Marcelo Mazon";
  public lista_filmes = new Array<any>();
  public loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
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

  //ionViewDidLoad() { // executado apenas na 1a vez q a página é carregada
  ionViewDidEnter() {
    this.abrirCarregando();
    console.log('ionViewDidLoad FeedPage');

    this.movieProvider.getLastMovies().subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.lista_filmes = obj_retorno.results;
        console.log(obj_retorno);
        this.fecharCarregando();
      },
      error => {
        this.fecharCarregando();
        console.log(error);
      }
    );
  }

}
