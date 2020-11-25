import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  ingredientName = 'banana';
  value = 0;

  constructor() { }

  ngOnInit(): void {

  }

  changeIngredientName(value: string) {
    this.ingredientName = value;
  }

  //Christine 
  addOne(value: number){
    this.value = value + 1;
  }

  //Maria Paula

  removeOne(value: number) {
    this.value = value - 1;
  }

  //Sebastian


}
