import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';


interface Overlay {
  left: number;
  height: number;
  top: number;
  width: number;
}

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  color: ThemePalette = 'primary';

  ingredientList = [

    {
      name: 'Dough',
      img2: '../../assets/dough_2.png',
      img3: '../../assets/dough_3.png',
      activeImg: '../../assets/dough_1.png',
      progress: 0,
      width: '100px',
      height: '100px',
      onpizza:'block',
      position: [{
      }]
    },
    {
      name: 'Tomato',
      img2: '../../assets/tomato_2.png',
      img3: '../../assets/tomato_3.png',
      activeImg: '../../assets/tomato_1.png',
      progress: 0,
      width: '100px',
      height: '100px',
      onPizza:'block',
      position: [{

      }]
    }];

  playerList = [
    {
      name: 'Joe',
      id: 'player01',
      ingredientsAssigned: [

      ]
    },
    {
      name: 'Elena (PO)',
      id: 'player02',
      ingredientsAssigned: [

      ]
    }
  ];

  pizzaList = [{
    pizzaID: 'pizza01',
    name: 'Ham',
    imgSrc: '../../assets/ham_pizza.png',
    ingredients: [
      { name: 'Dough', amount: 1 },
      { name: 'Tomato', amount: 1 }
    ],
    editing: false
  }, {
    pizzaID: 'pizza02',
    name: 'Mushroom',
    imgSrc: '../../assets/mushroom_pizza.png',
    ingredients: [
      { name: 'Dough', amount: 1 },
      { name: 'Tomato', amount: 2 }
    ],
    editing: false
  }, {
    pizzaID: 'pizza03',
    name: 'Pepperoni',
    imgSrc: '../../assets/pepperoni_pizza.png',
    ingredients: [
      { name: 'Dough', amount: 1 },
      { name: 'Tomato', amount: 3 }
    ],
    editing: false
  }]

  inProduction = [];

  onCanvas = false;
  canvas = document.querySelector('.gameCanvas');
  //elements 


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  moveOutofQueue(p, event: MouseEvent) {
    var element = event.currentTarget;
    if (this.checkifinsideofCanvas(element)) {
      this.findPizza(p);
      var neededIngredients = this.getIngredients(p);
      this.assignIngredientstoPlayers(neededIngredients);
    }
  }

  findPizza(p) {
    this.pizzaList.forEach(pizza => {
      if (p.pizzaID == pizza.pizzaID) {
        pizza.editing = true;
      }
    });
  }

  getIngredients(p) {
    var pizzaIngredients = [];
    this.pizzaList.forEach(pizza => {
      if (p.pizzaID == pizza.pizzaID) {
        pizzaIngredients = pizza.ingredients;
      }
    })
    return pizzaIngredients;
  }

  ingredientPlacement(ing, event: MouseEvent) {

    var ingredientDiv = event.currentTarget;
    ing.position = this.getPosition(ingredientDiv);

    for (let index = 0; index < this.ingredientList.length; index++) {
      this.mixIngredient(ing, this.ingredientList[index]);
    }
  }

  getPosition(el) {
    var p = el.getBoundingClientRect();
    return p;
  }

  prepareIngredient(ing, e: MouseEvent) {
    var count = e.detail;
    var ingredientDiv = document.querySelector('.ingredient');
    var checkInside = this.checkifinsideofCanvas(ingredientDiv);


    if (checkInside) {
      if (count == 3) {
        count = 0;
        if (ing.progress == 100) {

        } else {
          if (ing.progress == 50) {
            ing.activeImg = ing.img3;
            ing.progress = 100;

            if (ing.name == "Dough") {
              ing.width = '250px';
              ing.height = '250px';
            }
          } else {
            ing.activeImg = ing.img2;
            ing.progress = 50;
          }

        }
      } else {

      }
    }




  }

  checkifinsideofCanvas(el) {
    var inside = false;

    var canvasDiv = document.querySelector('.gameCanvas');

    var p = el.getBoundingClientRect();
    var canvasPosition = canvasDiv.getBoundingClientRect();

    if (p.bottom < canvasPosition.bottom && p.right < canvasPosition.right && p.top > canvasPosition.top && p.left > canvasPosition.left) {
      inside = true;
    }

    return inside;
  }

  assignIngredientstoPlayers(ing) {

    var ingredients = [];

    for (let i = 0; i < ing.length; i++) {
      for (let index = 0; index < ing[i].amount; index++) {
        ingredients.push(ing[i]);
      }
    }

    this.inProduction.push(ingredients);
  }

  mixIngredient(ing1, ing2) {
    if (ing1.progress < 100 || ing2.progress < 100) {
    } else {
      if ((ing1.name == 'Dough' || ing2.name == 'Dough') && (ing1.name == 'Tomato' || ing2.name == 'Tomato')) {


        var checkifInside = this.checkifInside(ing1, ing2);
        if (checkifInside) {
          ing2.activeImg='https://ih1.redbubble.net/image.1054548113.6625/poster,840x830,f8f8f8-pad,1000x1000,f8f8f8.u1.jpg'
          ing1.onPizza='none';
        } else {
        }
      }
    }
  }

  checkifInside(pos1, pos2) {
    var inside = false;
    var position1 = pos1.position;
    var position2 = pos2.position;


    if ((position1.right < position2.right) && (position2.left < position1.left)) {
      if ((position1.bottom < position2.bottom) && (position1.top > position2.top)) {
        inside = true;
      }
    }
    return inside;
  }
}

