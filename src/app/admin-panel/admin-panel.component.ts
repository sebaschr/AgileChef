
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { ACSession } from '../models/acSession';
import { Sprint } from '../models/sprint';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit {

  sprintCounter = 0;
  sprintName = 'Sprint ' + this.sprintCounter;
  minReached = false;
  span = <HTMLInputElement>document.getElementById('sprintQuantity');
  
  form = this.fb.group({
    teamQuantity: ['', Validators.required],
    playerQuantityMin: ['', Validators.required],
    playerQuantityMax: ['', Validators.required],
    // sprintQuantity: ['', Validators.required],
    // sprints: this.fb.array([
    //   this.fb.control(this.sprintName)
    // ]),
    selectSprint: [''],
    planningTime: ['', Validators.required],
    executionTime: ['', Validators.required],
    reviewingTime: ['', Validators.required],
    retrospectiveTime: ['', Validators.required],
    objectives: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, public dataService: DataService) { }

  ngOnInit(): void {

  }

  submit() {
    console.log(this.form);
    this.dataService.saveSessionToLocalStorage(new ACSession());
  }

  // get sprints() {
  //   // return this.form.get('sprints') as FormArray;
  // }
  addSprint() {
    this.minReached=false;
    this.sprintCounter += 1;
    this.sprintName = 'Sprint ' + this.sprintCounter;
    let sprint = new Sprint();
    sprint.name = this.sprintName;
    this.dataService.session.sprints.push(sprint);//Adds a new sprint to the dataService sprint list.
    // this.updateSprintFormControl();
  }

  removeSprint() {
    if (this.sprintCounter == 1) {
      this.minReached=true;
    } else {
      this.sprintCounter -= 1;
      this.sprintName = 'Sprint ' + this.sprintCounter;
      this.dataService.session.sprints.splice(-1, 1);    //Removes the last sprint on the dataService sprints list.
      // this.updateSprintFormControl();
    }
  }


  // updateSprintFormControl() {
  //   //TODO: clean all controls from the sprints FormArray.

  //   //TODO: Loop thru all sprints in dataService and create new form controls.

  //   // this.sprints.push(this.fb.control(this.sprintName));
  // }

  validateFields() {

  }

  //TODO: Update the data structure on the dataService

  //TODO: 3. Change the Sprint Quantity input fot a just text
  //TODO: 4: Update the select with the sprints created.

  //TODO: 

}