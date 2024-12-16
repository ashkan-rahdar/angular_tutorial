### **Understanding Pipes in Angular**

---

#### **What are Pipes?**

In Angular, **Pipes** transform data in templates. They take data as input and modify or format it before displaying it in the view.

---

#### **Key Features of Pipes**

1. **Pure Functions**: Pipes are pure by default. They produce the same output for the same input without side effects.
2. **Chaining**: Pipes can be chained to apply multiple transformations.
3. **Custom Pipes**: Angular allows developers to create their own pipes for custom transformations.
4. **Parameterization**: Many built-in pipes accept arguments to customize their behavior.

---

#### **Built-in Pipes**

Angular provides several built-in pipes for common tasks:

1. **`DatePipe`**: Formats dates.
2. **`CurrencyPipe`**: Formats currency values.
3. **`DecimalPipe`**: Formats decimal numbers.
4. **`PercentPipe`**: Formats percentages.
5. **`JsonPipe`**: Converts objects to JSON strings.
6. **`AsyncPipe`**: Handles promises or observables and displays their resolved value.

---

#### **Basic Example of Using Pipes**

```html
<h3>{{ today | date:'fullDate' }}</h3> <!-- Formats current date -->
<h3>{{ price | currency:'USD':'symbol':'1.2-2' }}</h3> <!-- Formats price in USD -->
<h3>{{ percentage | percent:'2.1-2' }}</h3> <!-- Formats percentage -->
```

- **Input Data** in `app.component.ts`:
  ```typescript
  today = new Date();
  price = 2500.5;
  percentage = 0.85; // 85%
  ```

---

#### **Custom Pipe**

---

##### **1. Creating a Custom Pipe**

You can create a custom pipe to perform a unique transformation:

```bash
ng generate pipe custom
```

This generates two files:
- `custom.pipe.ts`: Contains the pipe logic.
- `custom.pipe.spec.ts`: Contains tests for the pipe.

---

##### **2. Implementing the Pipe**

For example, a pipe to capitalize the first letter of every word:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
```

---

##### **3. Using the Custom Pipe**

In the template:

```html
<p>{{ 'angular is powerful' | capitalize }}</p>
```

Output: **Angular Is Powerful**

---

#### **Parameterizing Custom Pipes**

You can pass arguments to a custom pipe. For instance, a pipe to truncate text:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
```

Usage:

```html
<p>{{ 'This is a very long text that needs truncation' | truncate:20 }}</p>
```

Output: **This is a very long...**

---

#### **AsyncPipe**

**`AsyncPipe`** is a powerful pipe used to work with observables or promises. It subscribes to the observable or promise and updates the view when the value changes.

Example with a promise:

```typescript
dataPromise = new Promise(resolve => {
  setTimeout(() => resolve('Data loaded!'), 2000);
});
```

Template:

```html
<p>{{ dataPromise | async }}</p>
```

Output after 2 seconds: **Data loaded!**

---

### **Practice Project: Using Pipes**

---

#### **Project Idea: Custom Product List**

Create a product list where:
1. Prices are formatted using `CurrencyPipe`.
2. Discounted prices are calculated using a custom pipe.
3. Product names are capitalized using a custom pipe.
4. Filters apply to display products under a certain price.
5. For more information about implementation [click here](../projects/test5-pipes/README.md)

---