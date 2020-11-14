import { Injectable } from '@angular/core';
import { Admin } from './models/admin';
import { ACSession } from './models/acSession';
import { Player } from './models/player';
import { Team } from './models/team';
import { templateSourceUrl } from '@angular/compiler';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public currentPlayer: Player;
  admin: Admin = new Admin('esteban', '1234');
  public session: ACSession = new ACSession();

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
    this.post('session', session);
  }

  loadSessionFromLocalStorage() {
    return this.get('session');
  }


  loadPlayerFromLocalStorage() {
    return this.get('currentUser');
  }

  loadTeams() {
    let newSession = new ACSession();
    newSession = JSON.parse(localStorage.getItem('session'));
    this.session = newSession;
  }

  updateSessionTeams(team: Team) {
    for (let i = 0; i < this.session.teams.length; i++) {
      if (team.identifier == this.session.teams[i].identifier) {
        this.session.teams[i] = team
      }
    }
    this.saveSessionToLocalStorage(this.session);
  }

  addPlayerToTeam(player: Player, team: Team) {
    
    let currentUserData = this.get('currentUser');
    if(currentUserData.identifier === player.identifier){
      player.teamNumber = team.teamNumber;
      this.post('currentUser', player);
    }else{
      console.log('false');
    }

    let newTeam = new Team(team.teamNumber);

    newTeam.identifier = team.identifier;
    newTeam.pizzas = team.pizzas;
    newTeam.teamNumber = team.teamNumber;
    newTeam.players = team.players;

    this.checkUserTeam(player.identifier);
    newTeam.addPlayer(player);

    this.updateSessionTeams(newTeam);

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
