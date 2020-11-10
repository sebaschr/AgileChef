import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { element } from 'protractor';


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
      onpizza: 'block',
      visibility: 'visible',
      position: [{
      }],
      price: 100
    },
    {
      name: 'Tomato',
      img2: '../../assets/tomato_2.png',
      img3: '../../assets/tomato_3.png',
      activeImg: '../../assets/tomato_1.png',
      progress: 0,
      width: '100px',
      height: '100px',
      onPizza: 'block',
      visibility: 'visible',
      position: [{

      }],
      price: 100
    },
    {
      name: 'Pepper',
      img2: '../../assets/pepper_1.png',
      img3: '../../assets/pepper_2.png',
      activeImg: '../../assets/tomato_1.png',
      progress: 0,
      width: '100px',
      height: '100px',
      onPizza: 'block',
      visibility: 'visible',
            position: [{
      }],
      price: 100
    },
    {
      name: 'Mushroom',
      img2: '../../assets/shroom_2.png',
      img3: '../../assets/shroom_3.png',
      activeImg: '../../assets/shroom_1.png',
      progress: 0,
      width: '100px',
      height: '100px',
      onPizza: 'block',
      position: [{

      }]
    },
    {
      name: 'Pepperoni',
      img2: '../../assets/pepperoni_1.png',
      img3: '../../assets/pepperoni_2.png',
      activeImg: '../../assets/pepperoni_2.png',
      progress: 0,
      width: '100px',
      height: '100px',
      onPizza: 'block',
      visibility: 'visible',
      position: [{

      }],
      price: 100
    },
    {
      name: 'Cheese',
      activeImg: 'https://png.pngtree.com/element_our/png_detail/20181227/cheese-vector-icon-png_293618.jpg',
      img2: 'https://media.istockphoto.com/vectors/grating-cheese-icon-flat-vector-id843941538?b=1&k=6&m=843941538&s=612x612&w=0&h=BI4SDehRI_lvIkea3FCZCnwPjN4P21flAYkScTiHnvY=',
      img3: 'https://icon2.cleanpng.com/20180202/ide/kisspng-pizza-grated-cheese-processed-cheese-cheese-png-photos-5a74976e7d0ab7.1754448615175903825122.jpg',
      progress: 0,
      width: '100px',
      height: '100px',
      onpizza: 'block',
      visibility: 'visible',

      position: [{
      }],
      price: 100
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
      { name: 'Tomato', amount: 1 },
      { name: 'Cheese', amount: 1 }
    ],
    editing: false
  }, {
    pizzaID: 'pizza02',
    name: 'Mushroom',
    imgSrc: '../../assets/mushroom_pizza.png',
    ingredients: [
      { name: 'Dough', amount: 1 },
      { name: 'Tomato', amount: 1 },
      { name: 'Mushroom', amount: 1 },
      { name: 'Cheese', amount: 1 }
    ],
    editing: false
  }, {
    pizzaID: 'pizza03',
    name: 'Pepperoni',
    imgSrc: '../../assets/pepperoni_pizza.png',
    ingredients: [
      { name: 'Dough', amount: 1 },
      { name: 'Tomato', amount: 1 },
      { name: 'Pepperoni', amount: 1 },
      { name: 'Cheese', amount: 1 }

    ],
    editing: false,
  },
  {
    pizzaID: 'pizza04',
    name: 'Pepperoni',
    imgSrc: '../../assets/pepperoni_pizza.png',
    ingredients: [
      { name: 'Dough', amount: 1 },
      { name: 'Tomato', amount: 1 },
      { name: 'Pepperoni', amount: 1 },
      { name: 'Cheese', amount: 1 }

    ],
    editing: false,
  }]

  inProduction = [];
  finished = [];
  trashcan = [];

  activePlayer = {
    name: String,
    ing: [],
    inCanvas: []
  };



  counterPlayer = this.playerList.length - 1;

  results = [{
    totalSuccesful:Number,
    totalFailed:Number,
    totalInProcess:Number,
    earned:Number,
    cost:Number,
    profit:Number
  }]


  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  /* Move the pizza out of the queue into production  */
  moveOutofQueue(p, event: MouseEvent) {
    var element = event.currentTarget;
    if (this.checkifinsideofCanvas(element)) {
      this.findPizza(p);
      var neededIngredients = this.getIngredients(p);
      this.assignIngredientstoPlayers(neededIngredients);
    }
  }
  /* Find a pizza in the queue and change the status to editing */
  findPizza(p) {
    this.pizzaList.forEach(pizza => {
      if (p.pizzaID == pizza.pizzaID) {
        pizza.editing = true;
      }
    });
  }
  /* Get the ingredients that makes a pizza */
  getIngredients(p) {
    var pizzaIngredients = [];
    this.pizzaList.forEach(pizza => {
      if (p.pizzaID == pizza.pizzaID) {
        pizzaIngredients = pizza.ingredients;
      }
    })
    return pizzaIngredients;
  }

  getIngredientInfo(name) {
    for (let index = 0; index < this.ingredientList.length; index++) {
      if (name == this.ingredientList[index].name) {
       var ing = this.ingredientList[index];
      }
    }

    return ing;
  }
  /* Place the ingredients and mix depending on the result */
  ingredientPlacement(ing, event: MouseEvent) {

    var ingredientDiv = event.currentTarget;
    ing.position = this.getPosition(ingredientDiv);
    console.log(ing.position);
    for (let index = 0; index < this.ingredientList.length; index++) {
      this.mixIngredient(ing, this.ingredientList[index]);
    }

  }
  /* get the position of an element, returns the position */
  getPosition(el) {
    var p = el.getBoundingClientRect();
    return p;
  }
  /* on 3 clicks prepares the ingredient and changes img and progress */
  prepareIngredient(ing, e: MouseEvent) {
    var count = e.detail;
    var ingredientDiv = e.currentTarget;
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

  /* check if an element is inside of canvas*/
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

  /* check if an element is inside of the finished panel*/
  checkiffinished() {

  }

  /* assigns the ingredients of a pizza to the players in the playerlist */
  assignIngredientstoPlayers(ing) {

    var ingredients = [];

    for (let i = 0; i < ing.length; i++) {
      for (let index = 0; index < ing[i].amount; index++) {
        ingredients.push(this.getIngredientInfo(ing[i].name));
      }
    }

    ingredients.forEach(el => {
      var x = this.getIngredientInfo(el.name);
      el.visibility = 'visible';
      this.inProduction.push(x);
    });

    for (let i = 0; i < ingredients.length; i++) {
      if (this.counterPlayer == 0) {

        this.counterPlayer = this.playerList.length - 1;
      } else {
        this.counterPlayer--;
      }
      this.playerList[this.counterPlayer].ingredientsAssigned.push(ingredients[i])


    }

    console.log(this.playerList)

  }

  showIngredients(pname) {
    this.activePlayer.name = pname;
    var fullArray  = [{}];
    for (let index = 0; index < this.playerList.length; index++) {
      for (let i = 0; i < this.playerList[index].ingredientsAssigned.length; i++) {
        if(pname == this.playerList[index].name){
          this.playerList[index].ingredientsAssigned[i].visibility = 'visible';
          fullArray.push(this.playerList[index].ingredientsAssigned[i]);
        }else{
          var inCanvas = this.checkifInsideofCanvasPos(this.playerList[index].ingredientsAssigned[i].position);
          if(!inCanvas){
            this.playerList[index].ingredientsAssigned[i].visibility = 'hidden';
            fullArray.push(this.playerList[index].ingredientsAssigned[i]);
          }else{
            fullArray.push(this.playerList[index].ingredientsAssigned[i]);
            this.playerList[index].ingredientsAssigned[i].visibility = 'visible';
          }
        }
      }
    }

    this.activePlayer.ing = fullArray;

    console.log(this.activePlayer)

  }

  checkifInsideofCanvasPos(el){

    var inside = false;
    var p = el;
    var canvasDiv = document.querySelector('.gameCanvas');

    var canvasPosition = canvasDiv.getBoundingClientRect();

    if (p.bottom < canvasPosition.bottom && p.right < canvasPosition.right && p.top > canvasPosition.top && p.left > canvasPosition.left) {
      inside = true;
    }

    return inside;
  }

  /* mix Ingredients  */
  mixIngredient(ing1, ing2) {

    this.checkifInsideofTrash(ing1);
    this.checkifInsideofOven(ing1);
    this.checkifInsideofFinishedQueue(ing1);

    if (ing1.progress < 100 || ing2.progress < 100) {
    } else {
      if ((ing1.name == 'Dough' || ing2.name == 'Dough') && (ing1.name == 'Tomato' || ing2.name == 'Tomato')) {
        var checkifInside = this.checkifInside(ing1, ing2);
        if (checkifInside) {
          ing2.activeImg = '../../assets/pizza_sauce.png';
          ing1.onPizza = 'none';
          ing2.name = 'PizzaSauce';
        } else {
        }
      }

      if ((ing1.name == 'PizzaSauce' || ing2.name == 'PizzaSauce') && (ing1.name == 'Cheese' || ing2.name == 'Cheese')) {
        var checkifInside = this.checkifInside(ing1, ing2);
        if (checkifInside) {
          ing2.activeImg = '../../assets/pizza_cheese.png';
          ing1.onPizza = 'none';
          ing2.name = 'PizzaSauceCheese';

        } else {
        }
      }

      // Pizza Flavours

      if ((ing1.name == 'PizzaSauceCheese' || ing2.name == 'PizzaSauceCheese') && (ing1.name == 'Mushroom' || ing2.name == 'Mushroom')) {
        var checkifInside = this.checkifInside(ing1, ing2);
        if (checkifInside) {
          ing2.activeImg = '../../assets/mushroom_pizza.png';
          ing1.onPizza = 'none';
          ing2.progress = 0;
          ing2.width = '100px';
          ing2.height = '100px';
        } else {
        }
      }

      if ((ing1.name == 'PizzaSauceCheese' || ing2.name == 'PizzaSauceCheese') && (ing1.name == 'Pepperoni' || ing2.name == 'Pepperoni')) {
        var checkifInside = this.checkifInside(ing1, ing2);
        if (checkifInside) {
          ing2.activeImg = '../../assets/pepperoni_pizza.png';
          ing1.onPizza = 'none';
          ing2.progress = 0;
          ing2.width = '100px';
          ing2.height = '100px';

        } else {
        }
      }


    }
  }
  /*  */
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
  /* throw it in the garbage if hovering the trash div  */
  checkifInsideofTrash(pos1) {

    var inside = false;

    var trashDiv = document.querySelector('.trash');

    var trashPosition = trashDiv.getBoundingClientRect();

    var inside = false;
    var position1 = pos1.position;
    var position2 = trashPosition;


    if ((position1.right < position2.right) && (position2.left < position1.left)) {
      if ((position1.bottom < position2.bottom) && (position1.top > position2.top)) {
        inside = true;
      }
    }

    if (inside) {
      pos1.onPizza = 'none';
      var arrayIng = [];
      if (pos1.name == 'PizzaSauce') {
        arrayIng = ['Tomato', 'Dough'];
      } else {
        if (pos1.name == 'PizzaSauceCheese') {
          arrayIng = ['Tomato', 'Dough', 'Cheese'];
        } else {
          arrayIng = [pos1.name]
        }
      }

      this.trashcan.push(arrayIng);
      console.log(this.trashcan)
    }
  }

  /* throw it in the oven if hovering the oven div  */
  checkifInsideofOven(pos1) {

    var inside = false;

    var ovenDiv = document.querySelector('.oven');

    var ovenPosition = ovenDiv.getBoundingClientRect();

    var inside = false;
    var position1 = pos1.position;
    var position2 = ovenPosition;


    if ((position1.right < position2.right) && (position2.left < position1.left)) {
      if ((position1.bottom < position2.bottom) && (position1.top > position2.top)) {
        inside = true;
      }
    }

    if (inside && pos1.name == 'PizzaSauceCheese') {
      this.countUp(100, 5000, pos1)
    }
  }

  /* check if an element is inside of the finished panel*/
  checkifInsideofFinishedQueue(pos1) {
    var inside = false;

    var readyQueueDiv = document.querySelector('.readyQueue');

    var readyQueuePosition = readyQueueDiv.getBoundingClientRect();

    var inside = false;
    var position1 = pos1.position;
    var position2 = readyQueuePosition;


    if ((position1.right < position2.right) && (position2.left < position1.left)) {
      if ((position1.bottom < position2.bottom) && (position1.top > position2.top)) {
        inside = true;
      }
    }

    if (inside && pos1.name == 'PizzaSauceCheese' && pos1.progress >= 100) {
      pos1.finished = true;
    }
  }

  /* fill the bar in a specific amount, time, */
  countUp(max, time, p) {
    var num = 0;
    var step = time / max; // calculate the time between two steps of counting
    // create an inner function that performs one step of counting
    var fn = function () {
      p.progress++;
      if (num <= max) {
        // ... and call the inner function again, some time in the future
        window.setTimeout(fn, step);
      }
    }

    // call the inner function for the first time
    fn();
  }
}