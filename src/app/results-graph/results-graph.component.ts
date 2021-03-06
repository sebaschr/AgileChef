import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'results-graph',
  templateUrl: './results-graph.component.html',
  styleUrls: ['./results-graph.component.css']
})
export class ResultsGraphComponent implements OnInit {

  teams = null;
  results = null;
  failed = null;
  inProgress = null;
  succesful = null;
  data = [];

  constructor(public dataService: DataService) {
    this.dataService.loadSession();
    this.teamResults();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    }
  }

  public barChartLabels: string[] = ['Succesful', 'Failed', 'In Progress'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      barPercentage: 0.5,
      categoryPercentage: 0.5,
      data: this.data,
      backgroundColor: ['rgba(124,146,1)', 'rgba(220,22,22,1)', 'rgba(242,196,12,1)'],
      hoverBackgroundColor: ['rgba(124,146,1)', 'rgba(220,22,22,1)', 'rgba(242,196,12,1)'],
      stack: 'Team 1'
    }
  ];

  ngOnInit() {

  }

  /**
   * This function loads all of the results from the game navigation page so the graph bars are filled up properly. 
  */
  teamResults() {
    this.dataService.loadSession();
    this.teams = this.dataService.session.teams;
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].players == null) { } else {
        for (let y = 0; y < this.teams[i].players.length; y++) {
          if (this.dataService.currentPlayer.identifier == this.teams[i].players[y].identifier) {
            this.results = this.teams[i].results
          }
        }
      }
    }
    this.failed = this.results[this.dataService.sprintCounter].inTrashPizzas;
    this.inProgress = this.results[this.dataService.sprintCounter].inProdPizzas;
    this.succesful = this.results[this.dataService.sprintCounter].finishedPizzas;
    this.data.push(this.succesful, this.failed, this.inProgress);
  }

}
