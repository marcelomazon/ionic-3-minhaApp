import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})

export class IntroPage {

  rootPage:any = TabsPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configProvider: ConfigProvider,
    public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  showConfig() { 
    return this.configProvider.getDadosConfig();
  }


  openMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'O que vc quer fazer?',
      buttons: [
        {
          text: 'Ir para página de Abas', 
          role: 'goto_abas',
          handler: () => {
            let config = this.configProvider.getDadosConfig();

            if (!config){
              config = this.configProvider.setDadosConfig(false,"Marcelo","mazon");
              this.navCtrl.push(TabsPage);
            }
            else{
              this.rootPage = TabsPage; 
            }
            console.log(config);
            console.log('Vamos para as abas');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
