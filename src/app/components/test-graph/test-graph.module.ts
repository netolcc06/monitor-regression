import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {NgChartsModule} from 'ng2-charts';
import { TestGraphComponent } from "./test-graph.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [TestGraphComponent],
    imports: [CommonModule, NgChartsModule, MatProgressSpinnerModule],
    exports: [TestGraphComponent]
}) export class TestGraphModule{}