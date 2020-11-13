import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  constructor(public dataService: DataService) {

  }

  ngOnInit(): void {
  }

  findIngredient(e){
    
  }
}

