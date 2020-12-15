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
    setInterval(() => { this.loadPage() }, 1);
    this.dataService.sprintCounter = 0;
  }
  admin: Boolean;
  player: Boolean;

  ngOnInit(): void {
    this.dataService.loadSession();
    this.dataService.loadPlayer();
    this.dataService.loadAdminStarted();
    console.log(this.dataService.session);
    this.admin = (/true/i).test(sessionStorage.getItem('admin'))
    this.player = !this.admin;
  }

  /**
   * Gets the information from data service regarding the admin status.
   * If the admin is active, the admin can start the game.
   */
  loadPage() {
    if (this.dataService.session.adminStarted) {
      this.router.navigate(['/planning']);
    }
  }

  /**
   * Checks if the user clicking the start button is the admin or a player.
   * If it's the admin, they are allowed to start the game.
   * If it's a player, an alert pops letting them know that only the admin can start the game.
   */
  startGame() {
    if (this.admin) {
      var sumPlayers = 0;
      var teams = this.dataService.session.teams;
      for (let index = 0; index < teams.length; index++) {
        if (teams[index].players == null) {

        } else {
          sumPlayers = sumPlayers + teams[index].players.length
        }
      }
      if (sumPlayers == 0) {

        alert("Not enough players");
      } else {

        this.dataService.loadAdmin();
        this.dataService.session.adminStarted = true;
        this.dataService.saveSession(this.dataService.session);
      }
    } else if (this.player) {
      this.dataService.loadPlayer();
      alert("You have to wait for the admin to start the game.");
    }
  }

  /**
   * Checks if the user clicking the return buttong is the admin or a player.
   * If it's the admin, it leads them back to the admin panel window.
   * If it's a player, it leads them back to the player log in window.
   */
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

