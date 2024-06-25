import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { RegressionTableComponent } from "./regression-table.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
    declarations: [RegressionTableComponent],
    imports: [
        CommonModule, 
        FormsModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatTableModule, 
        MatSortModule, 
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
    exports: [RegressionTableComponent]
}) export class RegressionTableModule{}