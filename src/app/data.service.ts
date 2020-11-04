import { Injectable } from '@angular/core';
import { Admin } from './models/admin';
import { ACSession } from './models/acSession';
import { Player } from './models/player';
import { Team } from './models/team';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public currentPlayer: Player;
  admin: Admin = new Admin('admin', '1234');
  public session: ACSession = new ACSession();

  constructor() { }

  post (collection: string, data:object){
    localStorage.setItem(collection, JSON.stringify(data));
  }

  get (src: string){
    return JSON.parse(localStorage.getItem(src));
  }

  savePlayerToLocalStorage(playerName: string, isProductOwner: boolean, teamNumber: number) {
    this.currentPlayer = new Player(playerName, isProductOwner, teamNumber);
    this.post('currentUser', this.currentPlayer);
    this.loadSessionFromLocalStorage();
  }

  saveSessionToLocalStorage(session: ACSession) {
    this.session = new ACSession();
    this.post('session', this.session);
  }

  loadSessionFromLocalStorage() {
    this.session = new ACSession();
    this.get('session');
  }

  loadPlayer() {
    window.localStorage.getItem(name);
  }

  addPlayerToTeam(player: Player, team: Team) {

    for (let i = 0; i < this.session.teams.length; i++) {
      const teamStored = this.session.teams[i];
      for (let j = 0; j < teamStored.players.length; j++) {
        const playerStored = teamStored.players[j];
        if (player.identifier === playerStored.identifier) {
          teamStored.players.splice(j, 1);
        }
      }
    }

    team.addPlayer(player);

    let allData = this.get('currentUser');

    if(allData.identifier === player.identifier){
      this.currentPlayer.teamNumber = team.teamNumber;
      this.post('currentUser', player);
    }else{
      console.log('false');
    }
  }

}
