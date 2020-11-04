import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { Sprint } from '../models/sprint';
import { DataService } from '../data.service';

@Component({
  selector: 'team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() team: Team;

  public sprint: Sprint;
  public topContainer = document.getElementsByClassName('team-top-row');
  public bottomContainer = document.getElementsByClassName('team-borrom-row');

  public counter =+ 1;

  constructor(public dataService: DataService) {

  }

  ngOnInit(): void {
  }

  addPlayerToTeam() {
    //TODO: Add current player to this team.
    this.dataService.addPlayerToTeam(this.dataService.currentPlayer, this.team);
    console.log(this.dataService);
  }

}
