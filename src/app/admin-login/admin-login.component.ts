import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

hide=true;

AdminForm = this.fb.group({
  UserID: ['', Validators.required],
  Password: ['', Validators.required]
});

  constructor(private fb: FormBuilder, private dataService: DataService) {
    console.log('AdminLoginComponent', dataService);
}

ngOnInit(): void {

}

submit() {
  console.log(this.AdminForm.value);
  //TODO: Validate adming user and move to next route, investigate how to change route using code.
}

}
