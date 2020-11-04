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

  constructor(public dataService: DataService) { 

  }

  public teamContainer = document.getElementsByClassName("team-container");

  printName() {

  }

  ngOnInit(): void {

  }

}

