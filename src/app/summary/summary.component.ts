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
  constructor(public dataService: DataService,private router: Router) { 
    this.dataService.loadSessionFromLocalStorage();
    this.timer =  this.dataService.session.sprints[this.dataService.sprintCounter].retrospectiva;
  }

  ngOnInit(): void {
  }

  onTimerFinished(e:Event){
    if (e["action"] == "done"){
      if (this.dataService.sprintCounter == (this.dataService.session.sprints.length - 1)) {
        this.router.navigate(['/landing']);
      } else {
        this.router.navigate(['/lobby']);
        this.dataService.sprintCounter++;
      }
      
     }
   }

}

