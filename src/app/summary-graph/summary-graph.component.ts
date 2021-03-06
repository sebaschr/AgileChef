import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'summary-graph',
  templateUrl: './summary-graph.component.html',
  styleUrls: ['./summary-graph.component.css']
})
export class SummaryGraphComponent implements OnInit {

  teams = null;
  results = null;
  revenue = null;
  costs = null;
  profit = null;
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
  };

  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartLabels: string[] = ['Revenue', 'Costs', 'Profit'];

  public barChartData: ChartDataSets[] = [
    {
      barPercentage: 1,
      categoryPercentage: 0.5,
      data: this.data,
      backgroundColor: ['rgba(124,146,1)', 'rgba(220,22,22,1)', 'rgba(242,196,12,1)'],
      hoverBackgroundColor: ['rgba(124,146,1)', 'rgba(220,22,22,1)', 'rgba(242,196,12,1)'],
      stack: 'Sprint 1'
    }
  ];

  ngOnInit(): void {
  }

  /**
   * This function loads all of the results from the game navigation page so the graph bars are filled up properly. 
  */
  teamResults() {
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
    let  j =this.dataService.sprintCounter;
    this.revenue = this.results[j].finishedPizzasCost;
    this.costs = this.results[j].finishedCost + this.results[j].inProdSumPieces + this.results[j].inTrashCost;
    this.profit = this.revenue - this.costs;
    this.data.push(this.revenue, this.costs, this.profit);

  }

}
