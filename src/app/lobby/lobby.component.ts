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

  constructor(public dataService: DataService) { 

    console.log(this.dataService.session);
    console.log('currentPlayer', this.dataService.currentPlayer);
    console.log('Player', this.playerName);
 
  }

  ngOnInit(): void {

  }

  public teamContainer = document.getElementsByClassName("team-container");

 

  printName (playerName, teamContainer) {
      playerName = document.createElement('p');

      teamContainer.appendChild (
      playerName
    );   
  }

 



}

