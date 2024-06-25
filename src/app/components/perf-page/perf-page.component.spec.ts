import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfPageComponent } from './perf-page.component';

describe('PerfPageComponent', () => {
  let component: PerfPageComponent;
  let fixture: ComponentFixture<PerfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
