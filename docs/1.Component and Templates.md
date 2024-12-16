# **Components and Templates in Angular**

## **What Are Components?**
Components are the fundamental building blocks of an Angular application. They control a portion of the user interface (UI) and define how data is displayed and interacted with.

### **How It Works in the Back-End**
- **Component Class:** Contains the logic, data, and methods. This is written in TypeScript.
- **Template:** Defines the HTML structure for the component's view.
- **Component Metadata:** Configures the component using the `@Component` decorator.
- **Angular’s Renderer2:** Ensures platform-agnostic rendering, meaning the same component works for web, mobile, and even server-side rendering.

---

## **Anatomy of a Component**
A component consists of three main parts:
1. **TypeScript File** (`component-name.component.ts`): Contains the component logic.
2. **HTML File** (`component-name.component.html`): Defines the UI.
3. **CSS File** (`component-name.component.css`): Adds styling.

### **Example: A Simple Counter Component**
#### TypeScript File (`counter.component.ts`)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter', // Custom tag for this component
  templateUrl: './counter.component.html', // Template file
  styleUrls: ['./counter.component.css'] // Stylesheet file
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

#### Template File (`counter.component.html`)
```html
<div class="counter">
  <h1>Counter: {{ count }}</h1>
  <button (click)="increment()">Increment</button>
  <button (click)="decrement()">Decrement</button>
</div>
```

#### CSS File (`counter.component.css`)
```css
.counter {
  text-align: center;
}

button {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
}
```

---

## **Template Syntax**
Angular templates provide rich syntax for displaying data and binding UI elements to component logic.

### **Key Features**
1. **Interpolation (`{{ }}`):** Embeds component data into the template.
   ```html
   <p>Hello, {{ username }}!</p>
   ```
2. **Property Binding (`[ ]`):** Binds an element's property to a component property.
   ```html
   <input [value]="username">
   ```
3. **Event Binding (`( )`):** Binds an event to a method in the component.
   ```html
   <button (click)="sayHello()">Click Me</button>
   ```
4. **Two-Way Binding (`[( )]`):** Combines property and event binding.
   ```html
   <input [(ngModel)]="username">
   ```
5. **Directives:** Adds logic to templates.
   - Structural directives (`*ngIf`, `*ngFor`, etc.).
   - Attribute directives (`[class]`, `[style]`, etc.).

---

## **Component Lifecycle**
Components go through a lifecycle, from creation to destruction. Angular provides lifecycle hooks to tap into these stages:
- **`ngOnInit`:** Called after the component is initialized.
- **`ngOnChanges`:** Called when input properties change.
- **`ngOnDestroy`:** Called before the component is destroyed.

### Example of Using Lifecycle Hooks:
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: `<p>Check the console for lifecycle logs!</p>`
})
export class LifecycleComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('Component Initialized!');
  }

  ngOnDestroy() {
    console.log('Component Destroyed!');
  }
}
```

---

## **Usage Scenarios**
- **Reusable UI Pieces:** Buttons, modals, navigation bars, etc.
- **Page-Level Components:** Represents an entire page, e.g., `HomeComponent` or `DashboardComponent`.
- **Dynamic Content Loading:** Displays data fetched from an API.

---

## **Semi-Project: To-Do List Application**
### **Objective:**
Build a simple to-do list app to practice components and templates.

click [here](../projects/test1_component/README.md) to see codes and next semi-project documentation.



## ** in addition**


### **Component Lifecycle Hooks**
Angular components go through a series of lifecycle events. These are called **lifecycle hooks** and can be used to execute logic at specific stages.

### **Common Lifecycle Hooks**
1. **`ngOnInit`:** Called once after the component is initialized.
2. **`ngOnChanges`:** Called when an input-bound property changes.
3. **`ngOnDestroy`:** Called just before the component is destroyed.
4. **`ngAfterViewInit`:** Called after the component's view is initialized.

##### **Example**
```typescript
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: `<p>Check the console for lifecycle logs.</p>`
})
export class LifecycleComponent implements OnInit, OnChanges, OnDestroy {
  data = 'Initial Data';

  constructor() {
    console.log('Constructor: Component instance created.');
  }

  ngOnInit() {
    console.log('ngOnInit: Component initialized.');
  }

  ngOnChanges() {
    console.log('ngOnChanges: Input properties changed.');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: Component destroyed.');
  }
}
```

---

### **Two-Way Binding with `[(ngModel)]`**
Two-way data binding allows data synchronization between the component and the template. Changes in the input field automatically update the component property and vice versa.

##### **How It Works**
- The syntax `[(ngModel)]` combines:
  - **Property Binding (`[value]`)**
  - **Event Binding (`(input)`)**

##### **Example**
###### TypeScript File
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-two-way-binding',
  templateUrl: './two-way-binding.component.html'
})
export class TwoWayBindingComponent {
  username = '';
}
```

###### HTML File
```html
<input [(ngModel)]="username" placeholder="Enter your name">
<p>Hello, {{ username }}!</p>
```

##### **Backend Note**
Angular uses **FormsModule** to enable `[(ngModel)]`. Ensure it’s imported in `AppModule`:
```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  ...
})
```

---

### **Structural and Attribute Directives**
Directives modify the behavior or appearance of elements in the DOM.

#### **Structural Directives**
Structural directives change the structure of the DOM (add/remove elements).
1. **`*ngIf`**: Conditionally adds/removes an element.
2. **`*ngFor`**: Iterates over a list and creates elements for each item.

##### **Examples**
###### `*ngIf`
```html
<div *ngIf="isLoggedIn">
  <p>Welcome, user!</p>
</div>
<button (click)="isLoggedIn = !isLoggedIn">Toggle Login</button>
```

###### `*ngFor`
```html
<ul>
  <li *ngFor="let item of items; let i = index">
    {{ i + 1 }}. {{ item }}
  </li>
</ul>
```

#### **Attribute Directives**
Attribute directives modify the behavior or style of an existing element.
1. **`[style]`**: Dynamically changes styles.
2. **`[class]`**: Dynamically adds/removes classes.

##### **Examples**
###### `[style]`
```html
<p [style.color]="isImportant ? 'red' : 'blue'">
  This text changes color dynamically.
</p>
```

###### `[class]`
```html
<button [class.active]="isActive">Click Me</button>
```

---

### **Template Reference Variables (`#ref`)**
Template reference variables allow access to a DOM element or directive instance within the template.

##### **Example**
```html
<input #userInput placeholder="Enter your name">
<button (click)="greet(userInput.value)">Greet</button>
<p>{{ greeting }}</p>
```

###### TypeScript File
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-template-ref',
  templateUrl: './template-ref.component.html'
})
export class TemplateRefComponent {
  greeting = '';

  greet(name: string) {
    this.greeting = `Hello, ${name}!`;
  }
}
```

---

## **Summary**
1. **Component Anatomy**: Divides logic, structure, and styling into separate files.
2. **Lifecycle Hooks**: Allow you to execute logic during specific stages of a component’s life.
3. **Two-Way Binding**: Synchronizes data between the component and the template.
4. **Directives**: Enhance templates with dynamic behavior.
5. **Template Reference Variables**: Provide access to DOM elements and directives.