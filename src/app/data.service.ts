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

  /**
   * Returns data from the firebase database.
   * @param src - Name of the collection.
  */
  get(src: string) {
    return this.db.object(src).snapshotChanges();
  }

  /**
   * Adds admin data to the firebase database.
  */
  saveAdmin() {
    let admin = new Admin('admin', '1234');
    this.post('adminInfo', admin);
  }

  /**
   * Loads admin information so it can be verified when the use logs in.
  */
  loadAdmin() {
    var adminData = null;
    this.get('adminInfo').subscribe(action => {
      adminData = action.payload.val()
      this.admin = adminData;
    });
  }

  /**
   * Adds player as the current player in the firebase database.
   * @param playerName - Name registered by the user.
   * @param isProductOwner  - Determines whether the user is a product owner or not.
   * @param teamNumber - Registers the user's team number.
  */
  savePlayer(playerName: string, isProductOwner: boolean, teamNumber) {
    this.currentPlayer = new Player(playerName, isProductOwner, teamNumber);
    this.post('currentUser', this.currentPlayer);
  }

  /**
   * Loads current player from the firebase database so the information can be used.
  */
  loadPlayer() {
    var currentUserData = null;
    this.get('currentUser').subscribe(action => {
      currentUserData = action.payload.val()
      this.currentPlayer = currentUserData;
    });
  }

  /**
   * Adds all of the session information into the firebase database.
   * @param session - Session information.
  */
  saveSession(session: ACSession) {
    this.post('session', session);
  }

  /**
   * Loads all of the session information so it can be accessed.
  */
  loadSession() {
    var sessionData = null;
    this.get('session').subscribe(action => {
      sessionData = action.payload.val()
      this.session = sessionData;
    });
  }

  /**
   * 
   */
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


  /**
   * Checks if the player is already in the database.
   * If not, then adds the player to the selected team with the respective number of the team.
   * @param player - Player to be added.
   * @param newTeam - Team the player is added to.
   */
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

  /**
   * 
   * @param results 
   * @param team 
   */
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

  /**
   * 
   * @param player 
   * @param team 
   */
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