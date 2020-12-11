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
  results = null;
  failed = null;
  inProgress = null;
  succesful = null;

  constructor(public dataService: DataService, private router: Router) {
    this.dataService.loadSession();
    this.timer = this.dataService.session.sprints[this.dataService.sprintCounter].revision;
    this.dataService.loadResults();
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
    this.results = this.dataService.results;
    for (let i = 0; i < this.results.length; i++) {
      this.failed= this.results[i].inTrashPizzas;
      this.inProgress = this.results[i].inProdPizzas;
      this.succesful= this.results[i].finishedPizzas;
    }
    console.log('F =' + this.failed);
    console.log('I =' + this.inProgress);
    console.log('S =' + this.succesful);
  }
  
}