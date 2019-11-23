import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event): void {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) { }

  // Alternative
  // isOpen = false;

  // constructor(private elRef: ElementRef, private renderer: Renderer2) {
  // }

  // @HostListener('click') toggleOpen(): void {
  //   this.isOpen = !this.isOpen;
  //   if (this.isOpen) {
  //     this.renderer.addClass(this.elRef.nativeElement, 'open');
  //   } else {
  //     this.renderer.removeClass(this.elRef.nativeElement, 'open');
  //   }
  // }


}
