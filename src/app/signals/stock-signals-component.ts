import {
  Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  Input
} from '@angular/core';
import {Http} from '@angular/http';
import { StockSignalsService } from './stock-signals-service';
import {ActivatedRoute, Router} from '@angular/router';
import {IStockSignal} from "./IStockSignal";

@Component({
  selector: 'ms-stock-signals',
  templateUrl: './stock-signals-component.html',
  styleUrls: ['./stock-signals-component.scss']
})
export class StockSignalsComponent implements OnInit {
  errorMessage: string;
  stockSignals: IStockSignal[];
  selectedSignal: IStockSignal;
  groupedSignals: any;


  constructor(private _stockSignalsService: StockSignalsService,
              private _router: Router) {

  }

  ngOnInit() {
    let from = '01/01/16';
    let to = '01/01/17';
    this._stockSignalsService.getStockSignals(from, to, 'aapl')
        .subscribe(
          stockSignals => {
                this.stockSignals = stockSignals;
            this.groupedSignals =
              this._stockSignalsService.getGroupedSignalsBySymbol(this.stockSignals);
            console.log(this.groupedSignals);
            },
            error => this.errorMessage = <any>error
        );

  }

  onSignalSelect(event){
    console.log(event.data);
  }

  navigateToChart(signal:any) {
    console.log(signal.symbol);
    this._router.navigate(['/stockquote', signal.symbol]);
    //window.location.href = `http://localhost:4200/stockquote/${signal.symbol}`;
  }
}



