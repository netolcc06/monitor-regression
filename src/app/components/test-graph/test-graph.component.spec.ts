import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGraphComponent } from './test-graph.component';

describe('TestGraphComponent', () => {
  let component: TestGraphComponent;
  let fixture: ComponentFixture<TestGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
