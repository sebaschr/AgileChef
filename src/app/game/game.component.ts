import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { element } from 'protractor';
import { DataService } from '../data.service';
import { key } from 'firebase-key';
import { Ingredient } from '../models/ingredient';
import { finished } from 'stream';

/**
 * This class is where the logic of the game is created, along with pieces, queue and combination of the pieces.
 */
@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  color: ThemePalette = 'primary';

  // Lists of Data we are going to use
  playerList = [];
  team = key();
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
  /**
   * The constructor tells the data service to load the session. 
   * The time (in seconds) comes from the dataService, depending on the sprint that is currently on execution
   * It calls several functions to make the program work.
   * @param router 
   * It calls the Router so it can guide the user to the next page
   * @param dataService 
   * It calls the dataService to connect with the DataBase
   */
  constructor(private router: Router, public dataService: DataService) {
    this.dataService.loadSession();
    this.timer = this.dataService.session.sprints[this.dataService.sprintCounter].ejecucion;
    this.loadPlayers(this.dataService.currentPlayer);
    this.loadDBLists();
    this.loadQueue(3);
  }

  ngOnInit(): void {

  }
  /**
   * This function loads the players to display them in the page. It runs through all of the teams in the dataService session, and gets the one where the current user is. Then creates a list of these players
   * @param player It requires the current User as a parameter to find its team. 
   */
  loadPlayers(player) {
    let teamList = this.dataService.session.teams;
    let players = [];
    for (let i = 0; i < teamList.length; i++) {
      if (teamList[i].players === undefined) {

      } else {
        for (let y = 0; y < teamList[i].players.length; y++) {
          if (player.identifier == teamList[i].players[y].identifier) {
            this.team = teamList[i].identifier
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
  /**
   * This function calls the ingredients and Pizzas from the dataService and assigns them to local arrays
   */
  loadDBLists() {
    this.ingredients = this.dataService.ingredients;
    this.pizzaList = this.dataService.pizzas;
  }

  /**
   * This function creates the queue in the game by using the pizza list. 
   * @param counter  This function requires a counter so it can fill the queue, it will run the pizzaList array the amount of the counter. 
   */
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
  /**
   * This function will check if the element p of the queue is inside of the canvas. It if isn't, it will not do anything. If it is (and was not previously), it will change its status to editing, and call other functions to assign the ingredients of this element and another one to show them.
   * @param p It needs the element p of the queue to check if it's inside or not, and for its properties. 
   * @param event It needs the event of the mouse to check which element in the HTML is being called and get its position.
   */
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
  /**
   * This function goes over the pizzaList, if the key from the parameter received matches the one from pizzaList, it changes to editing and push the p element to a new queueEditing array
   * @param p This function requires a p pizza for its execution */
  findPizza(p) {
    this.pizzaList.forEach(pizza => {
      if (p.pizzaKey == pizza.key) {
        p.editing = true;
        this.queueEditing.push(p)
      }
    });
  }
  /**
   * This function goes over the recipes and if the recipeID of the p pizza received matches the idRecipe from the receipes array. It returns an array filled with the ingredients needed. 
   * @param p This function requires a p pizza for its execution
   */
  getIngredients(p) {

    var pizzaIngredients = [];

    for (let i = 0; i < this.dataService.recipes.length; i++) {
      if (this.dataService.recipes[i].idRecipe == p.recipeID) {
        pizzaIngredients = this.dataService.recipes[i].ingredients
      }

    }
    return pizzaIngredients;
  }

  /**
   * This function receives a key, and goes over the ingredients array. If the ingredient key matches the key received. It will send back the ingredient information. 
   * @param key This function a key() for its execution.
   */
  getIngredientInfo(key) {
    for (let index = 0; index < this.ingredients.length; index++) {
      if (key == this.ingredients[index].key) {
        var ing = this.ingredients[index];
      }
    }

    return ing;
  }

  /**
   * This function receives an array ing and a MouseEvent. First it gets the position (from the currentTarget selected) and it updates the ing position. 
   * It calls the function checkifInsideofCanvasPos to check if it's inside of the canvas, if true, the editing is true and it's pushed to the inProd array (if it was not already there). 
   * Then it calls the mixingredients function for each element and the ing to check if they can be mixed. 
   * Then it calls different functions to check if it's inside of Trash, Oven or the Finished Queue. 
   * @param ing 
   * @param event 
   */
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
  /**
   * This function checks if an element is inside of the inProd array. It goes over the inProd array, if the key from the ing element received matches the inProd element key the varibale becomes true, if not it stays false. And returns the inProduction variable. 
   * @param ing This function requires an array (ingredient) ing for its execution.
   */
  checkifInprod(ing) {
    let inProduction = false;

    for (let index = 0; index < this.inProd.length; index++) {
      if (this.inProd[index].key == ing.key) {
        inProduction = true
      }
    }

    return inProduction
  }
  /**
   * This function receives an element el and calls the HTML DOM function getBoundingClientRect to get the position in the HTML and assigns it to a variable p to return it
   * @param el This function requires an element el for its execution. 
   */
  getPosition(el) {
    var p = el.getBoundingClientRect()
    return p;
  }

  /**
   * This function received a key() cod and it runs through the activePlayer.ing array. It cod matches the ing.key then it assigns it to a variable found and returns it
   * @param cod It requires a key() for its execution
   */
  findActiveIng(cod) {
    var found;
    this.activePlayer.ing.forEach(element => {
      if (element.key == cod) {
        found = element;
      }
    });

    return found
  }
  /**
   * This function receives an array/object ing, and a MouseEvent e. 
   * It creates a variable count and assigns it the default function from Mouseevent to get the number of clicks. 
   * It creates a variable ingredientDiv that gets the MouseEvent currentTarget (which gets the HTML element currently selected)
   * It creates a variable found which value depends on another function findActiveIng which returns the ingredient information. 
   * It creates a variable checkInside which value depends on another function checkifInsideofCanvas (true or false)
   * If checkInside is true, then it checks if the user clicked thrice. 
   *  If the progress is 0 at the moment of the 3 clicks, the new progress is 50 and if the found.name is Dough the it changes the width and height. And changes the activeImage.
   *  If the progress is 50 at the moment of the 3 clicks, the new progress is 100 and changes the activeImage.
   *  If the progress is 100 at the moment of the 3 clicks, it won't affect.
   * @param ing This function requires an array/object Ing for its execution (ingredient)
   * @param e This function requires the MouseEvent from when it is called. 
   */
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

  /**
    * This function receives an el element and check if it's inside of the canvas.
    * It creates a variable inside, false by default. Another one called canvasDiv which gets the HTML DOM by calling a document.querySelector function with the value '.gameCanvas'. Then two variables which get the position of these two elements by calling the function getPosition. Then compares different parameters, if all of them are true, then the variable inside becomes true. If not, it stays false, and returns 
    * @param el  This function requires the MouseEvent from when it is called. 
    */
  checkifinsideofCanvas(el) {

    var inside = false;

    var canvasDiv = document.querySelector('.gameCanvas');

    var p = this.getPosition(el)
    var canvasPosition = this.getPosition(canvasDiv);

    if (p.bottom < canvasPosition.bottom && p.right < canvasPosition.right && p.top > canvasPosition.top && p.left > canvasPosition.left) {
      inside = true;
    }

    return inside;
  }

  /**
   * This function assigns the ingredients of a queue element ing to all of the players evenly. 
   * It creates an empty array ingredients, and runs through the ing array received. For each element it calls another function getIngredientInfo to get the ingredient and assigns it to the ingredients array. 
   * Then it runs through the ingredients array and creates a new piece for each element with all the properties, and assigns it to newQueueEl then it replaces the Ingredient element. 
   * Then it runs through the ingredients array again (with the new information) and assigns the element to the players one by one. 
   * Then it pushes it to the ingredientsAssigned of that player in the playerlist. And calls the function showIngredients for that player.
   * @param ing This requires an array ing for its execution 
   */
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
        zindex: 0,
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
      this.showIngredients(this.counterPlayer)
    }
  }

  /**
   * This function shows the ingredients assigned in the page of the player p
   * It receives a player p. It changes the activePlayer name to the p.id and create a new empty array. 
   * Then it runs through the playerList and the ingredientsAssigned of each element. If the p.id matches the id of the playerList element, the propoerty visibility of its ingredientsAssigned becomes 'visible', otherwise it becomes hidden (only if they are not inside of the canvas, we can check this by running the function checkifInsideofCanvasPos)
   * Then it runs through the activePlayer.ing and changes the zindex property so they don't overlap. Dough must be behind, then tomato, then cheese, then the rest.
   * Finally it assigns the fullArray to the activePLayer.ing property
   * @param p It requires a player p for its execution. 
   */

  showIngredients(p) {
    this.activePlayer.name = p.id;
    var fullArray = [];
    for (let index = 0; index < this.playerList.length; index++) {
      for (let i = 0; i < this.playerList[index].ingredientsAssigned.length; i++) {
        if (p.id == this.playerList[index].id) {
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
    for (let i = 0; i < this.activePlayer.ing.length; i++) {

      if (this.activePlayer.ing[i].name == 'Dough') {
        this.activePlayer.ing[i].zindex = 1
      }

      if (this.activePlayer.ing[i].name == 'Tomato') {
        this.activePlayer.ing[i].zindex = 2
      }

      if (this.activePlayer.ing[i].name == 'Cheese') {
        this.activePlayer.ing[i].zindex = 3
      }

      if (this.activePlayer.ing[i].name == 'Pepperoni' || this.activePlayer.ing[i].name == 'Mushroom') {
        this.activePlayer.ing[i].zindex = 4
      }
    }

    this.activePlayer.ing = fullArray;

  }

  /**
     * This function receives an el element and check if it's inside of the canvas.
     * It creates a variable inside, false by default. Another one called canvasDiv which gets the HTML DOM by calling a document.querySelector function with the value '.gameCanvas'. Then two variables which get the position of these two elements by calling the function getPosition. Then compares different parameters, if all of them are true, then the variable inside becomes true. If not, it stays false, and returns 
     * @param el  This function requires the MouseEvent from when it is called. 
     */
  checkifInsideofCanvasPos(p) {
    var inside = false;

    var canvasDiv = document.querySelector('.gameCanvas');

    var canvasPosition = this.getPosition(canvasDiv)

    if (p.bottom < canvasPosition.bottom && p.right < canvasPosition.right && p.top > canvasPosition.top && p.left > canvasPosition.left) {
      inside = true;
    }

    return inside;
  }

  /**
   * This function checks if two ingredients ing1 and ing1 can be mixed, and changes depending on the values. 
   * It receives two objects ingredients ing1 and ing2. First it checks if the progress is less than 100 (which means it's incomplete), if so, it continues. 
   * If they are complete, it checks if one ingredient is Dough and another one is tomato, if so, check if one is inside of another by calling another function checkifInside. If ing1 is inside of ing2 then it becomes PizzaSauce and one ingredient gets removed from Inprod array and it won't display on page (disappears from screen), and changes the activeImg of the element in screen.
   * If their names are PizzaSauce and Cheese, it does the same. and the new name will be PizzaSauceCheese
   * If their names are PizzaSauceCheese and Mushroom or Pepperoni, it does the same, and the new name becomes Mushroom Pizza or Pepperoni Pizza respectively. The progress goes back to 0 so it can be cooked.
   * @param ing1 It requires an object (piece/ingredients) ing1 for its execution
   * @param ing2 It requires an object (piece/ingredients) ing2 for its execution
   */
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
  /**
   * This function checks if pos1 is inside of pos2
   * First it creates a variable inside that it's false by default. Gets the position of each element and compares them. And if everything is true, the varibale inside become true. Then it returns inside.
   * @param pos1 It requires an object (piece/ingredients) pos1 for its execution
   * @param pos2 It requires an object (piece/ingredients) pos2 for its execution
   */
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

  /**
   * This function checks if an element is inside of the trash and adds it to the trash array. 
   * First it creates a varibale inside and it's false by default. Another one which value is the DOM HTML element with the class trash and another one that gets the position of the last variable. Then two variable that get the position of the two elements to compare. 
   * Then if pos1 is inside of pos2 (trash), the variable inside becomes true. 
   * If inside is true. The element disappears from screen (its property onPizza becomes 'none'), its name gets added to the trash array, and gets removed from the inProd array by calling the function cleanTrashFromProd with the name. If the queue length - the queueEditing length is 2 then it runs loadQueue with the parameter 2 (so it doesn't stay empty)
   * @param pos1  It requires an object (piece/ingredients) pos1 for its execution
   */
  checkifInsideofTrash(pos1) {

    var inside = false;
    var trashDiv = document.querySelector('.trash');
    var trashPosition = this.getPosition(trashDiv)
    var position1 = pos1.position;
    var position2 = trashPosition;


    if ((position1.right < position2.right) && (position2.left < position1.left)) {
      if ((position1.bottom < position2.bottom) && (position1.top > position2.top)) {
        inside = true;
      }
    }

    if (inside) {
      pos1.onPizza = 'none';
      this.trash.push(pos1.name);
      this.cleanTrashfromProd(pos1.name)
      if (this.queue.length - this.queueEditing.length == 2) {
        this.loadQueue(2);
      }

    }

  }

  /**
   * This functions removes the arrayIng from Prod 
   * First it runs through the inProd array, and if the inProd.name matches the arrayIng received, it removes it by using the method splice with the current index and leaves that for with the break. 
    * Then creates a variable x and it runs through the queueEditing array, and if the queueEditing.name matches the arrayIng received, it assigns the key to the variable x and removes it with the splice method. ANd leaves that for with the break
    * Then runs through the queue, if the variable x is the same as the queue element key, it gets removed from the queue. And leaves with the break method
   * @param arrayIng It requires the arrayIng String for its execution
   */
  cleanTrashfromProd(arrayIng) {
    for (let i = 0; i < this.inProd.length; i++) {
      if (this.inProd[i].name == arrayIng) {
        this.inProd.splice(i, 1);
        break
      }
    }

    var x = key();
    for (let i = 0; i < this.queueEditing.length; i++) {
      if (this.queueEditing[i].name == arrayIng) {
        x = this.queueEditing[i].key
        this.queueEditing.splice(i, 1);
        break
      }
    }


    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].key == x) {
        this.queue.splice(i, 1);
        break
      }
    }
  }

  /**
   * This function check if the pos1 is inside of oven and cooks it (if possible)
   * First it creates a variable inside (false by default), gets the HTML DOC  with the class.oven then assigns its position to the variable ovenPosition. And then to two variable position1 and position2. 
   * If it's inside of the oven by comparing the values, the variable inside becomes true. Then it fills the oven in a specific amount of seconds by calling the function countup
   * @param pos1  It requires an object (piece/ingredients) pos1 for its execution
   */
  checkifInsideofOven(pos1) {
    var inside = false;
    var ovenDiv = document.querySelector('.oven');
    var ovenPosition = ovenDiv.getBoundingClientRect();

    var position1 = pos1.position;
    var position2 = ovenPosition;


    if ((position1.right < position2.right) && (position2.left < position1.left)) {
      if ((position1.bottom < position2.bottom) && (position1.top > position2.top)) {
        inside = true;
      }
    }
    if (inside && (pos1.name == 'Mushroom Pizza' || pos1.name == 'Pepperoni Pizza')) {
      this.countUp(100, 5000, pos1);
    }
  }

  /**
   * This functions deletes a pizza from the queue.
   * First it runs through the queue, if the pKey received matches the queue element key it removes it from the queue.
   * @param pKey It requires a key() pKey for its execution
   */
  deletePizzafromQueue(pKey) {
    for (let i = 0; i < this.queue.length; i++) {
      if (pKey == this.queue[i].key) {
        this.queue.splice(i, 1);
      }

    }
  }
  /**
   * This functions deletes an element from the production.
   * First it runs through the inProd array, if the name received matches the queue element name  it removes it from the inProd array and breaks the for method.
   * @param pKey It requires a key() pKey for its execution
   */
  removefromProd(name) {
    for (let i = 0; i < this.inProd.length; i++) {
      if (this.inProd[i].name == name) {
        this.inProd.splice(i, 1);
        break;
      }
    }
  }
  /**
   * This function check if a completed element is inside of the finished Queue, removes it from production, and finishes it. 
   * First it creates a variable inside (false by default), gets the HTML DOC  with the class readyQueue then assigns its position to the variable readyQueuePosition. And then to two variables position1 and position2. 
   * If it's inside of the readyQueue (table) by comparing the values, the variable inside becomes true. If the pos1.name is Pepperoni Pizza and Mushroom Pizza and the progress over 100, the property onPizza becomes 'none' and it won't display on screen. Then runs through the queueEditing array and if the name matches, then it gets removed from the queueEditing. And the queue by calling a function (then it breaks)
   * Then it runs through the inProd array and if the name matches, it finds the first and removes it from the inProd array and it gets pushed to the finishedArray.
   * @param pos1 It requires an object (piece/ingredients) pos1 for its execution
   */
  checkifInsideofFinishedQueue(pos1) {
    var inside = false;
    var readyQueueDiv = document.querySelector('.readyQueue');
    var readyQueuePosition = readyQueueDiv.getBoundingClientRect();
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
  }
  /**
   * The function completes the p.progress of an element p in 'time' milliseconds. 
   * @param max This variable is a number, max it can go to.
   * @param time The time in miliseconds
   * @param p the ingredient/piece 
   */
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

  /**
   * This function creates a variable x (0 by default) , then it runs through the pizzaList and if the pName received matches the pizzaList name, it assigns the price to the x. If it does not match. it runs through the ingredientList and gets the price and assigns it to the x variable. Then it returns x. 
   * @param pName This function requires a pname String for its exectuioon
   */
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
  /**
   * This function gets the results by grabbing the arrays inProd, inTrash, finished lengths and elements. It calculates the pizzas and pieces numbers, creates an object and pushes it to the dataService session of the currentTeam results
   */
  getResults() {

    let inProductionPieces = [], inProductionPiecesNum = 0, inProdcost = 0, inProdPizzas = this.queueEditing.length, inProdPizzasCost = 0;
    let finishedPieces = [], finishedPiecesNum = 0, finishedCost = 0, finishedPizzas = 0, finishedPizzasCost = 0;
    let inTrashPieces = [], inTrashPiecesNum = 0, inTrashCost = 0, inTrashPizzas = 0, inTrashPizzasCost = 0;

    /* In Trash */
    for (let i = 0; i < this.trash.length; i++) {
      if (this.trash[i] == 'Mushroom Pizza' || this.trash[i] == 'Pepperoni Pizza' || this.trash[i] == 'PizzaSauce' || this.trash[i] == 'PizzaSauceCheese') {
        if (this.trash[i] == 'Mushroom Pizza' || this.trash[i] == 'Pepperoni Pizza') {
          inTrashPizzas++
          var price = this.getIngredientPrice(this.trash[i])
          inTrashPizzasCost = inTrashPizzasCost + price;
        }
        var arrayIngs = this.getElements(this.trash[i]);
        inTrashPieces.push(arrayIngs)
      } else {
        inTrashPieces.push([this.trash[i]]);
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

    for (let i = 0; i < this.queueEditing.length; i++) {
      var price = this.getIngredientPrice(this.queueEditing[i].name);
      inProdPizzasCost = inProdPizzasCost + price;

    }

    /* In Finished queue */
    for (let i = 0; i < this.finished.length; i++) {
      if (this.finished[i].name == 'Mushroom Pizza' || this.finished[i].name == 'Pepperoni Pizza' || this.finished[i].name == 'PizzaSauce' || this.finished[i].name == 'PizzaSauceCheese') {
        if (this.finished[i].name == 'Mushroom Pizza' || this.finished[i].name == 'Pepperoni Pizza') {
          finishedPizzas++;
          var price = this.getIngredientPrice(this.finished[i].name)
          finishedPizzasCost = finishedPizzasCost + price;
        }
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
    let resultsArray = {
      inProdPieces: inProductionPiecesNum,
      inProdSumPieces: inProdcost,
      inProdPizzas: inProdPizzas,

      finishedPiecesNum: finishedPiecesNum,
      finishedCost: finishedCost,
      finishedPizzas: finishedPizzas,
      finishedPizzasCost: finishedPizzasCost,

      inTrashPiecesNum: inTrashPiecesNum,
      inTrashCost: inTrashCost,
      inTrashPizzas: inTrashPizzas,
    }
    this.dataService.addResultstoTeam(resultsArray, this.team)
  }

  /**
   * This function returns an array of the ingredients that make up an ingredient/pizza/piece depending on the name
   * @param name This function requires a name for its execution
   */
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

  /**
   * This function checks if the timer is done, if so, it goes to the results navigation. 
   * @param e The timer event
   */
  onTimerFinished(e: Event) {
    if (e["action"] == "done") {
      this.getResults();
      this.router.navigate(['/results']);
    }
  }


}