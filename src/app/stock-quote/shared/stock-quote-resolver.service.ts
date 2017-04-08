import {Injectable} from "@angular/core";
import { Resolve } from '@angular/router';
import { StockQuotesService} from '../stock-quote.service';

@Injectable()
export class StockQuoteResolver implements Resolve<any> {

  constructor(private _stockQuotesService: StockQuotesService) {}
  resolve() {
    return this._stockQuotesService.getStockQuotes('2015-12-01', '2016-12-31', 'AAPL')
  }
}
