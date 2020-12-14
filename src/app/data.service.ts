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

  addPlayerToTeam(player: Player, newTeam: Team) {
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

  addResultstoTeam(results, team) {
    for (let i = 0; i < this.session.teams.length; i++) {
      if (team == this.session.teams[i].identifier) {
        if ((this.session.teams[i].results === undefined)||(this.sprintCounter ==0)) {
          this.session.teams[i].results = [];
        }
        this.session.teams[i].results.push(results)
      }
    }

    this.saveSession(this.session);
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

  /**
   * This function gets the 'ingredients' collection from the DB by using the method get and assigns it to the array ingredients.
   */
  loadIngredients() {
    var ingredients = null;
    this.get('ingredients').subscribe(action => {
      ingredients = action.payload.val();
      this.ingredients = ingredients;
    });
  }

  
  /**
   * This function gets the 'pizzas' collection from the DB by using the method get and assigns it to the array pizzas.
   */

  loadPizzas() {
    var ingredients = null;
    this.get('pizzas').subscribe(action => {
      ingredients = action.payload.val();
      this.pizzas = ingredients;
    });
  }
  /**
   * This function gets the 'recipes' collection from the DB by using the method get and assigns it to the array recipes.
   */
  loadRecipes() {
    var ingredients = null;
    this.get('recipes').subscribe(action => {
      ingredients = action.payload.val();
      this.recipes = ingredients;

    });
  }
}