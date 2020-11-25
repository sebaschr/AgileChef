import { Component, OnInit } from '@angular/core';

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



  //Maria Paula



  //Sebastian


}
