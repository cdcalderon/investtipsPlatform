import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { StockQuotesService} from './stock-quote.service';
import {Ng2Highcharts, Ng2Highmaps, Ng2Highstocks} from 'ng2-highcharts';

import * as Highcharts from 'highcharts';
import {IStockQuote} from "./IStockQuote";

declare var TradingView: any;

declare var Datafeeds: any;

@Component({
  selector: 'ms-stock-quote',
  templateUrl: './stock-quote.component.html',
  styleUrls: ['./stock-quote.component.scss']
})
export class StockQuoteComponent implements OnInit {
  TradingViewObj: any;
  DatafeedsObj: any;

  stockQuotes: IStockQuote[];
  errorMessage: string;
  chartStock = {};
  fromDate: string;
  toDate: string;
  stockSymbol: string;

  groupingUnits = [[
    'week',                         // unit name
    [1]                             // allowed multiples
  ], [
    'month',
    [1, 2, 3, 4, 6]
  ]];


  chartBar = {
    chart: {
      type: 'column'
    },
    xAxis: {
      categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    series: [
      {
        name: 'NC',
        data: [7057, 6858, 6643, 6570, 6115, 107, 31, 635, 203, 2, 2]
      }, {
        name: 'OK',
        data: [54047, 52484, 50591, 49479, 46677, 33, 156, 947, 408, 6, 2]
      }, {
        name: 'KO',
        data: [11388, 11115, 10742, 10757, 10290, 973, 914, 4054, 732, 34, 2]
      }, {
        name: 'VALID',
        data: [8836, 8509, 8255, 7760, 7621, 973, 914, 4054, 732, 34, 2]
      }, {
        name: 'CHECK',
        data: [115, 162, 150, 187, 172, 973, 914, 4054, 732, 34, 2]
      }, {
        name: 'COR',
        data: [12566, 12116, 11446, 10749, 10439, 973, 914, 4054, 732, 34, 2]
      }
    ]
  };

  options: Object;

  constructor(private http: Http, private _stockQuotesService: StockQuotesService) {
    this.TradingViewObj = TradingView;
    this.DatafeedsObj = Datafeeds;

  }
  getStockAnalisys() {
    console.log(this.fromDate,this.toDate, this.stockSymbol);
    this.getQuotes(this.fromDate, this.toDate, this.stockSymbol);

  }

  ngOnInit() {
    // new this.TradingViewObj.widget({
    //   "width": 980,
    //   "height": 610,
    //   "symbol": "NASDAQ:AAPL",
    //   "interval": "D",
    //   "timezone": "Etc/UTC",
    //   "theme": "White",
    //   "style": "1",
    //   "locale": "en",
    //   "toolbar_bg": "#f1f3f6",
    //   "enable_publishing": false,
    //   "save_image": false,
    //   "hideideas": true,
    //   "show_popup_button": true,
    //   "popup_width": "1000",
    //   "popup_height": "650"
    // });



    TradingView.onready(function()
    {
      new TradingView.widget({
        fullscreen: true,
        symbol: 'AAPL',
        interval: 'D',
        container_id: "tv_chart_container",
        //	BEWARE: no trailing slash is expected in feed URL
        datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
        library_path: "../../assets/charting_library/",
//					locale: getParameterByName('lang') || "en",
        //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
//					drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
//					disabled_features: ["use_localstorage_for_settings"],
//					enabled_features: ["study_templates"],
//					charts_storage_url: 'http://saveload.tradingview.com',
        charts_storage_api_version: "1.1",
//					client_id: 'tradingview.com',
//					user_id: 'public_user_id'
      });
    });




    this.getQuotes('2015-12-01', '2016-12-31', 'AAPL');
    // this._stockQuotesService.getStockQuotes()
    //   .subscribe(
    //     stockQuotes => {
    //       this.stockQuotes = stockQuotes;
    //       let charQuotes = stockQuotes.map((q) => {
    //         return [q.timeStampDate, q.open, q.high, q.low, q.close];
    //       });
    //
    //
    //       let flags = stockQuotes.filter((q) => {
    //         return q.is3ArrowGreenPositive === true
    //       }).map((q) => {
    //         return {
    //           x: q.timeStampDate,
    //           title: '^',
    //           text: 'Shape: "squarepin"',
    //         }
    //       });
    //
    //       this.chartStock = {
    //
    //         chart: {
    //           height: 600
    //         },
    //         rangeSelector: {
    //           selected: 1
    //         },
    //         // plotOptions: {
    //         //   series: {
    //         //     stickyTracking: false
    //         //   }
    //         // },
    //         // tooltip: {
    //         //   snap: 0
    //         // },
    //
    //         // tooltip: {
    //         //   animation: false,
    //         //   backgroundColor: null,
    //         //   shadow: false,
    //         //   useHTML: true,
    //         //   hideDelay: 0
    //         // },
    //         title: {
    //           text: 'AAPL Historical'
    //         },
    //         series: [{
    //           type: 'candlestick',
    //           id: 'dataseries',
    //           name: 'AAPL',
    //           data: charQuotes,
    //           dataGrouping: {
    //             // units: [
    //             //   [
    //             //     'day', // unit name
    //             //     [1] // allowed multiples
    //             //   ], [
    //             //     'month',
    //             //     [1, 2, 3, 4, 6]
    //             //   ]
    //             // ]
    //             enabled: false
    //           }
    //         },
    //           {
    //             type: 'flags',
    //             data: flags,
    //             onSeries: 'dataseries',
    //             shape: 'squarepin',
    //             stackDistance: 50,
    //             width: 12,
    //             fillColor: 'green',
    //             style: { // text style
    //               color: 'white'
    //             },
    //             states: {
    //               hover: {
    //                 fillColor: 'brown'
    //               }
    //             },
    //             y: -50
    //
    //           }]
    //       }
    //     },
    //     error => this.errorMessage = <any>error
    //   );

    //Stock
    // this.http.get('./assets/aapl-c.json').subscribe(
    //   (aaplc: any) => {
    //     this.chartStock = {
    //       rangeSelector: {
    //         selected: 1
    //       },
    //       title: {
    //         text: 'AAPL Stock Price'
    //       },
    //       series: [{
    //         name: 'AAPL',
    //         data: aaplc.json(),
    //         tooltip: {
    //           valueDecimals: 2
    //         }
    //       }]
    //     };
    //   },
    //   (err: any) => {
    //     console.error('Somethin went wrong', err);
    //   }
    // );


  }

  getQuotes(from,to,symbol) {
    this._stockQuotesService.getStockQuotes(from,to,symbol)
      .subscribe(
        stockQuotes => {
          this.stockQuotes = stockQuotes;
          let charQuotes = stockQuotes.map((q) => {
            return [q.timeStampDate, q.open, q.high, q.low, q.close];
          });

          let flags = stockQuotes.filter((q) => {
            return q.is3ArrowGreenPositive === true
          }).map((q) => {
            return {
              x: q.timeStampDate,
              title: '^',
              text: 'Shape: "squarepin"',
            }
          });

          this.chartStock = {

            chart: {
              height: 600
            },
            rangeSelector: {
              selected: 1
            },
            // plotOptions: {
            //   series: {
            //     stickyTracking: false
            //   }
            // },
            // tooltip: {
            //   snap: 0
            // },

            // tooltip: {
            //   animation: false,
            //   backgroundColor: null,
            //   shadow: false,
            //   useHTML: true,
            //   hideDelay: 0
            // },
            title: {
              text: 'AAPL Historical'
            },
            series: [{
              type: 'candlestick',
              id: 'dataseries',
              name: 'AAPL',
              data: charQuotes,
              dataGrouping: {
                // units: [
                //   [
                //     'day', // unit name
                //     [1] // allowed multiples
                //   ], [
                //     'month',
                //     [1, 2, 3, 4, 6]
                //   ]
                // ]
                enabled: false
              }
            },
              {
                type: 'flags',
                data: flags,
                onSeries: 'dataseries',
                shape: 'squarepin',
                stackDistance: 50,
                width: 12,
                fillColor: 'green',
                style: { // text style
                  color: 'white'
                },
                states: {
                  hover: {
                    fillColor: 'brown'
                  }
                },
                y: -50

              }]
          }
        },
        error => this.errorMessage = <any>error
      );
  }




}



