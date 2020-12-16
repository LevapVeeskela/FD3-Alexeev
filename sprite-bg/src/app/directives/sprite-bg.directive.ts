import { Directive, HostBinding, DoCheck } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  selector: '[sprite-bg]',
  inputs: ["url: sprite-url", "offsetX: sprite-offset-x", "offsetY: sprite-offset-y", "width: sprite-width", "height: sprite-height"]
})
export class SpriteBgDirective implements DoCheck {
  private url?: string;
  private offsetX?: number;
  private offsetY?: number;
  private width?: number;
  private height?: number;

  @HostBinding("style.display")
  private displayElement?: SafeStyle;
  @HostBinding("style.background")
  private backgroundElement?: SafeStyle;
  @HostBinding("style.background-position")
  private backgroundPosition?: SafeStyle;
  @HostBinding("style.width")
  private widthElement?: SafeStyle;
  @HostBinding("style.height")
  private heightElement?: SafeStyle;

  // @HostListener('click') onClick() { // не подходит так как сначала отрабатывает click, а лишь потом привязанный метод к ней, то есть деректива отработает раньше
  //   this.setValues();
  // }

  constructor(private sanitizer: DomSanitizer) {
  }

  ngDoCheck(): void {
    this.setValues();
  }

  setValues() {
    this.displayElement = this.sanitizer.bypassSecurityTrustStyle('display');
    this.backgroundElement = this.sanitizer.bypassSecurityTrustStyle(
      `url(${this.url}) no-repeat`);
    this.backgroundPosition = this.sanitizer.bypassSecurityTrustStyle(`${this.offsetX}px ${this.offsetY}px`);
    this.widthElement = this.sanitizer.bypassSecurityTrustStyle(`${this.width}px`);
    this.heightElement = this.sanitizer.bypassSecurityTrustStyle(`${this.height}px`);
  }
}
