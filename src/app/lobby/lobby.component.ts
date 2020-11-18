import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
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

  //teams: Team[] = [];

  constructor(public dataService: DataService, private router: Router) {

    if (typeof (dataService.currentPlayer && dataService.session) == 'undefined') {
      dataService.loadPlayerFromLocalStorage();
      // dataService.loadSessionFromLocalStorage();
      dataService.loadTeams();
    }
  }

  ngOnInit(): void {

  }

  startGame() {
    if (this.dataService.currentPlayer) {

    } else if (this.dataService.admin) {
      this.router.navigate(['/planning']);
    }

  }

  returnToPlayerLogIn() {
    if (this.dataService.currentPlayer) {
      this.router.navigate(['/playerLogin']);
    } else {

    }

  }

}

