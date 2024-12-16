# **Directives in Angular**

---

Directives are a key feature of Angular, enabling developers to dynamically manipulate the DOM and behavior of elements. They allow for customization, reusable logic, and dynamic styling or content changes.

---

### **Types of Directives**

Angular provides three types of directives:

1. **Component Directives**: 
   - Technically a type of directive.
   - They include a template (`.html`) to render and are always associated with their own selector.
   - Example: `@Component`.

2. **Structural Directives**:
   - Used to change the DOM layout by adding, removing, or manipulating elements.
   - Example: `*ngIf`, `*ngFor`, `*ngSwitch`.

3. **Attribute Directives**:
   - Modify the appearance or behavior of an element without altering the DOM structure.
   - Example: `ngClass`, `ngStyle`, custom attribute directives.

---

### **1. Structural Directives**

Structural directives start with `*` and are used to change the structure of the DOM.

#### **Common Structural Directives**

1. **`*ngIf`**
   - Conditionally renders a template.
   - Example:
     ```html
     <div *ngIf="isVisible">This is visible</div>
     ```

2. **`*ngFor`**
   - Iterates over a collection.
   - Example:
     ```html
     <ul>
       <li *ngFor="let item of items">{{ item }}</li>
     </ul>
     ```

3. **`*ngSwitch`**
   - Conditionally renders one template among many.
   - Example:
     ```html
     <div [ngSwitch]="value">
       <p *ngSwitchCase="'A'">Case A</p>
       <p *ngSwitchCase="'B'">Case B</p>
       <p *ngSwitchDefault>Default Case</p>
     </div>
     ```

---

### **2. Attribute Directives**

Attribute directives modify the appearance or behavior of an element.

#### **Common Attribute Directives**

1. **`[ngClass]`**
   - Dynamically applies classes to an element.
   - Example:
     ```html
     <div [ngClass]="{ active: isActive, disabled: isDisabled }">Class Directive</div>
     ```

2. **`[ngStyle]`**
   - Dynamically applies styles to an element.
   - Example:
     ```html
     <div [ngStyle]="{ color: isRed ? 'red' : 'blue' }">Style Directive</div>
     ```

---

### **Creating Custom Directives**

You can create your own structural or attribute directives to encapsulate custom logic.

#### **Step 1: Create a Directive**

Use the Angular CLI to generate a directive:

```bash
ng generate directive highlight
```

---

#### **Example 1: Custom Attribute Directive**

Highlight text on hover.

##### **highlight.directive.ts**

```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() highlightColor: string = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

##### **Usage in Template**

```html
<p appHighlight highlightColor="lightblue">Hover over me to see a highlight!</p>
```

---

#### **Example 2: Custom Structural Directive**

Repeat an element multiple times.

##### **repeat.directive.ts**

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]'
})
export class RepeatDirective {
  @Input('appRepeat') set repeat(times: number) {
    this.viewContainer.clear();
    for (let i = 0; i < times; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
```

##### **Usage in Template**

```html
<p *appRepeat="3">This will be repeated three times.</p>
```

---

### **Directives Behind the Scenes**

- **Directives are classes**: At runtime, Angular creates instances of directive classes and links them to host elements.
- **Template parsing**: Angular compiles the template and replaces structural directives (like `*ngIf`) with their logic to manipulate the DOM.
- **Event binding**: Host listeners enable attribute directives to listen to DOM events like clicks, mouseovers, etc.
- **Dependency Injection (DI)**: Directives can inject services for complex logic.

---

### **Semi-Project: Tooltip Directive**

#### **Goal**
Create a tooltip directive that displays a small popup when the user hovers over an element. For checking the repository of project [click here]()

---

### **Conclusion**

- **Structural Directives** control the DOM structure.
- **Attribute Directives** control appearance or behavior.
- **Custom Directives** enable reusable, encapsulated logic.
- **Angular’s DI system** allows directives to leverage services for complex tasks.