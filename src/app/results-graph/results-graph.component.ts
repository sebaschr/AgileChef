import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataService } from '../data.service';

@Component({
  selector: 'results-graph',
  templateUrl: './results-graph.component.html',
  styleUrls: ['./results-graph.component.css']
})
export class ResultsGraphComponent implements OnInit {

  results = null;
  failed = null;
  inProgress = null;
  succesful = null;

  constructor(public dataService: DataService) { 
    this.dataService.loadResults();
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
      data: [this.succesful, this.failed, this.inProgress], 
      backgroundColor: ['rgba(124,146,1)', 'rgba(220,22,22,1)', 'rgba(242,196,12,1)'],
      hoverBackgroundColor: ['rgba(124,146,1)', 'rgba(220,22,22,1)', 'rgba(242,196,12,1)'],
      stack: 'Team 1'
    }
  ];

  ngOnInit() {
  }

  teamResults(){
    this.results = this.dataService.results;
    for (let i = 0; i < this.results.length; i++) {
      this.failed= this.results[i].inTrashPizzas;
      this.inProgress = this.results[i].inProdPizzas;
      this.succesful= this.results[i].finishedPizzas;
    }
    console.log('F =' + this.failed);
    console.log('I =' + this.inProgress);
    console.log('S =' + this.succesful);
  }

}
