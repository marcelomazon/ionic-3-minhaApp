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
  public pagina = 1;
  public infiniteScroll;

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
    this.pagina = 1;
    this.carregarFilmes();
  }

  fecharRefresh() {
    if (this.isRefreshing) {
      this.isRefreshing = false;
      this.refresher.complete();
    }
  }

  ionViewDidLoad() {
    this.carregarFilmes();
  }

  abrirDetalhe(filme) {
    console.log(filme);
    this.navCtrl.push(FeedDetalhePage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.pagina++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(novaPagina: boolean = false) {
    this.showLoading();
    this.movieProvider.getLastMovies(this.pagina)
      .subscribe(
        data => {
          const response = (data as any);
          const obj_retorno = JSON.parse(response._body);

          if (novaPagina) {
            console.log('nova pagina: '+this.pagina)
            this.lista_filmes = this.lista_filmes.concat(obj_retorno.results);
            this.infiniteScroll.complete();
          } else {
            console.log('pagina normal: '+this.pagina);
            this.lista_filmes = obj_retorno.results;
          }
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
