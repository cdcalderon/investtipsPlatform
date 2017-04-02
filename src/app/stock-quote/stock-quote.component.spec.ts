import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockQuoteComponent } from './stock-quote.component';

describe('StockQuoteComponent', () => {
  let component: StockQuoteComponent;
  let fixture: ComponentFixture<StockQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
