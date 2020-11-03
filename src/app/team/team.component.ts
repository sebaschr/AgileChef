import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { Sprint } from '../models/sprint';
import { DataService } from '../data.service';
import { ACSession } from '../models/acSession';
import { counter } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public sprint: Sprint;
  public teams = this.dataService.session.teams.length;
  public container;
  public topContainer = document.getElementsByClassName('team-top-row');
  public bottomContainer = document.getElementsByClassName('team-borrom-row');

  public counter =+ 1;

  constructor(public dataService: DataService) {

    this.container = document.createElement('div');
    this.container.value =+ counter;
    this.container.classList.add(
      'team-card'
    );
    //this.topContainer.appendChild(this.container);

    console.log(this.dataService.session);
    console.log(this.dataService.session.teams.length);
    
  }

  ngOnInit(): void {
  }

  createDiv(teamQuantity) {

  }
  
}
