import { Injectable } from '@angular/core';
import { Admin } from './models/admin';
import { ACSession } from './models/acSession';
import { Player } from './models/player';
import { Team } from './models/team';
import { Ingredient } from './models/ingredient';
import { templateSourceUrl } from '@angular/compiler';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public currentPlayer: Player;
  admin: Admin = new Admin('esteban', '1234');
  public session: ACSession = new ACSession();
  public sprintCounter = 0;
  constructor() {

  }

  post(collection: string, data: object) {
    localStorage.setItem(collection, JSON.stringify(data));
  }

  get(src: string) {
    return JSON.parse(localStorage.getItem(src));
  }

  savePlayerToLocalStorage(playerName: string, isProductOwner: boolean, teamNumber: number) {
    this.currentPlayer = new Player(playerName, isProductOwner, teamNumber);
    this.post('currentUser', this.currentPlayer);
  }

  saveSessionToLocalStorage(session: ACSession) {
    console.log('save Session: ')
    console.log(session);
    this.post('session', session);
  }

  loadSessionFromLocalStorage() {
    this.session = JSON.parse(localStorage.getItem('session'));
    return this.get('session');
  }


  loadPlayerFromLocalStorage() {
    this.currentPlayer = JSON.parse(localStorage.getItem('currentUser'));
    return this.get('currentUser');
  }

  loadTeams() {
    let newSession = new ACSession();
    newSession = JSON.parse(localStorage.getItem('session'));
    this.session = newSession;
  }

  updateSessionTeams(team: Team) {
    let session = this.session;
    console.log(session);
    for (let i = 0; i < this.session.teams.length; i++) {
      if (team.identifier == this.session.teams[i].identifier) {
        this.session.teams[i] = team
      }
    }
      this.post('session',session);
  }

  addPlayerToTeam(player: Player, team: Team) {
    var session = this.session;

    let currentUserData = this.get('currentUser');

    if(currentUserData.identifier == player.identifier){
      currentUserData.teamNumber = team.teamNumber;
      this.post('currentUser',currentUserData);
    }

    let newTeam = new Team(team.teamNumber);
    newTeam.identifier = team.identifier;
    newTeam.pizzas = team.pizzas;
    newTeam.teamNumber = team.teamNumber;
    newTeam.players = team.players;

    console.log(this.session);
    this.checkUserTeam(player.identifier)
    newTeam.addPlayer(player);
    this.updateSessionTeams(newTeam)

    // console.log(' add player')
    // console.log(this.session)
  }


  checkUserTeam(identifier) {
    var teams = this.session.teams;
    
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].players.length; j++) {
        var playerFound = teams[i].players[j];
        if (playerFound.identifier == identifier) {
          teams[i].players.splice(j, 1);
        }
      }      
    }
  }

  loadIngredients(){

    
  }

  getIngredientList(e){
        console.log(e);
  }
  // addPlayerToTeam(player: Player, teamNumber: Number) {

  //   this.get('teams');
  //   //TODO: Check Commented Process
  //   // for (let i = 0; i < this.session.teams.length; i++) {
  //   //   const teamStored = this.session.teams[i];
  //   //   for (let j = 0; j < teamStored.players.length; j++) {
  //   //     const playerStored = teamStored.players[j];
  //   //     if (player.identifier === playerStored.identifier) {
  //   //       teamStored.players.splice(j, 1);
  //   //     }
  //   //   }
  //   // }

  //   // team.addPlayer(player);

  //   let currentUserData = this.get('currentUser');
  //   if(currentUserData.identifier === player.identifier){
  //     console.log('yes');
  //       currentUserData.teamNumber = teamNumber;
  //       this.post('currentUser', currentUserData);
  //     //this.post('currentUser', player);
  //   }else{
  //     console.log('false');
  //   }
  // }

  removePlayerFromTeam(player: Player, team: Team) {

    this.findanddelete(player.identifier,team.identifier);

    var newTeam = new Team(team.teamNumber)

    for (let i = 0; i < team.players.length; i++) {
      if (player.identifier == team.players[i].identifier) {
        console.log('got em chief');
        team.players.splice(i,1);
        newTeam = team.players[i];
      }
    }

    let currentUserData = this.get('currentUser');
    if(currentUserData.identifier === player.identifier){
      player.teamNumber = null;
      this.post('currentUser', player);
    }else{
      console.log('false');
    }

    this.updateSessionTeams(newTeam);
  }

  findanddelete(pidentifier,tidenfitier){
    var teams = this.session.teams;
    
    for (let i = 0; i < this.session.teams.length; i++) {
      if (this.session.teams[i].identifier == tidenfitier) {
        var foundTeam = this.session.teams[i];
        for (let t = 0; t < foundTeam.players.length; t++) {
            if(foundTeam.players[t].identifier ==pidentifier){
              foundTeam.players.splice(t,1);
            }          
        }
      }
      
    }
  }

}
