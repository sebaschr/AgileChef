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
  public barChartLabels: string[] = ['Succesful', 'Failed', 'In Progress'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      barPercentage: 0.5,
      categoryPercentage: 0.5,
      data: [3, 6, 4], 
      backgroundColor: ['rgba(124,146,1)', 'rgba(220,22,22,1)', 'rgba(242,196,12,1)'],
      hoverBackgroundColor: ['rgba(124,146,1)', 'rgba(220,22,22,1)', 'rgba(242,196,12,1)'],
      stack: 'Team 1'
    }
];

  constructor() { }

  ngOnInit() {
  }

}
