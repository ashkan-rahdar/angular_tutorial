import { Component } from '@angular/core';
import { ExchangeRateServiceService } from '../../services/exchange-rate-service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent {
  amount: number = 0;
  fromCurrency : string = 'USD';
  toCurrency : string = 'EUR';
  convertedAmount: number | null = null;

  currencies = ['USD', 'EUR', 'GBP'];

  alo = ['alo1','alo2','alo dande be dande'];

  constructor(private exchangeRateService: ExchangeRateServiceService) {
    console.log("component started");
  }

  convert(): void {
    try {
      this.convertedAmount = this.exchangeRateService.convertAmount(
        this.amount,
        this.fromCurrency,
        this.toCurrency
      );
    } catch (error: any) {
      alert(error.message);
      this.convertedAmount = null;
    }
  }
}
