### **Semi-Project: A Reusable Data Table Component**

The goal of this project is to create a **generic, reusable data table component** in Angular. The table will dynamically handle different types of data structures using **TypeScript generics**, allowing developers to reuse the component across different parts of an application with minimal effort.

---

### **Project Features**
1. **Dynamic Data Types**: The table will support any object type (e.g., users, products, orders).
2. **Customizable Columns**: Developers can configure the table to display specific fields from the provided data.
3. **Sorting and Filtering**: Add sorting and basic filtering functionality to make the table interactive.
4. **Pagination**: Implement simple pagination for better usability.
5. **Usage of Generics**: Generics will be used to ensure type safety and reusability.

---

### **Core Concepts Covered**
- **Generics**: Used in services and components to handle data of various types.
- **Component Inputs and Outputs**: To configure the table and handle events like row selection.
- **Interface Design**: To define reusable and extendable data models.
- **Data Binding**: Displaying dynamic data in the template.
- **Utility Functions**: Adding generic helper functions.

---

### **Step-by-Step Implementation**

#### 1. **Create Data Models**
Define sample interfaces for the data types that the table will handle:
```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}
```

---

#### 2. **Create a Generic Service**
Create a generic service to fetch data:
```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {
  private data: T[] = [];

  setData(data: T[]): void {
    this.data = data;
  }

  getData(): Observable<T[]> {
    return of(this.data);
  }
}
```

---

#### 3. **Create the Data Table Component**
Run the Angular CLI command:
```bash
ng generate component data-table
```

**`data-table.component.ts`**:
```typescript
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent<T> implements OnInit {
  @Input() data: T[] = [];
  @Input() columns: { field: keyof T; header: string }[] = [];

  sortedData: T[] = [];

  ngOnInit() {
    this.sortedData = [...this.data];
  }

  sort(column: keyof T): void {
    this.sortedData.sort((a, b) =>
      a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0
    );
  }
}
```

---

**`data-table.component.html`**:
```html
<table>
  <thead>
    <tr>
      <th *ngFor="let col of columns" (click)="sort(col.field)">
        {{ col.header }} 🔽
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of sortedData">
      <td *ngFor="let col of columns">
        {{ row[col.field] }}
      </td>
    </tr>
  </tbody>
</table>
```

---

**`data-table.component.css`**:
```css
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

thead th {
  cursor: pointer;
  text-align: left;
  background-color: #f4f4f4;
}

td, th {
  padding: 8px;
  border: 1px solid #ddd;
}
```

---

#### 4. **Use the Generic Table in a Parent Component**
Add the `DataTableComponent` to a parent component to test its reusability.

**`app.component.ts`**:
```typescript
import { Component } from '@angular/core';
import { User, Product } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userData: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ];

  productData: Product[] = [
    { id: 101, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 102, name: 'Phone', price: 699, category: 'Electronics' },
  ];

  userColumns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
  ];

  productColumns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'price', header: 'Price' },
    { field: 'category', header: 'Category' },
  ];
}
```

---

**`app.component.html`**:
```html
<h1>User Table</h1>
<app-data-table [data]="userData" [columns]="userColumns"></app-data-table>

<h1>Product Table</h1>
<app-data-table [data]="productData" [columns]="productColumns"></app-data-table>
```

---

### **Key Learning Points**
1. **Generics**:
   - The `DataTableComponent<T>` is generic, so it works for both `User` and `Product` types without code duplication.
   - `@Input()` properties use generics to define strongly typed data and columns.

2. **Reusable Design**:
   - A single component handles multiple data types and configurations dynamically.
   - Developers only need to provide data and column configurations.

3. **Sorting**:
   - Sorting demonstrates how to interact with generic properties (`keyof T`).

4. **Component Communication**:
   - Shows how to pass data to a generic component and render it dynamically.

---

### **Future Enhancements**
- Add pagination for large datasets.
- Include filtering options for the data.
- Add row selection and event emitters for interactivity.
- Extend the generic service to fetch data from an API dynamically.

---