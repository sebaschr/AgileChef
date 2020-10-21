
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Sprint } from '../models/sprint';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit {

  sprintCounter = 3;
  sprintName = 'sprint' + this.sprintCounter;

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
    objectives:['',Validators.required]
  });

  constructor(private fb: FormBuilder, public dataService: DataService) { }

  ngOnInit(): void {

  }

  submit() {
    console.log(this.form);
  }

  // get sprints() {
  //   // return this.form.get('sprints') as FormArray;
  // }

  addSprint() {
    this.sprintCounter += 1;
    this.sprintName = 'sprint' + this.sprintCounter;
    //TODO: Add a new sprint to the dataService sprint list.
    this.dataService.sprints.push(this.sprintName);

    this.updateSprintFormControl();
  }

  removeSprint() {
    this.sprintCounter -= 1;
    this.sprintName = 'sprint' + this.sprintCounter;
    //TODO: Remove the last sprint on the dataService sprints list.
    this.updateSprintFormControl();
  }


  updateSprintFormControl() {
    //TODO: clean all controls from the sprints FormArray.

    //TODO: Loop thru all sprints in dataService and create new form controls.

    // this.sprints.push(this.fb.control(this.sprintName));
  }

  //TODO: Update the data structure on the dataService
  //TODO: 1. Implement remove sprint on array
  //TODO: 2. Use the add and remove buttons, 
  //TODO: 3. Change the Sprint Quantity input fot a just text
  //TODO: 4: Update the select with the sprints created.

  //TODO: 

}