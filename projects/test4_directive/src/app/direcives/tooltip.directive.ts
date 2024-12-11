import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone : true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter(){
    this.add();
    this.show();
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.leave();
  }

  private add(){
    this.tooltipElement = this.renderer.createElement('li');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipText)
    );
  }
  private show(){
    this.renderer.addClass(this.tooltipElement,'tooltip');
    this.renderer.appendChild(this.el.nativeElement,this.tooltipElement);
  }
  private leave(){
    if (this.tooltipElement){
      this.renderer.removeChild(this.el.nativeElement,this.tooltipElement);
      this.tooltipElement = null;
    }

  }
}
