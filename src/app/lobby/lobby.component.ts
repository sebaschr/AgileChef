import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

import { Team } from '../models/team';
import { templateSourceUrl } from '@angular/compiler';


@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})


export class LobbyComponent implements OnInit {
  constructor(public dataService: DataService, private router: Router) {
    setInterval(()=> { this.loadPage() }, 1);
  }

  ngOnInit(): void {
    this.dataService.loadSession();
    this.dataService.loadPlayer();
    this.dataService.loadAdminStarted();
  }

  loadPage() {
    if (this.dataService.session.adminStarted) {
      this.router.navigate(['/planning']);
    }
  }

  startGame() {
    if (this.dataService.admin) {
      this.dataService.loadAdmin();
      this.dataService.session.adminStarted = true;
      this.dataService.saveSession(this.dataService.session)
      // this.router.navigate(['/planning']);
    } else if (this.dataService.currentPlayer) {
      this.dataService.loadPlayer();
      alert("Debes esperar a que el administrador inicie el juego.")
    }
  }

  returnToPlayerLogIn() {

    if (this.dataService.admin) {
      this.dataService.loadAdmin();
      this.router.navigate(['/adminPanel']);

    } else if (this.dataService.currentPlayer) {
      this.dataService.loadPlayer();
      this.router.navigate(['/playerLogin']);
    }
  }

}

