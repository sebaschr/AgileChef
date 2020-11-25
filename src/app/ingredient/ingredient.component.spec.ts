import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientComponent } from './ingredient.component';

describe('IngredientComponent', () => {
  let component: IngredientComponent;
  let fixture: ComponentFixture<IngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ingredientName should containt the value banana', () => {
    expect(component.ingredientName).toEqual('banana');
  });

  it('ingredientName should not be empty', () => {
    expect(component.ingredientName).not.toEqual('');
  });

  it('should change ingredientName using the method changeIngredientName', () => {
    component.changeIngredientName('carrot');
    expect(component.ingredientName).not.toEqual('banana');
  })

  //Christine
  it('method should add a 1', () => {
    expect(component.addOne(10)).toEqual(11);
  });

  //Maria Paula
  it('methods should deduct a 1', () => {
    expect(component.removeOne(20)).toEqual(19);
  });

  //Sebastian
  it('method should multiply by 2', () => {
    expect(component.multiplyByTwo(5)).toEqual(10);
  });

});
