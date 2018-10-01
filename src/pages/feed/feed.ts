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
<<<<<<< HEAD
=======
  public refresher;
  public isRefreshing = false;
  public pagina = 1;
  public infiniteScroll;
>>>>>>> bca06a617ef564785e76441b655e843400c862b0

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
<<<<<<< HEAD
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
=======
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
>>>>>>> bca06a617ef564785e76441b655e843400c862b0
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
