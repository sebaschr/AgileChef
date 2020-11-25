import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsGraphComponent } from './results-graph.component';

describe('ResultsGraphComponent', () => {
  let component: ResultsGraphComponent;
  let fixture: ComponentFixture<ResultsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsGraphComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
