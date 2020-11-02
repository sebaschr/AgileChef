import { Component, OnInit } from '@angular/core';
import { PlayerLoginComponent } from '../player-login/player-login.component';
import { DataService } from '../data.service';



@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  public addBtn = document.getElementById("addBtn");

  onclick () {
    this.dataService.loadPlayer();
  }



}

