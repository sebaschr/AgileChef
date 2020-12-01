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
    /*if(this.dataService.admin) {
      this.dataService.loadAdmin();
      this.router.navigate(['/planning']);
    } else if (this.dataService.currentPlayer){
      this.hideStartButton();
      this.dataService.loadPlayer();
      this.router.navigate(['/lobby']);
    }*/
  }

  hideStartButton () {
    this.dataService.loadPlayer();
    document.getElementById('startBtn').style.visibility = 'hidden';
  }

  returnToPlayerLogIn() {
    this.dataService.loadAdmin();
    this.dataService.loadPlayer();

    if(this.dataService.currentPlayer) {
      this.router.navigate(['/playerLogin']);
    } else {
      this.router.navigate(['/adminPanel']);
    }
  }

}

