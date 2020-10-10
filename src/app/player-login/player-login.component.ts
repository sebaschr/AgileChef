import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'player-login',
  templateUrl: './player-login.component.html',
  styleUrls: ['./player-login.component.css']
})
export class PlayerLoginComponent implements OnInit {

  IsProductOwner:boolean;

  PlayerForm = this.fb.group({
    Name: ['', Validators.required],
    IsProductOwner: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { 
 
  }

  ngOnInit(): void {

  }

  submit() {
    console.log(this.PlayerForm.value);
  }

}
