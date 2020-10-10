import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

constructor(private fb: FormBuilder) { 

}

ngOnInit(): void {

}

submit() {
  console.log(this.AdminForm.value);
}

}
