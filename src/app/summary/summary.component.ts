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
  
  constructor(public dataService: DataService,private router: Router) { 
    this.dataService.loadSession();
    console.log(dataService.session);
    this.teamResults();
    //this.timer =  this.dataService.session.sprints[this.dataService.sprintCounter].retrospectiva;
  }

  ngOnInit(): void {
  }

  onTimerFinished(e:Event){
    if (e["action"] == "done"){
      if (this.dataService.sprintCounter == (this.dataService.session.sprints.length - 1)) {
        this.router.navigate(['/lobby']);
      } else {
        this.router.navigate(['/planning']);
        this.dataService.sprintCounter++;
      }
      
     }
   }

   teamResults(){
    this.teams = this.dataService.session.teams;
    for (let i = 0; i < this.teams.length; i++) {
      this.results = this.teams[i].results;
      for (let j = 0; j < this.results.length; j++) {
        this.failedPieces = this.results[j].inTrashPiecesNum;
        this.inProgressPieces = this.results[j].inProductionPiecesNum;
        this.succesfulPieces = this.results[j].finishedPiecesNum;
        this.revenue = this.results[j].finishedCost;
        this.costs = this.results[j].inProdPizzasCost + this.results[j].inTrashCost;
        this.profit = this.revenue-this.costs;
      }
    }
  }

}

