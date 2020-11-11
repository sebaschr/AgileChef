import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})


export class LobbyComponent implements OnInit {
   teams  = [];

  constructor(public dataService: DataService, private router: Router) {

   if (typeof (dataService.currentPlayer && dataService.session) == 'undefined') {
      dataService.loadPlayerFromLocalStorage();
      dataService.loadSessionFromLocalStorage();
      dataService.loadTeams();
   }

  }

  ngOnInit(): void {
    console.log(this.dataService.loadSessionFromLocalStorage().teams);
    this.teams = this.dataService.loadSessionFromLocalStorage().teams;
  }

  startGame() {
    this.router.navigate(['/planning']);
  }

  returnToPlayerLogIn() {
    this.router.navigate(['/playerLogin']);
  }

}

