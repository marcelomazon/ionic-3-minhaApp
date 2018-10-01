import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedDetalhePage } from './feed-detalhe';

@NgModule({
  declarations: [
    FeedDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(FeedDetalhePage),
  ],
})
export class FeedDetalhePageModule {}
