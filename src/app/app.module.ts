import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AsteroidsComponent } from './asteroids/asteroids.component';

@NgModule({
  declarations: [
    AppComponent,
    AsteroidsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
