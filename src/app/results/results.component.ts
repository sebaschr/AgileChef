import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  timer = 0;
  teams = null;
  results = null;
  failed = null;
  inProgress = null;
  succesful = null;

  constructor(public dataService: DataService, private router: Router) {
    this.dataService.loadSession();
    this.timer = this.dataService.session.sprints[this.dataService.sprintCounter].revision;
    this.teamResults();
  }

  ngOnInit(): void {
  }

  /**
   * This function checks if the timer is done, if so, it goes to the summary navigation page. 
   * @param e The timer event
  */
  onTimerFinished(e: Event) {
    if (e["action"] == "done") {
      this.router.navigate(['/summary']);
    }
  }

  /**
   * This function loads all of the results from the game navigation page so they can be displayed on the results page. 
  */
  teamResults() {
    this.dataService.loadSession();
    this.dataService.loadPlayer();
    this.teams = this.dataService.session.teams;
    console.log(this.dataService.session);
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].players == null) { } else {
        for (let y = 0; y < this.teams[i].players.length; y++) {
          if (this.dataService.currentPlayer.identifier == this.teams[i].players[y].identifier) {
            this.results = this.teams[i].results
          }
        }
      }
    }
    console.log(this.results)
    this.failed = this.results[this.dataService.sprintCounter].inTrashPizzas;
    this.inProgress = this.results[this.dataService.sprintCounter].inProdPizzas;
    this.succesful = this.results[this.dataService.sprintCounter].finishedPizzas;
  }
}