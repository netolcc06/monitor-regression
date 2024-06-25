import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionTableComponent } from './regression-table.component';

describe('RegressionTableComponent', () => {
  let component: RegressionTableComponent;
  let fixture: ComponentFixture<RegressionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegressionTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegressionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
