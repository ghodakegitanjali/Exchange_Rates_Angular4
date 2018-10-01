import { Component } from '@angular/core';
import { DataService } from './data.service';
import { OnInit } from '@angular/core';
import { HttpModule} from '@angular/http';
import {Http} from '@angular/http';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title: String = 'Angular 2 Currency Converter';
  error: any = null;
  fromAmount = 1;
  toAmount: Array<any> = [{id: Number, curr: String, value: Number, BuyVal: Number, SellVal: Number}];
  selectedCurrency: String;
  fromCurrency = 'EUR';
  toCurrency: Array<string> = ['USD', 'GBP', 'AUD', 'CAD', 'JPY', 'EUR'];
  rates: Array<any> = [];
  fromRates: Object = {};
  date: String = '2018-09-01';
  constructor(private dataService: DataService) {}

  ngOnInit() {
      this.convert(true);
  }

  public convert(onStart) {
      this.dataService.getRates(this.fromCurrency, this.date).subscribe(response => {
              if (onStart) {
                  const items: Array<any> = this.parseData(response.rates);
                  items.push({id: 'EUR', value: 1});
                  this.rates = items;
                  // this.fromCurrency = this.rates[5].id;
                  this.convert(false);
              }
               this.fromRates = response.rates;
               this.calculate();

            });
      }

  public calculate() {

                      for (let i = 0; i < 6; i++) {
                          const ECBRate = (this.fromAmount * this.fromRates[this.toCurrency[i]]);
                      this.toAmount[i] = {id: i, curr: this.toCurrency[i],
                                           value: ECBRate, BuyVal: Math.round(ECBRate * 0.95 * 10000) / 10000,
                                            SellVal: Math.round(ECBRate * 1.05 * 10000) / 10000};
                      }
                      if (this.fromCurrency === 'EUR') {
                        this.toAmount[5] = {id: 5, curr: 'EUR', value: 1, BuyVal: 0.9500, SellVal: 1.0500};
                        }
    }

  private parseData(data) {
      const arr: Array<any> = [];

      for (let i = 0; i < 5; i++) {
            const obj = {
                  id: this.toCurrency[i],
                  value: data[this.toCurrency[i]]
              };
              arr.push(obj);
          }
      return arr;
  }
}
