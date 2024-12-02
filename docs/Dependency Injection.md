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
ng generate service data --project=PROJECT_NAME
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
- you can see the project doc and repository [here](../projects/test2_dependercy_injection/README.md)

---

## **Why Use Services and DI?**
1. **Centralized Logic:** Services centralize shared logic, avoiding redundancy.
2. **Single Responsibility Principle:** Keeps components focused on UI, while services handle data and business logic.
3. **Testability:** Services are easier to test because they don't depend on Angular's DOM.
4. **Scalability:** Dependency injection makes it easy to extend and replace dependencies without modifying code.


## Dive deeper into subject

### **What is Singleton Behavior?**

In Angular, services are **singletons** by default when provided at the root level (`providedIn: 'root'`). 

#### **Definition of Singleton Behavior:**
A **singleton** is a design pattern where **only one instance of a class is created for the entire application**, and that same instance is shared wherever it is needed.

#### **How Singleton Works in Angular:**
- When you declare a service with `providedIn: 'root'`, Angular creates **one instance** of that service.
- This instance is cached and shared across all components, directives, or other services that inject it.
- No matter how many times you inject the service, you are always working with the same instance.

#### **Why Singleton Behavior is Useful:**
- Ensures consistency (shared state across components).
- Saves memory by avoiding multiple instances of the same service.

#### **Example of Singleton Behavior:**
```typescript
@Injectable({ providedIn: 'root' })
export class CounterService {
  counter = 0;

  increment() {
    this.counter++;
  }
}
```

##### Injecting the Service in Two Components:
**Component A:**
```typescript
@Component({
  selector: 'app-comp-a',
  template: `<button (click)="increment()">Increment in A</button> Count: {{ count }}`
})
export class CompAComponent {
  count = 0;

  constructor(private counterService: CounterService) {}

  increment() {
    this.counterService.increment();
    this.count = this.counterService.counter;
  }
}
```

**Component B:**
```typescript
@Component({
  selector: 'app-comp-b',
  template: `<button (click)="increment()">Increment in B</button> Count: {{ count }}`
})
export class CompBComponent {
  count = 0;

  constructor(private counterService: CounterService) {}

  increment() {
    this.counterService.increment();
    this.count = this.counterService.counter;
  }
}
```

##### **What Happens:**
- Both `CompAComponent` and `CompBComponent` share the same instance of `CounterService`.
- Incrementing the counter in one component updates it for the other because of the shared instance.

---

### **What is Dependency Injection (DI)?**

**Dependency Injection (DI)** is a **design pattern** used in Angular to:
1. Provide **dependencies (services or other classes)** to components, directives, or other services.
2. Let Angular handle the creation and lifecycle of those dependencies.

#### **Key Idea:**
Instead of a class creating its dependencies manually, the dependencies are **injected** by Angular.

---

#### **How Dependency Injection Works in Angular:**
1. Angular has an **injector** system, which acts like a factory that creates and manages service instances.
2. A component or service declares what dependencies it needs in its constructor.
3. Angular's injector automatically provides (injects) the required instances when the component/service is instantiated.

---

#### **Example: Without DI**
Without DI, you’d create a service instance manually:
```typescript
export class ComponentA {
  private service = new DataService(); // Manual creation
}
```
This has drawbacks:
- Tightly couples the component and the service.
- Harder to replace or mock the service for testing.

#### **Example: With DI**
With DI, Angular creates and injects the service:
```typescript
export class ComponentA {
  constructor(private service: DataService) {} // Injected automatically
}
```
This approach is:
- Flexible (dependencies can be swapped out easily).
- Easier to test.
- Aligns with the single responsibility principle (components don’t manage service creation).

---

### **Difference Between Dependency Injection and Services**

| **Aspect**          | **Service**                                       | **Dependency Injection (DI)**                                      |
|----------------------|--------------------------------------------------|--------------------------------------------------------------------|
| **Definition**       | A class designed to provide shared functionality. | A design pattern for injecting dependencies into components/services. |
| **Purpose**          | Encapsulates business logic or shared state.      | Supplies dependencies to components or other services.            |
| **Usage**            | Services are injected into components or other services. | The mechanism that injects services or other classes.             |
| **Instance Management** | A service can be a singleton or scoped to a specific component/module. | DI handles creation and management of service instances.           |
| **Example**          | `DataService` manages user data across the app.  | DI injects `DataService` into components like `LoginComponent`.    |

#### **Key Relationship:**
- **DI** is the mechanism that provides **services** (or other classes) to the places where they’re needed.

---

### **Back-End View of DI and Services**
When Angular compiles the application:
1. It creates an **injector tree** (a hierarchical structure).
2. When a component/service requests a dependency, the injector:
   - Checks if an instance already exists in the injector’s scope.
   - If it exists, the instance is reused (singleton behavior).
   - If it doesn’t exist, a new instance is created and cached.

#### **Example: DI in Action**
```typescript
@Injectable({ providedIn: 'root' })
export class DataService {}

@Component({ selector: 'app-comp-a' })
export class CompAComponent {
  constructor(private dataService: DataService) {}
}
```

##### Behind the Scenes:
- Angular notices that `CompAComponent` depends on `DataService`.
- It creates and caches an instance of `DataService` in the root injector.
- Whenever `DataService` is requested, Angular provides the same instance.

---

### **Summary**
1. **Services** encapsulate logic and state to be shared across the app.
2. **Dependency Injection (DI)** is the mechanism Angular uses to supply services (or other dependencies) to components, directives, or other services.
3. **Singleton Behavior** ensures that a single instance of a service is created and shared, promoting consistency and efficiency.