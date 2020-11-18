import { Injectable } from '@angular/core';
import { Admin } from './models/admin';
import { ACSession } from './models/acSession';
import { Player } from './models/player';
import { Team } from './models/team';
import { templateSourceUrl } from '@angular/compiler';
import { runInThisContext } from 'vm';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public currentPlayer: Player;
  public session: ACSession = new ACSession();
  public sprintCounter = 0;


  constructor(public db: AngularFireDatabase) {
    this.loadSession();
    this.saveAdmin();
  }

  post(collection: string, data: object) {
    this.db.object(collection).set(data);
  }

  get(src: string) {
    return JSON.parse(localStorage.getItem(src));
  }

  saveAdmin(){
    let admin = new Admin ('esteban', '1234');
    this.post('adminInfo', admin);
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

  loadSession() {
    var sessionData = null;
    this.db.object('session').snapshotChanges().subscribe(action => {
      sessionData = action.payload.val();
      this.session = new ACSession();
      this.session.sprints = sessionData.sprints;
      this.session.teams = sessionData.teams;
      this.session.playersMax = sessionData.playersMax;
      this.session.playersMin = sessionData.playersMin;
      return this.session;
    });

    return this.session;
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
    this.post('session', session);
  }

  addPlayerToTeam(player: Player, team: Team) {
    var session = this.session;

    let currentUserData = this.get('currentUser');

    if (currentUserData.identifier == player.identifier) {
      currentUserData.teamNumber = team.teamNumber;
      this.post('currentUser', currentUserData);
    }

    this.getMinAndMaxPlayers(this.session);

    let newTeam = new Team(team.teamNumber);
    newTeam.identifier = team.identifier;
    newTeam.pizzas = team.pizzas;
    newTeam.teamNumber = team.teamNumber;
    newTeam.players = team.players;

    let isAdmin = false;

    console.log(this.session);
    this.checkUserTeam(player.identifier)
    newTeam.addPlayer(player);
    this.updateSessionTeams(newTeam);

  }

  getMinAndMaxPlayers(session) {
    let minPlayers = this.session.playersMin;
    let maxPlayers = this.session.playersMax;
    let teams = this.session.teams;

    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].players.length; j++) {
        var teamTotal = teams[i].players[j];
        console.log('team total:' + teamTotal);
      }
    }
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

    this.findanddelete(player.identifier, team.identifier);

    var newTeam = new Team(team.teamNumber)

    for (let i = 0; i < team.players.length; i++) {
      if (player.identifier == team.players[i].identifier) {
        console.log('got em chief');
        team.players.splice(i, 1);
        newTeam = team.players[i];
      }
    }

    let currentUserData = this.get('currentUser');
    if (currentUserData.identifier === player.identifier) {
      player.teamNumber = null;
      this.post('currentUser', player);
    } else {
      console.log('false');
    }

    this.updateSessionTeams(newTeam);
  }

  findanddelete(pidentifier, tidenfitier) {
    var teams = this.session.teams;

    for (let i = 0; i < this.session.teams.length; i++) {
      if (this.session.teams[i].identifier == tidenfitier) {
        var foundTeam = this.session.teams[i];
        for (let t = 0; t < foundTeam.players.length; t++) {
          if (foundTeam.players[t].identifier == pidentifier) {
            foundTeam.players.splice(t, 1);
          }
        }
      }
    }
  }
}
