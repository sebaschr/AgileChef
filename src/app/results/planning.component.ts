import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onTimerFinished(e:Event){
    if (e["action"] == "done"){
      this.router.navigate(['/results']);
     }
   }

}
