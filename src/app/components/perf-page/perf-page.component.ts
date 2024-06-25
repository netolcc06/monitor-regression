import { Component } from '@angular/core';

@Component({
  selector: 'app-perf-page',
  templateUrl: './perf-page.component.html',
  styleUrls: ['./perf-page.component.scss']
})
export class PerfPageComponent {

  selectedValue: string = 'compare';
  reportOptions = [
    {
      name: 'Monthly reports',
      value: 'compare'
    },
    {
      name: 'Daily report',
      value: 'slice'
    },
    {
      name: 'Daily range reports',
      value: 'slice_range'
    },
  ];

  logics = [
    {name : "QF_Equality"},
    {name : "QF_Equality_LinearArith"},
    {name : "QF_LinearIntArith"},
    {name : "QF_LinearRealArith"},
    {name : "QF_Strings"},
    {name : "QF_Equality_NonLinearArith"},
    {name : "QF_NonLinearIntArith"},
    {name : "QF_NonLinearRealArith"},
    {name : "QF_Bitvec"},
    {name : "QF_FPArith"},
    {name : "QF_Datatypes"},
    {name : "Equality"},
    {name : "QF_Equality"},
    {name : "Equality_LinearArith"},
    {name : "Equality_NonLinearArith"},
    {name : "Equality_MachineArith"},
    {name : "Bitvec"},
    {name : "Arith"},
    {name : "FPArith"}
  ];
}
