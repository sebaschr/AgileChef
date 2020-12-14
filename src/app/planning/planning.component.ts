import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataService} from '../data.service';

@Component({
  selector: 'planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  timer =0;

  constructor(private router: Router,public dataService: DataService) {  this.dataService.loadSession();
    this.timer =  this.dataService.session.sprints[this.dataService.sprintCounter].planeamiento;
 
   }

  ngOnInit(): void {
  }

  /**
   * This function checks if the timer is done, if so, it goes to the game navigation page. 
   * @param e The timer event
  */
  onTimerFinished(e:Event){
    if (e["action"] == "done"){
      this.router.navigate(['/game']);
      this.dataService.session.adminStarted = false; 
      this.dataService.saveSession(this.dataService.session)

     }
   }

}
