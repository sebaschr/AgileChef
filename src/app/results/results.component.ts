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
  constructor(public dataService: DataService, private router: Router) {
    this.dataService.loadSession();
    this.timer = this.dataService.session.sprints[this.dataService.sprintCounter].revision;
  }

  ngOnInit(): void {
  }

  onTimerFinished(e: Event) {
    if (e["action"] == "done") {
      this.router.navigate(['/summary']);
    }
  }
}