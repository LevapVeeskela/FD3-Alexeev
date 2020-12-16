import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SpriteComponent } from './components/sprite/sprite.component';
import { SpriteBgDirective } from './directives/sprite-bg.directive';

@NgModule({
  declarations: [
    AppComponent,
    SpriteComponent,
    SpriteBgDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
