### **Practice Project: Using Pipes**

---

#### **Project Idea: Custom Product List**

Create a product list where:
1. Prices are formatted using `CurrencyPipe`.
2. Discounted prices are calculated using a custom pipe.
3. Product names are capitalized using a custom pipe.
4. Filters apply to display products under a certain price.

---
#### **Steps**

##### **1. Product Data in Component**

```typescript
products = [
  { name: 'laptop', price: 1500, discount: 10 },
  { name: 'mobile phone', price: 800, discount: 15 },
  { name: 'tablet', price: 1200, discount: 5 }
];
```

---

##### **2. Create a Discount Pipe**

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice'
})
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }
}
```

---

##### **3. Display in Template**

```html
<table border="1">
  <tr>
    <th>Product</th>
    <th>Original Price</th>
    <th>Discounted Price</th>
  </tr>
  <tr *ngFor="let product of products">
    <td>{{ product.name | capitalize }}</td>
    <td>{{ product.price | currency:'USD':'symbol' }}</td>
    <td>{{ product.price | discountPrice:product.discount | currency:'USD':'symbol' }}</td>
  </tr>
</table>
```

---

#### **Extending the Project**

1. Add a filter to show only products under a specific price using a pipe.
2. Add an input box to set the maximum price dynamically and see the filtered results.

---