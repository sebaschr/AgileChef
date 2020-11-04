import { Injectable } from '@angular/core';
import { Session } from 'protractor';
import { Admin } from './models/admin';
import { ACSession } from './models/acSession';
import { Player } from './models/player';
import { getLocaleTimeFormat } from '@angular/common';
import { Team } from './models/team';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public currentPlayer: Player;
  admin: Admin = new Admin('admin', '1234');
  public session: ACSession = new ACSession();

  constructor() { }

  savePlayerToLocalStorage(playerName: string, isProductOwner: boolean) {
    this.currentPlayer = new Player(playerName, isProductOwner);
    localStorage.setItem("currentUser", JSON.stringify(this.currentPlayer));
    this.loadSessionFromLocalStorage();
  }

  saveSessionToLocalStorage(session: ACSession) {
    this.session = new ACSession();
    localStorage.setItem('sprints',JSON.stringify(session));
    this.loadSessionFromLocalStorage();
  }

  loadSessionFromLocalStorage() {

  }

  loadPlayer () {
    window.localStorage.getItem(name);
    
  }

  // addPlayerToTeam(player: Player, team: Team) {

  //   for (let i = 0; i < this.session.teams.length; i++) {
  //     const teamStored = this.session.teams[i];
  //     for (let j = 0; j < teamStored.players.length; j++) {
  //       const playerStored = teamStored.players[j];
  //       if (player.identifier === playerStored.identifier) {
  //         teamStored.players.splice(j, 1);
  //       }
  //     }
  //   }

  //   team.addPlayer(player);
  // }

  /*savePlayerToTeam (){
    
  }*/

}
