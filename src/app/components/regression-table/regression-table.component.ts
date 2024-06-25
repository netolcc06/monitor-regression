import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';

export interface BenchmarkElement {
  name: string;
  comparison_date: Date;
  comparison_time_cpu: number;
  base_date: Date;
  base_time_cpu: number;
}

@Component({
  selector: 'app-regression-table',
  templateUrl: './regression-table.component.html',
  styleUrls: ['./regression-table.component.scss'],
  providers: [DatePipe]
})
export class RegressionTableComponent implements AfterViewInit{
  data: any;
  displayedColumns: string[] = ['name', 'comparison_date', 'comparison_time_cpu', 'base_date', 'base_time_cpu', ];
  dataSourceWorse!: MatTableDataSource<BenchmarkElement>;
  dataSourceBetter!: MatTableDataSource<BenchmarkElement>;

  baseDate = new FormControl();
  comparisonDate = new FormControl();
  minDate : string|null = '2024-02-01';
  maxDate : string|null = Date();

  isLoading: boolean = false;

  @ViewChild('matPaginatorWorse') worsePaginator?: MatPaginator;
  @ViewChild('matSortWorse') worseSort?: MatSort;
  @ViewChild('matPaginatorBetter') betterPaginator?: MatPaginator;
  @ViewChild('matSortBetter') betterSort?: MatSort;
  
  worseStats = {};
  betterStats = {};

  constructor(private dataService:DataService, private datePipe: DatePipe){
    this.maxDate = this.datePipe.transform(this.maxDate, 'yyyy-MM-dd');
  }

  ngAfterViewInit() {
    this.dataService.getData('http://localhost:8000/reports/regression/').subscribe(response => {
      // 2024-02-01/2024-04-07/ dates to passed in another endpoint to compare dates directly
      this.data = response;
      this.dataSourceWorse = new MatTableDataSource(this.data["worse"]);
      this.dataSourceBetter = new MatTableDataSource(this.data["better"]);
      this.worseStats = this.data["stats"]["worse"];
      this.betterStats = this.data["stats"]["better"];
      this.dataSourceWorse.paginator = this.worsePaginator ? this.worsePaginator : null;
      this.dataSourceWorse.sort = this.worseSort ? this.worseSort : null;
      this.dataSourceBetter.paginator = this.betterPaginator ? this.betterPaginator : null;
      this.dataSourceBetter.sort = this.betterSort ? this.betterSort : null;
      console.log('afterViewInit')
      console.log(this.dataSourceWorse.paginator)
      // console.log(response);
      // console.log(this.worseStats);
    });
  }

  ngAfterContentCheked(){
    this.dataSourceWorse.paginator = this.worsePaginator ? this.worsePaginator : null;
      this.dataSourceWorse.sort = this.worseSort ? this.worseSort : null;
      this.dataSourceBetter.paginator = this.betterPaginator ? this.betterPaginator : null;
      this.dataSourceBetter.sort = this.betterSort ? this.betterSort : null;
  }

  applyFilter(event: Event, ds: MatTableDataSource<BenchmarkElement>) {
    const filterValue = (event.target as HTMLInputElement).value;
    ds.filter = filterValue.trim().toLowerCase();

    if (ds.paginator) {
      ds.paginator.firstPage();
    }
  }

  callbackCompare(){
    if (this.baseDate.value == null || this.comparisonDate.value == null)
      return;
    
    if (this.baseDate.value > this.comparisonDate.value) {
      console.log("Base date > comparison date");
      return;
    }

    const baseDateString = this.baseDate.value.toISOString().slice(0, 10);
    const comparisonDateString = this.comparisonDate.value.toISOString().slice(0, 10);

    console.log(baseDateString);
    console.log(comparisonDateString);

    this.isLoading = true;
    this.dataService.getData(`http://localhost:8000/reports/regression_dates/${baseDateString}/${comparisonDateString}`)
      .pipe(finalize(()=>this.isLoading = false))
      .subscribe(response => {
        this.data = response;
        this.dataSourceWorse = new MatTableDataSource(this.data["worse"]);
        this.dataSourceBetter = new MatTableDataSource(this.data["better"]);
        this.worseStats = this.data["stats"]["worse"];
        this.betterStats = this.data["stats"]["better"];
        this.dataSourceWorse.paginator = this.worsePaginator ? this.worsePaginator : null;
        this.dataSourceWorse.sort = this.worseSort ? this.worseSort : null;
        this.dataSourceBetter.paginator = this.betterPaginator ? this.betterPaginator : null;
        this.dataSourceBetter.sort = this.betterSort ? this.betterSort : null;
        console.log(response);
        // console.log(this.worseStats);
        console.log(this.dataSourceWorse.paginator)
    });

  }
}
