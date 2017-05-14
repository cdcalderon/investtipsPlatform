import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {Http} from '@angular/http';
import { StockSignalsService } from './stock-signals-service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private _stockSignalsService: StockSignalsService) {

  }

  ngOnInit() {
    let from = '01/01/16';
    let to = '01/01/17';
    this._stockSignalsService.getStockSignals(from, to, 'aapl')
        .subscribe(
          stockSignals => {
                this.stockSignals = stockSignals;
            },
            error => this.errorMessage = <any>error
        );

  }

  onSignalSelect(event){

    console.log(event.data);
  }
}



