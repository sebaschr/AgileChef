import { Component, OnInit } from '@angular/core';
import { PlayerLoginComponent } from '../player-login/player-login.component';
import { Team } from '../models/team';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Player } from '../models/player';
import { Sprint } from '../models/sprint';



@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})


export class LobbyComponent implements OnInit {

  public playerName = this.dataService.currentPlayer.name;
  public team = this.dataService.team;
  public teamPlayers = [];
  public players;

  constructor(public dataService: DataService) { 

    console.log(this.dataService.session);
    //console.log(this.dataService.team);
    console.log('currentPlayer', this.dataService.currentPlayer);
    console.log('Player', this.playerName);
    return 
 
  }

  public teamContainer = document.getElementsByClassName("team-container");

  public name = this.dataService.currentPlayer.name;

  printName (name, team) {
    name = this.dataService.currentPlayer;
    team = new Team(name, 1);
    this.teamPlayers.push(team.players);
    console.log(team);

    
      /*playerName = document.createElement('p');

      teamContainer.appendChild (
      playerName
    );*/ 
  }

  ngOnInit(): void {

  }

}

