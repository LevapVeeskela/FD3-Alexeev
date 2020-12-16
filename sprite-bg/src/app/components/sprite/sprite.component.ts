import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sprite',
  templateUrl: 'sprite.component.html',
  styleUrls: ['sprite.component.css']
})
export class SpriteComponent implements OnInit {
  @Input("url")
  url?:string;

  @Input("offset-x")
  offsetX?:number;

  @Input("offset-y") 
  offsetY?:number; 
  
  @Input("width") 
  width?:number;
  
  @Input("height") 
  height?:number;

  @Output("next")
  private nextScpriteEE = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  next(){
    this.nextScpriteEE.emit();
  }

  getSpriteStyle(): object{
    return {
      'display': 'block',
      'background-repeat': 'no-repeat',
      'background-image': `url(${this.url})`,
      'width': `${this.width}px`,
      'height': `${this.height}px`,
      'background-position': `${this.offsetX}px ${this.offsetY}px`
    }
  }
}
