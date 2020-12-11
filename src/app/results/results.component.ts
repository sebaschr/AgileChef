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
    console.log(this.dataService.session);
    this.timer = this.dataService.session.sprints[this.dataService.sprintCounter].revision;
    this.teamResults();
  }

  ngOnInit(): void {
  }

  onTimerFinished(e: Event) {
    if (e["action"] == "done") {
      this.router.navigate(['/summary']);
    }
  }

  teamResults(){
    this.teams = this.dataService.session.teams;
    for (let i = 0; i < this.teams.length; i++) {
      this.results = this.teams[i].results;
      for (let j = 0; j < this.results.length; j++) {
        this.failed= this.results[j].inTrashPizzas;
        this.inProgress = this.results[j].inProdPizzas;
        this.succesful= this.results[j].finishedPizzas;
      }
    }
  }
  
}