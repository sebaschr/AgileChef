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

  teams = [];

  constructor(public dataService: DataService) {
    this.dataService.currentPlayer;
  }

  ngOnInit(): void {
    this.dataService.session;
    this.dataService.loadAdmin;
    this.loadButtons();
  }

  addPlayerToTeam(e) {
    this.dataService.addPlayerToTeam(this.dataService.currentPlayer, e);    
  }

  removePlayerFromTeam(e) {
    this.dataService.removePlayerFromTeam(this.dataService.currentPlayer, e);
  }

  loadButtons() {

    if (this.dataService.admin) {
      document.getElementById('addBtn').style.visibility = 'hidden';
      document.getElementById('removeBtn').style.visibility = 'hidden';
      
    } else if (this.dataService.currentPlayer) {
      document.getElementById('addBtn').style.visibility = 'visible';
      document.getElementById('removeBtn').style.visibility = 'visible';
    }
  }

}
