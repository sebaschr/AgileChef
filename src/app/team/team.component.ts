import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { Sprint } from '../models/sprint';
import { DataService } from '../data.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() team: Team;

  public sprint: Sprint;

  teams = [];

  constructor(public dataService: DataService) {

  }

  ngOnInit(): void {
    this.teams = this.dataService.loadSessionFromLocalStorage().teams;
  }

  addPlayerToTeam(e) {
    let currentPlayer = this.dataService.loadPlayerFromLocalStorage();
    this.dataService.addPlayerToTeam(currentPlayer, e);    
  }

  removePlayerFromTeam() {
    let currentPlayer = this.dataService.loadPlayerFromLocalStorage();
    this.dataService.removePlayerFromTeam(currentPlayer, this.team);
  }

}
