import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Ingredient } from '../models/ingredient';


@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  ingredientName = 'banana';

  constructor() { }

  ngOnInit(): void {

  }

  changeIngredientName(value: string) {
    this.ingredientName = value;
  }

  //Christine 
  addOne(value: number) {
    return value + 1;
  }

  //Maria Paula

  removeOne(value: number) {
    return value - 1;
  }

  //Sebastian
  multiplyByTwo(number: number) {
    return number * 2
  }
}

