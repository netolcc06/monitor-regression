import { Routes } from '@angular/router';
import { RegressionTableComponent } from './components/regression-table/regression-table.component';
//import { AppComponent } from './app.component';
import { PerfPageComponent } from './components/perf-page/perf-page.component';

export const routes: Routes = [
    {path : "cvc5-perf", component: PerfPageComponent},
    {path : "cvc5-regression", component: RegressionTableComponent},
    {path : "**", component: PerfPageComponent},
];
