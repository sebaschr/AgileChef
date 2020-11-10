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
    console.log(dataService.session)
  }

  /*printName() {
    addPlayerToTeam()
  }*/

  ngOnInit(): void {

  }

  startGame() {
    this.router.navigate(['/planning']);
  }

  returnToPlayerLogIn() {
    this.router.navigate(['/playerLogin']);
  }

}

