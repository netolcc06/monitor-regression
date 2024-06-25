import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {NgChartsModule} from 'ng2-charts';
import { PerfPageComponent } from "./perf-page.component";
import { TestGraphModule } from "../test-graph/test-graph.module";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [PerfPageComponent],
    imports: [
        CommonModule, 
        NgChartsModule, 
        TestGraphModule, 
        MatSelectModule, 
        MatInputModule, 
        MatFormFieldModule, 
        FormsModule
    ],
    exports: [PerfPageComponent]
}) export class PerfPageModule{}