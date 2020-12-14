import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  timer = 0;
  teams = null;
  results = null;
  failedPieces = null;
  inProgressPieces = null;
  succesfulPieces = null;
  revenue = null;
  costs = null;
  profit = null;

  constructor(public dataService: DataService, private router: Router) {
    this.dataService.loadSession();
    console.log(dataService.session);
    this.teamResults();
    this.timer = this.dataService.session.sprints[this.dataService.sprintCounter].retrospectiva;
  }

  ngOnInit(): void {
  }

  /**
   * This function checks if the timer is done, if so, it goes to the planning navigation page if a sprint is left. Otherwise, it returns to the lobby. 
   * @param e The timer event
   */
  onTimerFinished(e: Event) {
    if (e["action"] == "done") {
      if (this.dataService.sprintCounter == (this.dataService.session.sprints.length - 1)) {
        this.router.navigate(['/lobby']);
      } else {
        this.router.navigate(['/planning']);
        this.dataService.sprintCounter++;
      }

    }
  }

  /**
   * This function loads all of the results from the game navigation page so they can be displayed on the summary page. 
  */
  teamResults() {
    this.teams = this.dataService.session.teams;
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].players == null) { } else {
        for (let y = 0; y < this.teams[i].players.length; y++) {
          if (this.dataService.currentPlayer.identifier == this.teams[i].players[y].identifier) {
            this.results = this.teams[i].results
          }
        }
      }
    }

    this.succesfulPieces = this.results[this.dataService.sprintCounter].finishedPiecesNum;
    this.failedPieces = this.results[this.dataService.sprintCounter].inTrashPiecesNum;
    this.inProgressPieces = this.results[this.dataService.sprintCounter].inProdPieces;

    this.revenue = this.results[this.dataService.sprintCounter].finishedPizzasCost;
    this.costs = this.results[this.dataService.sprintCounter].finishedCost + this.results[this.dataService.sprintCounter].inProdSumPieces + this.results[this.dataService.sprintCounter].inTrashCost;
    this.profit = this.revenue - this.costs;

  }

}

