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
  public team : Team;

  constructor() { }

  savePlayerToLocalStorage(playerName: string, isProductOwner: boolean) {
    this.currentPlayer = new Player(playerName, isProductOwner);
    localStorage.setItem("currentUser", JSON.stringify(this.currentPlayer));
    this.loadSessionFromLocalStorage();
  }

  saveSessionToLocalStorage(session: ACSession) {
    this.session = new ACSession();
    localStorage.setItem('sprints',JSON.stringify(this.session.sprints));
    localStorage.setItem('number of teams',JSON.stringify(this.session.teams.length));
    localStorage.setItem('minPlayers',JSON.stringify(this.session.playersMin));
    localStorage.setItem('maxPlayers',JSON.stringify(this.session.playersMax));
    localStorage.setItem('objectives',JSON.stringify(this.session.objectives));
    this.loadSessionFromLocalStorage();
  }

  loadSessionFromLocalStorage() {

  }

  loadPlayer () {
    window.localStorage.getItem(name);
    
  }

  /*savePlayerToTeam (){
    
  }*/

}
