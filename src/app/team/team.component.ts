import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { Sprint } from '../models/sprint';
import { DataService } from '../data.service';

@Component({
  selector: 'team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(public dataService: DataService) {

    console.log(this.dataService.session);
    
  }

  ngOnInit(): void {
  }

  
}
