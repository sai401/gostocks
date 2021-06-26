import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnWithNegativeValuesComponent } from './column-with-negative-values.component';

describe('ColumnWithNegativeValuesComponent', () => {
  let component: ColumnWithNegativeValuesComponent;
  let fixture: ComponentFixture<ColumnWithNegativeValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnWithNegativeValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnWithNegativeValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
