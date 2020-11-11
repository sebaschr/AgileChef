import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Team } from '../models/team';
import { templateSourceUrl } from '@angular/compiler';


@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})


export class LobbyComponent implements OnInit {
    
  teams: Team [] = [];

  constructor(public dataService: DataService, private router: Router) {
  
   if (typeof (dataService.currentPlayer && dataService.session) == 'undefined') {
      dataService.loadPlayerFromLocalStorage();
      dataService.loadSessionFromLocalStorage();
      dataService.loadTeams();
   }

  }

  ngOnInit(): void {
      this.teams=this.dataService.loadSessionFromLocalStorage().teams;
  }

  startGame() {
    this.router.navigate(['/planning']);
  }

  returnToPlayerLogIn() {
    this.router.navigate(['/playerLogin']);
  }

}

