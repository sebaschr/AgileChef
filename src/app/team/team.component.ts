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
    this.dataService.currentPlayer;
  }

  ngOnInit(): void {
    this.dataService.session;
  }

  addPlayerToTeam(e) {
    this.dataService.addPlayerToTeam(this.dataService.currentPlayer, e);    
  }

  removePlayerFromTeam(e) {
    this.dataService.removePlayerFromTeam(this.dataService.currentPlayer, e.teamNumber);
  }

}
