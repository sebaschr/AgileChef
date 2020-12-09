import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { element } from 'protractor';
import { DataService } from '../data.service';
import { key } from 'firebase-key';
import { Ingredient } from '../models/ingredient';
import { finished } from 'stream';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  color: ThemePalette = 'primary';

  // Lists of Data we are going to use
  playerList = [];
  ingredients = []
  pizzaList = [];


  //lists of new data
  queue = []
  pieces = []

  // lists of different parts 
  inProd = [];
  finished = []
  trash = []
  queueEditing = []
  timer = 0;

  activePlayer = {
    name: String,
    ing: [],
    inCanvas: []
  };
  counterPlayer = 0;

  constructor(private router: Router, public dataService: DataService) {
    this.dataService.loadSession();
    this.timer = this.dataService.session.sprints[this.dataService.sprintCounter].ejecucion;
    this.loadPlayers(this.dataService.currentPlayer);
    this.loadDBLists();
    this.loadQueue(3);
  }

  ngOnInit(): void {

  }
  /* get players from the currentPlayerTeam*/
  loadPlayers(player) {
    let teamList = this.dataService.session.teams;
    let players = [];
    for (let i = 0; i < teamList.length; i++) {
      if (teamList[i].players === undefined) {

      } else {
        for (let y = 0; y < teamList[i].players.length; y++) {
          if (player.identifier == teamList[i].players[y].identifier) {
            players = teamList[i].players
          }

        }
      }

    }

    for (let i = 0; i < players.length; i++) {
      let newplayer = {
        name: String,
        id: String,
        ingredientsAssigned: []
      };
      newplayer.name = players[i].name;
      newplayer.id = players[i].identifier;
      newplayer.ingredientsAssigned = [];
      this.playerList.push(newplayer);

    }

    this.counterPlayer = this.playerList.length - 1;

  }

  /* get players from the currentPlayerTeam*/
  loadDBLists() {
    this.ingredients = this.dataService.ingredients;
    this.pizzaList = this.dataService.pizzas;
  }

  loadQueue(counter) {
    for (let i = 0; i < counter; i++) {
      for (let y = 0; y < this.pizzaList.length; y++) {
        let newQueueEl = {
          imgSrc: String,
          pizzaKey: String,
          name: String,
          price: Number,
          recipeID: String,
          editing: false,
          key: key()
        };
        newQueueEl.imgSrc = this.pizzaList[y].imgSrc;
        newQueueEl.pizzaKey = this.pizzaList[y].key;
        newQueueEl.name = this.pizzaList[y].name;
        newQueueEl.price = this.pizzaList[y].price;
        newQueueEl.recipeID = this.pizzaList[y].recipeID;
        newQueueEl.key = key()

        this.queue.push(newQueueEl)
      }
    }

  }
  /* Move the pizza out of the queue into production  */
  moveOutofQueue(p, event: MouseEvent) {
    var element = event.currentTarget;
    if (this.checkifinsideofCanvas(element)) {
      if (p.editing) {

      } else {
        this.findPizza(p);
        var neededIngredients = this.getIngredients(p);
        this.assignIngredientstoPlayers(neededIngredients);
        this.showIngredients(this.playerList[0]);
      }
    }

  }

  /* Find a pizza in the queue and change the status to editing */
  findPizza(p) {
    this.pizzaList.forEach(pizza => {
      if (p.pizzaKey == pizza.key) {
        p.editing = true;
        this.queueEditing.push(p)
      }
    });
  }
  /* Get the ingredients that makes a pizza */
  getIngredients(p) {

    var pizzaIngredients = [];

    for (let i = 0; i < this.dataService.recipes.length; i++) {
      if (this.dataService.recipes[i].idRecipe == p.recipeID) {
        pizzaIngredients = this.dataService.recipes[i].ingredients
      }

    }
    return pizzaIngredients;
  }

  getIngredientInfo(key) {
    for (let index = 0; index < this.ingredients.length; index++) {
      if (key == this.ingredients[index].key) {
        var ing = this.ingredients[index];
      }
    }

    return ing;
  }
  // /* Place the ingredients and mix depending on the result */
  ingredientPlacement(ing, event: MouseEvent) {

    ing.position = this.getPosition(event.currentTarget)
    if (this.checkifInsideofCanvasPos(ing.position)) {
      ing.editing = true;
      if (!(this.checkifInprod(ing))) {
        this.inProd.push(ing);
      }
    }
    for (let i = 0; i < this.activePlayer.ing.length; i++) {
      this.mixIngredient(ing, this.activePlayer.ing[i]);
    }

    this.checkifInsideofTrash(ing);
    this.checkifInsideofOven(ing);
    this.checkifInsideofFinishedQueue(ing);
  }
  /*  */
  checkifInprod(ing) {
    let inProduction = false;

    for (let index = 0; index < this.inProd.length; index++) {
      if (this.inProd[index].key == ing.key) {
        inProduction = true
      }
    }

    return inProduction
  }
  /* get the position of an element, returns the position */
  getPosition(el) {
    var p = el.getBoundingClientRect()
    return p;
  }

  findActiveIng(cod) {
    var found;
    this.activePlayer.ing.forEach(element => {
      if (element.key == cod) {
        found = element;
      }
    });

    return found
  }

  /* on 3 clicks prepares the ingredient and changes img and progress */
  prepareIngredient(ing, e: MouseEvent) {
    var count = e.detail;
    var ingredientDiv = e.currentTarget;
    var found = this.findActiveIng(ing.key);
    var checkInside = this.checkifinsideofCanvas(ingredientDiv);

    if (checkInside) {
      if (count == 3) {
        count = 0;
        if (found.progress == 100) {

        } else {
          if (found.progress == 50) {
            found.activeImg = found.images[2];
            found.progress = 100;

            if (found.name == "Dough") {
              found.width = '100px';
              found.height = '100px';
            }
          } else {
            found.activeImg = found.images[1];
            found.progress = 50;
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

  /* assigns the ingredients of a pizza to the players in the playerlist */
  assignIngredientstoPlayers(ing) {

    let ingredients = [];

    for (let i = 0; i < ing.length; i++) {
      ingredients.push(this.getIngredientInfo(ing[i].idIngredient));
    }

    for (let i = 0; i < ingredients.length; i++) {
      let newQueueEl = {
        name: String,
        images: [{}],
        activeImg: String,
        progress: 0,
        width: '50px',
        height: '50px',
        onPizza: 'block',
        visibility: 'visible',
        editing: false,
        position: [{

        }],
        key: key(),
      };
      newQueueEl.name = ingredients[i].name;
      newQueueEl.images = ingredients[i].images;
      newQueueEl.key = key();
      newQueueEl.activeImg = ingredients[i].images[0];

      ingredients[i] = newQueueEl;
    }
    for (let i = 0; i < ingredients.length; i++) {
      if (this.counterPlayer == 0) {

        this.counterPlayer = this.playerList.length - 1;
      } else {
        this.counterPlayer--;
      }

      this.playerList[this.counterPlayer].ingredientsAssigned.push(ingredients[i])
    }
  }

  showIngredients(p) {
    this.activePlayer.name = p.name;
    var fullArray = [];
    for (let index = 0; index < this.playerList.length; index++) {
      for (let i = 0; i < this.playerList[index].ingredientsAssigned.length; i++) {
        if (p.name == this.playerList[index].name) {
          this.playerList[index].ingredientsAssigned[i].visibility = 'visible';
          fullArray.push(this.playerList[index].ingredientsAssigned[i]);
        } else {
          var inCanvas = this.checkifInsideofCanvasPos(this.playerList[index].ingredientsAssigned[i].position);
          if (!inCanvas) {
            this.playerList[index].ingredientsAssigned[i].visibility = 'hidden';
            fullArray.push(this.playerList[index].ingredientsAssigned[i]);
          } else {
            fullArray.push(this.playerList[index].ingredientsAssigned[i]);
            this.playerList[index].ingredientsAssigned[i].visibility = 'visible';
          }
        }
      }
    }

    this.activePlayer.ing = fullArray;

  }

  checkifInsideofCanvasPos(p) {
    var inside = false;

    var canvasDiv = document.querySelector('.gameCanvas');

    var canvasPosition = canvasDiv.getBoundingClientRect();

    if (p.bottom < canvasPosition.bottom && p.right < canvasPosition.right && p.top > canvasPosition.top && p.left > canvasPosition.left) {
      inside = true;
    }

    return inside;
  }

  /* mix Ingredients  */
  mixIngredient(ing1, ing2) {


    if (ing1.progress < 100 || ing2.progress < 100) {
    } else {
      if ((ing1.name == 'Dough' || ing2.name == 'Dough') && (ing1.name == 'Tomato' || ing2.name == 'Tomato')) {
        var checkifInside = this.checkifInside(ing1, ing2);
        if (checkifInside) {
          ing2.activeImg = '../../assets/pizza_sauce.png';
          ing1.onPizza = 'none';
          this.removefromProd(ing1.name);
          ing2.name = 'PizzaSauce';
        } else {
        }
      }

      if ((ing1.name == 'PizzaSauce' || ing2.name == 'PizzaSauce') && (ing1.name == 'Cheese' || ing2.name == 'Cheese')) {
        var checkifInside = this.checkifInside(ing1, ing2);
        if (checkifInside) {
          ing2.activeImg = '../../assets/pizza_cheese.png';
          ing1.onPizza = 'none';
          this.removefromProd(ing1.name);
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
          this.removefromProd(ing1.name);
          ing2.progress = 0;
          ing2.width = '100px';
          ing2.height = '100px';
          ing2.name = 'Mushroom Pizza'
        } else {
        }
      }

      if ((ing1.name == 'PizzaSauceCheese' || ing2.name == 'PizzaSauceCheese') && (ing1.name == 'Pepperoni' || ing2.name == 'Pepperoni')) {
        var checkifInside = this.checkifInside(ing1, ing2);
        if (checkifInside) {
          ing2.activeImg = '../../assets/pepperoni_pizza.png';
          ing1.onPizza = 'none';
          this.removefromProd(ing1.name);
          ing2.progress = 0;
          ing2.width = '100px';
          ing2.height = '100px';
          ing2.name = 'Pepperoni Pizza'
        } else {
        }
      }


    }
  }
  /* check if one el is inside of another */
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

      this.trash.push(arrayIng);

      for (let x = 0; x < arrayIng.length; x++) {
        this.cleanTrashfromProd(arrayIng[x])
      }
    }

  }

  cleanTrashfromProd(arrayIng) {
    for (let i = 0; i < this.inProd.length; i++) {

      if (this.inProd[i].name == arrayIng) {
        this.inProd.splice(i, 1);
        break
      }
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
    if (inside && (pos1.name == 'Mushroom Pizza' || pos1.name == 'Pepperoni Pizza')) {
      this.countUp(100, 5000, pos1);

      // this.removeFromProd(pos1.name);

    }

    console.log(this.queueEditing)
  }

  deletePizzafromQueue(pKey) {
    for (let i = 0; i < this.queue.length; i++) {
      if (pKey == this.queue[i].key) {
        this.queue.splice(i, 1);
      }

    }
  }

  removefromProd(name) {
    for (let i = 0; i < this.inProd.length; i++) {
      if (this.inProd[i].name == name) {
        this.inProd.splice(i, 1);
        break;
      }
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

    if (inside && (pos1.name == 'Pepperoni Pizza' || pos1.name == 'Mushroom Pizza') && pos1.progress >= 100) {
      pos1.onPizza = 'none';

      for (let i = 0; i < this.queueEditing.length; i++) {
        if (pos1.name == this.queueEditing[i].name)
          this.deletePizzafromQueue(this.queueEditing[i].key);
        this.queueEditing.splice(i, 1);

        break;
      }

      for (let i = 0; i < this.inProd.length; i++) {
        if (pos1.name == this.inProd[i].name)
          this.inProd.splice(i, 1);
        break;
      }
      this.finished.push(pos1);
    }

    if (this.queue.length = 4) {
      this.loadQueue(2);
    }

  }

  findFirstAndDelete(name) {
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].name == name) {
        this.queue.splice(i, 1);
        break;
      }
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

  getIngredientPrice(pName) {
    var x = 0;
    if (pName == 'Mushroom Pizza' || pName == 'Pepperoni Pizza') {
      for (let i = 0; i < this.pizzaList.length; i++) {
        if (pName == this.pizzaList[i].name) {
          x = this.pizzaList[i].price;
        }
      }
    } else {
      for (let i = 0; i < this.ingredients.length; i++) {
        if (pName == this.ingredients[i].name) {
          x = this.ingredients[i].price;
        }
      }
    }

    return x;
  }
  getResults() {

    for (let i = 0; i < this.inProd.length; i++) {

    }

    console.log(this.finished)

    let inProductionPieces = []
    let inProductionPiecesNum = 0
    let inProdcost = 0;

    let finishedPieces = []
    let finishedPiecesNum = 0
    let finishedCost = 0

    let inTrashPieces = []
    let inTrashPiecesNum = 0
    let inTrashCost = 0 

        /* In Production */
    for (let i = 0; i < this.trash.length; i++) {
      if (this.trash[i] == 'Mushroom Pizza' || this.trash[i] == 'Pepperoni Pizza' || this.trash[i] == 'PizzaSauce' || this.trash[i] == 'PizzaSauceCheese') {
        var arrayIngs = this.getElements(this.trash[i]);
        inTrashPieces.push(arrayIngs)
      } else {
        inTrashPieces.push(this.trash[i]);
      }
    }

    for (let i = 0; i < inTrashPieces.length; i++) {
      inTrashPiecesNum = inTrashPiecesNum + inTrashPieces[i].length
      for (let y = 0; y < inTrashPieces[i].length; y++) {
        inTrashCost = inTrashCost + this.getIngredientPrice(inTrashPieces[i][y]);
      }
    }
    /* In Production */
    for (let i = 0; i < this.inProd.length; i++) {
      if (this.inProd[i].name == 'Mushroom Pizza' || this.inProd[i].name == 'Pepperoni Pizza' || this.inProd[i].name == 'PizzaSauce' || this.inProd[i].name == 'PizzaSauceCheese') {
        var arrayIngs = this.getElements(this.inProd[i].name);
        inProductionPieces.push(arrayIngs)
      } else {
        let x = []
        x.push(this.inProd[i].name)
        inProductionPieces.push(x);
      }
    }

    for (let i = 0; i < inProductionPieces.length; i++) {
      inProductionPiecesNum = inProductionPiecesNum + inProductionPieces[i].length
      for (let y = 0; y < inProductionPieces[i].length; y++) {
        inProdcost = inProdcost + this.getIngredientPrice(inProductionPieces[i][y]);
      }
    }    


     /* In Production */
     for (let i = 0; i < this.finished.length; i++) {
      if (this.finished[i].name == 'Mushroom Pizza' || this.finished[i].name == 'Pepperoni Pizza' || this.finished[i].name == 'PizzaSauce' || this.finished[i].name == 'PizzaSauceCheese') {
        var arrayIngs = this.getElements(this.finished[i].name);
        finishedPieces.push(arrayIngs)
      } else {
        let x = []
        x.push(this.finished[i].name)
        finishedPieces.push(x);
      }
    }

    for (let i = 0; i < finishedPieces.length; i++) {
      finishedPiecesNum = finishedPiecesNum + finishedPieces[i].length
      for (let y = 0; y < finishedPieces[i].length; y++) {
        finishedCost = finishedCost + this.getIngredientPrice(finishedPieces[i][y]);
      }
    }  

    console.log(finishedPieces)
    console.log(finishedPiecesNum)
    console.log(finishedCost)
  }

  getElements(name) {
    let array = [];
    if (name == 'Mushroom Pizza') {
      array = ['Dough', 'Mushroom', 'Cheese', 'Tomato']
    }
    if (name == 'Pepperoni Pizza') {
      array = ['Dough', 'Pepperoni', 'Cheese', 'Tomato']
    }
    if (name == 'PizzaSauce') {
      array = ['Dough', 'Tomato']
    }
    if (name == 'PizzaSauceCheese') {
      array = ['Dough', 'Cheese', 'Tomato']
    }

    return array
  }

  onTimerFinished(e: Event) {
    this.getResults();
    if (e["action"] == "done") {
      this.router.navigate(['/results']);
    }
  }


}