import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'results-graph',
  templateUrl: './results-graph.component.html',
  styleUrls: ['./results-graph.component.css']
})
export class ResultsGraphComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };
  public barChartLabels: Label[] = ['Team 1'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      barPercentage: 0.5,
      categoryPercentage: 0.5,
      data: [3], label: 'Succesful' }, 
    { 
      barPercentage: 0.5,
      categoryPercentage: 0.5,
      data: [6], label: 'Failed' },
    { 
      barPercentage: 0.5,
      categoryPercentage: 0.5,
      data: [4], label: 'In Progress'}
];

  constructor() { }

  ngOnInit() {
  }

}
