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
  
  constructor(public dataService: DataService, private router: Router) {

  }

  ngOnInit(): void {
    this.dataService.loadSession();
    this.dataService.loadPlayer();
  }

  startGame() {
      this.router.navigate(['/planning']);
  }

  returnToPlayerLogIn() {
      this.router.navigate(['/playerLogin']);
  }

}

