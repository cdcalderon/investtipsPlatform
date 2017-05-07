import { Injectable} from '@angular/core'

@Injectable()
export class TradingViewService {
  isRefreshed: boolean = false;

  constructor() { }

  setRefreshed(value) {
    this.isRefreshed = value;
  }

  isControlRefreshed() {
    return this.isRefreshed;
  }

}
