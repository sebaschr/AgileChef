import { Injectable } from '@angular/core';
import { Admin } from './models/admin';
import { ACSession } from './models/acSession';
import { Player } from './models/player';
import { Team } from './models/team';
import { templateSourceUrl } from '@angular/compiler';
import { runInThisContext } from 'vm';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { database } from 'firebase';
import { key } from 'firebase-key';

@Injectable({
  providedIn: 'root'
})

/**
 * DataService manages all data on this app.
 * @param db - Angular Firebase Database.
 */
export class DataService {

  public currentPlayer: Player;
  public admin: Admin;
  public session: ACSession = new ACSession();
  public sprintCounter = 0;
  public ingredients = [];
  public pizzas = [];
  public recipes = [];
  public results = [];
  public adminStarted = {}

  constructor(public db: AngularFireDatabase) {
    // this.loadEv();
    this.saveAdmin();
    this.loadAdmin();
    this.loadIngredients();
    this.loadPizzas();
    this.loadRecipes();
    this.loadAdminStarted() 
  }


  /**
   * Adds data to the firebase database.
   * @param collection - Name of the dataset
   * @param data  - Data to be store.
   */
  post(collection: string, data: object) {
    this.db.object(collection).set(data);
  }

  get(src: string) {
    return this.db.object(src).snapshotChanges();
  }

  saveAdmin() {
    let admin = new Admin('admin', '1234');
    this.post('adminInfo', admin);
  }

  loadAdmin() {
    var adminData = null;
    this.get('adminInfo').subscribe(action => {
      adminData = action.payload.val()
      this.admin = adminData;
    });
  }

  savePlayerToLocalStorage(playerName: string, isProductOwner: boolean, teamNumber) {
    this.currentPlayer = new Player(playerName, isProductOwner, teamNumber);
    this.post('currentUser', this.currentPlayer);
  }

  loadPlayer() {
    var currentUserData = null;
    this.get('currentUser').subscribe(action => {
      currentUserData = action.payload.val()
      this.currentPlayer = currentUserData;
    });
  }

  saveSession(session: ACSession) {
    this.post('session', session);
  }

  saveResults() {
    this.post('results', this.results);
  }

  loadResults() {
    var resultData = null;
    this.get('results').subscribe(action => {
      resultData = action.payload.val()
      this.results = resultData;
    });
  }

  loadSession() {
    var sessionData = null;
    this.get('session').subscribe(action => {
      sessionData = action.payload.val()
      this.session = sessionData;
    });
  }

  loadAdminStarted() {
    var adminStarted = null;
    this.get('adminStarted').subscribe(action => {
      adminStarted = action.payload.val();
      this.adminStarted = adminStarted;
    });
  }

  updateSessionTeams(team: Team) {
    let session = this.session;
    for (let i = 0; i < this.session.teams.length; i++) {
      if (team.identifier == this.session.teams[i].identifier) {
        this.session.teams[i] = team
      }
    }
    this.post('session', session);
  }

  hideInstruction() {
    document.getElementById('instructions').style.visibility = 'hidden';
  }

  addPlayerToTeam(player: Player, newTeam: Team) {
    //this.hideInstruction();
    if (this.currentPlayer.identifier == player.identifier) {
      this.findanddelete(player.identifier);
      for (let i = 0; i < this.session.teams.length; i++) {
        if (this.session.teams[i].identifier == newTeam.identifier) {
          if (this.session.teams[i].players === undefined) {
            this.session.teams[i].players = [];
          }
          this.session.teams[i].players.push(player)
        }
      }

      this.currentPlayer.teamNumber = newTeam.teamNumber;
      this.post('currentUser', this.currentPlayer);
      this.saveSession(this.session);
    }
  }

  removePlayerFromTeam(player: Player, team: Team) {

    for (let i = 0; i < this.session.teams.length; i++) {
      if (team.identifier == this.session.teams[i].identifier) {
        if (this.session.teams[i].players === undefined) {

        } else {
          for (let y = 0; y < this.session.teams[i].players.length; y++) {
            if (player.identifier == this.session.teams[i].players[y].identifier) {
              this.session.teams[i].players.splice(y, 1)
            }
          }
        }
      }
    }
    this.currentPlayer.teamNumber = null;
    this.saveSession(this.session);
  }

  maxPlayersReached() {
    var minPlayers = this.session.playersMin;
    var maxPlayers = this.session.playersMax;

    var maxReached = false
    var teams = this.session.teams;

    for (let i = 0; i < this.session.teams.length; i++) {
      for (let j = 0; j < teams[i].players.length; j++) {
        var teamTotal = teams[i].players.length;
        console.log('team total:' + teamTotal);
        if (teamTotal === maxPlayers) {
          maxReached = true;
        } else {
          maxReached = false;
        }
        return maxReached;
      }
    }
  }

  findanddelete(pidentifier) {
    for (let i = 0; i < this.session.teams.length; i++) {
      if (this.session.teams[i].players === undefined) {

      } else {
        for (let y = 0; y < this.session.teams[i].players.length; y++) {
          if (this.session.teams[i].players[y].identifier == pidentifier) {
            this.session.teams[i].players.splice(y, 1)
          }
        }
      }

    }
  }

  loadIngredients() {
    var ingredients = null;
    this.get('ingredients').subscribe(action => {
      ingredients = action.payload.val();
      this.ingredients = ingredients;
    });
  }

  loadPizzas() {
    var ingredients = null;
    this.get('pizzas').subscribe(action => {
      ingredients = action.payload.val();
      this.pizzas = ingredients;
    });
  }

  loadRecipes() {
    var ingredients = null;
    this.get('recipes').subscribe(action => {
      ingredients = action.payload.val();
      this.recipes = ingredients;

    });
  }

  // loadEv() {
  //   let ingredientList = [
  //     {
  //       name: 'Dough',
  //       images: ['../../assets/dough_1.png', '../../assets/dough_2.png', '../../assets/dough_3.png'],
  //       price: 200,
  //       key: key()
  //     },
  //     {
  //       name: 'Cheese',
  //       images: ['../../assets/cheese_01.png', '../../assets/cheese_02.png', '../../assets/cheese_03.png'],
  //       price: 200,
  //       key: key()
  //     },
  //     {
  //       name: 'Tomato',
  //       images: ['../../assets/tomato_1.png', '../../assets/tomato_2.png', '../../assets/tomato_3.png'],
  //       price: 200,
  //       key: key()
  //     },
  //     {
  //       name: 'Chilli Pepper',
  //       images: ['../../assets/pepper_1.png', '../../assets/pepper_2.png', '../../assets/pepper_1.png'],
  //       price: 200,
  //       key: key()
  //     },
  //     {
  //       name: 'Pepperoni',
  //       images: ['../../assets/pepperoni_1.png', '../../assets/pepperoni_2.png', '../../assets/pepperoni_1.png'],
  //       price: 200,
  //       key: key()
  //     },
  //     {
  //       name: 'Mushroom',
  //       images: ['../../assets/shroom_1.png', '../../assets/shroom_2.png', '../../assets/shroom_3.png'],
  //       price: 200,
  //       key: key()
  //     }];
  //   let recipeList = [{
  //     nombre: 'Mushroom Pizza',
  //     idRecipe: key(),
  //     ingredients: [{
  //       idIngredient: 'Dough',
  //       amount: 1
  //     },
  //     {
  //       idIngredient: 'Mushroom',
  //       amount: 1
  //     },
  //     {
  //       idIngredient: 'Cheese',
  //       amount: 1
  //     },
  //     {
  //       idIngredient: 'Tomato',
  //       amount: 1
  //     }]
  //   }, {
  //     nombre: 'Pepperoni Pizza',
  //     idRecipe: key(),
  //     ingredients: [{

  //       idIngredient: 'Dough',
  //       amount: 1
  //     },
  //     {
  //       idIngredient: 'Cheese',
  //       amount: 1
  //     },
  //     {

  //       idIngredient: 'Pepperoni',
  //       amount: 1
  //     },
  //     {

  //       idIngredient: 'Tomato',
  //       amount: 1
  //     }]
  //   }];

  //   for (let i = 0; i < recipeList.length; i++) {
  //     for (let y = 0; y < recipeList[i].ingredients.length; y++) {
  //       for (let t = 0; t < ingredientList.length; t++) {
  //         if (recipeList[i].ingredients[y].idIngredient == ingredientList[t].name) {
  //           recipeList[i].ingredients[y].idIngredient = ingredientList[t].key;
  //         }
  //       }
  //     }
  //   }

  //   var pizzas = [{
  //     key:key(),
  //     name: "Mushroom Pizza",
  //     price: 6500,
  //     imgSrc: '../../assets/mushroom_pizza.png',
  //     recipeID: ''
  //   }, {
  //     key:key(),
  //     name: "Pepperoni Pizza",
  //     price: 6000,
  //     imgSrc: '../../assets/pepperoni_pizza.png',
  //     recipeID: ''
  //   }]

  //   for (let i = 0; i < pizzas.length; i++) {
  //     for (let y = 0; y < recipeList.length; y++) {
  //       if (recipeList[y].nombre == pizzas[i].name) {
  //         pizzas[i].recipeID = recipeList[y].idRecipe
  //       }

  //     }

  //   }
  //   this.post('ingredients',ingredientList)
  //   this.post('recipes',recipeList)
  //   this.post('pizzas',pizzas)
  // }

}