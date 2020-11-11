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

  constructor(public dataService: DataService) {

  }

  printPlayer() {
    this.addPlayerToTeam()
  }

  ngOnInit(): void {
  }

  addPlayerToTeam() {
    //TODO: Add current player to this team.

    this.dataService.addPlayerToTeam(this.dataService.currentPlayer, this.team);
    
  }

  removePlayerFromTeam() {
    this.dataService.removePlayerFromTeam(this.dataService.currentPlayer, this.team);
  }

}
