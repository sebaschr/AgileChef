import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Ingredient } from '../models/ingredient';


@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  constructor(public dataService: DataService,public ingredient: Ingredient) {

  }

  ngOnInit(): void {
  }

  loadIngredients(){
    this.dataService.ingredients = this.ingredient.getIngredientList()
  }
}

