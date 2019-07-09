import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqLeaveComponent } from './req-leave.component';

describe('ReqLeaveComponent', () => {
  let component: ReqLeaveComponent;
  let fixture: ComponentFixture<ReqLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
