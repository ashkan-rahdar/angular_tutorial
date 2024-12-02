# **Services and Dependency Injection in Angular**

Services and dependency injection are foundational concepts in Angular, enabling code reusability, modularity, and maintainability. Let's break these concepts into digestible pieces and explore how they work, why they're important, and how you can use them effectively.

---

## **What Are Services?**
A **service** is a class in Angular designed to provide a **shared resource** or **functionality** across components. They encapsulate logic that doesn't belong to a specific component, such as:
- Fetching data from an API.
- Managing shared state.
- Performing business logic.

### **Key Points:**
- Services are **singletons** by default. A single instance is created and shared across the application when provided in the root injector.
- Services help separate concerns by keeping your components lean.

### **Example: Basic Service**
#### Step 1: Create a Service
Run the Angular CLI command:
```bash
ng generate service data
```

This generates `data.service.ts`:
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes the service available application-wide
})
export class DataService {
  private data: string[] = [];

  addData(item: string) {
    this.data.push(item);
  }

  getData(): string[] {
    return this.data;
  }
}
```

#### Step 2: Inject and Use the Service in a Component
In a component, use the service:
```typescript
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-example',
  template: `
    <input #itemInput placeholder="Add item">
    <button (click)="addItem(itemInput.value)">Add</button>
    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>
  `
})
export class ExampleComponent {
  items: string[] = [];

  constructor(private dataService: DataService) {}

  addItem(item: string) {
    this.dataService.addData(item);
    this.items = this.dataService.getData();
  }
}
```

---

## **What Is Dependency Injection (DI)?**
**Dependency Injection** is a design pattern in Angular where dependencies (services or other classes) are **injected into components, directives, or other services**, rather than being created manually.

### **How It Works in Angular:**
1. Angular has an **injector** system that creates and manages service instances.
2. When a component or another service needs a dependency, the Angular **injector** provides the requested instance.
3. This promotes **loose coupling** and better testability.

---

## **How to Provide a Service**
### 1. **Provided in `@Injectable`:**
Services are usually provided at the root level by adding `providedIn: 'root'` in the `@Injectable` decorator.

### 2. **Provided in a Module (`@NgModule`):**
You can manually declare services in the `providers` array of a module.

#### Example:
```typescript
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [MyService], // Manual registration
})
export class AppModule {}
```

### 3. **Provided in a Component/Directive:**
If provided in a component, the service's instance is limited to that component and its child components.

---

## **Practical Examples**

### **Global Data Sharing Example**
#### Service for Managing User Data
```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string = '';

  setUsername(name: string) {
    this.username = name;
  }

  getUsername(): string {
    return this.username;
  }
}
```

#### Component A: Set Username
```typescript
@Component({
  selector: 'app-login',
  template: `
    <input #nameInput placeholder="Enter username">
    <button (click)="setUsername(nameInput.value)">Set Username</button>
  `
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  setUsername(name: string) {
    this.userService.setUsername(name);
  }
}
```

#### Component B: Display Username
```typescript
@Component({
  selector: 'app-profile',
  template: `
    <p>Username: {{ username }}</p>
  `
})
export class ProfileComponent {
  username = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.username = this.userService.getUsername();
  }
}
```

---

### **Injecting Services into Other Services**
Services can depend on other services.

#### Example: Logging Service
```typescript
@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  log(message: string) {
    console.log(`LOG: ${message}`);
  }
}
```

#### Example: Data Service Using LoggingService
```typescript
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: string[] = [];

  constructor(private loggingService: LoggingService) {}

  addData(item: string) {
    this.data.push(item);
    this.loggingService.log(`Added: ${item}`);
  }

  getData(): string[] {
    return this.data;
  }
}
```

---

## **Lifecycle of a Service**
1. **Instantiation:** Angular's injector creates a service instance when it's first requested.
2. **Caching:** The instance is cached, and the same instance is provided for subsequent requests (singleton behavior).
3. **Destruction:** Services are destroyed only when their scope (e.g., component scope) is destroyed.

---

## **Semi-Project: Task Manager**
### Objective:
Create a task manager where:
- Tasks are added using a form.
- A service manages the list of tasks.
- Components interact with the service to display and manipulate tasks.

#### **Task Service**
```typescript
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: string[] = [];

  addTask(task: string) {
    this.tasks.push(task);
  }

  getTasks(): string[] {
    return this.tasks;
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
```

#### **Task Component**
```typescript
@Component({
  selector: 'app-task',
  template: `
    <input #taskInput placeholder="Add a task">
    <button (click)="addTask(taskInput.value)">Add Task</button>
    <ul>
      <li *ngFor="let task of tasks; let i = index">
        {{ task }}
        <button (click)="removeTask(i)">Remove</button>
      </li>
    </ul>
  `,
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasks: string[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  addTask(task: string) {
    if (task.trim()) {
      this.taskService.addTask(task);
      this.tasks = this.taskService.getTasks();
    }
  }

  removeTask(index: number) {
    this.taskService.removeTask(index);
    this.tasks = this.taskService.getTasks();
  }
}
```

#### **Styling (`task.component.css`)**
```css
input {
  margin-right: 10px;
  padding: 5px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
}
```

---

## **Why Use Services and DI?**
1. **Centralized Logic:** Services centralize shared logic, avoiding redundancy.
2. **Single Responsibility Principle:** Keeps components focused on UI, while services handle data and business logic.
3. **Testability:** Services are easier to test because they don't depend on Angular's DOM.
4. **Scalability:** Dependency injection makes it easy to extend and replace dependencies without modifying code.