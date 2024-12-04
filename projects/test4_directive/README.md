# **Semi-Project: Tooltip Directive**

#### **Goal**
Create a tooltip directive that displays a small popup when the user hovers over an element. For checking the repository of project [click here]()

---

#### **Steps to Build**

1. **Generate a Directive**
   ```bash
   ng generate directive tooltip
   ```

2. **Write Tooltip Logic**

##### **tooltip.directive.ts**

```typescript
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip: string = '';
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.appTooltip)
    );
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
```

3. **Add Styles in `styles.css`**

```css
.tooltip {
  position: absolute;
  background-color: black;
  color: white;
  padding: 5px;
  border-radius: 4px;
  font-size: 12px;
  top: -25px;
  left: 0;
}
```

4. **Usage in Template**

```html
<button appTooltip="Click me to do something!">Hover over me</button>
```
