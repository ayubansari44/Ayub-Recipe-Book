import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective{
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('document:click', ['$event']) mouseEnter(event: Event)
  {
    // this.isOpen = !this.isOpen; //normal code
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false; //to close dropdown from anywhere on page
  }

  constructor(private elementRef: ElementRef) { }

}
