import { DecimalPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { DiscountPipe } from '../../pipes/discount.pipe';
import {TomanPipe } from '../../pipes/toman.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, CapitalizePipe, DiscountPipe, TomanPipe],
  providers: [DecimalPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    { name: 'goli', price: 1.5, discount: 10 },
    { name: 'kholi', price: 0.8, discount: 15 },
    { name: 'moli', price: 1.2, discount: 5 }
  ];
}
