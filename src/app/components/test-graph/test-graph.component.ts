import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import {  ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataService } from '../../services/data.service';
import { finalize } from 'rxjs';
// import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-test-graph',
  templateUrl: './test-graph.component.html',
  styleUrls: ['./test-graph.component.scss']
})
export class TestGraphComponent implements OnChanges {

  data: any;
  isLoading: boolean = false;
  
  @ViewChild(BaseChartDirective) 
  chart?: BaseChartDirective;
  @Input()logic : string = "";
  @Input()report : string = "compare";

  constructor(private dataService:DataService){
    // 'http://localhost:8000/reports/compare/FPArith'
    console.log(this.dataService.getData('https://netolcc06.pythonanywhere.com/reports/compare/FPArith'));
  }

  private getXLabels() {
    console.log('getXLabels');
    let monthLabels = new Set();
    this.data.forEach((element: { month_year: string; }) => {
      monthLabels.add(element.month_year)
    });
    return Array.from(monthLabels) as string[];
  }

  private getYLabels() : string[]{
    console.log('getYLabels');
    let logics = new Set();
    this.data.forEach((element: { logic: string; }) => {
      logics.add(element.logic)
    });
    return Array.from(logics) as string[];
  }

  private getDataPoints(logicStrings: string[], months: string[]) {
    const dataStructure: Record<string, Record<string, number | null>> = {};
    console.log('getDataPoints');
    
    for (const logic of logicStrings) {
      dataStructure[logic] = {};
      for (const month of months) {
        dataStructure[logic][month] = null;
      }
    }

    this.data.forEach((dataPoint: { logic: string | number; month_year: string | number; average: number | null; }) => {
      console.log(dataPoint);
      dataStructure[dataPoint.logic][dataPoint.month_year] = dataPoint.average;
      console.log(dataStructure[dataPoint.logic][dataPoint.month_year]);
    });

    logicStrings.forEach(logic => {
      months.forEach((month, index) => {
        console.log(month);
        if (dataStructure[logic][month] === null) {
          dataStructure[logic][month] = 1000;
        }
      });
    });

    return dataStructure;
  }

  ngOnChanges() {
    this.isLoading = true;
    // https://netolcc06.pythonanywhere.com/
    // http://localhost:8000
    this.dataService.getData(`https://netolcc06.pythonanywhere.com/reports/${this.report}/` + this.logic)
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe(response => {
      this.data = response;
      let monthLabels = this.getXLabels();
      let logics = this.getYLabels();
      let dataPoints = this.getDataPoints(logics, monthLabels);
      this.lineChartData.datasets = this.createDatasets(dataPoints, logics, monthLabels);
      this.lineChartData.labels = monthLabels;
      this.lineChartData.xLabels = monthLabels;
      this.chart?.update();
      console.log(this.lineChartData.datasets);
    });
  }

  private createDatasets(dataPoints: Record<string, Record<string, number | null>>, logics: (string | number)[], months: (string | number)[]) : any {
    let datasets : any = [];
    // console.log('createDatasets');
    logics.forEach((logic: string | number) => {
      let acc_values: (number | null)[] = [];
      months.forEach((month: string | number, index: any) => {
          acc_values.push(dataPoints[logic][month]);
      });

      datasets.push({
        data: acc_values,
        label: logic,
      })
    });

    return datasets;
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.0,
      },
      point: {
        radius: 5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        beginAtZero: true,
        max: 2400
      },
    },
    plugins:{
      legend:{
        position: 'bottom'
      }
    }    
  };

  public lineChartType: ChartType = 'line';
}
