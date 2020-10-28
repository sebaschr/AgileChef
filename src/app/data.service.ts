import { Injectable } from '@angular/core';
import { Session } from 'protractor';
import { Admin } from './models/admin';
import { ACSession } from './models/acSession';
import { Player } from './models/player';

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
    //TODO: save session
  }

  loadSessionFromLocalStorage() {

  }

}
