import { Injectable } from '@angular/core';
import { Admin } from './models/admin';
import { ACSession } from './models/acSession';
import { Player } from './models/player';
import { Team } from './models/team';
import { templateSourceUrl } from '@angular/compiler';

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
    console.log('yo')
    console.log(this.session)

    this.saveSessionToLocalStorage(this.session);
  }

  addPlayerToTeam(player: Player, team: Team) {
    console.log('before')
    console.log(this.session)
    let newTeam = new Team(team.teamNumber);

    newTeam.identifier = team.identifier;
    newTeam.pizzas = team.pizzas;
    newTeam.teamNumber = team.teamNumber;
    newTeam.players = team.players;

    this.checkUserTeam(player);
    newTeam.addPlayer(player);

    this.updateSessionTeams(newTeam);
    console.log(this.session)

  }


  checkUserTeam(player: Player) {
    var teams = this.session.teams;
    
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].players.length; j++) {
        var playerFound = teams[i].players[j];
        if (playerFound.identifier == player.identifier) {
          teams[i].players.splice(j, 1);
        }
      }      
    }
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
    for (let i = 0; i < this.session.teams.length; i++) {
      const teamStored = this.session.teams[i];
      for (let j = 0; j < teamStored.players.length; j++) {
        const playerStored = teamStored.players[j];
        if (player.identifier === playerStored.identifier) {
          teamStored.players.splice(j, 1);
        }
      }
    }
  }

}
