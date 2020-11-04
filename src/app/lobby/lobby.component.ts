import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})


export class LobbyComponent implements OnInit {

  constructor(public dataService: DataService) { 
    console.log(dataService.session)
  }

  public teamContainer = document.getElementsByClassName("team-container");

  printName() {

  }

  ngOnInit(): void {

  }

}

