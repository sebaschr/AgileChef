import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Sprint } from '../models/sprint';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit {

  form = this.fb.group({
    teamQuantity: ['', Validators.required],
    playerQuantityMin: ['', Validators.required],
    playerQuantityMax: ['', Validators.required],
    sprintQuantity: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  submit() {
    console.log(this.form);
  }
}
//TODO: Add all main components.
//TODO: Complete models (class, attribures, relationships)
//TODO: Add Select with number of sprints.
//TODO: Add style
//
