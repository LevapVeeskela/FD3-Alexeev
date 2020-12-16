import { Component, OnInit } from '@angular/core';

import { SpriteModel } from './models/sprite.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  private sprites: SpriteModel[] = [];
  currentSprite?: SpriteModel;
  constructor() { }

  ngOnInit(): void {
    const url = "/assets/cards/2.png";
    this.sprites = [
      new SpriteModel(url, -5, -5, 143, 188),
      new SpriteModel(url, -158, -5, 143, 188),
      new SpriteModel(url, -313, -5, 143, 188),
      new SpriteModel(url, -5, -204, 143, 188)
    ];
    this.currentSprite = this.sprites[0];
  }

  nextSprite(): void {
    const index = this.sprites.findIndex(v => v === this.currentSprite);
    if (index + 1 === this.sprites.length) {
      this.currentSprite = this.sprites[0];
      return;
    }
    this.currentSprite = this.sprites[index + 1];
  }
}
