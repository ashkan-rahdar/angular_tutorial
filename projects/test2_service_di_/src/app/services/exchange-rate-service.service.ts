import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateServiceService {

  constructor() { console.log("the exchange service is connected"); }

  private exchangeRates : {[from: string] : {[to: string] : number}} = {
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
