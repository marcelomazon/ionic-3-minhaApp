import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FeedDetalhePage } from '../feed-detalhe/feed-detalhe';

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
  public refresher;
  public isRefreshing = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...',
      spinner: 'dots'
    });
    this.loading.present();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  fecharRefresh() {
    if (this.isRefreshing) {
      this.isRefreshing = false;
      this.refresher.complete();
    }
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhe(filme) {
    console.log(filme);
    this.navCtrl.push(FeedDetalhePage, {id: filme.id});
  }

  carregarFilmes() {
    this.showLoading();
    this.movieProvider.getLastMovies().subscribe(
      data => {
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.lista_filmes = obj_retorno.results;
        console.log(obj_retorno);
        this.fecharRefresh();
        this.loading.dismiss();
      },
      error => {
        console.log(error);
        this.fecharRefresh();
        this.loading.dismiss();
      }
    )
  }
}
