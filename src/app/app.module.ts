import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {NgChartsModule} from 'ng2-charts';
import { AppComponent } from "./app.component";
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { TestGraphModule } from "./components/test-graph/test-graph.module";
import { RegressionTableModule } from "./components/regression-table/regression-table.module";
import { routes } from "./app.routes";
import { PerfPageModule } from "./components/perf-page/perf-page.module";
import { MatSortModule } from "@angular/material/sort";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_DATE_FORMAT } from "./utils/date_config";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        CommonModule, 
        NgChartsModule, 
        TestGraphModule,
        MatTableModule,
        MatSortModule,
        RegressionTableModule,
        RouterModule.forRoot(routes), 
        BrowserModule,
        HttpClientModule,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        PerfPageModule
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
    ],
    bootstrap: [AppComponent]
}) export class AppModule{}