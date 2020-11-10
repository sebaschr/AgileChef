import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'summary-graph',
  templateUrl: './summary-graph.component.html',
  styleUrls: ['./summary-graph.component.css']
})
export class SummaryGraphComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
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
      data: [26, 17.83, 8.17], 
      backgroundColor: ['rgba(124,146,1)', 'rgba(220,22,22,1)', 'rgba(242,196,12,1)'],
      hoverBackgroundColor: ['rgba(124,146,1)', 'rgba(220,22,22,1)', 'rgba(242,196,12,1)'],
      stack: 'Sprint 1' 
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
