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

  /**
   * Uses the method from the data service to add the current player in the team selected.
   * @param e - event expected which is the team to be added on.
   */
  addPlayerToTeam(e) {
    this.dataService.addPlayerToTeam(this.dataService.currentPlayer, e);    
  }

  /**
   * Uses the method created in data service to remove a player from the team selected.
   * @param e - event expected which is the team to be removed from.
   */
  removePlayerFromTeam(e) {
    this.dataService.removePlayerFromTeam(this.dataService.currentPlayer, e);
  }

  /**
   * Shows and hides the buttons of the team component based on the user.
   * If it's admin, it hides the buttons.
   * If it's a player, it shows the buttons.
   */
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
