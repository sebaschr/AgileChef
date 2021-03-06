
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Sprint } from '../models/sprint';
import { Router } from '@angular/router';
import { Team } from '../models/team';

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

  errorSprints: boolean = false;
  errorMinSprint: boolean = false;
  errorMin: boolean = false;
  errorMax: boolean = false;
  errorMinMax: boolean = false;
  errorTeams: boolean = false;


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
    retrospectiveTime: ['', Validators.required]
  });

  constructor(public fb: FormBuilder, public dataService: DataService, private router: Router) {
    this.fillData();
  }

  ngOnInit(): void {
    
  }
/**
 * This function checks if there are no errors, if so, it sends the information over to the dataService for it to be saved to the sesssion in the DB>
 */
  submitInfo() {
    this.dataService.session.playersMin = this.form.value.playerQuantityMin;
    this.dataService.session.playersMax = this.form.value.playerQuantityMax;
    var errors = this.validateFields();
    this.saveSprint();
    if (errors == true) {

    } else {
      this.dataService.session.teams = [];
      for (let index = 0; index < this.form.value.teamQuantity; index++) {
        let team = new Team((index + 1))
        team.players = [{}]
        team.results = [{}]
        this.dataService.session.teams.push(team);
        console.log(this.dataService.session)
      }
      this.dataService.saveSession(this.dataService.session);
      this.router.navigate(['/lobby']);
    }
  }

/**
 * The function saves the the currentSprint and adds it to the arrayList
 */
  saveSprint() {
    this.sprintName = 'Sprint ' + this.sprintCounter;
    let sprint = new Sprint();
    sprint.name = this.form.value.selectSprint;
    sprint.ejecucion = this.form.value.executionTime;
    sprint.planeamiento = this.form.value.planningTime;
    sprint.revision = this.form.value.reviewingTime;
    sprint.retrospectiva = this.form.value.retrospectiveTime;
    var validationError = false;
    if (sprint.ejecucion == 0 || sprint.planeamiento == 0 || sprint.revision == 0 || sprint.retrospectiva == 0) {
      validationError = true;
      this.errorSprints = true;
      document.getElementById('edit-sprint').style.height='415px';
      document.getElementById('edit-panel').style.height='415px';
    } else {
      this.errorSprints = false;
    }

    if (validationError) {

    } else {
      this.findUpdateSprint(sprint);
      this.checkLastOneSaved(sprint.name);
      this.errorMinSprint = false;
      // document.getElementById('addBtn').innerHTML='Add'
    }

  }
/**
 * Removes the current sprint from the sprintList and then reorders the array and removes the errors
 */
  removeSprint() {

    if (this.sprintCounter == 1) {

    } else {
      var currentSprint = this.form.value.selectSprint;
      for (let index = 0; index < this.sprintList.length; index++) {
        if (currentSprint == this.sprintList[index].name) {
          this.sprintList.splice(index, 1);
          this.reorderArrays();
          this.removeSprintErrors();
        }
      }
    }
    

  }
/**
 * Fills the data that the page uses when it loads with default values.
 */
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
/**
 * Adds a new sprint with default values to the arrayList
 */
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
    this.saveSprint();
  }
/**
 * Finds a sprint in the array sprintList and updates it with the value received if the name is the same. Then checks if it was saved before.
 * @param sprint 
 */
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


  }
/**
 * This function checks if the last sprint added was saved (before adding a new one)
 * @param sprintName it requires String for its execution
 */
  checkLastOneSaved(sprintName) {
    var x = this.sprintList.length;
    if (sprintName == this.sprintList[x - 1].name) {
      if (this.sprintinDataService(sprintName)) {
        this.savedLastSprint = true;
      }
    }
  }
/**
 * This function runs through the dataService.session and check if the sprint is already in dataService.
 * @param sprint it requires array/object for its execution
 */
  updateDataService(sprint) {
    for (var i = 0; i < this.dataService.session.sprints.length; i++) {
      if (this.dataService.session.sprints[i].name == sprint.name) {
        this.dataService.session.sprints[i] = sprint;
      }
    }
  }
/**
 * This function checks if the sprint sprintNameis already saved in Dataservice.
 * @param sprintName it requires array/object for its execution
 */
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
/**
 * This function populates the fields with the information of the sprint selected {{target}}
 * @param param0 it requires array/object for its execution
 */
  onForm2NameChange({ target }) {

    var selectedSprint = this.sprintList.find(x => x.name == this.form.value.selectSprint);
    console.log(selectedSprint)
    this.form.controls['executionTime'].setValue(selectedSprint.ejecucion);
    this.form.controls['planningTime'].setValue(selectedSprint.planeamiento);
    this.form.controls['reviewingTime'].setValue(selectedSprint.revision);
    this.form.controls['retrospectiveTime'].setValue(selectedSprint.retrospectiva);
    this.minReached = false;
    this.firstSprint = false;

  }
/**
 * This function checks if there's any error in the inputs of the array
 */
  validateFields() {
    var foundErrors = false;
    var amountTeams = this.form.value.teamQuantity;
    var playerQuantityMin = this.form.value.playerQuantityMin;
    var playerQuantityMax = this.form.value.playerQuantityMax;
    var ejecucion = this.form.value.executionTime;
    var planeamiento = this.form.value.planningTime;
    var revision = this.form.value.reviewingTime;
    var retrospectiva = this.form.value.retrospectiveTime;

    if (amountTeams == 0) {
      foundErrors = true;
      this.errorTeams = true;
      document.getElementById('edit-sprint').style.height='415px';
      document.getElementById('edit-panel').style.height='415px';
    } else {
      this.errorTeams = false;
      document.getElementById('edit-sprint').style.height='350px';
      document.getElementById('edit-panel').style.height='350px';
    }

    if (playerQuantityMin == 0) {
      foundErrors = true;
      this.errorMin = true;
      document.getElementById('edit-sprint').style.height='415px';
      document.getElementById('edit-panel').style.height='415px';
    } else {
      this.errorMin = false;
      document.getElementById('edit-sprint').style.height='350px';
      document.getElementById('edit-panel').style.height='350px';
    }

    if (playerQuantityMax == 0) {
      foundErrors = true;
      this.errorMax = true;
      document.getElementById('edit-sprint').style.height='415px';
      document.getElementById('edit-panel').style.height='415px';
    } else {
      this.errorMax = false;
      document.getElementById('edit-sprint').style.height='350px';
      document.getElementById('edit-panel').style.height='350px';
    }

    if (playerQuantityMax < playerQuantityMin) {
      foundErrors = true;
      this.errorMinMax = true;
      document.getElementById('edit-sprint').style.height='415px';
      document.getElementById('edit-panel').style.height='415px';
    } else {
      this.errorMinMax = false;
      document.getElementById('edit-sprint').style.height='350px';
      document.getElementById('edit-panel').style.height='350px';
    }

    if (ejecucion == 0 || planeamiento == 0 || revision == 0 || retrospectiva == 0) {
      foundErrors = true;
      this.errorSprints = true;
      document.getElementById('edit-sprint').style.height='415px';
      document.getElementById('edit-panel').style.height='415px';

    } else {
      this.errorSprints = false;
      document.getElementById('edit-sprint').style.height='350px';
      document.getElementById('edit-panel').style.height='350px';
    }

    if (this.dataService.session.sprints.length == 0) {
      foundErrors = true;
      this.errorMinSprint = true;
      document.getElementById('edit-sprint').style.height='415px';
      document.getElementById('edit-panel').style.height='415px';
    } else {
      this.errorMinSprint = false;
      document.getElementById('edit-sprint').style.height='350px';
      document.getElementById('edit-panel').style.height='350px';
    }
    return foundErrors;
  }
/**
 * This function re-orders the array to avoid issues with the names and number of the sprint
 */
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

    if (this.sprintCounter == 1) {
      this.form.controls['executionTime'].setValue(this.sprintList[0].ejecucion);
      this.form.controls['planningTime'].setValue(this.sprintList[0].planeamiento);
      this.form.controls['reviewingTime'].setValue(this.sprintList[0].revision);
      this.form.controls['retrospectiveTime'].setValue(this.sprintList[0].retrospectiva);
      this.minReached = true;
    }

  }
/**
 * This function removes all the sprint errors from the website.
 */
  removeSprintErrors(){
    document.getElementById('sprintError').style.display='none';
    document.getElementById('edit-sprint').style.height='350px';
    document.getElementById('edit-panel').style.height='350px';
  }
}