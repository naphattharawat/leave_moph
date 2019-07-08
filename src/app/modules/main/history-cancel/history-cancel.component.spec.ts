import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCancelComponent } from './history-cancel.component';

describe('HistoryCancelComponent', () => {
  let component: HistoryCancelComponent;
  let fixture: ComponentFixture<HistoryCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
