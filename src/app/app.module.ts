import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoinAnimationComponent } from './coin-animation/coin-animation.component';
import { PacManAnimationComponent } from './pac-man-animation/pac-man-animation.component';
import { DrawStreamComponent } from './draw-stream/draw-stream.component';

@NgModule({
  declarations: [
    AppComponent,
    CoinAnimationComponent,
    PacManAnimationComponent,
    DrawStreamComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
