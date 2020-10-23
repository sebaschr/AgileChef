import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'player-login',
  templateUrl: './player-login.component.html',
  styleUrls: ['./player-login.component.css']
})
export class PlayerLoginComponent implements OnInit {

  IsProductOwner:boolean;

  PlayerForm = this.fb.group({
    name: ['', Validators.required],
    isProductOwner: [false, Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router) { 
 
  }

  ngOnInit(): void {

  }

  submit() {
    console.log('PlayerLogin', this.PlayerForm.value);
    let playerInfo = this.PlayerForm.value;
    let currentUser = {'Name: ' : playerInfo.name, 'Product Owner: ' : playerInfo.isProductOwner};
    localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
    this.router.navigate(['/lobby']);
  }
}
