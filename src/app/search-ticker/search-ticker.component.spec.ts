import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTickerComponent } from './search-ticker.component';

describe('SearchTickerComponent', () => {
  let component: SearchTickerComponent;
  let fixture: ComponentFixture<SearchTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
