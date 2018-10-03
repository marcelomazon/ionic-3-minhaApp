import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { IntroPage } from '../intro/intro';
import { CameraPage } from '../camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public configProvider: ConfigProvider,
    public alertCtrl: AlertController) { 
  }

  showAlert() {
    const alert = this.alertCtrl.create({ 
      title: 'Olá Mundo!',
      subTitle: 'Lorem ipsum dolor et mascadas helous mundus!',
      buttons: ['OK']
    });
    alert.present();
  }


  showConfirmacao() {
    const confirm = this.alertCtrl.create({
      title: 'Confirmação:',
      message: 'Deseja realmente tirar foto?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            //this.configProvider.clearDadosConfig();
            //this.navCtrl.setRoot(IntroPage);
            this.navCtrl.push(CameraPage);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
