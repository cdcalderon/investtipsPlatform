import { Injectable} from '@angular/core'
//import { Subject, Observable } from 'rxjs/RX'
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IStockQuote } from './IStockQuote';

import * as _ from "lodash";

@Injectable()
export class StockQuotesService {
  private _stockEQuotesUrl = 'http://localhost:4000/quotes';

  constructor(private _http: Http) { }

  getStockQuotes(from: string, to: string, symbol: string): Observable<IStockQuote[]> {
    let params = new URLSearchParams();
    params.set('to', to);
    params.set('from', from);
    params.set('symbol', symbol);

    return this._http.get(this._stockEQuotesUrl, { search: params })
      .map((response: Response) =>  {
        return <IStockQuote[]> response.json()
      })
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }

}
