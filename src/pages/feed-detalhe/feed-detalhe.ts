import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed-detalhe',
  templateUrl: 'feed-detalhe.html',
  providers: [MovieProvider]
})
export class FeedDetalhePage {

  public filme;
  public filmeId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieProvider: MovieProvider) {
  }

  ionViewDidLoad() {
    this.filmeId = this.navParams.get("id");
    this.movieProvider.getDetalhesMovie(this.filmeId)
      .subscribe(
        data => {
          let retorno = (data as any)._body;
          this.filme = JSON.parse(retorno);
          console.log(this.filme);
        },
        error => {
          console.log(error);
        }
      );
    console.log('ionViewDidLoad FeedDetalhePage: ' + this.filmeId);
  }

}
