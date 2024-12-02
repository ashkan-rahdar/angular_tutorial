# **Project: Simple Currency Converter**

## **Scenario**
Create an Angular application with:
- A service that provides exchange rates.
- A component where users can input an amount in one currency and see its converted value in another currency.

---

# **Implementation Steps**

## **Step 1: Create a Service**

The service will handle the logic of fetching exchange rates and converting the input value.

### **ExchangeRateService**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes the service a singleton
})
export class ExchangeRateService {
  private exchangeRates = {
    USD: { EUR: 0.9, GBP: 0.78 },
    EUR: { USD: 1.1, GBP: 0.87 },
    GBP: { USD: 1.28, EUR: 1.15 },
  };

  getExchangeRate(from: string, to: string): number {
    const rate = this.exchangeRates[from]?.[to];
    if (!rate) {
      throw new Error(`Exchange rate not available for ${from} to ${to}`);
    }
    return rate;
  }

  convertAmount(amount: number, from: string, to: string): number {
    const rate = this.getExchangeRate(from, to);
    return amount * rate;
  }
}
```

---

## **Step 2: Create a Component**

The component will use the service to perform currency conversion.

### **CurrencyConverterComponent**

```typescript
import { Component } from '@angular/core';
import { ExchangeRateService } from './exchange-rate.service';

@Component({
  selector: 'app-currency-converter',
  template: `
    <div>
      <h2>Currency Converter</h2>
      <label>
        Amount:
        <input [(ngModel)]="amount" type="number" />
      </label>
      <label>
        From:
        <select [(ngModel)]="fromCurrency">
          <option *ngFor="let currency of currencies" [value]="currency">{{ currency }}</option>
        </select>
      </label>
      <label>
        To:
        <select [(ngModel)]="toCurrency">
          <option *ngFor="let currency of currencies" [value]="currency">{{ currency }}</option>
        </select>
      </label>
      <button (click)="convert()">Convert</button>

      <p *ngIf="convertedAmount !== null">
        Converted Amount: {{ convertedAmount | number:'1.2-2' }}
      </p>
    </div>
  `,
})
export class CurrencyConverterComponent {
  amount = 0;
  fromCurrency = 'USD';
  toCurrency = 'EUR';
  convertedAmount: number | null = null;

  currencies = ['USD', 'EUR', 'GBP'];

  constructor(private exchangeRateService: ExchangeRateService) {}

  convert(): void {
    try {
      this.convertedAmount = this.exchangeRateService.convertAmount(
        this.amount,
        this.fromCurrency,
        this.toCurrency
      );
    } catch (error) {
      alert(error.message);
      this.convertedAmount = null;
    }
  }
}
```

---

## **Step 3: Add the Component to Your Module**

Update your module to include the component and the `FormsModule` for two-way binding.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter.component';

@NgModule({
  declarations: [AppComponent, CurrencyConverterComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

## **Step 4: Update the Root Template**

Use the `CurrencyConverterComponent` in the root component template.

### **app.component.html**

```html
<app-currency-converter></app-currency-converter>
```

---

# **How It Works**
1. The `ExchangeRateService` is injected into the `CurrencyConverterComponent` via its constructor.
2. When the user clicks "Convert," the component calls the `convertAmount` method in the service.
3. The service uses hardcoded exchange rates to calculate the converted amount and returns the result.
4. The component displays the converted value to the user.

---

## **Semi-Project Goals**
- **Service Usage:** Understand how to centralize logic in services.
- **Dependency Injection:** See how services are provided to components.
- **Practical Application:** A currency converter is a real-world example with straightforward logic.