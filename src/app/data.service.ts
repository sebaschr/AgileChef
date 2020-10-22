import { Injectable } from '@angular/core';
import { Admin } from './models/admin';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  admin: Admin = new Admin('admin', '1234');
  sprints = ['Sprint 1', 'Sprint 2', 'Sprint 3'];

  constructor() { }

}
