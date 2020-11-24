import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

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

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) { 
 
  }

  ngOnInit(): void {

  }

  submit() {
    let playerInfo = this.PlayerForm.value;
    this.dataService.savePlayerToLocalStorage(playerInfo.name, playerInfo.isProductOwner, 0);
    this.router.navigate(['/lobby']);
  }
}
