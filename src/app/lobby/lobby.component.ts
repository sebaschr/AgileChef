import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})


export class LobbyComponent implements OnInit {

  constructor(public dataService: DataService, private router: Router) {
    console.log(dataService.session);

    if (typeof (dataService.currentPlayer) == 'undefined') {
      dataService.loadPlayerFromLocalStorage();
    }

    console.log(dataService.currentPlayer);
  }

  ngOnInit(): void {

  }

  startGame() {
    this.router.navigate(['/planning']);
  }

  returnToPlayerLogIn() {
    this.router.navigate(['/playerLogin']);
  }

}

