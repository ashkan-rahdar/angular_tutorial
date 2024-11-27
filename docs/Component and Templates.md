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

### **Steps:**
1. **Create the Main Component**:
   - Use `ng g c todo-list`.
   - Define a `tasks` array to hold the list items.
   - Implement methods to add and remove tasks.

2. **Define the Template**:
   - Use an `*ngFor` directive to loop through the `tasks` array.
   - Add input fields and buttons for adding tasks.

3. **Add Styling**:
   - Use CSS to make the list visually appealing.

### **Code Example**
#### TypeScript File (`todo-list.component.ts`)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  tasks: string[] = [];
  newTask = '';

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
```

#### Template File (`todo-list.component.html`)
```html
<div class="todo-container">
  <h1>To-Do List</h1>
  <div>
    <input [(ngModel)]="newTask" placeholder="Enter a new task">
    <button (click)="addTask()">Add Task</button>
  </div>
  <ul>
    <li *ngFor="let task of tasks; let i = index">
      {{ task }}
      <button (click)="removeTask(i)">Remove</button>
    </li>
  </ul>
</div>
```

#### CSS File (`todo-list.component.css`)
```css
.todo-container {
  text-align: center;
  max-width: 400px;
  margin: auto;
}

input {
  margin-right: 10px;
  padding: 5px;
}

button {
  padding: 5px 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  padding: 2px 5px;
  color: white;
  background-color: red;
  border: none;
  border-radius: 3px;
}
```

---

## **Summary**
- Components divide an app into smaller, reusable pieces.
- Templates define the UI and link to component logic using rich Angular syntax.
- Lifecycle hooks allow you to control behavior at specific stages of a component's life.

**Practice Challenge:** Extend the To-Do List app to include:
- A task completion toggle (mark a task as done).
- A "Clear All" button to remove all tasks.