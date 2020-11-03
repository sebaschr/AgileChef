
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { ACSession } from '../models/acSession';
import { Sprint } from '../models/sprint';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit {

  sprintCounter = 1;
  sprintName = 'Sprint ' + this.sprintCounter;

  firstSprint = true;
  minReached = true;
  savedLastSprint = true;

  span = <HTMLInputElement>document.getElementById('sprintQuantity');

  sprintList = [];
  teamQuantity = 1;
  minPlayers = 1;
  maxPlayers = 2;
  form = this.fb.group({
    teamQuantity: ['', Validators.required],
    playerQuantityMin: ['', Validators.required],
    playerQuantityMax: ['', Validators.required],

    selectSprint: [''],
    planningTime: ['', Validators.required],
    executionTime: ['', Validators.required],
    reviewingTime: ['', Validators.required],
    retrospectiveTime: ['', Validators.required],
    objectives: ['', Validators.required]
  });

  constructor(public fb: FormBuilder, public dataService: DataService, private router: Router) {
    this.fillData();
  }

  ngOnInit(): void {

  }

  submit() {

  }

  submitInfo() {
    this.dataService.session.objectives = this.form.value.objectives;
    this.dataService.session.playersMin = this.form.value.playerQuantityMin;
    this.dataService.session.playersMax = this.form.value.playerQuantityMax;
    this.dataService.session.teams.length = this.form.value.teamQuantity;
    this.dataService.saveSessionToLocalStorage(new ACSession());
    console.log(this.dataService);

    this.router.navigate(['/lobby']);
  }


  saveSprint() {
    this.sprintName = 'Sprint ' + this.sprintCounter;
    let sprint = new Sprint();
    sprint.name = this.form.value.selectSprint;
    sprint.ejecucion = this.form.value.executionTime;
    sprint.planeamiento = this.form.value.planningTime;
    sprint.revision = this.form.value.reviewingTime;
    sprint.retrospectiva = this.form.value.retrospectiveTime;
    this.findUpdateSprint(sprint);
    this.checkLastOneSaved(sprint.name);
  }

  removeSprint() {
    console.log(this.sprintList )

    if (this.sprintCounter==1) {
      
    } else {
      var currentSprint = this.form.value.selectSprint;
      for (let index = 0; index < this.sprintList.length; index++) {
        if(currentSprint==this.sprintList[index].name){
          this.sprintList.splice(index,1);
          this.reorderArrays();
        }
      }
    }

    console.log(this.sprintList)

  }

  fillData() {
    this.sprintName = 'Sprint ' + this.sprintCounter;
    let sprint = new Sprint();
    sprint.name = this.sprintName;
    sprint.ejecucion = 45;
    sprint.planeamiento = 45;
    sprint.revision = 45;
    sprint.retrospectiva = 45;
    this.sprintList.push(sprint);
  }
  addSprint() {

    this.savedLastSprint = false;
    this.sprintCounter += 1;

    this.sprintName = 'Sprint ' + this.sprintCounter;
    let sprint = new Sprint();
    sprint.name = this.sprintName;
    sprint.ejecucion = 45;
    sprint.planeamiento = 45;
    sprint.revision = 45;
    sprint.retrospectiva = 45;
    this.sprintList.push(sprint);
    // this.dataService.session.sprints.push(sprint);//Adds a new sprint to the dataService sprint list.
    // console.log(this.dataService);
  }

  findUpdateSprint(sprint) {
    //find and update Sprint in SprintList first
    for (var i = 0; i < this.sprintList.length; i++) {
      if (this.sprintList[i].name == sprint.name) {
        this.sprintList[i] = sprint;
      }
    }
    //check if it was saved before
    if (this.sprintinDataService(sprint.name) == false) {
      //if not push it
      this.dataService.session.sprints.push(sprint);//Adds a new sprint to the dataService sprint list.
    } else {
      //if it exists update it
      this.updateDataService(sprint);
    }
    console.log(this.sprintList)
    console.log(this.dataService)


  }

  checkLastOneSaved(sprintName) {
    var x = this.sprintList.length;
    if (sprintName == this.sprintList[x - 1].name) {
      if (this.sprintinDataService(sprintName)) {
        this.savedLastSprint = true;
      }
    }
  }

  updateDataService(sprint) {
    for (var i = 0; i < this.dataService.session.sprints.length; i++) {
      if (this.dataService.session.sprints[i].name == sprint.name) {
        this.dataService.session.sprints[i] = sprint;
      }
    }
  }

  sprintinDataService(sprintName) {
    var exists = false;

    for (var i = 0; i < this.dataService.session.sprints.length; i++) {
      if (this.dataService.session.sprints[i].name == sprintName) {
        exists = true;
      } else {
      }
    }
    return exists;
  }

  onForm2NameChange({ target }) {
    var selectedSprint = this.sprintList.find(x => x.name == this.form.value.selectSprint);
    this.form.controls['executionTime'].setValue(selectedSprint.ejecucion);
    this.form.controls['planningTime'].setValue(selectedSprint.planeamiento);
    this.form.controls['reviewingTime'].setValue(selectedSprint.revision);
    this.form.controls['retrospectiveTime'].setValue(selectedSprint.retrospectiva);
    this.minReached = false;
    this.firstSprint = false;

  }

  validateFields() {

  }

  reorderArrays() {
    var oldDataService = this.dataService.session.sprints;
    var oldSprintList = this.sprintList;

    for (var i = 0; i < oldDataService.length; i++) {
      this.dataService.session.sprints[i].name = 'Sprint ' + (i + 1);
    }

    for (var i = 0; i < oldSprintList.length; i++) {
      this.sprintList[i].name = 'Sprint ' + (i + 1);
    }

    this.sprintCounter--;

    if(this.sprintCounter==1){
      this.form.controls['executionTime'].setValue(this.sprintList[0].ejecucion);
      this.form.controls['planningTime'].setValue(this.sprintList[0].planeamiento);
      this.form.controls['reviewingTime'].setValue(this.sprintList[0].revision);
      this.form.controls['retrospectiveTime'].setValue(this.sprintList[0].retrospectiva);
      this.minReached = true;
    }

  }

}